import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';

export const JobCard = ({item, onPress}) => {
  return (
    <Pressable style={styles.card} onPress={onPress}>
      <View style={styles.row}>
        <View style={styles.col}>
          <Text style={styles.positionTitle}>
            {item.position.title} {item.schedule && `(${item.schedule.title})`}
          </Text>
          {item.salaryMin && item.salaryMax ? (
            <Text style={styles.salary}>
              {item.salaryMin} - {item.salaryMax} KZT
            </Text>
          ) : item.salaryMin ? (
            <Text style={styles.salary}>From {item.salaryMin} KZT</Text>
          ) : (
            <Text style={styles.salary}>To {item.salaryMax} KZT</Text>
          )}
          {item.city && <Text style={styles.cityTitle}>{item.city.title}</Text>}

          <Text style={styles.description}>{item.description}</Text>
          <Text style={styles.createdAt}>{item.createdAt}</Text>
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  card: {
    marginBottom: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 8,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'column',
  },
  positionTitle: {
    marginBottom: 8,
    fontFamily: 'Roboto-Bold',
    fontSize: 18,
    color: '#000000',
  },
  salary: {
    marginBottom: 8,
    color: '#666666',
  },
  cityTitle: {
    marginBottom: 2,
    color: '#000000',
  },
  description: {
    marginBottom: 8,
    color: '#666666',
  },
  createdAt: {
    color: '#666666',
  },
});
