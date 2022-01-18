import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';

// components
import Header from '../../components/Header';
import ConfirmationRequest from './components/ConfirmationRequest';
import JobApply from './components/JobApply';
import CompanyVerification from './components/CompanyVerification';
import Placeholder from '../../components/Placeholder';

// services
import {getNotifications} from '../../services/NotificationsService';
import {confirmWork} from '../../services/WorksService';
import {getChatsLookup} from '../../services/ChatService';
import {getCompany} from '../../services/CompaniesService';

export const NotificationsScreen = ({navigation}) => {
  const [company, setCompany] = useState({
    title: null,
    description: null,
    photoUrl: null,
  });
  const [notifications, setNotifications] = useState();
  const getNotificationsData = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);

      const res = await getCompany();
      setCompany(res.data);
    } catch (e) {
      console.log('getNotificationsData err: ', e);
    }
  };

  const confirmDenyWork = async (workId, isConfirmed) => {
    console.log(workId);
    try {
      await confirmWork(workId, {
        isConfirmed: isConfirmed,
      });
      await getNotificationsData();
    } catch (e) {
      console.log('confirmDenyWork err: ', e);
    }
  };

  const openChat = async employee => {
    console.log(employee.id);
    try {
      const chatId = await getChatsLookup(employee.id);
      navigation.navigate('MessagesChat', {
        chatId: chatId,
        user: employee,
      });
    } catch (e) {
      console.log('confirmDenyWork err: ', e);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      await getNotificationsData();
    });
  }, [navigation]);
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header title={'Уведомления'} />
      {notifications && notifications.length > 0 ? (
        <ScrollView>
          {notifications.map((item, index) => {
            const {work} = item;
            if (item.type === 'WORK_CREATE') {
              return (
                <ConfirmationRequest
                  onConfirm={() => confirmDenyWork(work.id, true)}
                  onDeny={() => confirmDenyWork(work.id, false)}
                  key={index}
                  item={item}
                />
              );
            } else if (item.type === 'JOB_APPLY') {
              return (
                <JobApply
                  key={index}
                  item={item}
                  openChat={() => openChat(item.employee)}
                />
              );
            }
          })}
          <CompanyVerification
            title={'Успешная модерация!'}
            text={'Ваш профиль промодерирован, и являеться верифицированным'}
            photoUrl={company.photoUrl}
          />
        </ScrollView>
      ) : (
        <Placeholder placeholderText={'Ваш список уведомлений пуст'} />
      )}
    </SafeAreaView>
  );
};
