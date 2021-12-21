import React, {useEffect, useState} from 'react';
import {ActivityIndicator, SafeAreaView, ScrollView, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {useSelector} from 'react-redux';
import {searchEmployees} from '../../services/EmployeesService';
import {ResumeCard} from './components/ResumeCard';
import Header from '../../components/Header';
import {getPositions} from '../../services/DictionariesService';
import HorizontalFilter from '../../components/HorizontalFilter';
import OptionsButton from '../../components/buttons/OptionsButton';
import Placeholder from '../../components/Placeholder';
import UsersInfo from './components/UsersInfo';

export const SearchScreen = ({navigation}) => {
  const {filter, isFilterApplied} = useSelector(state => {
    const {employees} = state;
    return employees;
  });
  const [employees, setEmployees] = useState([]);
  const [usersNumber, setUsersNumber] = useState(0);
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);

  const sortBy = {
    updatedAt: 'date',
    relevance: 'relevance',
    salary: 'salary',
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const result = await searchEmployees(filter);
          setEmployees(result.data.items);
          setUsersNumber(result.data.total);
          const positionsData = await getPositions();
          setPositions(positionsData);
          setLoading(false);
        } catch (e) {
          console.log('searchEmployees err:', e);
        }
      });
    }
    fetchData();
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
      <UsersInfo usersNumber={usersNumber} />
      <Header options title={'Поиск'} subtitle={'соискателей'}>
        <OptionsButton
          onPress={() => {
            navigation.navigate('FilterScreen');
          }}
        />
      </Header>
      <View style={{height: 60}}>
        <HorizontalFilter items={positions} />
      </View>
      {employees.length > 0 ? (
        <ScrollView>
          {employees &&
            employees.map((item, index) => (
              <ResumeCard
                onPress={() =>
                  navigation.navigate('EmployeeScreen', {id: item.id})
                }
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
