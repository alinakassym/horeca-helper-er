import React from 'react';
import {Text, View, Dimensions, StyleSheet, Image} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';
import {IconBuilding} from '../../../assets/icons/main/IconBuilding';
import {IconCalendar} from '../../../assets/icons/main/IconCalendar';
import moment from 'moment';
import 'moment/locale/ru';

const dimensions = Dimensions.get('screen');
moment.locale('ru');
const formattedDate = date => {
  const fd = moment(date).format('MMMM YYYY');
  return fd.slice(0, 1).toUpperCase() + fd.substr(1, fd.length - 1);
};

export const WorkList = ({items}) => {
  return (
    <View style={styles.col}>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <View style={styles.row}>
            <View style={styles.leftCol}>
              <Text style={styles.positionTitle}>
                {item?.position.title_ru}
              </Text>
              <View style={[styles.row, styles.alignCenter]}>
                <IconBuilding color={PrimaryColors.grey1} size={16} />
                <Text style={styles.label}>
                  {item.company.title}
                  {item.city && `, ${item.city.title_ru}`}
                </Text>
              </View>
              <View style={[styles.row, styles.alignCenter]}>
                <IconCalendar color={PrimaryColors.grey1} size={16} />
                <Text style={styles.label}>
                  {formattedDate(item.startDate)} -{' '}
                  {formattedDate(item.endDate)}
                </Text>
              </View>
            </View>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.image}
                source={{uri: item?.company?.photoUrl}}
              />
            </View>
          </View>
          <Text style={styles.text}>{item.description}</Text>
          {index < items.length - 1 && <View style={styles.divider} />}
        </React.Fragment>
      ))}
    </View>
  );
};

const width = dimensions.width;
const padding = 20;
const imageSize = 80;

const styles = StyleSheet.create({
  col: {
    marginTop: 8,
    padding: padding,
    width: width,
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    marginTop: 6,
    alignItems: 'center',
  },
  leftCol: {
    width: width - imageSize - 8 - padding * 2,
  },
  positionTitle: {
    marginVertical: 6,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  label: {
    marginLeft: 6,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
  text: {
    marginTop: 16,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  imageWrapper: {
    marginLeft: 8,
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  divider: {
    marginVertical: 20,
    width: width - padding * 2,
    borderBottomWidth: 1,
    borderBottomColor: PrimaryColors.grey3,
  },
});
