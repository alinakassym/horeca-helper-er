import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  StyleSheet,
  Switch,
  TouchableOpacity,
  Modal,
  SafeAreaView,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {AuthContext} from '../../store/context';
import {getCompany, updateCompanyPhoto} from '../../services/CompaniesService';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {ProfileHeader} from './components/ProfileHeader';
import {ProfileInfo} from './components/ProfileInfo';
import LightGradientButton from '../../components/buttons/LightGradientButton';
import {IconFire} from '../../assets/icons/main/IconFire';
import {IconExpandRight} from '../../assets/icons/main/IconExpandRight';
import {IconSignOut} from '../../assets/icons/main/IconSignOut';

export const ProfileScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  const [company, setCompany] = useState({
    title: null,
    description: null,
    photoUrl: null,
  });

  const [open, setOpen] = useState(false);

  const openCamera = async () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
    };
    launchCamera(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        updateCompanyPhoto(response.assets[0]).then(r => {
          setCompany(r.data);
        });
      }
    });
  };

  const openGallery = () => {
    let options = {
      storageOption: {
        path: 'images',
        skipBackup: true,
      },
    };
    launchImageLibrary(options, response => {
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        updateCompanyPhoto(response.assets[0]).then(r => {
          setCompany(r.data);
        });
      }
    });
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await getCompany();
        setCompany(res.data);
      } catch (e) {
        console.error('ProfileScreen err: ', e);
      }
    });
  }, [navigation]);

  // Notification
  const [isNotification, setIsNotification] = useState(false);
  const toggleNotification = () =>
    setIsNotification(previousNotificationState => !previousNotificationState);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <Modal visible={open} animationType="slide" transparent={true}>
          <TouchableOpacity
            style={styles.overlay}
            onPress={() => setOpen(false)}>
            <View style={styles.wrap}>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  openGallery();
                  setOpen(false);
                }}>
                <Text style={globalStyles.text}>Open Gallery</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.item}
                onPress={() => {
                  openCamera();
                  setOpen(false);
                }}>
                <Text style={globalStyles.text}>Open Camera</Text>
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        </Modal>

        <ProfileHeader
          title={company.title}
          description={company.description}
          photoUrl={company.photoUrl}
        />

        <ProfileInfo
          category={company.category}
          address={company.address}
          contactInfo={company.contactInfo}
          email={company.email}
        />

        <View style={styles.section}>
          <LightGradientButton
            onPress={() => {
              navigation.navigate('ProfileEditScreen', {
                value: company,
              });
            }}
            label={'Редактировать профиль'}
          />
        </View>

        <View style={styles.list}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.row}>
              <IconFire />
              <Text style={[styles.listItemTitle, styles.marginLeft]}>
                Подписка
              </Text>
            </View>
            <IconExpandRight size={16} color={'#8391A1'} />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Jobs')}
            style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>Мои вакансии</Text>
            <IconExpandRight size={16} color={'#8391A1'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemTitle}>История сотрудников</Text>
            <IconExpandRight size={16} color={'#8391A1'} />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>Контактная поддержка</Text>
            <IconExpandRight size={16} color={'#8391A1'} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemTitle}>Вопросы и ответы</Text>
            <IconExpandRight size={16} color={'#8391A1'} />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemTitle}>Уведомления</Text>
            <Switch
              trackColor={{false: '#AAAAAA', true: '#4136F1'}}
              thumbColor={isNotification ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotification}
              value={isNotification}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.list, styles.marginBottom]}>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
            style={styles.listItem}>
            <View style={styles.row}>
              <IconSignOut color={'#EC4C47'} />
              <Text
                style={[
                  styles.listItemTitle,
                  styles.marginLeft,
                  {color: '#EC4C47'},
                ]}>
                Выйти
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const padding = 20;

const styles = StyleSheet.create({
  section: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    marginTop: 8,
    paddingLeft: padding,
    backgroundColor: '#FFFFFF',
  },
  listItem: {
    paddingRight: padding,
    paddingVertical: padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: '#151F47',
  },
  listItemDivider: {
    borderBottomWidth: 0.7,
    borderBottomColor: '#E2E5E8',
  },
  marginLeft: {
    marginLeft: 8,
  },
  marginBottom: {
    marginBottom: padding,
  },

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrap: {
    padding: 16,
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF',
  },
  item: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
