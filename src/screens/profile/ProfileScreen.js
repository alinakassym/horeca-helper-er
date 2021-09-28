import React, {useState} from 'react';
import {Text, View, ScrollView, Image, StyleSheet, Switch} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {useNavigation} from '@react-navigation/native';
import {globalStyles} from '../../styles/globalStyles';
import {AuthContext} from '../../store/context';
import {IconComment} from '../../assets/icons/main/IconComment';
import {IconPhone} from '../../assets/icons/main/IconPhone';
import {IconMail} from '../../assets/icons/main/IconMail';
import {IconPencil} from '../../assets/icons/main/IconPencil';
import {IconCrown} from '../../assets/icons/main/IconCrown';

export const ProfileScreen = () => {
  const navigation = useNavigation();
  const {signOut, toggleTheme} = React.useContext(AuthContext);
  const img =
    'https://images.generated.photos/6nIN56AWpT7A4UafqanZ48-M7f5ZwfvyQJpVR3qEDjE/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDc0MDk5LmpwZw.jpg';
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
      <View style={{paddingTop: 16, alignItems: 'center'}}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: img}} />
        </View>
      </View>

      {/*About*/}
      <Text style={styles.label}>About</Text>
      <View style={styles.block}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.text}>David Jones</Text>
          <TouchableOpacity>
            <IconPencil color={'#767676'} size={24} width={1.5} />
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <View style={styles.iconWrapper}>
            <IconComment color={'#767676'} size={24} width={1.5} />
          </View>
          <Text style={styles.text}>I like coffee & code</Text>
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
          <Text style={styles.text}>davidjones@gmail.com</Text>
        </View>
      </View>

      {/*Rewards*/}
      <Text style={styles.label}>Rewards</Text>
      <View style={styles.block}>
        <View style={styles.row}>
          <View style={styles.iconWrapperStatus}>
            <IconCrown color={'#fff'} size={24} width={1.5} />
          </View>
          <Text style={styles.text}>Gold Member</Text>
        </View>

        <View style={styles.row}>
          <View style={styles.iconWrapperStatus}>
            <Image style={styles.image} source={{uri: coffee}} />
          </View>
          <Text style={styles.text}>Free coffee</Text>
        </View>
      </View>

      {/*Mode*/}
      <Text style={styles.label}>Mode</Text>
      <View style={styles.block}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.text}>Guest</Text>
          <View>
            <Switch
              trackColor={{false: '#AAAAAA', true: '#4136F1'}}
              thumbColor={isGuest ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleGuest}
              value={isGuest}
            />
          </View>
        </View>
      </View>

      {/*Settings*/}
      <Text style={styles.label}>Settings</Text>

      {/*Name*/}
      <View style={styles.block}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.text}>Name is visible</Text>
          <View>
            <Switch
              trackColor={{false: '#AAAAAA', true: '#4136F1'}}
              thumbColor={isName ? '#f4f3f4' : '#f4f3f4'}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleName}
              value={isName}
            />
          </View>
        </View>
      </View>

      {/*Notification*/}
      <View style={styles.block}>
        <View style={[styles.row, {justifyContent: 'space-between'}]}>
          <Text style={styles.text}>Notifications about new deals</Text>
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

      {/*Sign Out*/}
      <Text style={styles.label}>Sign Out</Text>
      <View style={[styles.block, {marginBottom: 48}]}>
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
