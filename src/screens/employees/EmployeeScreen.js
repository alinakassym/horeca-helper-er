import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Dimensions,
  Alert,
} from 'react-native';
import moment from 'moment';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../styles/colors';

// icons
import {IconPhone} from '../../assets/icons/main/IconPhone';
import {IconMessages} from '../../assets/icons/tabs/IconMessages';

// components
import Header from '../../components/Header';
import UserCard from './components/UserCard';
import Tabs from '../../components/Tabs';
import EmployeeInfo from './components/EmployeeInfo';
import GradientButton from '../../components/buttons/GradientButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import BottomModal from '../../components/BottomModal';
import WorkList from './components/WorkList';
import RadioSelect from '../../components/selects/RadioSelect';
import MultilineInput from '../../components/inputs/MultilineInput';
import OutlineButton from '../../components/buttons/OutlineButton';
import Toast from '../../components/notifications/Toast';
import LinearGradient from 'react-native-linear-gradient';

// services
import {getEmployeeById} from '../../services/EmployeesService';
import {getJobs, postJobInvite} from '../../services/JobsService';
import {getChatsLookup} from '../../services/ChatService';
import {getConfigs} from '../../services/UtilsService';
import {useSelector} from 'react-redux';

import i18n from '../../assets/i18n/i18n';

const dimensions = Dimensions.get('screen');

