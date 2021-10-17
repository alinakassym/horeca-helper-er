import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, ScrollView, Image, StyleSheet, Switch} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {AuthContext} from '../../store/context';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {getCompany, updateCompany} from '../../services/CompaniesService';

export const ProfileEditScreen = ({route, navigation}) => {
  const { profileValue } = route.params.value;

  console.log('ProfileEdit Screen params', route.params)
  const {signOut} = React.useContext(AuthContext);

  const [company, setCompany] = useState(route.params.value);

  const save = () => {
    updateCompany(company)
      .then(() => {
        navigation.navigate("Profile", {
          value: company,
        });
      })
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profilePhoto}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: company.photo}} />
        </View>
      </View>

      <Text style={globalStyles.label}>Name</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setCompany({...company, title: val})}}
        value={company.title}/>

      <Text style={globalStyles.label}>Address</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setCompany({...company, address: val})}}
        value={company.address}/>

      <Text style={globalStyles.label}>Phone</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setCompany({...company, phone: val})}}
        value={company.phone}/>

      <Text style={globalStyles.label}>E-mail</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {setCompany({...company, email: val})}}
        value={company.email}/>


      <PrimaryButton label={'Save'} onPress={() => save()}/>
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

