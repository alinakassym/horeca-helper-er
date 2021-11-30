import React from 'react';
import {View, StyleSheet, Dimensions, Image, Text} from 'react-native';
import {IconMessageStatus} from '../../../assets/icons/main/IconMessageStatus';

const dimensions = Dimensions.get('screen');

export const MessagePreview = ({item}) => {
  return (
    <View style={styles.card}>
      <View style={styles.leftCol}>
        <View style={styles.imageWrapper}>
          <Image style={styles.img} source={{uri: item.photoUrl}} />
        </View>
      </View>
      <View style={styles.rightCol}>
        <View style={styles.titleRow}>
          <Text style={styles.title} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.date}>{item.date}</Text>
        </View>
        <View style={styles.textRow}>
          <IconMessageStatus
            color={item.isRead ? '#2A8BE4' : '#8391A1'}
            size={20}
          />
          <Text style={styles.text} numberOfLines={1}>
            {item.text}
          </Text>
        </View>
        <View style={styles.divider} />
      </View>
    </View>
  );
};

const imageSize =
  dimensions.width * 0.15 > 70
    ? 70
    : dimensions.width * 0.15 < 50
    ? 50
    : dimensions.width * 0.15;
const leftColWidth = imageSize + 16;
const rightColWidth = dimensions.width - leftColWidth;

const styles = StyleSheet.create({
  card: {
    width: dimensions.width,
    flexDirection: 'row',
  },
  leftCol: {
    padding: 16,
    width: leftColWidth,
  },
  rightCol: {
    paddingTop: 14,
    paddingHorizontal: 16,
    width: rightColWidth,
  },
  imageWrapper: {
    height: imageSize,
    width: imageSize,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: imageSize,
    backgroundColor: '#767676',
  },
  titleRow: {
    marginTop: 4,
    marginBottom: 8,
    width: rightColWidth - 32,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  title: {
    width: rightColWidth - 110,
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#151F47',
  },
  date: {
    color: '#8391A1',
  },
  textRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginBottom: 4,
    width: rightColWidth - 60,
    fontSize: 14,
    lineHeight: 18,
    color: '#8391A1',
  },
  divider: {
    marginTop: 14,
    height: 1,
    width: rightColWidth - 32,
    borderBottomWidth: 1,
    borderColor: '#E2E5E8',
  },
});
