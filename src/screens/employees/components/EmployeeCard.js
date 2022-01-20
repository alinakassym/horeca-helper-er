import React from 'react';
import PropTypes from 'prop-types';
import {Image, Text, View, StyleSheet, Dimensions} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../../styles/colors';
import {IconDot} from '../../../assets/icons/main/IconDot';
import RatingScale from '../../../components/RatingScale';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import moment from 'moment';
import i18n from '../../../assets/i18n/i18n';

const dimensions = Dimensions.get('screen');

const propTypes = {
  itemKey: PropTypes.string,
  item: PropTypes.object,
  onPress: PropTypes.func,
};

class EmployeeCard extends React.PureComponent {
  render() {
    const {itemKey, item, onPress} = this.props;
    const {employee} = item;
    const getAge = birthDate => {
      return moment().diff(birthDate, 'years', false);
    };

    return (
      <View style={styles.card}>
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Text style={styles.title}>
              {employee.firstName} {employee.lastName}
              {employee.birthDate && `, ${getAge(employee.birthDate)}`}
            </Text>
            <View style={[styles.row, styles.alignCenter]}>
              {item?.position && item?.city ? (
                <>
                  <Text style={styles.subtitle}>
                    {item.position && item.position[itemKey]}
                  </Text>
                  <IconDot color={PrimaryColors.grey2} />
                  <Text style={[styles.subtitle, styles.marginLeft]}>
                    {item.city && item.city[itemKey]}
                  </Text>
                </>
              ) : item?.position ? (
                <Text style={styles.subtitle}>
                  {item.position && item.position[itemKey]}
                </Text>
              ) : (
                item.city && (
                  <Text style={[styles.subtitle]}>
                    {item.city && item.city[itemKey]}
                  </Text>
                )
              )}
            </View>
            <RatingScale score={4} />
          </View>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={{uri: employee.photoUrl}} />
          </View>
        </View>
        {!item.employeeReview && (
          <PrimaryButton
            onPress={onPress}
            label={i18n.t('Rate')}
            color={StatusesColors.orangeOpacity}
            labelColor={StatusesColors.orange}
            style={globalStyles.mt6}
          />
        )}
      </View>
    );
  }
}

const width = dimensions.width;
const imageSize = 64;
const padding = 20;

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    padding: padding,
    width: width,
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  leftCol: {
    width: width - imageSize - padding * 2 - 8,
  },
  imageWrapper: {
    marginLeft: 8,
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  title: {
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  marginLeft: {
    marginLeft: 8,
  },
  subtitle: {
    marginRight: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
});

EmployeeCard.propTypes = propTypes;
export default EmployeeCard;