export const EmployeeScreen = ({route, navigation}) => {
  const {locale} = useSelector(state => state);
  const titleKey = `title${locale.suffix}`;

  const employeeId = route.params.id;

  const [activeTab, setActiveTab] = useState('personalInfo');

  const [chatId, setChatId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [vacancy, setVacancy] = useState({
    id: null,
    title: '',
    title_ru: '',
  });
  const [visible, setVisible] = useState(false);
  const [visibleToast, setVisibleToast] = useState(false);
  const [inviteMessage, setInviteMessage] = useState();
  const [item, setItem] = useState({
    id: 0,
    firstName: null,
    lastName: null,
    email: null,
    photoFilename: null,
    googleId: null,
    positionId: null,
    description: null,
    cityId: null,
    birthDate: null,
    genderId: null,
    experience: null,
    scheduleId: null,
    salary: null,
    createdAt: null,
    updatedAt: null,
    works: [],
    position: {title_ru: '', title: ''},
    city: {title_ru: '', title: ''},
    gender: {title_ru: '', title: ''},
    schedule: {title_ru: '', title: ''},
    photoUrl: null,
    avgAvgScore: undefined,
  });
  const [loading, setLoading] = useState({});

  const inviteToJob = async () => {
    try {
      setVisibleToast(false);
      const jobsData = await getJobs();
      if (jobsData.data && jobsData.data.length > 0) {
        setJobs(
          jobsData.data.map(el => {
            return {
              id: el.id,
              title: el.position.title,
              title_ru: el.position.title_ru,
            };
          }),
        );
        setVisible(true);
      } else {
        Alert.alert(
          i18n.t('No vacancies'),
          i18n.t('There are currently no vacancies available'),
          [
            {
              text: i18n.t('Cancel'),
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            {
              text: i18n.t('Create job vacancy'),
              onPress: () => navigation.navigate('Jobs'),
              style: 'default',
            },
          ],
        );
      }
    } catch (e) {
      console.log('inviteToJob err: ', e);
    }
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const resetInviteForm = async () => {
    try {
      setInviteMessage('');
      setVacancy({
        id: null,
        title: '',
        title_ru: '',
      });
      const chatLookup = await getChatsLookup(employeeId);
      setChatId(chatLookup);
      const result = await getEmployeeById(employeeId);
      setItem(result.data);
    } catch (e) {
      console.log('resetInviteForm err: ', e);
    }
  };

  const sendInvite = async () => {
    try {
      setVisible(false);
      console.log({
        id: vacancy.id,
        data: {
          employeeId: employeeId,
          body: inviteMessage,
        },
      });
      const id = vacancy.id;
      const data = {
        employeeId: employeeId,
        body: inviteMessage,
      };
      await postJobInvite(id, data);
      await resetInviteForm();
      setVisibleToast(true);
      setTimeout(() => {
        setVisibleToast(false);
      }, 5000);
    } catch (e) {
      console.log('sendInvite err: ', e);
    }
  };

  const getCoverLetter = async () => {
    try {
      const letter = await getConfigs('er-cover-letter');
      setInviteMessage(letter[`value${locale.suffix}`]);
    } catch (e) {
      console.log('getCoverLetter err: ', e);
    }
  };

  const isValid = () => {
    return vacancy.id && inviteMessage && inviteMessage.length > 0;
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          await resetInviteForm();
          setLoading(false);
        } catch (e) {
          console.log('getEmployeeById err:', e);
        }
      });
    }
    fetchData();
  }, [employeeId, navigation, resetInviteForm]);

  const getAge = birthDate => {
    return moment().diff(birthDate, 'years', false);
  };

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <Header
          goBack
          onClose={() => navigation.goBack()}
          title={i18n.t('Detailed information')}
        />
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Toast
        visible={visibleToast}
        title={`${i18n.t('Done')}!`}
        text={i18n.t('Invitation successfully sent')}
        onPress={() => setVisibleToast(false)}
      />
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={i18n.t('Detailed information')}
      />
      <UserCard
        photoUrl={item.photoUrl}
        firstName={item.firstName}
        lastName={item.lastName}
      />
      <Tabs
        activeTab={activeTab}
        onSelectTab={tabName => setActiveTab(tabName)}
        tabs={[
          {
            label: i18n.t('Personal data'),
            name: 'personalInfo',
          },
          {
            label: i18n.t('Experience'),
            name: 'experience',
          },
        ]}>
        <ScrollView>
          {activeTab === 'personalInfo' && (
            <>
              <EmployeeInfo
                locale={locale.lang}
                avgAvgScore={item.avgAvgScore}
                position={item.position && item.position[titleKey]}
                age={getAge(item?.birthDate)}
                city={item.city && item.city[titleKey]}
                schedule={item.schedule && item.schedule[titleKey]}
                email={item.email}
                salary={item?.salary}
              />
              <View style={styles.section}>
                <Text style={styles.title}>{i18n.t('About me')}</Text>
                <Text style={[styles.text, !!chatId && styles.textPb]}>
                  {item.description || ''}
                </Text>
              </View>
            </>
          )}
          {activeTab === 'experience' && (
            <WorkList
              locale={locale.lang}
              itemKey={titleKey}
              items={item.works}
            />
          )}
        </ScrollView>
      </Tabs>

      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 1)',
        ]}
        style={styles.btnSection}>
        {!!chatId && (
          <GradientButton
            style={globalStyles.mb3}
            onPress={() => inviteToJob()}
            label={i18n.t('Invite again')}
          />
        )}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <PrimaryButton
              label={i18n.t('Phone number')}
              color={StatusesColors.green}>
              <IconPhone
                style={globalStyles.mr3}
                size={16}
                color={PrimaryColors.white}
                fillColor={PrimaryColors.white}
                width={0.1}
              />
            </PrimaryButton>
          </View>
          <View style={styles.rightCol}>
            {chatId ? (
              <PrimaryButton
                label={i18n.t('Chat')}
                color={PrimaryColors.element}
                onPress={() =>
                  navigation.navigate('MessagesChat', {
                    chatId: chatId,
                    user: item,
                  })
                }>
                <IconMessages
                  style={globalStyles.mr3}
                  size={12.67}
                  color={PrimaryColors.white}
                />
              </PrimaryButton>
            ) : (
              <GradientButton
                onPress={() => inviteToJob()}
                label={i18n.t('Invite')}
              />
            )}
          </View>
        </View>
      </LinearGradient>
      <BottomModal
        title={`${i18n.t('Invite an employee')}`}
        visible={visible}
        onCancel={() => setVisible(false)}>
        <RadioSelect
          style={globalStyles.mb6}
          selectedItem={vacancy}
          items={jobs}
          itemKey={titleKey}
          onSelect={val => {
            setVacancy(val ? val : {id: null, title: '', title_ru: ''});
            console.log({val});
          }}
        />
        <MultilineInput
          value={inviteMessage}
          label={i18n.t('Covering letter')}
          onInputFocus={() => console.log('')}
          onChangeText={val => setInviteMessage(val)}
        />
        <OutlineButton
          onPress={() => getCoverLetter()}
          style={styles.coverLetterBtn}
          label={i18n.t('Use template letter')}
        />
        {isValid() ? (
          <GradientButton label={i18n.t('Send')} onPress={() => sendInvite()} />
        ) : (
          <PrimaryButton
            color={PrimaryColors.grey3}
            labelColor={PrimaryColors.grey1}
            label={i18n.t('Send')}
          />
        )}
      </BottomModal>
    </SafeAreaView>
  );
};

const width = dimensions.width;

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 88,
    width: width,
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
  },
  leftCol: {
    width: width - 190,
  },
  rightCol: {
    marginLeft: 8,
    width: 142,
  },
  title: {
    marginBottom: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  textPb: {
    paddingBottom: 52,
  },
  btnSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 20,
    zIndex: 3,
  },
  coverLetterBtn: {
    marginBottom: 72,
    paddingVertical: 8,
    minHeight: 32,
    alignSelf: 'flex-start',
  },
});
