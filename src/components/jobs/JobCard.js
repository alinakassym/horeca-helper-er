import React from 'react';
import {Text, View, Pressable, StyleSheet} from 'react-native';
import PlainButton from '../buttons/PlainButton';
import {IconSearch} from '../../assets/icons/tabs/IconSearch';
import moment from 'moment';

export const JobCard = ({item, onPress, findRelevant}) => {
  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };
  return (
    <View style={styles.card} onPress={onPress}>
      <Pressable style={[styles.row]} onPress={onPress}>
        <View style={styles.col}>
          <Text style={styles.positionTitle}>
            {item.position.title} {item.schedule && `(${item.schedule.title})`}
          </Text>
          {item.salaryMin && item.salaryMax ? (
            <Text style={styles.salary}>
              {numberWithSpaces(item.salaryMin)} -{' '}
              {numberWithSpaces(item.salaryMax)} KZT
            </Text>
          ) : item.salaryMin ? (
            <Text style={styles.salary}>
              From {numberWithSpaces(item.salaryMin)} KZT
            </Text>
          ) : item.salaryMax ? (
            <Text style={styles.salary}>
              To {numberWithSpaces(item.salaryMax)} KZT
            </Text>
          ) : (
            false
          )}
          {item.city && <Text style={styles.cityTitle}>{item.city.title}</Text>}

          {!!item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
          <Text style={styles.createdAt}>
            Created at: {moment(item.createdAt).format('DD MMM YYYY')}
          </Text>
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
    marginTop: 4,
    marginBottom: 8,
    color: '#666666',
  },
  createdAt: {
    marginTop: 4,
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
