import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  SafeAreaView,
  StyleSheet,
  Dimensions,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// icons
import {IconBucket} from '../../assets/icons/main/IconBucket';

// components
import Header from '../../components/Header';
import ModalSelect from '../../components/selects/ModalSelect';
import PlainButton from '../../components/buttons/PlainButton';
import Autocomplete from '../../components/selects/Autocomplete';
import GroupButton from '../../components/buttons/GroupButton';
import GradientButton from '../../components/buttons/GradientButton';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import LinearGradient from 'react-native-linear-gradient';

// store
import {useSelector, useDispatch} from 'react-redux';
import {
  setEmployeesFilter,
  setFilterApplied,
} from '../../store/slices/employees';

// services
import {
  getPositions,
  getCities,
  getGenders,
  getSchedules,
} from '../../services/DictionariesService';
import ExpansionPanel from '../../components/ExpansionPanel';

const dimensions = Dimensions.get('screen');

export const FilterScreen = ({navigation}) => {
  const {employees} = useSelector(state => state);
  const filterState = employees.filter;
  const filterReset = employees.filterReset;
  const sortBy = employees.sortBy;

  const dispatch = useDispatch();

  const [filters, setFilters] = useState({...filterState});

  const [positions, setPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [listSortBy] = useState(sortBy);
  const [focused, setFocused] = useState(false);

  const resetFilter = async () => {
    await dispatch(setEmployeesFilter(filterReset));
    await dispatch(setFilterApplied(false));
    navigation.navigate('Search');
  };

  const apply = async () => {
    await dispatch(setEmployeesFilter(filters));
    await dispatch(setFilterApplied(true));
    navigation.navigate('Search');
  };

  const getData = async () => {
    return Promise.all([
      getCities(),
      getPositions(),
      getGenders(),
      getSchedules(),
    ]);
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const [citiesData, positionsData, gendersData, schedulesData] =
            await getData();
          setPositions(positionsData);
          setCities(citiesData);
          setGenders(gendersData);
          setSchedules(schedulesData);
        } catch (e) {
          console.log('getData err: ', e);
        }
      });
    }
    fetchData();
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header goBack onClose={() => navigation.goBack()} title={'Фильтр'}>
        <PlainButton
          btnStyle={styles.resetBtn}
          label={'Сбросить'}
          onPress={() => resetFilter()}>
          <IconBucket
            width={1.5}
            size={16}
            color={PrimaryColors.brand}
            style={globalStyles.mr2}
          />
        </PlainButton>
      </Header>
      <KeyboardAwareScrollView
        style={styles.container}
        enableResetScrollToCoords={false}>
        {/*Order by*/}
        <View style={globalStyles.card}>
          <GroupButton
            label={'Сортировать по'}
            selectedItem={filters.orderBy}
            items={listSortBy}
            itemKey={'title_ru'}
            onSelect={val => {
              setFilters({...filters, orderBy: val});
            }}
          />
        </View>

        <View style={globalStyles.mt3}>
          <ExpansionPanel items={[{title: 'Город'}]}>
            <Text>Test</Text>
          </ExpansionPanel>
        </View>
        {/*City*/}
        <Autocomplete
          onSelect={val => {
            setFilters({...filters, city: val});
          }}
          onClear={() => {
            setFilters({...filters, city: null});
          }}
          label={'City'}
          value={filters.city}
          items={cities}
          itemKey={'title_ru'}
        />

        {/*Position*/}
        <Autocomplete
          onChangeText={val => {
            setFilters({...filters, position: val});
          }}
          label={'Position'}
          value={filters}
          valueKey={'position'}
          items={positions}
          itemTitle={'title'}
        />

        {/*Salary*/}
        <View>
          <Text style={globalStyles.label}>Salary</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={globalStyles.text}>Min</Text>
              <TextInput
                keyboardType={'number-pad'}
                style={globalStyles.primaryInput}
                onChangeText={val => {
                  setFilters({
                    ...filters,
                    salaryMin: val.length > 0 ? Number(val) : null,
                  });
                }}
                value={filters.salaryMin ? filters.salaryMin.toString() : null}
              />
            </View>
            <View style={styles.col}>
              <Text style={globalStyles.text}>Max</Text>
              <TextInput
                keyboardType={'number-pad'}
                style={globalStyles.primaryInput}
                onChangeText={val => {
                  setFilters({
                    ...filters,
                    salaryMax: val.length > 0 ? Number(val) : null,
                  });
                }}
                value={filters.salaryMax ? filters.salaryMax.toString() : null}
              />
            </View>
          </View>
        </View>

        {/*Schedule*/}
        <ModalSelect
          onChangeText={val => {
            setFilters({...filters, schedule: val});
          }}
          label={'Schedule'}
          value={filters}
          valueKey={'schedule'}
          items={schedules}
          itemTitle={'title'}
        />

        {/*Age*/}
        <View>
          <Text style={globalStyles.label}>Age</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={globalStyles.text}>From</Text>
              <TextInput
                keyboardType={'number-pad'}
                style={globalStyles.primaryInput}
                onChangeText={val => {
                  setFilters({
                    ...filters,
                    ageMin: val.length > 0 ? Number(val) : null,
                  });
                }}
                value={filters.ageMin ? filters.ageMin.toString() : null}
              />
            </View>
            <View style={styles.col}>
              <Text style={globalStyles.text}>To</Text>
              <TextInput
                keyboardType={'number-pad'}
                style={globalStyles.primaryInput}
                onChangeText={val => {
                  setFilters({
                    ...filters,
                    ageMax: val.length > 0 ? Number(val) : null,
                  });
                }}
                value={filters.ageMax ? filters.ageMax.toString() : null}
              />
            </View>
          </View>
        </View>

        {/*Genders*/}
        <ModalSelect
          onChangeText={val => {
            setFilters({...filters, gender: val});
          }}
          label={'Gender'}
          value={filters}
          valueKey={'gender'}
          items={genders}
          itemTitle={'title'}
        />

        {/*Experience*/}
        <View>
          <Text style={globalStyles.label}>Experience</Text>
          <View style={styles.row}>
            <View style={styles.col}>
              <Text style={globalStyles.text}>From</Text>
              <TextInput
                keyboardType={'number-pad'}
                style={globalStyles.primaryInput}
                onChangeText={val => {
                  setFilters({
                    ...filters,
                    experienceMin: val.length > 0 ? Number(val) : null,
                  });
                }}
                value={
                  filters.experienceMin
                    ? filters.experienceMin.toString()
                    : null
                }
              />
            </View>
            <View style={styles.col}>
              <Text style={globalStyles.text}>To</Text>
              <TextInput
                keyboardType={'number-pad'}
                style={globalStyles.primaryInput}
                onChangeText={val => {
                  setFilters({
                    ...filters,
                    experienceMax: val.length > 0 ? Number(val) : null,
                  });
                }}
                value={
                  filters.experienceMax
                    ? filters.experienceMax.toString()
                    : null
                }
              />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>

      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 1)',
        ]}
        style={styles.btnSection}>
        <GradientButton
          style={styles.btn}
          label={'Применить фильтр'}
          onPress={() => apply()}
        />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 88,
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
  btnSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 3,
  },
  btn: {
    width: dimensions.width * 0.5,
  },
  resetBtn: {
    alignSelf: 'flex-end',
  },
});
