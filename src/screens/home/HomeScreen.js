import React from 'react';
import {View, Text} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';

export const HomeScreen = () => {
  return (
    <View style={globalStyles.container}>
      <Text style={globalStyles.title}>QR Code</Text>
    </View>
  );
};
