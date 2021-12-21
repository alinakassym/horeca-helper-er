import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Text,
  View,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import moment from 'moment';
import {getEmployeeById} from '../../services/EmployeesService';
import {BottomModal} from './components/BottomModal';
import {ModalSelect} from '../../components/selects/ModalSelect';
import {getJobs, postJobInvite} from '../../services/JobsService';
import {getChatsLookup} from '../../services/ChatService';
import {globalStyles} from '../../styles/globalStyles';
import Header from '../../components/Header';
import UserCard from './components/UserCard';
import Tabs from '../../components/Tabs';
import EmployeeInfo from './components/EmployeeInfo';
import {PrimaryColors, StatusesColors} from '../../styles/colors';
import {WorkList} from './components/WorkList';
import LinearGradient from 'react-native-linear-gradient';
import GradientButton from '../../components/buttons/GradientButton';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {IconPhone} from '../../assets/icons/main/IconPhone';
import {IconMessages} from '../../assets/icons/tabs/IconMessages';

const dimensions = Dimensions.get('screen');

export const EmployeeScreen = ({route, navigation}) => {
  const employeeId = route.params.id;

  const [activeTab, setActiveTab] = useState('personalInfo');

  const [chatId, setChatId] = useState(null);
  const [jobs, setJobs] = useState([]);
  const [vacancy, setVacancy] = useState({
    id: null,
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
            ...el,
            title: `${el.position.title} (${el.schedule.title}, ${el.city.title})`,
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
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header goBack navigation={navigation} title={'Подробная информация'} />
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
        <ScrollView style={{flex: 1}}>
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
                <Text style={styles.text}>
                  {item.description || ''}
                  Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                  Assumenda ex id nemo repellendus rerum. Incidunt quam, ullam.
                  Aliquid asperiores, beatae, consectetur consequuntur deleniti
                  deserunt dicta distinctio enim error eveniet laboriosam magni
                  modi non similique, tempore. A ad alias assumenda atque autem
                  corporis, dolorem doloribus earum esse, et exercitationem
                  fugiat maxime odit perferendis quae, vero voluptates
                  voluptatibus. Accusamus aut delectus illo, laboriosam
                  laudantium maiores recusandae repellendus sit? Maiores maxime
                  odit officia perferendis provident quia quibusdam? Amet
                  aspernatur consequatur culpa dolorum, est impedit ipsum iste
                  labore maiores maxime molestiae necessitatibus neque, nesciunt
                  nisi pariatur quas quasi quibusdam reiciendis sequi unde.
                  Iusto repudiandae tenetur ullam! Aliquam, aliquid enim error
                  ex expedita explicabo fuga laudantium natus nobis, odio omnis
                  perspiciatis placeat praesentium quos tempore.
                </Text>
              </View>
            </>
          )}
          {activeTab === 'experience' && <WorkList items={item.works} />}
        </ScrollView>
      </Tabs>

      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.2)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 1)',
        ]}
        style={styles.btnSection}>
        {!!chatId && (
          <GradientButton
            style={{marginBottom: 8}}
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
                size={12.67}
                color={PrimaryColors.white}
                fillColor={PrimaryColors.white}
              />
            </PrimaryButton>
          </View>
          <View style={styles.rightCol}>
            {chatId ? (
              <PrimaryButton
                label={'Перейти в чат'}
                color={PrimaryColors.element}
                onPress={() =>
                  navigation.navigate('MessagesChatScreen', {
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
        visible={visible}
        onClose={() => setVisible(false)}
        text={inviteMessage}
        onSend={() => sendInvite()}
        isValid={isValid()}
        onChangeText={val => setInviteMessage(val)}>
        <ModalSelect
          label={'Vacancy'}
          value={vacancy}
          valueKey={'id'}
          items={jobs}
          itemTitle={'title'}
          onSelect={val => setVacancy(val ? val : {id: null})}
        />
      </BottomModal>
    </SafeAreaView>
  );
};

const width = dimensions.width;

const styles = StyleSheet.create({
  section: {
    marginTop: 8,
    marginBottom: 88,
    padding: 20,
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
