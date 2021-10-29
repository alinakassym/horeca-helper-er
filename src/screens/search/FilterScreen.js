import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet, TextInput} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getPositions,
  getCities,
  getGenders,
  getSchedules,
} from '../../services/DictionariesService';
import {ModalSelect} from '../../components/selects/ModalSelect';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {useSelector, useDispatch} from 'react-redux';
import {setEmployeesFilter} from '../../store/slices/employees';
import {globalStyles} from '../../styles/globalStyles';

export const FilterScreen = ({navigation}) => {
  const filterState = useSelector(state => state.employees.filter);
  const dispatch = useDispatch();

  const [filters, setFilters] = useState({...filterState});

  const [positions, setPositions] = useState([]);
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [schedules, setSchedules] = useState([]);

  const apply = async () => {
    await dispatch(setEmployeesFilter(filters));
    navigation.navigate('Jobs');
  };
  const getData = async () => {
    const hhToken = await AsyncStorage.getItem('hhToken');
    return Promise.all([
      getCities(hhToken),
      getPositions(hhToken),
      getGenders(hhToken),
      getSchedules(hhToken),
    ]);
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        getData()
          .then(([citiesData, positionsData, gendersData, schedulesData]) => {
            setPositions(positionsData);
            setCities(citiesData);
            setGenders(gendersData);
            setSchedules(schedulesData);
          })
          .catch(err => {
            console.log(err);
          });
      });
    }
    fetchData();
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      {/*City*/}
      <ModalSelect
        onChangeText={val => {
          setFilters({...filters, city: val});
        }}
        label={'City'}
        value={filters}
        valueKey={'city'}
        items={cities}
        itemTitle={'title'}
      />

      {/*Position*/}
      <ModalSelect
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
                filters.experienceMin ? filters.experienceMin.toString() : null
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
                filters.experienceMax ? filters.experienceMax.toString() : null
              }
            />
          </View>
        </View>
      </View>

      <View style={styles.btn}>
        <PrimaryButton label={'Save'} onPress={() => apply()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  btn: {
    marginBottom: 42,
  },
});
