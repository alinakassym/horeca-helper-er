import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Alert,
  SafeAreaView,
  Dimensions,
  StyleSheet,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';
import {typography} from '../../styles/typography';

// components
import Header from '../../components/Header';
import Autocomplete from '../../components/selects/Autocomplete';
import NumberInput from '../../components/inputs/NumberInput';
import ModalSelect from '../../components/selects/ModalSelect';
import MultilineInput from '../../components/inputs/MultilineInput';
import SliderLabel from '../../components/slider/SliderLabel';
import RadioBtn from '../../components/buttons/RadioBtn';
import GradientButton from '../../components/buttons/GradientButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import LinearGradient from 'react-native-linear-gradient';

// services
import {
  getCities,
  getGenders,
  getPositions,
  getSchedules,
} from '../../services/DictionariesService';
import {postJob} from '../../services/JobsService';
import {useSelector} from 'react-redux';

// locale
import i18n from '../../assets/i18n/i18n';

const dimensions = Dimensions.get('screen');

export const JobsPostScreen = ({navigation}) => {
  const suffix = useSelector(state => {
    const {locale} = state;
    return locale.suffix;
  });
  const titleKey = `title${suffix}`;

  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [focused, setFocused] = useState(false);

  const getNumber = val => {
    return val.length > 0 ? Number(val) : null;
  };

  const getString = val => {
    return val ? val.toString() : null;
  };

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

  const [job, setJob] = React.useState({
    position: null,
    city: null,
    ageMin: null,
    ageMax: null,
    gender: null,
    experienceMin: null,
    experienceMax: null,
    schedule: null,
    salaryMin: 200000,
    salaryMax: 300000,
    description: '',
  });

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
        i18n.t('Warning'),
        i18n.t('Please fill in all required fields'),
      );
    }
  };

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        modal
        onClose={() => navigation.goBack()}
        title={i18n.t('Basic information')}
      />

      <KeyboardAwareScrollView
        style={globalStyles.section}
        enableResetScrollToCoords={false}>
        {/*???????????????? ????????????????*/}
        <Autocomplete
          required
          label={i18n.t('Job vacancy')}
          value={job.position}
          items={positions}
          itemKey={titleKey}
          onSelect={val => setJob({...job, position: val})}
          onClear={() => setJob({...job, position: null})}
        />

        {/*??????????*/}
        <Autocomplete
          required
          label={i18n.t('City')}
          value={job.city}
          items={cities}
          itemKey={titleKey}
          onSelect={val => setJob({...job, city: val})}
          onClear={() => setJob({...job, city: null})}
        />

        {/*????????????????*/}
        <Text style={[typography.text, typography.textColorElement]}>
          {i18n.t('Salary')}
        </Text>
        <View style={styles.wrapperInputs}>
          <NumberInput
            validIcon={<></>}
            style={styles.numberInput}
            label={i18n.t('From')}
            value={getString(job.salaryMin)}
            onChangeText={val => {
              setJob({...job, salaryMin: getNumber(val)});
            }}
            onClear={() => {
              setJob({...job, salaryMin: null});
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          />
          <NumberInput
            validIcon={<></>}
            style={styles.numberInput}
            label={i18n.t('To')}
            value={getString(job.salaryMax)}
            onChangeText={val => {
              setJob({...job, salaryMax: getNumber(val)});
            }}
            onClear={() => {
              setJob({...job, salaryMax: null});
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          />
        </View>

        {/*????????????????????*/}
        <ModalSelect
          required
          label={i18n.t('Schedule')}
          value={job.schedule}
          items={schedules}
          itemText={titleKey}
          modalTitle={i18n.t('Schedule')}
          onSaveSelection={val => setJob({...job, schedule: val})}
          onClear={() => setJob({...job, schedule: null})}
        />

        {/*????????????????*/}
        <MultilineInput
          label={i18n.t('Description')}
          value={job.description}
          onChangeText={val => setJob({...job, description: val})}
        />

        {/*??????????????*/}
        <Text style={[typography.text, typography.textColorElement]}>
          {i18n.t('Age')}
        </Text>
        <View style={styles.wrapperInputs}>
          <NumberInput
            validIcon={<></>}
            style={styles.numberInput}
            label={i18n.t('From')}
            value={getString(job.ageMin)}
            onChangeText={val => {
              setJob({...job, ageMin: getNumber(val)});
            }}
            onClear={() => {
              setJob({...job, ageMin: null});
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          />
          <NumberInput
            validIcon={<></>}
            style={styles.numberInput}
            label={i18n.t('To')}
            value={getString(job.ageMax)}
            onChangeText={val => {
              setJob({...job, ageMax: getNumber(val)});
            }}
            onClear={() => {
              setJob({...job, ageMax: null});
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          />
        </View>
        <View style={[styles.sliderWrapper, globalStyles.mb3]}>
          <MultiSlider
            customLabel={e => {
              return (
                <View style={styles.labelWrapper}>
                  <SliderLabel
                    label={i18n.t('years')}
                    offsetLeft={140}
                    value={JSON.stringify(e.oneMarkerValue)}
                    itemPosition={e.oneMarkerLeftPosition - 30}
                  />
                  <SliderLabel
                    label={i18n.t('years')}
                    offsetLeft={140}
                    value={JSON.stringify(e.twoMarkerValue)}
                    itemPosition={e.twoMarkerLeftPosition - 30}
                  />
                </View>
              );
            }}
            customMarkerLeft={() => <View style={styles.point} />}
            customMarkerRight={() => <View style={styles.point} />}
            enableLabel={true}
            isMarkersSeparated={true}
            markerStyle={{backgroundColor: PrimaryColors.element}}
            selectedStyle={{backgroundColor: PrimaryColors.element}}
            trackStyle={styles.trackStyle}
            sliderLength={dimensions.width - 100}
            values={[job.ageMin || 18, job.ageMax || 70]}
            showSteps={true}
            showStepLabels={true}
            min={18}
            max={70}
            onValuesChangeFinish={values => {
              setJob({...job, ageMin: values[0], ageMax: values[1]});
            }}
            valueOne={job.ageMin}
            valueTwo={job.ageMax}
          />
        </View>

        {/*????????*/}
        <Text style={[typography.text, typography.textColorElement]}>
          {i18n.t('Experience')}
        </Text>
        <View style={styles.wrapperInputs}>
          <NumberInput
            validIcon={<></>}
            style={styles.numberInput}
            label={i18n.t('From')}
            value={getString(job.experienceMin)}
            onChangeText={val => {
              setJob({...job, experienceMin: getNumber(val)});
            }}
            onClear={() => {
              setJob({...job, experienceMin: null});
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          />
          <NumberInput
            validIcon={<></>}
            style={styles.numberInput}
            label={i18n.t('To')}
            value={getString(job.experienceMax)}
            onChangeText={val => {
              setJob({...job, experienceMax: getNumber(val)});
            }}
            onClear={() => {
              setJob({...job, experienceMax: null});
            }}
            onFocus={() => {
              setFocused(true);
            }}
            onBlur={() => {
              setFocused(false);
            }}
          />
        </View>
        <View style={[styles.sliderWrapper, globalStyles.mb3]}>
          <MultiSlider
            customLabel={e => {
              return (
                <View style={styles.labelWrapper}>
                  <SliderLabel
                    label={i18n.t('years')}
                    offsetLeft={140}
                    value={JSON.stringify(e.oneMarkerValue)}
                    itemPosition={e.oneMarkerLeftPosition - 30}
                  />
                  <SliderLabel
                    label={i18n.t('years')}
                    offsetLeft={140}
                    value={JSON.stringify(e.twoMarkerValue)}
                    itemPosition={e.twoMarkerLeftPosition - 30}
                  />
                </View>
              );
            }}
            customMarkerLeft={() => <View style={styles.point} />}
            customMarkerRight={() => <View style={styles.point} />}
            enableLabel={true}
            isMarkersSeparated={true}
            markerStyle={{backgroundColor: PrimaryColors.element}}
            selectedStyle={{backgroundColor: PrimaryColors.element}}
            trackStyle={styles.trackStyle}
            sliderLength={dimensions.width - 100}
            values={[job.experienceMin || 0, job.experienceMax || 20]}
            showSteps={true}
            showStepLabels={true}
            min={0}
            max={20}
            onValuesChangeFinish={values => {
              setJob({
                ...job,
                experienceMin: values[0],
                experienceMax: values[1],
              });
            }}
            valueOne={job.experienceMin}
            valueTwo={job.experienceMax}
          />
        </View>

        {/*??????*/}
        <Text
          style={[
            typography.text,
            typography.textColorElement,
            globalStyles.mb3,
          ]}>
          {i18n.t('Gender')}
        </Text>
        <View style={[styles.wrapperRadio, globalStyles.mb5]}>
          {genders.map((gItem, index) => (
            <RadioBtn
              style={styles.radioBtn2}
              key={index}
              item={gItem}
              itemKey={titleKey}
              activeItem={job.gender}
              onSelect={() =>
                setJob({
                  ...job,
                  gender: gItem?.id === job.gender?.id ? null : gItem,
                })
              }
            />
          ))}
        </View>

        {/*??????????????????*/}
        {!focused && (
          <LinearGradient
            colors={[
              'rgba(255, 255, 255, 0)',
              'rgba(255, 255, 255, 0.9)',
              'rgba(255, 255, 255, 0.9)',
              'rgba(255, 255, 255, 1)',
            ]}>
            <GradientButton
              style={globalStyles.mb5}
              label={i18n.t('Save')}
              onPress={() => save()}
            />
          </LinearGradient>
        )}
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

const width = dimensions.width;

const styles = StyleSheet.create({
  wrapperInputs: {
    marginLeft: -20,
    paddingLeft: 20,
    width: width + 20,
    flexDirection: 'row',
  },
  numberInput: {
    marginRight: 20,
    width: width * 0.5 - 30,
  },
  wrapperRadio: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioBtn2: {
    width: 140,
  },

  sliderWrapper: {
    paddingTop: 38,
    alignItems: 'center',
  },
  labelWrapper: {
    position: 'relative',
    flexDirection: 'row',
  },
  trackStyle: {
    height: 4,
    borderRadius: 2,
  },

  point: {
    height: 28,
    width: 28,
    borderRadius: 28,
    backgroundColor: PrimaryColors.white,
    shadowColor: 'rgba(0,0,0,0.5)',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
});

export default JobsPostScreen;
