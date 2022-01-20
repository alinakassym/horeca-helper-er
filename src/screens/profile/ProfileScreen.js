import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Share,
  StyleSheet,
  Platform,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../styles/colors';

// icons
import {IconExpandRight} from '../../assets/icons/main/IconExpandRight';
import {IconSignOut} from '../../assets/icons/main/IconSignOut';
import {IconFire} from '../../assets/icons/main/IconFire';
import {IconShare} from '../../assets/icons/main/IconShare';

// components
import ProfileHeader from './components/ProfileHeader';
import ProfileInfo from './components/ProfileInfo';
import LightGradientButton from '../../components/buttons/LightGradientButton';
import OutlineButton from '../../components/buttons/OutlineButton';

// store
import {AuthContext} from '../../store/context';

// services
import {getCompany} from '../../services/CompaniesService';

import i18n from '../../assets/i18n/i18n';
import {useSelector} from 'react-redux';

export const ProfileScreen = ({navigation}) => {
  const suffix = useSelector(state => {
    const {locale} = state;
    return locale.suffix;
  });

  const {signOut} = React.useContext(AuthContext);

  const [company, setCompany] = useState({
    title: null,
    description: null,
    photoUrl: null,
  });

  const onShare = async () => {
    try {
      await Share.share({
        message:
          Platform.OS === 'android'
            ? 'https://play.google.com/store/apps'
            : 'https://www.appstore.com',
      });
    } catch (error) {
      console.log('onShare err: ', error.message);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await getCompany();
        setCompany(res.data);
      } catch (e) {
        console.error('ProfileScreen err: ', e);
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <ProfileHeader
          title={company.title}
          description={company.description}
          photoUrl={company.photoUrl}
          verificationStatus={company.verificationStatus}
        />

        <ProfileInfo
          category={company.category}
          address={company.address}
          contactInfo={company.contactInfo}
          email={company.email}
          titleKey={`title${suffix}`}
        />

        <View style={styles.section}>
          <LightGradientButton
            onPress={() => {
              navigation.navigate('ProfileEdit', {
                value: company,
              });
            }}
            label={i18n.t('edit profile')}
          />
        </View>

        <View style={styles.list}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.row}>
              <IconFire />
              <Text style={[styles.listItemTitle, globalStyles.ml3]}>
                {i18n.t('subscription')}
              </Text>
            </View>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Jobs')}
            style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>{i18n.t('job vacancies')}</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Employees')}
            style={styles.listItem}>
            <Text style={styles.listItemTitle}>
              {i18n.t('employee history')}
            </Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Support')}
            style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>
              {i18n.t('contact support')}
            </Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FAQ')}
            style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>{i18n.t('faq')}</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings')}
            style={styles.listItem}>
            <Text style={styles.listItemTitle}>{i18n.t('settings')}</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
        </View>

        <View
          style={[
            globalStyles.alignCenter,
            globalStyles.mt6,
            globalStyles.mb4,
          ]}>
          <OutlineButton
            onPress={() => onShare()}
            style={styles.shareButton}
            label={i18n.t('share app')}>
            <IconShare
              style={globalStyles.mr3}
              color={PrimaryColors.brand}
              size={16}
            />
          </OutlineButton>
        </View>

        <View style={[styles.list, globalStyles.mb3]}>
          <TouchableOpacity
            onPress={() => {
              signOut();
            }}
            style={styles.listItem}>
            <View style={styles.row}>
              <IconSignOut color={StatusesColors.red} />
              <Text
                style={[
                  styles.listItemTitle,
                  globalStyles.ml3,
                  {color: StatusesColors.red},
                ]}>
                {i18n.t('quit')}
              </Text>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const padding = 20;

const styles = StyleSheet.create({
  section: {
    paddingBottom: 20,
    paddingHorizontal: 20,
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  list: {
    marginTop: 8,
    paddingLeft: padding,
    backgroundColor: PrimaryColors.white,
  },
  listItem: {
    paddingRight: padding,
    paddingVertical: padding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  listItemTitle: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  listItemDivider: {
    borderBottomWidth: 0.7,
    borderBottomColor: PrimaryColors.grey3,
  },
  shareButton: {
    paddingVertical: 12,
    paddingHorizontal: 12,
    backgroundColor: PrimaryColors.white,
  },
});
