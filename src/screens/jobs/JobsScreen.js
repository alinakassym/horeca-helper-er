import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {getJobs} from '../../services/JobsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {JobCard} from '../../components/jobs/JobCard';

export const JobsScreen = ({navigation}) => {
  const [jobs, setJobs] = useState([]);

  useEffect(async () => {
    const unsubscribe = navigation.addListener('focus', async() => {
      // The screen is focused
      const hhToken = await AsyncStorage.getItem('hhToken')
      getJobs(hhToken)
        .then(result => {
          console.log('jobs: ', result.data);
          setJobs(result.data);
        })
        .catch(e => {
          console.log('getJobs err:', e)
        })
    });

    // Return the function to unsubscribe from the event so it gets removed on unmount
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Алматы</Text>
        <Text style={styles.title}>123</Text>
      </View>

      {/*<Text>{jobs.toString()}</Text>*/}

      <View style={styles.section}>
        {jobs && jobs.map((item, index) => (
          <JobCard key={index} item={item}/>
        ))}
      </View>
      <View style={styles.section}>
        <PrimaryButton onPress={() => navigation.navigate('JobsPostScreen')} label={'Post a job'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    marginTop: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18
  },
  section: {
    padding: 14,
  }
});
