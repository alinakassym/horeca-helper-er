import React from 'react';
import {Dimensions, StyleSheet, Text, View} from 'react-native';

const dimensions = Dimensions.get('screen');

export const EmployeeReview = ({item}) => {
  const {
    avgScore,
    disciplineScore,
    communicationsScore,
    professionalismScore,
    neatnessScore,
    teamScore,
    comment,
  } = item;
  return (
    <View style={[styles.section, styles.col]}>
      <Text style={[styles.text, styles.textBold]}>Review</Text>
      <View style={styles.row}>
        <Text style={[styles.text, styles.textBold]}>Average score: </Text>
        <Text style={styles.text}>{avgScore}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.textBold]}>Discipline: </Text>
        <Text style={styles.text}>{disciplineScore}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.textBold]}>Communications: </Text>
        <Text style={styles.text}>{communicationsScore}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.textBold]}>Professionalism: </Text>
        <Text style={styles.text}>{professionalismScore}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.textBold]}>Neatness: </Text>
        <Text style={styles.text}>{neatnessScore}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.textBold]}>Team: </Text>
        <Text style={styles.text}>{teamScore}</Text>
      </View>
      <View style={styles.row}>
        <Text style={[styles.text, styles.textBold]}>Comment: </Text>
        <Text style={styles.text}>{comment}</Text>
      </View>
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
  text: {
    fontFamily: 'Roboto-Regular',
    marginBottom: 6,
    fontSize: 16,
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
  },
});
