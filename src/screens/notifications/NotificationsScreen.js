import React, {useEffect, useState} from 'react';
import {SafeAreaView, ScrollView, View, Text, StyleSheet} from 'react-native';
import Header from '../../components/Header';
import {globalStyles} from '../../styles/globalStyles';
import {getNotifications} from '../../services/NotificationsService';
import ConfirmationRequest from './components/ConfirmationRequest';
import JobApply from './components/JobApply';
import {confirmWork} from '../../services/WorksService';
import {getChatsLookup} from '../../services/ChatService';

export const NotificationsScreen = ({navigation}) => {
  const [notifications, setNotifications] = useState();
  const getNotificationsData = async () => {
    try {
      const data = await getNotifications();
      setNotifications(data);
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
      navigation.navigate('MessagesChatScreen', {
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
            if (item.type === 'WORK_CREATE') {
              return (
                <ConfirmationRequest
                  onConfirm={() => confirmDenyWork(item.work.id, true)}
                  onDeny={() => confirmDenyWork(item.work.id, false)}
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
        </ScrollView>
      ) : (
        <View style={globalStyles.fullScreenSection}>
          <Text style={[styles.placeholderText]}>
            Ваш список уведомлений пуст
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  placeholderText: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#8391A1',
  },
});
