import React, {useState, useEffect} from 'react';
import {View, SafeAreaView, StyleSheet, Dimensions} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// icons
import {IconBucket} from '../../assets/icons/main/IconBucket';

// components
import Header from '../../components/Header';
import PlainButton from '../../components/buttons/PlainButton';
import GroupButton from '../../components/buttons/GroupButton';
import GradientButton from '../../components/buttons/GradientButton';
import ExpansionPanel from '../../components/ExpansionPanel';
import RadioBtn from '../../components/buttons/RadioBtn';
import NumberInput from '../../components/NumberInput';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

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
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
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

        <View style={[globalStyles.mt3, styles.container]}>
          {/*Город*/}
          <ExpansionPanel
            items={[{title: 'Город'}]}
            expandedBlockStyle={styles.wrapperRadio}>
            {cities.map((cItem, index) => (
              <RadioBtn
                style={cities.length > 3 ? styles.radioBtn2 : styles.radioBtn1}
                key={index}
                item={cItem}
                itemKey={'title_ru'}
                activeItem={filters.city}
                onSelect={() =>
                  setFilters({
                    ...filters,
                    city: cItem?.id === filters.city?.id ? null : cItem,
                  })
                }
              />
            ))}
          </ExpansionPanel>

          {/*Позиция*/}
          <ExpansionPanel
            items={[{title: 'Позиция'}]}
            expandedBlockStyle={styles.wrapperRadio}>
            {positions.map((pItem, index) => (
              <RadioBtn
                style={
                  positions.length > 3 ? styles.radioBtn2 : styles.radioBtn1
                }
                key={index}
                item={pItem}
                itemKey={'title_ru'}
                activeItem={filters.position}
                onSelect={() =>
                  setFilters({
                    ...filters,
                    position: pItem?.id === filters.position?.id ? null : pItem,
                  })
                }
              />
            ))}
          </ExpansionPanel>

          {/*Расписание*/}
          <ExpansionPanel
            items={[{title: 'Расписание'}]}
            expandedBlockStyle={styles.wrapperRadio}>
            {schedules.map((sItem, index) => (
              <RadioBtn
                style={
                  schedules.length > 3 ? styles.radioBtn2 : styles.radioBtn1
                }
                key={index}
                item={sItem}
                itemKey={'title_ru'}
                activeItem={filters.schedule}
                onSelect={() =>
                  setFilters({
                    ...filters,
                    schedule: sItem?.id === filters.schedule?.id ? null : sItem,
                  })
                }
              />
            ))}
          </ExpansionPanel>

          {/*Зарплата*/}
          <ExpansionPanel
            items={[{title: 'Зарплата'}]}
            expandedBlockStyle={styles.wrapperInputs}>
            <NumberInput
              validIcon={<></>}
              style={styles.numberInput}
              label={'От'}
              value={filters.salaryMin}
              onChangeText={val => {
                setFilters({...filters, salaryMin: val});
              }}
              onClear={() => {
                setFilters({...filters, salaryMin: null});
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
              label={'До'}
              value={filters.salaryMax}
              onChangeText={val => {
                setFilters({...filters, salaryMax: val});
              }}
              onClear={() => {
                setFilters({...filters, salaryMax: null});
              }}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
            />
          </ExpansionPanel>

          {/*Возраст*/}
          <ExpansionPanel
            items={[{title: 'Возраст'}]}
            expandedBlockStyle={styles.wrapperInputs}>
            <NumberInput
              validIcon={<></>}
              style={styles.numberInput}
              label={'От'}
              value={filters.ageMin}
              onChangeText={val => {
                setFilters({...filters, ageMin: val});
              }}
              onClear={() => {
                setFilters({...filters, ageMin: null});
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
              label={'До'}
              value={filters.ageMax}
              onChangeText={val => {
                setFilters({...filters, ageMax: val});
              }}
              onClear={() => {
                setFilters({...filters, ageMax: null});
              }}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
            />
          </ExpansionPanel>

          {/*Пол*/}
          <ExpansionPanel
            items={[{title: 'Пол'}]}
            expandedBlockStyle={styles.wrapperRadio}>
            {genders.map((gItem, index) => (
              <RadioBtn
                style={styles.radioBtn2}
                key={index}
                item={gItem}
                itemKey={'title_ru'}
                activeItem={filters.gender}
                onSelect={() =>
                  setFilters({
                    ...filters,
                    gender: gItem?.id === filters.gender?.id ? null : gItem,
                  })
                }
              />
            ))}
          </ExpansionPanel>

          {/*Опыт*/}
          <ExpansionPanel
            items={[{title: 'Опыт'}]}
            expandedBlockStyle={styles.wrapperInputs}>
            <NumberInput
              validIcon={<></>}
              style={styles.numberInput}
              label={'От'}
              value={filters.experienceMin}
              onChangeText={val => {
                setFilters({...filters, experienceMin: val});
              }}
              onClear={() => {
                setFilters({...filters, experienceMin: null});
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
              label={'До'}
              value={filters.experienceMax}
              onChangeText={val => {
                setFilters({...filters, experienceMax: val});
              }}
              onClear={() => {
                setFilters({...filters, experienceMax: null});
              }}
              onFocus={() => {
                setFocused(true);
              }}
              onBlur={() => {
                setFocused(false);
              }}
            />
          </ExpansionPanel>
        </View>
      </KeyboardAwareScrollView>

      {!focused && (
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.9)',
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
      )}
    </SafeAreaView>
  );
};

const width = dimensions.width;

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
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    alignItems: 'center',
    zIndex: 3,
  },
  btn: {
    width: width * 0.45,
    minWidth: 180,
  },
  resetBtn: {
    alignSelf: 'flex-end',
  },
  wrapperRadio: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  radioBtn1: {
    width: width - 40,
  },
  radioBtn2: {
    width: width * 0.5 - 20,
  },
  wrapperInputs: {
    marginLeft: -20,
    paddingLeft: 40,
    width: width + 20,
    flexDirection: 'row',
  },
  numberInput: {
    marginRight: 20,
    width: width * 0.5 - 30,
  },
});
