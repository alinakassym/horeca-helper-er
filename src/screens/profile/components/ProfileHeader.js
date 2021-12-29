import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';
import {IconChecked} from '../../../assets/icons/main/IconChecked';

const dimensions = Dimensions.get('screen');

export const ProfileHeader = ({title, description, photoUrl}) => {
  return (
    <View style={styles.col}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: photoUrl}} />
          <IconChecked style={styles.icon} />
        </View>
      </View>
      {description?.length && (
        <Text numberOfLines={3} style={styles.description}>
          {description}
        </Text>
      )}
    </View>
  );
};

const width = dimensions.width;
const padding = 20;
const imageSize = 64;

const styles = StyleSheet.create({
  col: {
    paddingVertical: 24,
    paddingHorizontal: padding,
    width: width,
    flexDirection: 'column',
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    width: width - imageSize - padding * 3,
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    lineHeight: 28,
    color: PrimaryColors.element,
  },
  imageWrapper: {
    marginLeft: padding,
    width: imageSize,
    height: imageSize,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  description: {
    marginTop: padding,
    width: width - padding * 2,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
});
