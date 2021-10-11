import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PrimaryInput from '../../components/inputs/PrimaryInput'

export const JobsPostScreen = () => {
  const [job, onChange] = React.useState({
    title: '',
    location: '',
    ageFrom: 18,
    ageTo: 32,
    gender: '',
    experience: 0,
    scedule: '',
    description: ''
  });
  return (
    <View style={styles.container}>
      <PrimaryInput label={'Job title'} onChangeText={onChange} value={job.title}/>
      <PrimaryInput label={'Job location'} onChangeText={onChange} value={job.location}/>
      <PrimaryInput label={'Description'} onChangeText={onChange} value={job.description}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  label: {
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  input: {
    fontFamily: 'Roboto-Regular',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC'
  }
});

export default JobsPostScreen;
