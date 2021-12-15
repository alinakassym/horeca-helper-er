import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Platform,
  SafeAreaView,
} from 'react-native';
import {getWorksList} from '../../services/WorksService';
import {EmployeeCard} from './components/EmployeeCard';
import Header from '../../components/Header';
import {globalStyles} from '../../styles/globalStyles';

const dimensions = Dimensions.get('screen');

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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header goBack navigation={navigation} title={'История сотрудников'} />
      {works && works.length > 0 ? (
        <ScrollView>
          {works.map((item, index) => (
            <EmployeeCard
              onPress={() =>
                navigation.navigate('EmployeeWorkScreen', {value: item})
              }
              key={index}
              item={item}
            />
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
  container: {
    marginTop: Platform.OS === 'ios' ? 60 : 16,
    flex: 1,
    width: dimensions.width,
  },
  text: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#666666',
  },
});
