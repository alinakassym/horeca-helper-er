import React, {useState, useEffect} from 'react';
import {ScrollView, View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {getJobs} from '../../services/JobsService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {JobCard} from '../../components/jobs/JobCard';
import {useDispatch} from 'react-redux';
import {
  setEmployeesFilter,
  setFilterApplied,
} from '../../store/slices/employees';

export const JobsScreen = ({navigation}) => {
  const [jobs, setJobs] = useState([]);

  const dispatch = useDispatch();

  const apply = async job => {
    await dispatch(
      setEmployeesFilter({
        positionId: job.position ? job.position.id : null,
        position: job.position,
        cityId: job.city ? job.city.id : null,
        city: job.city,
        ageMin: job.ageMin,
        ageMax: job.ageMax,
        genderId: job.gender ? job.gender.id : null,
        gender: job.gender,
        experienceMin: job.experienceMin,
        experienceMax: job.experienceMax,
        scheduleId: job.schedule ? job.schedule.id : null,
        schedule: job.schedule,
        salaryMin: job.salaryMin,
        salaryMax: job.salaryMax,
        sortBy: 'relevance',
        orderBy: {title: 'Relevance', key: 'relevance'},
        sortOrder: 'DESC',
        pageSize: 10,
        pageNum: 1,
      }),
    );
    await dispatch(setFilterApplied(true));
    navigation.navigate('Search');
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      // The screen is focused
      getJobs()
        .then(result => {
          // console.log('jobs: ', result.data);
          setJobs(result.data);
        })
        .catch(e => {
          console.log('getJobs err:', e);
        });
    });
  }, [navigation]);

  return (
    <View style={globalStyles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Astana</Text>
        <Text style={styles.title}>123</Text>
      </View>

      {/*<Text>{jobs.toString()}</Text>*/}
      <ScrollView>
        <View style={styles.section}>
          {jobs &&
            jobs.map((item, index) => (
              <JobCard
                key={index}
                item={item}
                onPress={() =>
                  navigation.navigate('JobEditScreen', {id: item.id})
                }
                findRelevant={() =>
                  apply(item).then(() => {
                    navigation.navigate('Search');
                  })
                }
              />
            ))}
          <View style={styles.btn}>
            <PrimaryButton
              onPress={() => navigation.navigate('JobsPostScreen')}
              label={'Post a job'}
            />
          </View>
        </View>
      </ScrollView>
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
  },
  section: {
    paddingTop: 14,
    paddingLeft: 14,
    paddingRight: 14,
  },
  btn: {
    marginBottom: 16,
  },
});
