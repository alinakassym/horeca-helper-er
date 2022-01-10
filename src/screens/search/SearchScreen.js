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

export const SearchScreen = ({navigation}) => {
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
    return Promise.all([searchEmployees(), getPositions(), getStats()]);
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const [employeesData, positionsData, statsData] = await getData();
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
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
      <Header options title={'Поиск'} subtitle={'соискателей'}>
        <OptionsButton
          onPress={() => {
            navigation.navigate('Filter');
          }}
        />
      </Header>
      <BottomModal
        onCancel={() => setVisible(false)}
        visible={visible}
        title={'Полезная информация'}>
        <StatCard numUsers={stats.numEmployees} numResumes={stats.numResumes} />
      </BottomModal>
      <View style={{height: 60}}>
        <HorizontalFilter items={positions} />
      </View>
      {employees.length > 0 ? (
        <ScrollView>
          {employees &&
            employees.map((item, index) => (
              <ResumeCard
                onPress={() => navigation.navigate('Employee', {id: item.id})}
                key={index}
                item={item}
              />
            ))}
        </ScrollView>
      ) : (
        <Placeholder placeholderText={'Список соискателей пуст'} />
      )}
    </SafeAreaView>
  );
};
