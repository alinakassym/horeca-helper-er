import React from 'react';
import {
  TextInput,
  View,
  ScrollView,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';
import Users from '../model/users';
import {AuthContext} from '../store/context';
import {globalStyles} from '../styles/globalStyles';
import {IconApple} from '../assets/icons/social/IconApple';
import {IconGoogle} from '../assets/icons/social/IconGoogle';

export const SignInScreen = () => {
  const [data, setData] = React.useState({
    username: '',
    password: '',
    check_textInputChange: false,
    secureTextEntry: true,
    isValidUser: true,
    isValidPassword: true,
  });

  const {signIn} = React.useContext(AuthContext);

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

  const handlePasswordChange = val => {
    if (val.trim().length >= 8) {
      setData({
        ...data,
        password: val,
        isValidPassword: true,
      });
    } else {
      setData({
        ...data,
        password: val,
        isValidPassword: false,
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

  const loginHandle = (userName, password) => {
    const foundUser = Users.filter(item => {
      return userName == item.username && password == item.password;
    });

    if (data.username.length == 0 || data.password.length == 0) {
      Alert.alert(
        'Wrong Input!',
        'Username or password field cannot be empty.',
        [{text: 'Okay'}],
      );
      return;
    }

    if (foundUser.length == 0) {
      Alert.alert('Invalid User!', 'Username or password is incorrect.', [
        {text: 'Okay'},
      ]);
      return;
    }
    signIn(foundUser);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.card}>
        <View>
          <View style={styles.cardBottomInnerBox}>
            <View style={styles.action}>
              <TextInput
                style={styles.inputText}
                placeholder="Email/Phone number"
                placeholderTextColor="#767676"
                autoCapitalize="none"
                onChangeText={val => textInputChange(val)}
                onEndEditing={e => handleValidUser(e.nativeEvent.text)}
              />
            </View>
            <View style={styles.action}>
              <TextInput
                style={styles.inputText}
                placeholder="Password"
                placeholderTextColor="#767676"
                secureTextEntry={data.secureTextEntry ? true : false}
                autoCapitalize="none"
                onChangeText={val => handlePasswordChange(val)}
              />
            </View>
            <View style={styles.action}>
              <TouchableOpacity style={{flex: 1, paddingHorizontal: 4}}>
                <Text style={styles.textBtn}>Forgot your password?</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity
              style={styles.action}
              onPress={() => {
                loginHandle(data.username, data.password);
              }}>
              <View style={styles.button}>
                <Text style={styles.buttonText}>Sign in</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.action}
              onPress={() => {
                loginHandle(data.username, data.password);
              }}>
              <View style={styles.buttonPlain}>
                <Text style={styles.buttonPlainText}>Create Account</Text>
              </View>
            </TouchableOpacity>

            <View style={[styles.cardRow]}>
              <Text style={[globalStyles.text, {marginTop: '16%'}]}>
                Or sign in with
              </Text>
            </View>

            <View
              style={{
                display: 'flex',
                flex: 1,
                marginTop: 20,
                marginBottom: 40,
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <View>
                <TouchableOpacity style={[styles.socialIcon]}>
                  <IconApple />
                </TouchableOpacity>
              </View>
              <View>
                <TouchableOpacity style={styles.socialIcon}>
                  <IconGoogle />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    flex: 1,
    backgroundColor: '#FBFBFB',
  },
  socialIcon: {
    marginHorizontal: 40,
  },
  card: {
    display: 'flex',
    paddingTop: '30%',
    paddingHorizontal: 40,
  },
  cardBottomInnerBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputText: {
    flex: 1,
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontFamily: 'Montserrat-Regular',
    fontSize: 14,
    backgroundColor: '#F3F3F3',
  },
  button: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 14,
    backgroundColor: '#185AB7',
  },
  buttonPlain: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 56,
    borderRadius: 16,
    paddingHorizontal: 20,
    fontSize: 14,
  },
  buttonText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#FFFFFF',
    textTransform: 'uppercase',
  },
  buttonPlainText: {
    fontFamily: 'Montserrat-SemiBold',
    color: '#185AB7',
    textTransform: 'uppercase',
  },
  textBtn: {
    fontFamily: 'Montserrat-SemiBold',
    textAlign: 'right',
    color: '#185AB7',
  },
  shadow: {
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  cardRow: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
  },
});
