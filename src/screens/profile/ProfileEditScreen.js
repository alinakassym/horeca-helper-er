import React, {useState, useEffect} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../styles/colors';

// icons
import {IconLocation} from '../../assets/icons/main/IconLocation';

// components
import Header from '../../components/Header';
import Input from '../../components/Input';
import ProfilePhotoPlaceholder from './components/ProfilePhotoPlaceholder';
import ModalSelect from '../../components/selects/ModalSelect';
import MultilineInput from '../../components/MultilineInput';
import GradientButton from '../../components/buttons/GradientButton';
import BottomModal from '../../components/BottomModal';
import ModalButton from '../../components/buttons/ModalButton';
import ProfilePhoto from './components/ProfilePhoto';
import LinearGradient from 'react-native-linear-gradient';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

// services
import {
  updateCompany,
  updateCompanyPhoto,
} from '../../services/CompaniesService';
import {getCategories} from '../../services/DictionariesService';

export const ProfileEditScreen = ({route, navigation}) => {
  const [open, setOpen] = useState(false);
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

  const openCamera = () => {
    let options = {
      storageOption: {
        path: 'images',
        mediaType: 'photo',
      },
    };
    launchCamera(options, response => {
      const {error} = response;
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (error) {
        console.log('ImagePicker Error: ', error);
      } else {
        updateCompanyPhoto(response.assets[0]).then(r => {
          setCompany(r.data);
        });
      }
    });
  };

  const openGallery = () => {
    let options = {
      storageOption: {
        path: 'images',
        skipBackup: true,
      },
    };
    launchImageLibrary(options, response => {
      const {error} = response;
      console.log('Response = ', response);

      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (error) {
        console.log('ImagePicker Error: ', error);
      } else {
        updateCompanyPhoto(response.assets[0]).then(r => {
          setCompany(r.data);
        });
      }
    });
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
      <BottomModal visible={open} onCancel={() => setOpen(false)}>
        <ModalButton
          divide
          label={'Открыть галерею'}
          onPress={() => {
            openGallery();
            setOpen(false);
          }}
        />
        <ModalButton
          divide
          label={'Сделать снимок'}
          onPress={() => {
            openCamera();
            setOpen(false);
          }}
        />
        <ModalButton
          label={'Удалить фото'}
          labelColor={StatusesColors.red}
          onPress={() => {
            setOpen(false);
          }}
        />
      </BottomModal>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={'Профильные данные'}
      />
      <KeyboardAwareScrollView
        style={styles.container}
        enableResetScrollToCoords={false}>
        {company.photoUrl ? (
          <ProfilePhoto
            onPress={() => setOpen(true)}
            photoUrl={company.photoUrl}
          />
        ) : (
          <ProfilePhotoPlaceholder onPress={() => setOpen(true)} />
        )}

        {/*Название заведения*/}
        <Input
          label={'Название заведения'}
          onChangeText={val => {
            setCompany({...company, title: val});
          }}
          onClear={() => setCompany({...company, title: null})}
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
          onClear={() => setCompany({...company, category: null})}
          onSaveSelection={val => setCompany({...company, category: val})}
        />

        {/*Адрес*/}
        <Input
          label={'Адрес'}
          onChangeText={val => {
            setCompany({...company, address: val});
          }}
          onClear={() => setCompany({...company, address: null})}
          value={company.address}
          onFocus={val => setIsFocused(val)}
          onBlur={val => setIsFocused(val)}
          validIcon={<IconLocation size={16} color={PrimaryColors.brand} />}
        />

        {/*Номер телефона*/}
        <Input
          label={'Номер телефона'}
          onChangeText={val => {
            setCompany({...company, contactInfo: val});
          }}
          onClear={() => setCompany({...company, contactInfo: null})}
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
          onClear={() => setCompany({...company, email: null})}
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
          marginBottom={70}
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

  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrap: {
    padding: 16,
    width: '80%',
    borderRadius: 8,
    backgroundColor: PrimaryColors.white,
  },
  item: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
