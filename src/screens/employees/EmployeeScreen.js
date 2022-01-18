import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  ActivityIndicator,
  Text,
  View,
  StyleSheet,
  Dimensions,
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
import {WorkList} from './components/WorkList';
import LinearGradient from 'react-native-linear-gradient';

// services
import {getEmployeeById} from '../../services/EmployeesService';
import {getJobs, postJobInvite} from '../../services/JobsService';
import {getChatsLookup} from '../../services/ChatService';
import RadioSelect from '../../components/selects/RadioSelect';
import MultilineInput from '../../components/MultilineInput';

const dimensions = Dimensions.get('screen');

export const EmployeeScreen = ({route, navigation}) => {
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
      const jobsData = await getJobs();
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
    } catch (e) {
      console.log('inviteToJob err: ', e);
    }
  };

  const sendInvite = async () => {
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
    setVisible(false);
  };

  const isValid = () => {
    return vacancy.id && inviteMessage && inviteMessage.length > 0;
  };

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const result = await getEmployeeById(employeeId);
          setItem(result.data);
          setLoading(false);

          const chatLookup = await getChatsLookup(employeeId);
          setChatId(chatLookup);
          console.log('chatLookup: ', chatLookup);
        } catch (e) {
          console.log('getEmployeeById err:', e);
        }
      });
    }
    fetchData();
  }, [employeeId, navigation]);

  const getAge = birthDate => {
    return moment().diff(birthDate, 'years', false);
  };

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <Header
          goBack
          onClose={() => navigation.goBack()}
          title={'Подробная информация'}
        />
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size="large" />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={'Подробная информация'}
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
            label: 'Личные данные',
            name: 'personalInfo',
          },
          {
            label: 'Опыт работы',
            name: 'experience',
          },
        ]}>
        <ScrollView>
          {activeTab === 'personalInfo' && (
            <>
              <EmployeeInfo
                avgAvgScore={item.avgAvgScore}
                position={item?.position?.title_ru}
                age={getAge(item?.birthDate)}
                city={item?.city?.title_ru}
                schedule={item?.schedule?.title_ru}
                email={item.email}
                salary={item?.salary}
              />
              <View style={styles.section}>
                <Text style={styles.title}>Обо мне</Text>
                <Text style={[styles.text, !!chatId && styles.textPb]}>
                  {item.description || ''}
                </Text>
              </View>
            </>
          )}
          {activeTab === 'experience' && <WorkList items={item.works} />}
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
            label={'Пригласить еще раз'}
          />
        )}
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <PrimaryButton
              label={'Номер телефона'}
              color={StatusesColors.green}>
              <IconPhone
                style={globalStyles.mr3}
                size={12.67}
                color={PrimaryColors.white}
                fillColor={PrimaryColors.white}
              />
            </PrimaryButton>
          </View>
          <View style={styles.rightCol}>
            {chatId ? (
              <PrimaryButton
                label={'Чат'}
                color={PrimaryColors.element}
                onPress={() =>
                  navigation.navigate('MessagesChat', {
                    chatId: chatId,
                    user: item,
                  })
                }>
                <IconMessages size={12.67} color={PrimaryColors.white} />
              </PrimaryButton>
            ) : (
              <GradientButton
                onPress={() => inviteToJob()}
                label={'Пригласить'}
              />
            )}
          </View>
        </View>
      </LinearGradient>
      <BottomModal
        title={'Пригласить соискателя'}
        visible={visible}
        onCancel={() => setVisible(false)}>
        <RadioSelect
          style={globalStyles.mb6}
          selectedItem={vacancy}
          items={jobs}
          itemKey={'title_ru'}
          onSelect={val => {
            setVacancy(val ? val : {id: null, title: '', title_ru: ''});
            console.log({val});
          }}
        />
        <MultilineInput
          value={inviteMessage}
          label={'Сопроводительное письмо'}
          onInputFocus={() => console.log('')}
          onChangeText={val => setInviteMessage(val)}
        />
        {isValid() ? (
          <GradientButton label={'Отправить'} onPress={() => sendInvite()} />
        ) : (
          <PrimaryButton
            color={PrimaryColors.grey3}
            labelColor={PrimaryColors.grey1}
            label={'Отправить'}
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
});
