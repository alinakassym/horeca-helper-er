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
import Input from '../../components/inputs/Input';
import ProfilePhotoPlaceholder from './components/ProfilePhotoPlaceholder';
import ModalSelect from '../../components/selects/ModalSelect';
import MultilineInput from '../../components/inputs/MultilineInput';
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
import {useSelector} from 'react-redux';

import i18n from '../../assets/i18n/i18n';

export const ProfileEditScreen = ({route, navigation}) => {
  const suffix = useSelector(state => {
    const {locale} = state;
    return locale.suffix;
  });
  const [open, setOpen] = useState(false);
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
          label={i18n.t('Open gallery')}
          onPress={() => {
            openGallery();
            setOpen(false);
          }}
        />
        <ModalButton
          divide
          label={i18n.t('Take a photo')}
          onPress={() => {
            openCamera();
            setOpen(false);
          }}
        />
        <ModalButton
          label={i18n.t('Remove photo')}
          labelColor={StatusesColors.red}
          onPress={() => {
            setOpen(false);
          }}
        />
      </BottomModal>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={i18n.t('Profile information')}
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
          <ProfilePhotoPlaceholder editable onPress={() => setOpen(true)} />
        )}

        {/*Название заведения*/}
        <Input
          label={i18n.t('Name')}
          onChangeText={val => {
            setCompany({...company, title: val});
          }}
          onClear={() => setCompany({...company, title: null})}
          value={company.title}
        />

        {/*Категория*/}
        <ModalSelect
          modalTitle={i18n.t('Choose category')}
          label={i18n.t('Category')}
          value={company.category}
          items={categories}
          itemText={`title${suffix}`}
          onClear={() => setCompany({...company, category: null})}
          onSaveSelection={val => setCompany({...company, category: val})}
        />

        {/*Адрес*/}
        <Input
          label={i18n.t('Address')}
          onChangeText={val => {
            setCompany({...company, address: val});
          }}
          onClear={() => setCompany({...company, address: null})}
          value={company.address}
          validIcon={<IconLocation size={16} color={PrimaryColors.brand} />}
        />

        {/*Номер телефона*/}
        <Input
          label={i18n.t('Phone number')}
          onChangeText={val => {
            setCompany({...company, contactInfo: val});
          }}
          onClear={() => setCompany({...company, contactInfo: null})}
          value={company.contactInfo}
        />

        {/*Электронная почта*/}
        <Input
          label={i18n.t('Email')}
          onChangeText={val => {
            setCompany({...company, email: val});
          }}
          onClear={() => setCompany({...company, email: null})}
          value={company.email}
        />

        {/*Описание*/}
        <MultilineInput
          label={i18n.t('Description')}
          value={company.description}
          onChangeText={val => {
            setCompany({...company, description: val});
          }}
          marginBottom={70}
        />
      </KeyboardAwareScrollView>
      <LinearGradient
        colors={[
          'rgba(255, 255, 255, 0.2)',
          'rgba(255, 255, 255, 0.9)',
          'rgba(255, 255, 255, 1)',
        ]}
        style={styles.btn}>
        <GradientButton label={i18n.t('Save')} onPress={() => save()} />
      </LinearGradient>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    flex: 1,
    backgroundColor: PrimaryColors.white,
  },
  btn: {
    padding: 20,
    backgroundColor: PrimaryColors.white,
  },
});
