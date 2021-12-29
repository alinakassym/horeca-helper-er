import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// components
import Header from '../../components/Header';
import Input from '../../components/Input';
import ProfilePhotoPlaceholder from './components/ProfilePhotoPlaceholder';
import ModalSelect from '../../components/selects/ModalSelect';
import MultilineInput from '../../components/MultilineInput';
import GradientButton from '../../components/buttons/GradientButton';
import LinearGradient from 'react-native-linear-gradient';

// services
import {updateCompany} from '../../services/CompaniesService';
import {getCategories} from '../../services/DictionariesService';

export const ProfileEditScreen = ({route, navigation}) => {
  const [isFocused, setIsFocused] = useState(false);
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
    <SafeAreaView style={globalStyles.container}>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={'Профильные данные'}
      />
      <KeyboardAwareScrollView
        style={styles.container}
        enableResetScrollToCoords={false}>
        <ProfilePhotoPlaceholder />

        {/*Название заведения*/}
        <Input
          label={'Название заведения'}
          onChangeText={val => {
            setCompany({...company, title: val});
          }}
          value={company.title}
          onFocus={val => setIsFocused(val)}
          onBlur={val => setIsFocused(val)}
        />

        {/*Категория*/}
        <ModalSelect
          modalTitle={'Выбор категории'}
          label={'Категория'}
          value={company.category}
          items={categories}
          itemText={'title_ru'}
          onSaveSelection={val => setCompany({...company, category: val})}
        />

        {/*Адрес*/}
        <Input
          label={'Адрес'}
          onChangeText={val => {
            setCompany({...company, address: val});
          }}
          value={company.address}
          onFocus={val => setIsFocused(val)}
          onBlur={val => setIsFocused(val)}
        />

        {/*Номер телефона*/}
        <Input
          label={'Номер телефона'}
          onChangeText={val => {
            setCompany({...company, contactInfo: val});
          }}
          value={company.contactInfo}
          onFocus={val => setIsFocused(val)}
          onBlur={val => setIsFocused(val)}
        />

        {/*Электронная почта*/}
        <Input
          label={'Электронная почта'}
          onChangeText={val => {
            setCompany({...company, email: val});
          }}
          value={company.email}
          onFocus={val => setIsFocused(val)}
          onBlur={val => setIsFocused(val)}
        />

        {/*Описание*/}
        <MultilineInput
          label={'Описание'}
          value={company.description}
          onChangeText={val => {
            setCompany({...company, description: val});
          }}
          marginBottom={100}
          onInputFocus={val => {
            setIsFocused(val);
          }}
        />
      </KeyboardAwareScrollView>
      {!isFocused && (
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0.2)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 1)',
          ]}
          style={styles.btn}>
          <GradientButton label={'Save'} onPress={() => save()} />
        </LinearGradient>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    backgroundColor: PrimaryColors.white,
  },
  btn: {
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
});
