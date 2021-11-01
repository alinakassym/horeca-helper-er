import React from 'react';
import {Image, Text, View, Pressable, StyleSheet} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import moment from 'moment';

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
    <Pressable onPress={onPress} style={[styles.row, styles.divider]}>
      <View style={styles.col}>
        <View>
          <Text style={globalStyles.positionTitle}>{item.position?.title}</Text>

          {item.salary && (
            <Text style={styles.salary}>
              {numberWithSpaces(item.salary)} KZT
            </Text>
          )}
          <Text style={globalStyles.title}>
            {item.firstName} {item.lastName}
            {item.birthDate && <Text>, {getAge(item.birthDate)} years</Text>}
          </Text>
          <Text style={styles.city}>{item.city?.title}</Text>
          {!!item.description && (
            <Text style={globalStyles.caption}>{item.description}</Text>
          )}
        </View>
      </View>
      <View style={[styles.col, styles.floatLeftTop]}>
        <View style={styles.imageWrapper}>
          <Image style={styles.img} source={{uri: item.photoUrl}} />
        </View>
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  floatLeftTop: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageWrapper: {
    height: 40,
    width: 40,
    borderRadius: 30,
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
});
