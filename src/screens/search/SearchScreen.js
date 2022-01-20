import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, View} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';

// components
import Header from '../../components/Header';
import HorizontalFilter from '../../components/HorizontalFilter';
import OptionsButton from '../../components/buttons/OptionsButton';
import Placeholder from '../../components/Placeholder';
import UsersInfo from './components/UsersInfo';
import ResumeCard from './components/ResumeCard';
import BottomModal from '../../components/BottomModal';
import StatCard from './components/StatCard';

// store
import {useSelector} from 'react-redux';

// services
import {searchEmployees} from '../../services/EmployeesService';
import {getPositions} from '../../services/DictionariesService';
import {getStats} from '../../services/UtilsService';
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
  const [visible, setVisible] = useState(false);
  const [stats, setStats] = useState();
  const [loading, setLoading] = useState(true);

  const getData = async () => {
    return Promise.all([getPositions(), getStats()]);
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const [positionsData, statsData] = await getData();
        const employeesData = await searchEmployees(filter);
        setEmployees(employeesData.items);
        setPositions(positionsData);
        setStats(statsData);
        setLoading(false);
      } catch (e) {
        console.log('searchEmployees err:', e);
      }
    });
  }, [filter, navigation]);

  if (loading) {
    return (
      <View style={globalStyles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

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
      <BottomModal
        onCancel={() => setVisible(false)}
        visible={visible}
        title={i18n.t('Helpful information')}>
        <StatCard numUsers={stats.numEmployees} numResumes={stats.numResumes} />
      </BottomModal>
      <View style={{height: 60}}>
        <HorizontalFilter
          onSelect={val => console.log({val})}
          items={positions}
        />
      </View>
      {employees.length > 0 ? (
        <ScrollView>
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
