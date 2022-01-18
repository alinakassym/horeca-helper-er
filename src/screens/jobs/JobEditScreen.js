import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  ActivityIndicator,
  Dimensions,
  StyleSheet,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {typography} from '../../styles/typography';
import {PrimaryColors} from '../../styles/colors';

// components
import Header from '../../components/Header';
import ModalSelect from '../../components/selects/ModalSelect';
import Autocomplete from '../../components/selects/Autocomplete';
import NumberInput from '../../components/NumberInput';
import MultilineInput from '../../components/MultilineInput';
import RadioBtn from '../../components/buttons/RadioBtn';
import GradientButton from '../../components/buttons/GradientButton';
import SliderLabel from '../../components/slider/SliderLabel';
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
import {getJobById, updateJobById} from '../../services/JobsService';

const dimensions = Dimensions.get('screen');

export const JobEditScreen = ({route, navigation}) => {
  const jobId = route.params ? route.params.id : null;
  const [loading, setLoading] = useState(true);
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [positions, setPositions] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [focused, setFocused] = useState(false);

  const [job, setJob] = React.useState({
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
      // The screen is focused
      try {
        const [citiesData, gendersData, positionsData, schedulesData] =
          await getData();
        const data = await getJobById(jobId);

        setCities(citiesData);
        setGenders(gendersData);
        setPositions(positionsData);
        setSchedules(schedulesData);

        setJob(data.data);
        setLoading(false);
      } catch (e) {
        console.log('err:', e);
      }
    });
  }, [jobId, navigation]);

  const update = async () => {
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
      await updateJobById(job.id, jobItem);
      navigation.navigate('Jobs');
    } catch (e) {
      console.log('updateJobById err: ', e);
    }
  };

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <Header
          modal
          onClose={() => navigation.goBack()}
          title={'Основная информация'}
        />
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size={'large'} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        modal
        onClose={() => navigation.goBack()}
        title={'Основная информация'}
      />

      <KeyboardAwareScrollView
        style={globalStyles.section}
        enableResetScrollToCoords={false}>
        {/*Вакансия*/}
        <Autocomplete
          label={'Вакансия'}
          value={job.position}
          items={positions}
          itemKey={'title_ru'}
          onSelect={val => setJob({...job, position: val})}
          onClear={() => setJob({...job, position: null})}
        />

        {/*Город*/}
        <Autocomplete
          label={'Город'}
          value={job.city}
          items={cities}
          itemKey={'title_ru'}
          onSelect={val => setJob({...job, city: val})}
          onClear={() => setJob({...job, city: null})}
        />

        {/*Зарплата*/}
        <Text style={[typography.text, typography.textColorElement]}>
          Зарплата
        </Text>
        <View style={styles.wrapperInputs}>
          <NumberInput
            validIcon={<></>}
            style={styles.numberInput}
            label={'От'}
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
            label={'От'}
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

        {/*Расписание*/}
        <ModalSelect
          label={'Расписание'}
          value={job.schedule}
          items={schedules}
          itemText={'title_ru'}
          modalTitle={'Расписание'}
          onSaveSelection={val => setJob({...job, schedule: val})}
          onClear={() => setJob({...job, schedule: null})}
        />

        {/*Описание*/}
        <MultilineInput
          label={'Описание'}
          value={job.description}
          onChangeText={val => setJob({...job, description: val})}
        />

        {/*Возраст*/}
        <Text style={[typography.text, typography.textColorElement]}>
          Возраст
        </Text>
        <View style={styles.wrapperInputs}>
          <NumberInput
            validIcon={<></>}
            style={styles.numberInput}
            label={'От'}
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
            label={'От'}
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
                    label={'лет'}
                    offsetLeft={140}
                    value={JSON.stringify(e.oneMarkerValue)}
                    itemPosition={e.oneMarkerLeftPosition - 30}
                  />
                  <SliderLabel
                    label={'лет'}
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
            values={[job.ageMin || 18, job.ageMax || 32]}
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

        {/*Опыт*/}
        <Text style={[typography.text, typography.textColorElement]}>Опыт</Text>
        <View style={styles.wrapperInputs}>
          <NumberInput
            validIcon={<></>}
            style={styles.numberInput}
            label={'От'}
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
            label={'От'}
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
                    label={'лет'}
                    offsetLeft={140}
                    value={JSON.stringify(e.oneMarkerValue)}
                    itemPosition={e.oneMarkerLeftPosition - 30}
                  />
                  <SliderLabel
                    label={'лет'}
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

        {/*Пол*/}
        <Text
          style={[
            typography.text,
            typography.textColorElement,
            globalStyles.mb3,
          ]}>
          Пол
        </Text>
        <View style={[styles.wrapperRadio, globalStyles.mb5]}>
          {genders.map((gItem, index) => (
            <RadioBtn
              style={styles.radioBtn2}
              key={index}
              item={gItem}
              itemKey={'title_ru'}
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

        {/*Сохранить*/}
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
              label={'Сохранить'}
              onPress={() => update()}
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

export default JobEditScreen;
