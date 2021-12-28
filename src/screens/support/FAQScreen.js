import React from 'react';
import {SafeAreaView} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import Header from '../../components/Header';

export const FAQScreen = ({navigation}) => {
  return (
    <SafeAreaView style={globalStyles.container}>
      <Header
        goBack
        onClose={() => navigation.goBack()}
        title={'Вопросы и ответы'}
      />
    </SafeAreaView>
  );
};
