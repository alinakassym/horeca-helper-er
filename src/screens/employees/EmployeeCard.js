import React from 'react';
import {
  Image,
  Text,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import {IconStar} from '../../assets/icons/main/IconStar';
import {IconChecked} from '../../assets/icons/main/IconChecked';

const dimensions = Dimensions.get('screen');

export const EmployeeCard = ({item, onPress}) => {
  const getAge = birthDate => {
    return moment().diff(birthDate, 'years', false);
  };
  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  const getFormattedDate = date => {
    return moment(date).format('MMM YYYY');
  };

  return (
    <View style={styles.cardWrapper}>
      <Pressable onPress={onPress} style={styles.card}>
        <View style={styles.leftCol}>
          <View style={styles.row}>
            {item.isConfirmed && (
              <View style={styles.confirmedIcon}>
                <IconChecked color={'#185AB7'} size={14} />
              </View>
            )}
            <Text style={styles.employeeName}>
              {item.employee.firstName} {item.employee.lastName}
            </Text>
          </View>
          <Text style={styles.text}>
            {item.employee.position.title} &bull;{' '}
            {item.employee.city.title || ''}
          </Text>

          <Text style={styles.dates}>
            {getFormattedDate(item.startDate)} -{' '}
            {getFormattedDate(item.endDate)}
          </Text>
        </View>
        <View style={styles.rightCol}>
          <View style={styles.imageWrapper}>
            <Image style={styles.img} source={{uri: item.employee.photoUrl}} />
          </View>
          {item.employeeReview && (
            <View style={styles.row}>
              <View style={styles.scoreIcon}>
                <IconStar color={'#F1C40F'} fillColor={'#F1C40F'} size={14} />
              </View>
              <Text>{JSON.stringify(item.employeeReview.avgScore)} </Text>
            </View>
          )}
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    width: dimensions.width,
  },
  card: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    flexDirection: 'row',
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifyCenter: {
    justifyContent: 'center',
  },
  leftCol: {
    // dimensionWidth ~= rightColWidth(40) - cardWrapperHorizPadding(32) - cardHorizPadding(24)
    width: dimensions.width - 120,
  },
  rightCol: {
    width: 60,
    alignItems: 'center',
  },

  imageWrapper: {
    marginBottom: 4,
    height: 60,
    width: 60,
    borderRadius: 30,
    backgroundColor: '#767676',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },

  confirmedIcon: {
    marginRight: 4,
    marginBottom: 2,
  },

  employeeName: {
    marginBottom: 4,
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
  },

  text: {
    marginBottom: 16,
  },

  dates: {
    color: '#555555',
  },

  scoreIcon: {
    marginRight: 4,
    alignItems: 'center',
  },
});
