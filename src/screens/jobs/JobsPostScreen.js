import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PrimaryInput from '../../components/inputs/PrimaryInput';
import PrimarySelect from '../../components/selects/PrimarySelect';

export const JobsPostScreen = () => {
  const genders = [
    {
      label: 'Female',
      value: 'female'
    }, {
      label: 'Male',
      value: 'male'
    }
  ]
  const [job, onChange] = React.useState({
    title: 'Title',
    location: 'Location',
    ageFrom: 18,
    ageTo: 32,
    gender: 'Male',
    experience: 0,
    scedule: '',
    description: 'Description'
  });
  return (
    <View style={styles.container}>
      <PrimaryInput label={'Job title'} onChangeText={onChange} value={job.title}/>
      <PrimaryInput label={'Job location'} onChangeText={onChange} value={job.location}/>
      <PrimaryInput label={'Description'} onChangeText={onChange} value={job.description}/>
      <PrimarySelect label={'Gender'} items={genders} onChange={onChange} value={job.gender} />
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
