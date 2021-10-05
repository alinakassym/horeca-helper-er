import React, {useEffect, useState} from 'react';
import {Text, View, ScrollView, Image, StyleSheet, Switch} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {globalStyles} from '../../styles/globalStyles';
import {AuthContext} from '../../store/context';
import {IconComment} from '../../assets/icons/main/IconComment';
import {IconPhone} from '../../assets/icons/main/IconPhone';
import {IconMail} from '../../assets/icons/main/IconMail';
import {IconPencil} from '../../assets/icons/main/IconPencil';
import {IconCrown} from '../../assets/icons/main/IconCrown';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {getUsers} from '../../services/users'

export const ProfileScreen = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers()
      .then(res => {
        console.log('users', res.data.users);
        setUsers(res.data.users);
      })
      .catch(err => {
        console.error('localhost error');
        console.log(err);
      })
  }, []);
  const [user, setUser] = useState({});
  const {signOut} = React.useContext(AuthContext);

  const setUserState = data => {
    setUser(data);
  };

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(result => {
      setUserState(JSON.parse(result));
    });
    return () => {
      setUser({});
    };
  }, []);

  const logOut = () => {
    console.log('AuthContext', AuthContext);
    try {
      GoogleSignin.signOut().then(() => {});
      signOut();
    } catch (error) {
      console.error(error);
    }
  };

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
    <ScrollView style={globalStyles.container}>
      <View style={styles.profilePhoto}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: user.photo}} />
        </View>
      </View>

      {/*About*/}
      <Text style={styles.label}>About</Text>
      <View style={styles.block}>
        <View style={[styles.row, styles.spaceBetween]}>
          <Text style={styles.text}>{user.name} </Text>
          <TouchableOpacity>
            <IconPencil color={'#767676'} size={24} width={1.5} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <IconPhone color={'#767676'} size={24} width={1.5} />
          </View>
          <Text style={styles.text}>+7 (777) 123 34 45</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <IconMail color={'#767676'} size={24} width={1.5} />
          </View>
          <Text style={styles.text}>{user.email}</Text>
        </View>
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
              logOut();
            }}>
            <Text style={styles.text}>Sign Out</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
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
});
