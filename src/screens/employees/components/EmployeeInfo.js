import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {PrimaryColors, StatusesColors} from '../../../styles/colors';
import {IconStar} from '../../../assets/icons/main/IconStar';
import i18n from '../../../assets/i18n/i18n';

const dimensions = Dimensions.get('screen');

const propTypes = {
  locale: PropTypes.string,
  avgAvgScore: PropTypes.number,
  position: PropTypes.string,
  contactInfo: PropTypes.string,
  age: PropTypes.number,
  city: PropTypes.string,
  schedule: PropTypes.string,
  email: PropTypes.string,
  salary: PropTypes.number,
};

class EmployeeInfo extends React.PureComponent {
  render() {
    const {
      locale,
      avgAvgScore,
      position,
      contactInfo,
      age,
      city,
      schedule,
      email,
      salary,
    } = this.props;
    const getAgeTextRu = () => {
      const unit = age % 10;
      if (locale === 'ru') {
        return unit === 0
          ? 'лет'
          : unit === 1
          ? 'год'
          : unit < 5
          ? 'года'
          : 'лет';
      }
      return 'y.o.';
    };
    const numberWithSpaces = val => {
      let parts = val.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      parts.join('.');
      parts.push(' ₸');
      return parts;
    };
    return (
      <View style={styles.col}>
        {avgAvgScore && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>Рейтинг</Text>
            <View style={styles.rightCol}>
              <Text style={styles.text}>{avgAvgScore}</Text>
              <IconStar
                color={StatusesColors.orange}
                fillColor={StatusesColors.orange}
              />
            </View>
          </View>
        )}
        {position && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Phone')}</Text>
            <Text style={styles.rightColText}>{position}</Text>
          </View>
        )}
        {contactInfo && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Phone')}</Text>
            <Text style={styles.rightColText}>{contactInfo}</Text>
          </View>
        )}
        {age && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Age')}</Text>
            <Text style={styles.rightColText}>
              {age} {getAgeTextRu()}
            </Text>
          </View>
        )}
        {city && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('City')}</Text>
            <Text style={styles.rightColText}>{city}</Text>
          </View>
        )}
        {schedule && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Schedule')}</Text>
            <Text style={styles.rightColText}>{schedule}</Text>
          </View>
        )}
        {email && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Email')}</Text>
            <Text style={styles.rightColText}>{email}</Text>
          </View>
        )}
        {salary && (
          <View style={styles.row}>
            <Text style={styles.leftColText}>{i18n.t('Salary')}</Text>
            <Text style={styles.rightColText}>{numberWithSpaces(salary)}</Text>
          </View>
        )}
      </View>
    );
  }
}

const width = dimensions.width;
const leftColWidth = dimensions.width * 0.2;
const padding = 20;

const styles = StyleSheet.create({
  col: {
    marginTop: 8,
    paddingTop: padding,
    paddingHorizontal: padding,
    width: width,
    flexDirection: 'column',
    backgroundColor: PrimaryColors.white,
  },
  row: {
    marginBottom: padding,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftColText: {
    width: leftColWidth,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
  rightCol: {
    marginLeft: 8,
    width: width - leftColWidth - 8 - padding * 2,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  text: {
    marginRight: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'right',
    color: PrimaryColors.grey1,
  },
  rightColText: {
    marginLeft: 8,
    width: width - leftColWidth - 8 - padding * 2,
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'right',
    color: PrimaryColors.element,
  },
});

EmployeeInfo.propTypes = propTypes;

export default EmployeeInfo;
