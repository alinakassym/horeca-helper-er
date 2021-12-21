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
import {PrimaryColors} from '../../../styles/colors';
import {IconDot} from '../../../assets/icons/main/IconDot';
import RatingScale from '../../../components/RatingScale';
import {IconExpandRight} from '../../../assets/icons/main/IconExpandRight';

const dimensions = Dimensions.get('screen');

export const ResumeCard = ({item, onPress}) => {
  const getAge = birthDate => {
    return moment().diff(birthDate, 'years', false);
  };
  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    parts.join('.');
    parts.push(' ₸');
    return parts;
  };

  return (
    <Pressable onPress={onPress} style={styles.card}>
      <View style={styles.row}>
        <View style={styles.leftCol}>
          <Text style={styles.title}>
            {item.firstName} {item.lastName}
            {item.birthDate && `, ${getAge(item.birthDate)}`}
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
          <RatingScale score={item.avgAvgScore} />
        </View>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: item.photoUrl}} />
        </View>
      </View>
      <View
        style={[
          styles.row,
          styles.mt,
          styles.alignCenter,
          styles.justifySpaceBetween,
        ]}>
        <View style={styles.leftCol}>
          <Text style={styles.salary}>{numberWithSpaces(item.salary)}</Text>
        </View>
        <View style={styles.next}>
          <IconExpandRight size={24} width={1.8} color={PrimaryColors.brand} />
        </View>
      </View>
    </Pressable>
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
  mt: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
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
  salary: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    lineHeight: 24,
    color: PrimaryColors.element,
  },
  next: {
    marginLeft: 8,
    width: imageSize,
    alignItems: 'center',
    overflow: 'hidden',
  },
});
