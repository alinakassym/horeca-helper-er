import React, {useState, useEffect} from 'react';
import {ScrollView, View, SafeAreaView, Alert} from 'react-native';

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
import {
  deleteJobById,
  getJobs,
  putJobIsActive,
} from '../../services/JobsService';

// store
import {useDispatch, useSelector} from 'react-redux';
import {
  setEmployeesFilter,
  setFilterApplied,
} from '../../store/slices/employees';
import Toast from '../../components/notifications/Toast';

import i18n from '../../assets/i18n/i18n';

export const JobsScreen = ({navigation}) => {
  const suffix = useSelector(state => {
    const {locale} = state;
    return locale.suffix;
  });
  const titleKey = `title${suffix}`;

  console.log({titleKey});

  const [jobs, setJobs] = useState([]);
  const [selectedJob, setSelectedJob] = useState({
    id: 0,
  });
  const [visible, setVisible] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);

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
        orderBy: {
          title: 'Relevance',
          title_ru: 'Актуальности',
          key: 'relevance',
        },
        sortOrder: 'DESC',
        pageSize: 10,
        pageNum: 1,
      }),
    );
    await dispatch(setFilterApplied(true));
    navigation.navigate('Search');
  };

  const setJobActivation = async () => {
    try {
      setVisibleToast(true);
      await putJobIsActive(selectedJob.id, {
        isActive: !selectedJob.isActive,
      });
      const result = await getJobs();
      setJobs(result.data);
      setTimeout(() => {
        setVisibleToast(false);
      }, 5000);
    } catch (e) {
      console.log('setJobActivation err: ', e);
    }
  };

  const confirmDeletion = () => {
    Alert.alert(
      i18n.t('Remove vacancy'),
      `${i18n.t('Are you sure you want to remove vacancy')} "${
        selectedJob.position && selectedJob.position[titleKey]
      }"?`,
      [
        {
          text: i18n.t('Cancel'),
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {
          text: i18n.t('Remove'),
          onPress: () => removeJob(),
          style: 'destructive',
        },
      ],
    );
  };

  const removeJob = async () => {
    try {
      await deleteJobById(selectedJob.id);
      const result = await getJobs();
      setJobs(result.data);
      setVisible(false);
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
      <Toast
        visible={selectedJob && visibleToast}
        title={'Готово!'}
        text={
          selectedJob.isActive
            ? `${i18n.t('Job vacancy')} "${
                selectedJob.position && selectedJob.position[titleKey]
              }" ${i18n.t('is deactivated')}`
            : `${i18n.t('Job vacancy')} "${
                selectedJob.position && selectedJob.position[titleKey]
              }" ${i18n.t('is activated')}`
        }
        onPress={() => setVisibleToast(false)}
      />
      <Header
        onClose={() => navigation.goBack()}
        goBack
        title={i18n.t('My job vacancies')}
      />
      <BottomModal visible={visible} onCancel={() => setVisible(false)}>
        <ModalButton divide label={i18n.t('Promote')} />
        <ModalButton
          divide
          labelColor={
            selectedJob.isActive ? StatusesColors.red : PrimaryColors.brand
          }
          label={
            selectedJob.isActive ? i18n.t('Deactivate') : i18n.t('Activate')
          }
          onPress={() => {
            setJobActivation().then();
            setVisible(false);
          }}
        />
        <ModalButton
          divide
          label={i18n.t('Edit')}
          onPress={() => {
            setVisible(false);
            navigation.navigate('JobEdit', {id: selectedJob.id});
          }}
        />
        <ModalButton
          label={i18n.t('Remove')}
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
              titleKey={titleKey}
              onPress={() => {
                setSelectedJob(item);
                setVisible(true);
                setVisibleToast(false);
              }}
              findRelevant={() =>
                apply(item).then(() => {
                  navigation.navigate('Search');
                })
              }
            />
          ))}
        <View
          style={[globalStyles.section, globalStyles.mt3, globalStyles.mb5]}>
          <PlainButton
            btnStyle={{...globalStyles.mt3, ...globalStyles.mb3}}
            onPress={() => navigation.navigate('JobsPost')}
            label={i18n.t('Create job vacancy')}>
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
