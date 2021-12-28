import React, {useState, useEffect} from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';

// components
import Header from '../../components/Header';
import {EmployeeCard} from './components/EmployeeCard';

// services
import {getWorksList} from '../../services/WorksService';

export const EmployeesScreen = ({navigation}) => {
  const [works, setWorks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const result = await getWorksList();
        setWorks(result);
        setLoading(false);
      } catch (e) {
        console.log('getWorksList err:', e);
      }
    });
  }, [navigation]);

  if (loading) {
    return (
      <View style={globalStyles.fullScreenSection}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={'История сотрудников'}
      />
      {works && works.length > 0 ? (
        <ScrollView>
          {works.map((item, index) => (
            <EmployeeCard key={index} item={item} />
          ))}
        </ScrollView>
      ) : (
        <View style={globalStyles.fullScreenSection}>
          <Text style={styles.text}>No employees yet</Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#666666',
  },
});
