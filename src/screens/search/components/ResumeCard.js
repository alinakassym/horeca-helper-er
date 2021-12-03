import React from 'react';
import {
  Image,
  Text,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import moment from 'moment';
import {IconStar} from '../../../assets/icons/main/IconStar';

const dimensions = Dimensions.get('screen');

export const ResumeCard = ({item, onPress}) => {
  const getAge = birthDate => {
    return moment().diff(birthDate, 'years', false);
  };
  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  return (
    <Pressable
      onPress={onPress}
      style={[styles.section, styles.row, styles.divider]}>
      <View style={[styles.leftCol]}>
        <View>
          <Text style={globalStyles.positionTitle}>{item.position?.title}</Text>

          {item.salary && (
            <Text style={styles.salary}>
              {numberWithSpaces(item.salary)} KZT
            </Text>
          )}
          <Text style={globalStyles.title}>
            {item.firstName} {item.lastName}
            {item.birthDate && <Text>, {getAge(item.birthDate)} y.o.</Text>}
          </Text>
          <Text style={styles.city}>{item.city?.title}</Text>
          {!!item.description && (
            <Text numberOfLines={1} style={globalStyles.caption}>
              {item.description}
            </Text>
          )}
        </View>
      </View>
      <View style={[styles.rightCol, styles.alignCenter]}>
        <View style={styles.imageWrapper}>
          <Image style={styles.img} source={{uri: item.photoUrl}} />
        </View>
        {item.avgAvgScore && (
          <View style={[styles.row, styles.alignCenter]}>
            <View style={styles.scoreIcon}>
              <IconStar color={'#F1C40F'} fillColor={'#F1C40F'} size={18} />
            </View>
            <Text>{item.avgAvgScore}</Text>
          </View>
        )}
      </View>
    </Pressable>
  );
};

const imageSize = dimensions.width * 0.16;

const styles = StyleSheet.create({
  section: {
    padding: 16,
    width: dimensions.width,
  },
  row: {
    flexDirection: 'row',
  },

  alignCenter: {
    alignItems: 'center',
  },

  leftCol: {
    paddingRight: 8,
    width: dimensions.width - imageSize - 32,
  },

  rightCol: {
    width: imageSize,
    flexDirection: 'column',
  },

  imageWrapper: {
    marginBottom: 6,
    height: imageSize,
    width: imageSize,
    borderRadius: 8,
    backgroundColor: '#767676',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
  },
  salary: {
    marginBottom: 8,
    fontSize: 16,
  },
  city: {
    marginBottom: 8,
    color: '#555555',
  },

  scoreIcon: {
    marginRight: 4,
    alignItems: 'center',
  },
});
