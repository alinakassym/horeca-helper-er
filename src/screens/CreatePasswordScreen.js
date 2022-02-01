import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  Alert,
} from 'react-native';

// styles
import {globalStyles} from '../styles/globalStyles';
import {typography} from '../styles/typography';

// components
import Header from '../components/Header';
import GradientButton from '../components/buttons/GradientButton';
import PasswordInput from '../components/inputs/PasswordInput';

import i18n from '../assets/i18n/i18n';

export const CreatePasswordScreen = ({navigation}) => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();

  const onRegister = () => {
    if (password === confirmPassword) {
      navigation.navigate('Registration');
    } else {
      Alert.alert(
        i18n.t('Invalid Password'),
        i18n.t('You entered two different passwords. Please try again'),
        [{text: 'OK'}],
      );
    }
  };

  return (
    <SafeAreaView style={globalStyles.rootStackContainer}>
      <Header goBack onClose={() => navigation.goBack()} />
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
          <View style={globalStyles.section}>
            <Text style={[typography.h1, globalStyles.mt6]}>
              {i18n.t('Registration')}
            </Text>
            <Text style={[typography.text, globalStyles.mt3, globalStyles.mb6]}>
              {i18n.t('Create password for next login')}
            </Text>
            <PasswordInput
              value={password}
              label={i18n.t('New password')}
              onChangeText={val => setPassword(val)}
            />
            <PasswordInput
              value={confirmPassword}
              label={i18n.t('Repeat password')}
              onChangeText={val => setConfirmPassword(val)}
            />
          </View>
        </ScrollView>
        <View style={globalStyles.btnSection}>
          <GradientButton
            onPress={() => onRegister()}
            label={i18n.t('Register')}
          />
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
