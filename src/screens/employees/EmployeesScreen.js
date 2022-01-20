import React, {useState, useEffect} from 'react';
import {SafeAreaView, View, ScrollView, ActivityIndicator} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';

// components
import Header from '../../components/Header';
import EmployeeCard from './components/EmployeeCard';

// services
import {getWorksList} from '../../services/WorksService';
import Placeholder from '../../components/Placeholder';

import {useSelector} from 'react-redux';

import i18n from '../../assets/i18n/i18n';

export const EmployeesScreen = ({navigation}) => {
  const suffix = useSelector(state => {
    const {locale} = state;
    return locale.suffix;
  });
  const titleKey = `title${suffix}`;
  const [works, setWorks] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const result = await getWorksList();
        setWorks(result);
        setLoading(false);
      } catch (e) {
        console.log('getWorksList err:', e);
      }
    });
  }, [navigation]);

  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={i18n.t('Employee history')}
      />
      {loading ? (
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size="large" />
        </View>
      ) : works && works.length > 0 ? (
        <ScrollView>
          {works.map(
            (item, index) =>
              item.isConfirmed && (
                <EmployeeCard
                  itemKey={titleKey}
                  key={index}
                  item={item}
                  onPress={() =>
                    navigation.navigate('EmployeeReview', {id: item.id})
                  }
                />
              ),
          )}
        </ScrollView>
      ) : (
        <Placeholder placeholderText={i18n.t("Employees' list is empty")} />
      )}
    </SafeAreaView>
  );
};
