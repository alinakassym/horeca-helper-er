import React from 'react';
import {View, Text, Dimensions, TextInput, StyleSheet} from 'react-native';
import PrimaryInput from '../../components/inputs/PrimaryInput';
import {ModalSelect} from '../../components/selects/ModalSelect';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {globalStyles} from '../../styles/globalStyles';

const dimensions = Dimensions.get('screen');

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
  const values = [18, 30]
  return (
    <View style={styles.container}>
      <PrimaryInput label={'Job title'} onChangeText={onChange} value={job.title}/>
      <PrimaryInput label={'Job location'} onChangeText={onChange} value={job.location}/>
      <View>
        <Text style={globalStyles.label}>Age</Text>
        <View style={{paddingHorizontal: 6}}>
          <MultiSlider
            sliderLength={dimensions.width - 42}
            values={values} showSteps={true} showStepLabels={true} min={18} max={70}
            onValuesChangeFinish={(values) => {onChange({...job, ageFrom: values[0], ageTo: values[1]})}}
            valueOne={job.ageFrom}
            valueTwo={job.ageTo}/>
        </View>
      </View>
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
});

export default JobsPostScreen;
