import React from 'react';
import {
  Pressable,
  Image,
  Text,
  View,
  Dimensions,
  StyleSheet,
} from 'react-native';
import moment from 'moment';
import {IconChecked} from '../../../assets/icons/main/IconChecked';
import {IconStar} from '../../../assets/icons/main/IconStar';

const dimensions = Dimensions.get('screen');

export const WorkList = ({items, navigation}) => {
  return (
    <View style={{width: '100%'}}>
      {items.map((item, index) => (
        <Pressable
          key={index}
          style={styles.divider}
          onPress={() => navigation.navigate('WorkInfo', {item: item})}>
          <View style={[styles.section, styles.row]}>
            <View style={styles.leftCol}>
              <View style={styles.imageWrapper}>
                <Image
                  style={styles.image}
                  source={{uri: item.company.photoUrl}}
                />
                {item.isConfirmed && (
                  <View style={styles.iconWrapper}>
                    <IconChecked color={'#185AB7'} size={18} />
                  </View>
                )}
              </View>
            </View>

            <View style={styles.rightCol}>
              <Text style={styles.title}>{item.position.title}</Text>
              {item.employeeReview && (
                <View style={[styles.row, styles.alignCenter]}>
                  <View style={styles.scoreIcon}>
                    <IconStar
                      color={'#F1C40F'}
                      fillColor={'#F1C40F'}
                      size={14}
                    />
                  </View>
                  <Text>{item.employeeReview.avgScore}</Text>
                </View>
              )}
              <Text style={styles.text}>{item.company.title}</Text>
              {item.startDate && (
                <Text>
                  {moment(item.startDate).format('MMM YYYY')}{' '}
                  {item.endDate
                    ? `- ${moment(item.endDate).format('MMM YYYY')}`
                    : ''}
                </Text>
              )}
              {!!item.description && (
                <Text textBreakStrategy={'simple'}>{item.description}</Text>
              )}
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
};

const imageSize = dimensions.width * 0.16;

const styles = StyleSheet.create({
  section: {
    paddingVertical: 8,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  leftCol: {
    width: imageSize + 16,
    flexDirection: 'column',
  },
  rightCol: {
    width: dimensions.width - imageSize - 50,
  },
  alignCenter: {
    alignItems: 'center',
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
    position: 'relative',
    marginRight: 16,
    height: imageSize,
    width: imageSize,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: imageSize,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
  },
  scoreIcon: {
    marginRight: 4,
    alignItems: 'center',
  },
});
