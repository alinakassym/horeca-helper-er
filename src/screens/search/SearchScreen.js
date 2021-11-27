import React, {useEffect, useState} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {IconFilter} from '../../assets/icons/main/IconFilter';
import {useSelector} from 'react-redux';
import {searchEmployees} from '../../services/EmployeesService';
import {ResumeCard} from './ResumeCard';

export const SearchScreen = ({navigation}) => {
  const {filter, isFilterApplied} = useSelector(state => {
    const {employees} = state;
    return employees;
  });
  const [employees, setEmployees] = useState([]);
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
    <View style={globalStyles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Astana</Text>
        <Text style={styles.title}>123</Text>
      </View>
      <View style={globalStyles.topBar}>
        <TouchableOpacity
          style={globalStyles.filterBtn}
          onPress={() => {
            navigation.navigate('FilterScreen');
          }}>
          <IconFilter color={'#185AB7'} size={32} width={1.5} />
          {isFilterApplied && <View style={globalStyles.filterApplied} />}
          <Text style={globalStyles.filterBtnRightText}>Filters</Text>
        </TouchableOpacity>

        <View style={globalStyles.filterBtn}>
          <Text style={globalStyles.filterBtnLeftText}>
            Ordered by {sortBy[filter.sortBy]}
          </Text>
        </View>
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text}>No matches found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#000000',
  },
  section: {
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  btn: {
    marginBottom: 16,
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrap: {
    padding: 16,
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  item: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#666666',
  },
});
