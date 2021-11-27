import React, {useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';

const dimensions = Dimensions.get('screen');

export const EmployeeReviewForm = ({onConfirm}) => {
  const item = {
    avgScore: null,
    disciplineScore: null,
    communicationsScore: null,
    professionalismScore: null,
    neatnessScore: null,
    teamScore: null,
    comment: null,
  };
  const [review, setReview] = useState(item);

  const getNumber = val => {
    return val.length > 0 ? Number(val) : null;
  };

  const getString = val => {
    return val ? val.toString() : null;
  };

  return (
    <View style={[styles.section, styles.col]}>
      {/*Discipline*/}
      <Text style={globalStyles.label}>Discipline</Text>
      <TextInput
        keyboardType={'number-pad'}
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setReview({...review, disciplineScore: getNumber(val)});
        }}
        value={getString(review.disciplineScore)}
      />

      {/*Professionalism*/}
      <Text style={globalStyles.label}>Professionalism:</Text>
      <TextInput
        keyboardType={'number-pad'}
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setReview({...review, professionalismScore: getNumber(val)});
        }}
        value={getString(review.professionalismScore)}
      />

      {/*Neatness*/}
      <Text style={globalStyles.label}>Neatness:</Text>
      <TextInput
        keyboardType={'number-pad'}
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setReview({...review, neatnessScore: getNumber(val)});
        }}
        value={getString(review.neatnessScore)}
      />

      {/*Team*/}
      <Text style={globalStyles.label}>Team:</Text>
      <TextInput
        keyboardType={'number-pad'}
        style={globalStyles.primaryInput}
        onChangeText={val => {
          setReview({...review, teamScore: getNumber(val)});
        }}
        value={getString(review.teamScore)}
      />

      {/*Comment*/}
      <Text style={globalStyles.label}>Comment: </Text>
      <TextInput
        multiline={true}
        style={[globalStyles.primaryInput, styles.multiline]}
        onChangeText={val => {
          setReview({...review, comment: val});
        }}
        value={review.comment}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingTop: 16,
    paddingHorizontal: 16,
    width: dimensions.width,
  },
  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },

  multiline: {
    height: 100,
    textAlignVertical: 'top',
  },
});
