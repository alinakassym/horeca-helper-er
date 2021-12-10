import React from 'react';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';

const dimensions = Dimensions.get('screen');

export const ProfileHeader = ({title, description, photoUrl}) => {
  return (
    <View style={styles.col}>
      <View style={styles.row}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: photoUrl}} />
        </View>
      </View>
      {description && (
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
    backgroundColor: '#FFFFFF',
  },
  row: {
    marginBottom: padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    width: width - imageSize - padding * 3,
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    lineHeight: 28,
    color: '#151F47',
  },
  imageWrapper: {
    marginLeft: padding,
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: '#E2E5E8',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  description: {
    width: width - padding * 2,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: '#8391A1',
  },
});
