import React from 'react';
import {Pressable, Text, StyleSheet} from 'react-native';

export const JobCard = ({item}) => {
  return (
    <Pressable style={styles.card}>
      <Text style={styles.positionTitle}>{item.position.title}</Text>
      {(item.salaryMin && item.salaryMax) ? <Text>{item.salaryMin} - {item.salaryMax}</Text> :
        <Text>100 - 300 $</Text>}
      {item.city && <Text>{item.city.title}</Text>}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 8,
    borderWidth: 1,
    borderColor: '#e1e1e1',
    borderRadius: 4
  },
  positionTitle: {
    marginBottom: 8,
    fontFamily: 'Roboto-Bold',
    fontSize: 18
  }
})
