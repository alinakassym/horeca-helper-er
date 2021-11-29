import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
  Platform,
} from 'react-native';
import {getWorksList} from '../../services/WorksService';
import {EmployeeCard} from './EmployeeCard';

const dimensions = Dimensions.get('screen');

export const MyEmployeesScreen = ({navigation}) => {
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
    <View style={styles.container}>
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
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
          <Text style={styles.text}>No employees yet</Text>
        </View>
      )}
    </View>
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
