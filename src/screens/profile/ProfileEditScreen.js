import React, {useState, useEffect} from 'react';
import {Text, View, TextInput, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {globalStyles} from '../../styles/globalStyles';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {updateCompany} from '../../services/CompaniesService';
import {getCategories} from '../../services/DictionariesService';
import {ModalSelect} from '../../components/selects/ModalSelect';

export const ProfileEditScreen = ({route, navigation}) => {
  // console.log('ProfileEdit Screen params', route.params);

  const [company, setCompany] = useState(route.params.value);
  const [categories, setCategories] = useState([]);

  const save = async () => {
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
    try {
      await updateCompany(data);
      navigation.navigate('Profile', {
        value: data,
      });
    } catch (e) {
      console.log('updateCompany err: ', e);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await getCategories();
        setCategories(res);
      } catch (e) {
        console.log('getCategories err: ', e);
      }
    });
  }, [navigation]);

  return (
    <KeyboardAwareScrollView
      style={styles.container}
      enableResetScrollToCoords={false}>
      <Text style={globalStyles.label}>Name</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setCompany({...company, title: val});
        }}
        value={company.title}
      />

      <ModalSelect
        label={'Category'}
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
        multiline={true}
        style={[globalStyles.primaryInput, globalStyles.multiline]}
        onChangeText={val => {
          setCompany({...company, description: val});
        }}
        value={company.description}
      />

      <View style={styles.btn}>
        <PrimaryButton label={'Save'} onPress={() => save()} />
      </View>
    </KeyboardAwareScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  btn: {
    marginBottom: 42,
  },
});
