import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  Switch,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../styles/colors';

// icons
import {IconExpandRight} from '../../assets/icons/main/IconExpandRight';
import {IconSignOut} from '../../assets/icons/main/IconSignOut';
import {IconFire} from '../../assets/icons/main/IconFire';

// components
import {ProfileHeader} from './components/ProfileHeader';
import {ProfileInfo} from './components/ProfileInfo';
import LightGradientButton from '../../components/buttons/LightGradientButton';

// store
import {AuthContext} from '../../store/context';

// services
import {getCompany} from '../../services/CompaniesService';

export const ProfileScreen = ({navigation}) => {
  const {signOut} = React.useContext(AuthContext);

  const [company, setCompany] = useState({
    title: null,
    description: null,
    photoUrl: null,
  });

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

  // Notification
  const [isNotification, setIsNotification] = useState(false);
  const toggleNotification = () =>
    setIsNotification(previousNotificationState => !previousNotificationState);

  return (
    <SafeAreaView style={globalStyles.container}>
      <ScrollView>
        <ProfileHeader
          title={company.title}
          description={company.description}
          photoUrl={company.photoUrl}
        />

        <ProfileInfo
          category={company.category}
          address={company.address}
          contactInfo={company.contactInfo}
          email={company.email}
        />

        <View style={styles.section}>
          <LightGradientButton
            onPress={() => {
              navigation.navigate('ProfileEdit', {
                value: company,
              });
            }}
            label={'Редактировать профиль'}
          />
        </View>

        <View style={styles.list}>
          <TouchableOpacity style={styles.listItem}>
            <View style={styles.row}>
              <IconFire />
              <Text style={[styles.listItemTitle, styles.marginLeft]}>
                Подписка
              </Text>
            </View>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Jobs')}
            style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>Мои вакансии</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('Employees')}
            style={styles.listItem}>
            <Text style={styles.listItemTitle}>История сотрудников</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Support')}
            style={[styles.listItem, styles.listItemDivider]}>
            <Text style={styles.listItemTitle}>Контактная поддержка</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate('FAQ')}
            style={styles.listItem}>
            <Text style={styles.listItemTitle}>Вопросы и ответы</Text>
            <IconExpandRight size={16} color={PrimaryColors.grey1} />
          </TouchableOpacity>
        </View>

        <View style={styles.list}>
          <TouchableOpacity style={styles.listItem}>
            <Text style={styles.listItemTitle}>Уведомления</Text>
            <Switch
              trackColor={{
                false: PrimaryColors.grey3,
                true: '#5CC689',
              }}
              thumbColor={PrimaryColors.white}
              ios_backgroundColor={PrimaryColors.grey3}
              onValueChange={toggleNotification}
              value={isNotification}
            />
          </TouchableOpacity>
        </View>

        <View style={[styles.list, styles.marginBottom]}>
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
                  styles.marginLeft,
                  {color: StatusesColors.red},
                ]}>
                Выйти
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
  marginLeft: {
    marginLeft: 8,
  },
  marginBottom: {
    marginBottom: padding,
  },
});
