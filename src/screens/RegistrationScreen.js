import React from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

// styles
import {globalStyles} from '../styles/globalStyles';
import {typography} from '../styles/typography';

// components
import Header from '../components/Header';
import Input from '../components/inputs/Input';
import GradientButton from '../components/buttons/GradientButton';

// store
import Users from '../model/users';

// locale
import i18n from '../assets/i18n/i18n';

export const RegistrationScreen = ({navigation}) => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
    userGoogleInfo: {},
    loaded: false,
  });

  const textInputChange = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        username: val,
        check_textInputChange: true,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        username: val,
        check_textInputChange: false,
        isValidUser: false,
      });
    }
  };

  const handleValidUser = val => {
    if (val.trim().length >= 4) {
      setData({
        ...data,
        isValidUser: true,
      });
    } else {
      setData({
        ...data,
        isValidUser: false,
      });
    }
  };

  const loginHandle = async phoneEmail => {
    try {
      /*const result = await getCompanies();
      const foundUser = result.data.filter(item => {
        return phoneEmail === item.email || phoneEmail === item.phone;
      });*/

      const foundUser = Users.filter(item => {
        return phoneEmail === item.username;
      });

      if (foundUser.length === 0) {
        navigation.navigate('ConfirmationCode', {phoneEmail: phoneEmail});
      } else {
        navigation.navigate('Password', {phoneEmail: phoneEmail});
      }
    } catch (e) {
      console.log('loginHandle err: ', e);
    }
  };

  return (
    <SafeAreaView style={globalStyles.rootStackContainer}>
      <Header goBack onClose={() => navigation.goBack()} />
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
          <View style={globalStyles.section}>
            <Text style={[typography.h1, globalStyles.mt6]}>
              {i18n.t('Login - Registration')}
            </Text>
            <Text style={[typography.text, globalStyles.mt3, globalStyles.mb6]}>
              {i18n.t('Enter your phone number or email')}
            </Text>
            <Input
              value={data.username}
              label={i18n.t('Enter phone or email')}
              onChangeText={val => textInputChange(val)}
              onClear={() => textInputChange('')}
              onEndEditing={e => handleValidUser(e.nativeEvent.text)}
            />
          </View>
        </ScrollView>
        <View style={globalStyles.btnSection}>
          <GradientButton
            label={i18n.t('Continue')}
            onPress={() => {
              loginHandle(data.username).then();
            }}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
