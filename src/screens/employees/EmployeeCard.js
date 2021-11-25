import React from 'react';
import {Image, Text, View, Pressable, StyleSheet} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import moment from 'moment';

export const EmployeeCard = ({item, onPress}) => {
  const getAge = birthDate => {
    return moment().diff(birthDate, 'years', false);
  };
  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  return (
    <View>
      <Text>{JSON.stringify(item)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({

});
