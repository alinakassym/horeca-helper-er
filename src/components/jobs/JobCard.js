import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import PlainButton from '../buttons/PlainButton';
import {IconSearch} from '../../assets/icons/tabs/IconSearch';

export const JobCard = ({item, onPress, findRelevant}) => {
  return (
    <View style={styles.card} onPress={onPress}>

      <Pressable style={[styles.row]} onPress={onPress}>
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
      </Pressable>

      <View style={[styles.row, styles.alignCenter]}>
        <View style={styles.iconWrapper}>
          <IconSearch color={'#185AB7'} size={24} width={2} />
        </View>
        <PlainButton label={'Find relevant'} onPress={findRelevant} />
      </View>

    </View>
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
  },
  col: {
    flexDirection: 'column',
  },
  alignCenter: {
    alignItems: 'center',
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
    marginBottom: 16,
    color: '#666666',
  },
  iconWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 8,
    height: 30,
    width: 30,
  },
});
