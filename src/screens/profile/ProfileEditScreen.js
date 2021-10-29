import React, {useState, useEffect} from 'react';
import {
  Text,
  View,
  TextInput,
  ScrollView,
  Image,
  StyleSheet,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {updateCompany} from '../../services/CompaniesService';
import {getCategories} from '../../services/DictionariesService';
import {ModalSelect} from '../../components/selects/ModalSelect';

export const ProfileEditScreen = ({route, navigation}) => {
  console.log('ProfileEdit Screen params', route.params);

  const [company, setCompany] = useState(route.params.value);
  const [categories, setCategories] = useState([]);

  const save = async () => {
    const hhToken = await AsyncStorage.getItem('hhToken');
    updateCompany(company, hhToken).then(() => {
      const data = {
        title: company.title,
        description: company.description,
        email: company.email,
        photoFilename: company.photoFilename,
        googleId: company.googleId,
        contactInfo: company.contactInfo,
        address: company.address,
        categoryId: company.category ? company.category.id : null,
      };
      navigation.navigate('Profile', {
        value: data,
      });
    });
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      const hhToken = await AsyncStorage.getItem('hhToken');
      getCategories(hhToken)
        .then(res => {
          console.log('getCategories result:', res);
          setCategories(res);
        })
        .catch(err => {
          console.error('getCategories error');
          console.log(err);
        });
    });
  }, [navigation]);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profilePhoto}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: company.photoUrl}} />
        </View>
      </View>

      <Text style={globalStyles.label}>Name</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setCompany({...company, title: val});
        }}
        value={company.title}
      />

      <ModalSelect
        label={'Gender'}
        onChangeText={val => {
          setCompany({...company, category: val});
        }}
        value={company}
        valueKey={'category'}
        items={categories}
        itemTitle={'title'}
      />

      <Text style={globalStyles.label}>Address</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setCompany({...company, address: val});
        }}
        value={company.address}
      />

      <Text style={globalStyles.label}>Contact info</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setCompany({...company, contactInfo: val});
        }}
        value={company.contactInfo}
      />

      <Text style={globalStyles.label}>E-mail</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setCompany({...company, email: val});
        }}
        value={company.email}
      />

      <Text style={globalStyles.label}>Description</Text>
      <TextInput
        style={[globalStyles.primaryInput, globalStyles.multiline]}
        onChangeText={val => {
          setCompany({...company, description: val});
        }}
        value={company.description}
      />

      <View style={styles.btn}>
        <PrimaryButton label={'Save'} onPress={() => save()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  btn: {
    marginBottom: 42,
  },
});
