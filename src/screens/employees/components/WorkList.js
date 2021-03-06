import React from 'react';
import {
  Text,
  View,
  Dimensions,
  StyleSheet,
  Image,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'moment/locale/ru';
import {PrimaryColors} from '../../../styles/colors';
import {IconBuilding} from '../../../assets/icons/main/IconBuilding';
import {IconCalendar} from '../../../assets/icons/main/IconCalendar';

const dimensions = Dimensions.get('screen');

const propTypes = {
  locale: PropTypes.string,
  itemKey: PropTypes.string,
  items: PropTypes.array,
};

class WorkList extends React.PureComponent {
  render() {
    const {locale, itemKey, items} = this.props;

    moment.locale(locale);
    const formattedDate = date => {
      const fd = moment(date).format('MMM YYYY');
      return fd.slice(0, 1).toUpperCase() + fd.substr(1, fd.length - 1);
    };

    return (
      <ScrollView style={styles.col}>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <View style={styles.row}>
              <View style={styles.leftCol}>
                <Text style={styles.positionTitle}>
                  {item.position && item.position[itemKey]}
                </Text>
                <View style={[styles.row, styles.alignCenter]}>
                  <IconBuilding color={PrimaryColors.grey1} size={16} />
                  <Text style={styles.label}>
                    {item.company.title}
                    {item.city && `, ${item.city[itemKey]}`}
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
      </ScrollView>
    );
  }
}

const width = dimensions.width;
const padding = 20;
const imageSize = 80;

const styles = StyleSheet.create({
  col: {
    marginTop: 8,
    marginBottom: 130,
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

WorkList.propTypes = propTypes;
export default WorkList;
