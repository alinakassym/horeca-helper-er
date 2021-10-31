import React from 'react';
import {StyleSheet, Image, Text, View} from 'react-native';
import moment from 'moment';

export const WorkList = ({items, onPress}) => {
  return (
    <View style={{width: '100%'}}>
      {items.map((item, index) => (
        <View key={index} style={styles.divider} onPress={onPress}>
          <View style={[styles.row]}>
            <View style={styles.column}>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.image}
                  source={{uri: item.company.photo}}
                />
              </View>
            </View>

            <View style={styles.column}>
              <Text style={styles.title}>{item.position.title}</Text>
              <Text style={styles.text}>{item.company.title}</Text>
              {item.startDate && (
                <Text>
                  {moment(item.startDate).format('MMM YYYY')}{' '}
                  {item.endDate
                    ? `- ${moment(item.endDate).format('MMM YYYY')}`
                    : ''}
                </Text>
              )}
              {item.description && <Text>{item.description}</Text>}
            </View>
          </View>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    paddingVertical: 8,
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  column: {
    flexDirection: 'column',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    marginBottom: 4,
    fontSize: 16,
    color: '#000000',
  },
  text: {
    marginBottom: 2,
    color: '#000000',
  },
  imageWrapper: {
    marginRight: 16,
    height: 60,
    width: 60,
    borderRadius: 64,
    borderWidth: 1,
    borderColor: '#cccccc',
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
  },
});
