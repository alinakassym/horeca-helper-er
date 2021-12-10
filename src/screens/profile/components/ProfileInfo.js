import React from 'react';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {IconBuilding} from '../../../assets/icons/main/IconBuilding';
import {IconAddress} from '../../../assets/icons/main/IconAddress';
import {IconPhone} from '../../../assets/icons/main/IconPhone';
import {IconMail} from '../../../assets/icons/main/IconMail';

const dimensions = Dimensions.get('screen');
const iconSize = 24;

export const ProfileInfo = ({category, address, contactInfo, email}) => {
  return (
    <View style={styles.col}>
      {category && (
        <View style={styles.row}>
          <IconBuilding size={iconSize} color={'#151F47'} />
          <Text style={styles.text}>{category.title}</Text>
        </View>
      )}
      {address && (
        <View style={styles.row}>
          <IconAddress size={iconSize} color={'#151F47'} />
          <Text style={styles.text}>{address}</Text>
        </View>
      )}
      {contactInfo && (
        <View style={styles.row}>
          <IconPhone size={iconSize} color={'#151F47'} />
          <Text style={styles.text}>{contactInfo}</Text>
        </View>
      )}
      {email && (
        <View style={styles.row}>
          <IconMail size={iconSize} color={'#151F47'} />
          <Text style={styles.text}>{email}</Text>
        </View>
      )}
    </View>
  );
};

const width = dimensions.width;
const padding = 20;

const styles = StyleSheet.create({
  col: {
    paddingHorizontal: padding,
    width: width,
    flexDirection: 'column',
  },
  row: {
    marginBottom: padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 16,
    width: width - iconSize - padding * 2,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: '#151F47',
  },
});
