import React from 'react';
import {ScrollView, View, Text, Dimensions, TextInput, StyleSheet} from 'react-native';
import PrimaryButton from '../../components/buttons/PrimaryButton';
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
    <ScrollView style={styles.container}>
      {/*Job Title*/}
      <Text style={globalStyles.label}>Job title</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {onChange({...job, title: val})}}
        value={job.title}/>

      {/*Job location*/}
      <Text style={globalStyles.label}>Job location</Text>
      <TextInput
        style={globalStyles.primaryInput}
        onChangeText={(val) => {onChange({...job, location: val})}}
        value={job.location}/>

      {/*Age*/}
      <View>
        <Text style={globalStyles.label}>Age</Text>
        <Text>From {job.ageFrom} to {job.ageTo}</Text>
        <View style={styles.sliderWrapper}>
          <MultiSlider
            /*customLabel={(e) => {
              return (<View><Text>{e.currentValue}</Text></View>)
            }}*/
            enableLabel={true}
            isMarkersSeparated={true}
            markerStyle={{backgroundColor: '#185AB7'}}
            selectedStyle={{backgroundColor: '#185AB7'}}
            sliderLength={dimensions.width - 80}
            values={values} showSteps={true} showStepLabels={true} min={18} max={70}
            onValuesChangeFinish={(values) => {onChange({...job, ageFrom: values[0], ageTo: values[1]})}}
            valueOne={job.ageFrom}
            valueTwo={job.ageTo}/>
        </View>
      </View>

      {/*Gender*/}
      <ModalSelect label={'Gender'} onChange={onChange} value={job} valueKey={'gender'} items={genders}/>

      {/*Experience*/}
      <ModalSelect label={'Experience'} onChange={onChange} value={job} valueKey={'experience'} items={experienceList}/>

      {/*Schedule*/}
      <ModalSelect label={'Schedule'} onChange={onChange} value={job} valueKey={'scedule'} items={sheduleTypes}/>

      {/*Job location*/}
      <Text style={globalStyles.label}>Description</Text>

      {/*Descriiption*/}
      <TextInput
        multiline={true}
        style={[globalStyles.primaryInput, styles.multiline]}
        onChangeText={(val) => {onChange({...job, description: val})}}
        value={job.description}/>
      <View style={styles.btn}>
        <PrimaryButton label={'Post'}  />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16
  },
  sliderWrapper: {
    paddingTop: 38,
    alignItems: 'center'
  },
  btn: {
    marginBottom: 42
  },
  multiline: {
    height: 100,
    textAlignVertical: 'top'
  }
});

export default JobsPostScreen;
