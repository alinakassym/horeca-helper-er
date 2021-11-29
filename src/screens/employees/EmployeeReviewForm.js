import React, {useEffect, useState} from 'react';
import {Dimensions, StyleSheet, Text, TextInput, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import {sendReview} from '../../services/WorksService';

const dimensions = Dimensions.get('screen');

export const EmployeeReviewForm = ({workId, navigation}) => {
  const item = {
    disciplineScore: null,
    communicationsScore: null,
    professionalismScore: null,
    neatnessScore: null,
    teamScore: null,
    comment: null,
  };
  const [review, setReview] = useState(item);

  const [sent, setSent] = useState(false);

  const sendWorkReview = async () => {
    try {
      await sendReview(workId, review);
      navigation.navigate('Employees');
    } catch (e) {
      console.log('sendReview err: ', e);
    }
  };

  const getNumber = val => {
    return val.length > 0 ? Number(val) : null;
  };

  const getString = val => {
    return val ? val.toString() : null;
  };

  if (!sent) {
    return (
      <View style={[styles.section, styles.col]}>
        <PrimaryButton
          onPress={() => setSent(true)}
          label={'Rate the employee'}
        />
      </View>
    );
  }

  return (
    <React.Fragment>
      <View style={[styles.section, styles.col]}>
        {/*Discipline*/}
        <Text style={globalStyles.label}>Discipline:</Text>
        <TextInput
          keyboardType={'number-pad'}
          style={globalStyles.primaryInput}
          onChangeText={val => {
            setReview({...review, disciplineScore: getNumber(val)});
          }}
          value={getString(review.disciplineScore)}
        />

        {/*Communications*/}
        <Text style={globalStyles.label}>Communications:</Text>
        <TextInput
          keyboardType={'number-pad'}
          style={globalStyles.primaryInput}
          onChangeText={val => {
            setReview({...review, communicationsScore: getNumber(val)});
          }}
          value={getString(review.communicationsScore)}
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
      <View style={styles.bottomSection}>
        <PrimaryButton label={'Send'} onPress={sendWorkReview} />
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  section: {
    paddingTop: 16,
    paddingHorizontal: 16,
    width: dimensions.width,
  },
  bottomSection: {
    paddingBottom: 16,
    paddingHorizontal: 16,
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
