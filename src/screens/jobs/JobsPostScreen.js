import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Dimensions,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import ModalSelect from '../../components/selects/ModalSelect';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {globalStyles} from '../../styles/globalStyles';

import {
  getCities,
  getGenders,
  getPositions,
  getSchedules,
} from '../../services/DictionariesService';
import {postJob} from '../../services/JobsService';
import {Autocomplete} from '../../components/selects/Autocomplete';

const dimensions = Dimensions.get('screen');

export const JobsPostScreen = ({navigation}) => {
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const getData = async () => {
    return Promise.all([
      getCities(),
      getGenders(),
      getPositions(),
      getSchedules(),
    ]);
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const [citiesData, gendersData, positionsData, schedulesData] =
          await getData();
        setCities(citiesData);
        setGenders(gendersData);
        setPositions(positionsData);
        setSchedules(schedulesData);
      } catch (e) {
        console.log('getData err:', e);
      }
    });
  }, [navigation]);

  const [job, onChange] = React.useState({
    position: null,
    city: null,
    ageMin: 18,
    ageMax: 32,
    gender: null,
    experienceMin: 0,
    experienceMax: 2,
    schedule: null,
    salaryMin: 200000,
    salaryMax: 300000,
    description: '',
  });
  const values = [18, 32];

  const save = async () => {
    const isValid = job.position && job.city && job.schedule;
    if (isValid) {
      const jobItem = {
        positionId: job.position?.id,
        description: job.description,
        cityId: job.city?.id,
        ageMin: job.ageMin,
        ageMax: job.ageMax,
        genderId: job.gender?.id,
        experienceMin: job.experienceMin,
        experienceMax: job.experienceMax,
        scheduleId: job.schedule?.id,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
      };
      try {
        await postJob(jobItem);
        navigation.navigate('Jobs');
      } catch (e) {
        console.log('postJob err: ', postJob);
      }
    } else {
      Alert.alert(
        'Warning',
        'Position, location & schedule should not be empty',
      );
    }
  };
  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableResetScrollToCoords={false}>
      {/*Position*/}
      <Autocomplete
        required={true}
        label={'Position'}
        onChange={onChange}
        value={job}
        valueKey={'position'}
        items={positions}
        itemTitle={'title'}
      />

      {/*Job location*/}
      <Autocomplete
        required={true}
        label={'Location'}
        onChange={onChange}
        value={job}
        valueKey={'city'}
        items={cities}
        itemTitle={'title'}
      />

      {/*Age*/}
      <View>
        <Text style={globalStyles.label}>Age</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text>From</Text>
            <TextInput
              keyboardType={'number-pad'}
              style={globalStyles.primaryInput}
              onChangeText={val => {
                onChange({...job, ageMin: val.length > 0 ? Number(val) : null});
              }}
              value={job.ageMin ? job.ageMin.toString() : null}
            />
          </View>
          <View style={styles.col}>
            <Text>To</Text>
            <TextInput
              keyboardType={'number-pad'}
              style={globalStyles.primaryInput}
              onChangeText={val => {
                onChange({...job, ageMax: val.length > 0 ? Number(val) : null});
              }}
              value={job.ageMax ? job.ageMax.toString() : null}
            />
          </View>
        </View>
        <Text>
          From {job.ageMin} to {job.ageMax}
        </Text>
        <View style={styles.sliderWrapper}>
          <MultiSlider
            /*customLabel={(e) => {
              return (<View><Text>{e.currentValue}</Text></View>)
            }}*/
            enableLabel={true}
            isMarkersSeparated={true}
            markerStyle={{backgroundColor: '#185AB7'}}
            selectedStyle={{backgroundColor: '#185AB7'}}
            sliderLength={dimensions.width - 80}
            values={values}
            showSteps={true}
            showStepLabels={true}
            min={18}
            max={70}
            onValuesChangeFinish={values => {
              onChange({...job, ageMin: values[0], ageMax: values[1]});
            }}
            valueOne={job.ageMin}
            valueTwo={job.ageMax}
          />
        </View>
      </View>

      {/*Gender*/}
      <ModalSelect
        label={'Gender'}
        onChange={onChange}
        value={job}
        valueKey={'gender'}
        items={genders}
        itemTitle={'title'}
      />

      {/*Experience*/}
      <Text style={globalStyles.label}>Experience (years)</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>From</Text>
          <TextInput
            keyboardType={'number-pad'}
            style={globalStyles.primaryInput}
            onChangeText={val => {
              onChange({
                ...job,
                experienceMin: val.length > 0 ? Number(val) : null,
              });
            }}
            value={job.experienceMin ? job.experienceMin.toString() : null}
          />
        </View>
        <View style={styles.col}>
          <Text>To</Text>
          <TextInput
            keyboardType={'number-pad'}
            style={globalStyles.primaryInput}
            onChangeText={val => {
              onChange({
                ...job,
                experienceMax: val.length > 0 ? Number(val) : null,
              });
            }}
            value={job.experienceMax ? job.experienceMax.toString() : null}
          />
        </View>
      </View>

      {/*Schedule*/}
      <ModalSelect
        required={true}
        label={'Schedule'}
        onChange={onChange}
        value={job}
        valueKey={'schedule'}
        items={schedules}
        itemTitle={'title'}
      />

      {/*Salary*/}
      <Text style={globalStyles.label}>Salary (KZT)</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>From</Text>
          <TextInput
            keyboardType={'number-pad'}
            style={globalStyles.primaryInput}
            onChangeText={val => {
              onChange({
                ...job,
                salaryMin: val.length > 0 ? Number(val) : null,
              });
            }}
            value={job.salaryMin ? job.salaryMin.toString() : null}
          />
        </View>
        <View style={styles.col}>
          <Text>To</Text>
          <TextInput
            keyboardType={'number-pad'}
            style={globalStyles.primaryInput}
            onChangeText={val => {
              onChange({
                ...job,
                salaryMax: val.length > 0 ? Number(val) : null,
              });
            }}
            value={job.salaryMax ? job.salaryMax.toString() : null}
          />
        </View>
      </View>

      {/*Description*/}
      <Text style={globalStyles.label}>Description</Text>
      <TextInput
        multiline={true}
        style={[globalStyles.primaryInput, styles.multiline]}
        onChangeText={val => {
          onChange({...job, description: val});
        }}
        value={job.description}
      />
      <View style={styles.btn}>
        <PrimaryButton label={'Post'} onPress={() => save()} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  sliderWrapper: {
    paddingTop: 38,
    alignItems: 'center',
  },
  btn: {
    marginBottom: 42,
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    marginRight: -5,
    marginLeft: -5,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    marginLeft: 5,
    marginRight: 5,
    flex: 1,
  },
});

export default JobsPostScreen;
