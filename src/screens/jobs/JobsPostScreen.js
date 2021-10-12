import React from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import PrimaryInput from '../../components/inputs/PrimaryInput';
import {ModalSelect} from '../../components/selects/ModalSelect';

export const JobsPostScreen = () => {
  const genders = ['Female', 'Male'];
  const sheduleTypes = ['Full-time', 'Part-time', 'Contract', 'Temporary', 'Volunteer', 'Internsheep'];
  const experienceList = ['Less than six months', 'Six month', 'less than one year', '1 year', 'More than 1 year', '2 years', 'More than 2 years', 'More than 3 years'];
  const [job, onChange] = React.useState({
    title: 'Title',
    location: 'Location',
    ageFrom: 18,
    ageTo: 32,
    gender: 'Male',
    experience: 'Six month',
    scedule: 'Full-time',
    description: 'Description'
  });
  return (
    <View style={styles.container}>
      <PrimaryInput label={'Job title'} onChangeText={onChange} value={job.title}/>
      <PrimaryInput label={'Job location'} onChangeText={onChange} value={job.location}/>
      <ModalSelect label={'Gender'} onChange={onChange} value={job} valueKey={'gender'} items={genders}/>
      <ModalSelect label={'Experience'} onChange={onChange} value={job} valueKey={'experience'} items={experienceList}/>

      <ModalSelect label={'Schedule'} onChange={onChange} value={job} valueKey={'scedule'} items={sheduleTypes}/>
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
