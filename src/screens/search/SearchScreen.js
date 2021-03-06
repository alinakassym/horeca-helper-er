import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  SafeAreaView,
  ScrollView,
  View,
  StyleSheet,
  RefreshControl,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// components
import Header from '../../components/Header';
import HorizontalFilter from '../../components/HorizontalFilter';
import OptionsButton from '../../components/buttons/OptionsButton';
import Placeholder from '../../components/Placeholder';
import UsersInfo from './components/UsersInfo';
import ResumeCard from './components/ResumeCard';
import BottomModal from '../../components/BottomModal';
import StatCard from './components/StatCard';
import CustomAlert from '../../components/CustomAlert';

// store
import {useDispatch, useSelector} from 'react-redux';
import {
  setEmployeesFilter,
  setFilterApplied,
} from '../../store/slices/employees';

// services
import {searchEmployees} from '../../services/EmployeesService';
import {getPositions} from '../../services/DictionariesService';
import {getStats} from '../../services/UtilsService';

// locale
import i18n from '../../assets/i18n/i18n';

export const SearchScreen = ({navigation}) => {
  const suffix = useSelector(state => {
    const {locale} = state;
    return locale.suffix;
  });
  const titleKey = `title${suffix}`;
  const {filter, isFilterApplied} = useSelector(state => {
    const {employees} = state;
    return employees;
  });
  const [employees, setEmployees] = useState([]);
  const [positions, setPositions] = useState([]);
  const [currentPosition, setCurrentPosition] = useState(filter.position);
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(true);
  const [alertVisible, setAlertVisible] = useState(false);

  const dispatch = useDispatch();

  const onRefresh = React.useCallback(async () => {
    await dispatch(setEmployeesFilter(filter));
  }, [dispatch, filter]);

  const filterByPosition = async val => {
    setLoading(true);
    if (currentPosition?.id === val.id) {
      await dispatch(
        setEmployeesFilter({
          ...filter,
          position: null,
        }),
      );
      await dispatch(setFilterApplied(false));
      setLoading(false);
    } else {
      await dispatch(
        setEmployeesFilter({
          ...filter,
          position: val,
        }),
      );
      await dispatch(setFilterApplied(true));
      setLoading(false);
    }
  };

  const getData = async () => {
    return Promise.all([getPositions(), getStats()]);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [positionsData, statsData] = await getData();
        const employeesData = await searchEmployees(filter);
        setEmployees(employeesData.items);
        setPositions(positionsData);
        setCurrentPosition(filter.position);
        setStats(statsData);
        setLoading(false);
        setRefreshing(false);
      } catch (e) {
        console.log('searchEmployees err:', e);
      }
    };
    fetchData().then();
  }, [filter]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <UsersInfo
        onPress={() => setVisible(true)}
        usersNumber={stats ? stats.numEmployeesOnline : 0}
      />
      <Header
        options
        title={i18n.t('Search')}
        subtitle={i18n.t('for employees')}>
        <OptionsButton
          applied={isFilterApplied}
          onPress={() => {
            navigation.navigate('Filter');
          }}
        />
      </Header>
      <CustomAlert
        actionBtnLabel={'??????????????'}
        visible={alertVisible}
        text={'Lorem ipsum dolor sit amet, consectetur.'}
        onCancel={() => setAlertVisible(false)}
        onAction={() => navigation.navigate('Subscription')}
      />
      <BottomModal
        onCancel={() => setVisible(false)}
        visible={visible}
        title={i18n.t('Helpful information')}>
        <StatCard
          numUsers={stats && stats.numEmployees}
          numResumes={stats && stats.numResumes}
        />
      </BottomModal>
      {!loading && (
        <View style={styles.horizontalFilterWrapper}>
          <HorizontalFilter
            activeItem={currentPosition}
            onSelect={val => filterByPosition(val)}
            items={positions}
            itemKey={titleKey}
          />
        </View>
      )}
      {loading ? (
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size="large" />
        </View>
      ) : employees.length > 0 ? (
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }>
          {employees &&
            employees.map((item, index) => (
              <ResumeCard
                onPress={() => navigation.navigate('Employee', {id: item.id})}
                key={index}
                item={item}
                itemKey={titleKey}
              />
            ))}
        </ScrollView>
      ) : (
        <Placeholder
          placeholderText={i18n.t('The list of employees is empty')}
        />
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  horizontalFilterWrapper: {
    height: 60,
    minWidth: '100%',
    backgroundColor: PrimaryColors.white,
  },
});
