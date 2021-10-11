import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import PrimaryButton from '../../components/buttons/PrimaryButton';

export const JobsScreen = ({navigation}) => {
  return (
    <View style={globalStyles.container}>
      <View style={styles.topSection}>
        <Text style={styles.title}>Алматы</Text>
        <Text style={styles.title}>123</Text>
      </View>
      <View style={styles.section}>
        <PrimaryButton onPress={() => navigation.navigate('JobsPostScreen')} label={'Post a job'} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topSection: {
    marginTop: 16,
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#CCCCCC'
  },
  title: {
    fontFamily: 'Roboto-Medium',
    fontSize: 18
  },
  section: {
    padding: 14,
  }
});
