import React from 'react';
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';
import moment from 'moment';
import {PrimaryColors, StatusesColors} from '../../../styles/colors';
import {IconDot} from '../../../assets/icons/main/IconDot';
import RatingScale from '../../../components/RatingScale';
import PrimaryButton from '../../../components/buttons/PrimaryButton';

const dimensions = Dimensions.get('screen');

export const EmployeeCard = ({item, onPress}) => {
  const {employee} = item;
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
    <View style={styles.card}>
      <View style={styles.row}>
        <View style={styles.leftCol}>
          <Text style={styles.title}>
            {employee.firstName} {employee.lastName}
            {employee.birthDate && `, ${getAge(employee.birthDate)}`}
          </Text>
          <View style={[styles.row, styles.alignCenter]}>
            {item?.position && item?.city ? (
              <>
                <Text style={styles.subtitle}>{item.position.title}</Text>
                <IconDot color={PrimaryColors.grey2} />
                <Text style={[styles.subtitle, styles.marginLeft]}>
                  {item.city.title}
                </Text>
              </>
            ) : item?.position ? (
              <Text style={styles.subtitle}>{item.position.title}</Text>
            ) : (
              item.city && (
                <Text style={[styles.subtitle]}>{item.city.title}</Text>
              )
            )}
          </View>
          <RatingScale score={4} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: employee.photoUrl}} />
        </View>
      </View>
      {!item.employeeReview && (
        <PrimaryButton
          label={'Оценить'}
          color={StatusesColors.orangeOpacity}
          labelColor={StatusesColors.orange}
          style={{marginTop: 24}}
        />
      )}
    </View>
  );
};

const width = dimensions.width;
const imageSize = 64;
const padding = 20;

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    padding: padding,
    width: width,
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  leftCol: {
    width: width - imageSize - padding * 2 - 8,
  },
  imageWrapper: {
    marginLeft: 8,
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  marginLeft: {
    marginLeft: 8,
  },
  subtitle: {
    marginRight: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
});
