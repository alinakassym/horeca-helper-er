import React, {useState, useEffect} from 'react';
import {ScrollView, View, SafeAreaView, Alert, StyleSheet} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../styles/colors';

// icons
import {IconAdd} from '../../assets/icons/main/IconAdd';

// components
import Header from '../../components/Header';
import BottomModal from '../../components/BottomModal';
import PlainButton from '../../components/buttons/PlainButton';
import JobCard from './components/JobCard';
import ModalButton from '../../components/buttons/ModalButton';

// services
import {deleteJobById, getJobs} from '../../services/JobsService';

// store
import {useDispatch} from 'react-redux';
import {
  setEmployeesFilter,
  setFilterApplied,
} from '../../store/slices/employees';

export const JobsScreen = ({navigation}) => {
  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({
    id: 0,
  });
  const [visible, setVisible] = useState(false);

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

  const confirmDeletion = () => {
    Alert.alert(
      'Удалить вакансию',
      `Вы действительно хотите удалить вакансию "${selectedJob.position.title_ru}"?`,
      [
        {
          text: 'Отмена',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Удалить', onPress: () => removeJob(), style: 'destructive'},
      ],
    );
  };

  const removeJob = async () => {
    try {
      await deleteJobById(selectedJob.id);
      navigation.navigate('Jobs');
    } catch (e) {
      console.log('deleteJobById err: ', e);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const result = await getJobs();
        setJobs(result.data);
      } catch (e) {
        console.log('getJobs err:', e);
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        onClose={() => navigation.goBack()}
        goBack
        title={'Мои вакансии'}
      />
      <BottomModal visible={visible} onCancel={() => setVisible(false)}>
        <ModalButton divide label={'Продвигать'} />
        <ModalButton divide label={'Деактивировать'} />
        <ModalButton
          divide
          label={'Редактировать'}
          onPress={() =>
            navigation.navigate('JobEditScreen', {id: selectedJob.id})
          }
        />
        <ModalButton
          label={'Удалить'}
          labelColor={StatusesColors.red}
          onPress={() => confirmDeletion()}
        />
      </BottomModal>
      <ScrollView>
        {jobs &&
          jobs.map((item, index) => (
            <JobCard
              key={index}
              item={item}
              onPress={() => {
                setSelectedJob(item);
                setVisible(true);
              }}
              findRelevant={() =>
                apply(item).then(() => {
                  navigation.navigate('Search');
                })
              }
            />
          ))}
        <View style={styles.section}>
          <PlainButton
            onPress={() => navigation.navigate('JobsPostScreen')}
            label={'Создать вакансию'}>
            <IconAdd
              style={globalStyles.mr3}
              color={PrimaryColors.brand}
              size={16}
              width={2}
            />
          </PlainButton>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  section: {
    marginBottom: 24,
    marginTop: 8,
    padding: 18,
    backgroundColor: PrimaryColors.white,
  },
});
