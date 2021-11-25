import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
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
      <ScrollView>
        {works &&
          works.map((item, index) => (
            <EmployeeCard
              onPress={() =>
                navigation.navigate('EmployeeScreen', {id: item.id})
              }
              key={index}
              item={item}
            />
          ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  contaner: {
    flex: 1,
    width: dimensions.width,
  },
});
