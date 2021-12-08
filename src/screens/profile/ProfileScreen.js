import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  ScrollView,
  Image,
  StyleSheet,
  Switch,
  Pressable,
  Modal,
  SafeAreaView,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from '../../styles/globalStyles';
import {AuthContext} from '../../store/context';
import {IconPhone} from '../../assets/icons/main/IconPhone';
import {IconAddress} from '../../assets/icons/main/IconAddress';
import {IconMail} from '../../assets/icons/main/IconMail';
import {IconComment} from '../../assets/icons/main/IconComment';
import {IconPencil} from '../../assets/icons/main/IconPencil';
import {IconBuilding} from '../../assets/icons/main/IconBuilding';
import {getCompany, updateCompanyPhoto} from '../../services/CompaniesService';

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const ProfileScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  const [company, setCompany] = useState({});

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

  const coffee =
    'https://img.freepik.com/free-vector/coffee-shop-badge-vintage-style_1176-95.jpg?size=626&ext=jpg';

  // Guest
  const [isGuest, setIsGuest] = useState(false);
  const toggleGuest = () =>
    setIsGuest(previousGuestState => !previousGuestState);

  // Name
  const [isName, setIsName] = useState(false);
  const toggleName = () => setIsName(previousNameState => !previousNameState);

  // Notification
  const [isNotification, setIsNotification] = useState(false);
  const toggleNotification = () =>
    setIsNotification(previousNotificationState => !previousNotificationState);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <Modal visible={open} animationType="slide" transparent={true}>
          <Pressable style={styles.overlay} onPress={() => setOpen(false)}>
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
          </Pressable>
        </Modal>
        <View style={styles.profilePhoto}>
          <TouchableOpacity
            onPress={() => {
              setOpen(true);
            }}
            style={styles.imageWrapper}>
            <Image style={styles.image} source={{uri: company.photoUrl}} />
          </TouchableOpacity>
        </View>

        {/*About*/}
        <Text style={styles.label}>About</Text>
        <View style={styles.block}>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.text}>
              {company.title || 'Is not entered'}{' '}
            </Text>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfileEditScreen', {
                  value: company,
                });
              }}>
              <IconPencil color={'#767676'} size={24} width={1.5} />
            </TouchableOpacity>
          </View>

          {company.category && (
            <View style={styles.row}>
              <View style={styles.iconWrapper}>
                <IconBuilding color={'#767676'} size={24} width={1.5} />
              </View>
              <Text style={styles.text}>{company.category.title}</Text>
            </View>
          )}

          {company.address && (
            <View style={styles.row}>
              <View style={styles.iconWrapper}>
                <IconAddress color={'#767676'} size={24} width={1.5} />
              </View>
              <Text style={styles.text}>{company.address}</Text>
            </View>
          )}

          {company.contactInfo && (
            <View style={styles.row}>
              <View style={styles.iconWrapper}>
                <IconPhone color={'#767676'} size={24} width={1.5} />
              </View>
              <Text style={styles.text}>{company.contactInfo}</Text>
            </View>
          )}

          {company.email && (
            <View style={styles.row}>
              <View style={styles.iconWrapper}>
                <IconMail color={'#767676'} size={24} width={1.5} />
              </View>
              <Text style={styles.text}>{company.email}</Text>
            </View>
          )}

          {!!company.description && (
            <View style={styles.row}>
              <View style={styles.iconWrapper}>
                <IconComment color={'#767676'} size={24} width={1.5} />
              </View>
              <View style={{flexBasis: '90%'}}>
                <Text style={styles.text}>{company.description}</Text>
              </View>
            </View>
          )}
        </View>

        {/*Settings*/}
        <Text style={styles.label}>Settings</Text>

        {/*Notification*/}
        <View style={styles.block}>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.text}>Push notifications</Text>
            <View>
              <Switch
                trackColor={{false: '#AAAAAA', true: '#4136F1'}}
                thumbColor={isNotification ? '#f4f3f4' : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleNotification}
                value={isNotification}
              />
            </View>
          </View>
        </View>

        {/*Support*/}
        <Text style={styles.label}>Support</Text>

        {/*Contact*/}
        <View style={styles.block}>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.text}>Contact support</Text>
          </View>
        </View>

        {/*FAQ*/}
        <View style={styles.block}>
          <View style={[styles.row, styles.spaceBetween]}>
            <Text style={styles.text}>FAQ</Text>
          </View>
        </View>

        {/*Sign Out*/}
        <Text style={styles.label}>Sign Out</Text>
        <View style={styles.block}>
          <View style={styles.row}>
            <TouchableOpacity
              onPress={() => {
                signOut();
              }}>
              <Text style={styles.text}>Sign Out</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  label: {
    paddingTop: 24,
    paddingBottom: 8,
    paddingHorizontal: 16,
    color: '#767676',
    fontSize: 14,
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    height: 30,
    width: 30,
  },
  iconWrapperStatus: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    height: 30,
    width: 30,
    borderRadius: 15,
    backgroundColor: '#F1C40F',
    overflow: 'hidden',
  },
  text: {
    fontSize: 14,
    fontWeight: '500',
    lineHeight: 16,
  },
  block: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#F6F6F6',
  },
  row: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'center',
    alignContent: 'stretch',
  },
  paddingTop0: {
    paddingTop: 0,
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  profilePhoto: {
    paddingTop: 16,
    alignItems: 'center',
  },
  imageWrapper: {
    height: 128,
    width: 128,
    borderRadius: 64,
    borderWidth: 1,
    borderColor: '#cccccc',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
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
