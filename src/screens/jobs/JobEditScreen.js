import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Alert, ScrollView, View, Text, Dimensions, TextInput, StyleSheet} from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {ModalSelect} from '../../components/selects/ModalSelect';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {globalStyles} from '../../styles/globalStyles';

import AsyncStorage from '@react-native-async-storage/async-storage';
import {getCities, getGenders, getPositions, getSchedules} from '../../services/DictionariesService';
import {getJobById, updateJobById, deleteJobById} from '../../services/JobsService';

const dimensions = Dimensions.get('screen');

export const JobEditScreen = ({route, navigation}) => {
  const jobId = route.params ? route.params.id : null
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [schedules, setSchedules] = useState([]);

  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', async() => {
      // The screen is focused
      const hhToken = await AsyncStorage.getItem('hhToken')
      getCities(hhToken)
        .then(citiesData => {
          console.log('cities: ', citiesData);
          setCities(citiesData);
        })
        .catch(e => {
          console.log('getCities err:', e)
        })

      getGenders(hhToken)
        .then(gendersData => {
          console.log('genders: ', gendersData);
          setGenders(gendersData);
        })
        .catch(e => {
          console.log('getGenders err:', e)
        })

      getPositions(hhToken)
        .then(positionsData => {
          console.log('positions: ', positionsData);
          setPositions(positionsData);
        })
        .catch(e => {
          console.log('getPositions err:', e)
        })

      getSchedules(hhToken)
        .then(schedulesData => {
          console.log('schedules', schedulesData);
          setSchedules(schedulesData);
        })
        .catch(e => {
          console.log('getSchedules err:', e)
        })

      console.log(
        'jobId', jobId
      )
      getJobById(jobId, hhToken)
        .then(data => {
          onChange(data.data);
          setLoading(false)
        })
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  const [job, onChange] = React.useState({
    position: {"id": 1, "title": "Waiter", "title_ru": "Официант"},
    city: {"id": 1, "title": "Astana", "title_ru": "Астана"},
    ageMin: 18,
    ageMax: 32,
    gender: {"id": 1, "title": "Female", "title_ru": "Женский"},
    experienceMin: 0,
    experienceMax: 2,
    schedule: {"id": 1, "title": "Full-time", "title_ru": "Полный день"},
    salaryMin: 100,
    salaryMax: 500,
    description: ''
  });
  const values = [18, 30];

  const update = async () => {
    const hhToken = await AsyncStorage.getItem('hhToken');
    const jobItem = {
      positionId: job.position.id,
      description: job.description,
      cityId: job.city.id,
      ageMin: job.ageMin,
      ageMax: job.ageMax,
      genderId: job.gender.id,
      experienceMin: job.experienceMin,
      experienceMax: job.experienceMax,
      scheduleId: job.schedule.id,
      salaryMin: job.salaryMin,
      salaryMax: job.salaryMax
    }
    updateJobById(job.id, jobItem, hhToken)
      .then(() => {
        navigation.navigate('Jobs');
      })
  }
  const removeJob = async () => {
    const hhToken = await AsyncStorage.getItem('hhToken');
    deleteJobById(job.id, hhToken)
      .then(() => {
        navigation.navigate('Jobs');
      })
  }

  const confirmDeletion = () => {
    Alert.alert(
      "Delete Job",
      "Are you sure you want to delete?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Delete", onPress: () => removeJob(), style: "destructive" }
      ]
    );
  }
  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }
  return (
    <ScrollView style={styles.container}>
      {/*Position*/}
      <ModalSelect label={'Position'} onChange={onChange} value={job} valueKey={'position'} items={positions} itemTitle={'title'}/>

      {/*Job location*/}
      <ModalSelect label={'Location'} onChange={onChange} value={job} valueKey={'city'} items={cities} itemTitle={'title'}/>

      {/*Age*/}
      <View>
        <Text style={globalStyles.label}>Age</Text>
        <View style={styles.row}>
          <View style={styles.col}>
            <Text>From</Text>
            <TextInput keyboardType={'number-pad'}
                       style={globalStyles.primaryInput}
                       onChangeText={(val) => {onChange({...job, ageMin: val})}}
                       value={job.ageMin.toString()} />
          </View>
          <View style={styles.col}>
            <Text>To</Text>
            <TextInput keyboardType={'number-pad'}
                       style={globalStyles.primaryInput}
                       onChangeText={(val) => {onChange({...job, ageMax: val})}}
                       value={job.ageMax.toString()} />
          </View>
        </View>
        <Text>From {job.ageMin} to {job.ageMax}</Text>
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
            values={values} showSteps={true} showStepLabels={true} min={18} max={70}
            onValuesChangeFinish={(values) => {onChange({...job, ageMin: values[0], ageMax: values[1]})}}
            valueOne={job.ageMin}
            valueTwo={job.ageMax}/>
        </View>
      </View>

      {/*Gender*/}
      <ModalSelect label={'Gender'} onChange={onChange} value={job} valueKey={'gender'} items={genders} itemTitle={'title'}/>

      {/*Experience*/}
      <Text style={globalStyles.label}>Experience (years)</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>From</Text>
          <TextInput keyboardType={'number-pad'}
                     style={globalStyles.primaryInput}
                     onChangeText={(val) => {onChange({...job, experienceMin: val})}}
                     value={job.experienceMin.toString()} />
        </View>
        <View style={styles.col}>
          <Text>To</Text>
          <TextInput keyboardType={'number-pad'}
                     style={globalStyles.primaryInput}
                     onChangeText={(val) => {onChange({...job, experienceMax: val})}}
                     value={job.experienceMax.toString()} />
        </View>
      </View>

      {/*Schedule*/}
      <ModalSelect label={'Schedule'} onChange={onChange} value={job} valueKey={'schedule'} items={schedules} itemTitle={'title'}/>

      {/*Salary*/}
      <Text style={globalStyles.label}>Salary (USD)</Text>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text>From</Text>
          <TextInput keyboardType={'number-pad'}
                     style={globalStyles.primaryInput}
                     onChangeText={(val) => {onChange({...job, salaryMin: val})}}
                     value={job.salaryMin.toString()} />
        </View>
        <View style={styles.col}>
          <Text>To</Text>
          <TextInput keyboardType={'number-pad'}
                     style={globalStyles.primaryInput}
                     onChangeText={(val) => {onChange({...job, salaryMax: val})}}
                     value={job.salaryMax.toString()} />
        </View>
      </View>

      {/*Description*/}
      <Text style={globalStyles.label}>Description</Text>
      <TextInput
        multiline={true}
        style={[globalStyles.primaryInput, styles.multiline]}
        onChangeText={(val) => {onChange({...job, description: val})}}
        value={job.description}/>
      <View style={styles.btnSection}>
        <View style={styles.btn}>
          <PrimaryButton label={'Save changes'} onPress={() => update()} />
        </View>
        <PrimaryButton label={'Delete job'} color={'#ea0000'} onPress={() => confirmDeletion()} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  sliderWrapper: {
    paddingTop: 38,
    alignItems: 'center'
  },
  btnSection: {
    marginBottom: 42
  },
  btn: {
    marginBottom: 16
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top'
  },
  row: {
    marginRight: -5,
    marginLeft: -5,
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  col: {
    marginLeft: 5,
    marginRight: 5,
    flex: 1
  }
});

export default JobEditScreen;