import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, ScrollView, Image, StyleSheet, Switch} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {AuthContext} from '../../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/buttons/PrimaryButton'

export const ProfileEditScreen = () => {
  const [user, setUser] = useState({});
  const {signOut} = React.useContext(AuthContext);

  useEffect(() => {
    AsyncStorage.getItem('userInfo').then(result => {
      const userData = JSON.parse(result);
      console.log('userData', userData);
      setUser(userData);
    });
    return () => {
      setUser({});
    };
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profilePhoto}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: user.photo}} />
        </View>
      </View>

      <Text style={globalStyles.label}>Name</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setUser({...user, name: val})}}
        value={user.name}/>

      <Text style={globalStyles.label}>Phone</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setUser({...user, phone: val})}}
        value={user.phone}/>

      <Text style={globalStyles.label}>E-mail</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setUser({...user, email: val})}}
        value={user.email}/>

      <PrimaryButton label={'Save'}/>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  profilePhoto: {
    marginBottom: 24,
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

