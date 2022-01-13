import React from 'react';
import {
  Image,
  Text,
  View,
  Pressable,
  StyleSheet,
  Dimensions,
} from 'react-native';
import PropTypes from 'prop-types';
import moment from 'moment';

// styles
import {PrimaryColors, StatusesColors} from '../../../styles/colors';

// icons
import {IconDot} from '../../../assets/icons/main/IconDot';
import {IconExpandRight} from '../../../assets/icons/main/IconExpandRight';

// components
import RatingScale from '../../../components/RatingScale';

const dimensions = Dimensions.get('screen');

const propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
};

class ResumeCard extends React.PureComponent {
  render() {
    const {item, onPress} = this.props;
    const getAge = birthDate => {
      return moment().diff(birthDate, 'years', false);
    };
    const numberWithSpaces = val => {
      let parts = val.toString().split('.');
      parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
      parts.join('.');
      parts.push(' ₸');
      return parts;
    };

    return (
      <Pressable onPress={onPress} style={styles.card}>
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <Text style={styles.title}>
              {item.firstName} {item.lastName}
              {item.birthDate && `, ${getAge(item.birthDate)}`}
            </Text>
            <View style={[styles.row, styles.alignCenter]}>
              {item?.position && item?.city ? (
                <>
                  <Text style={styles.subtitle}>{item.position.title}</Text>
                  <IconDot color={PrimaryColors.grey2} />
                  <Text style={[styles.subtitle, styles.marginLeft]}>
                    {item.city.title}
                  </Text>
                </>
              ) : item?.position ? (
                <Text style={styles.subtitle}>{item.position.title}</Text>
              ) : (
                item.city && (
                  <Text style={[styles.subtitle]}>{item.city.title}</Text>
                )
              )}
            </View>
            <RatingScale score={item.avgAvgScore} />
          </View>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={{uri: item.photoUrl}} />
            {item.isActive && <View style={styles.indicator} />}
          </View>
        </View>
        <View
          style={[
            styles.row,
            styles.mt,
            styles.alignCenter,
            styles.justifySpaceBetween,
          ]}>
          <View style={styles.leftCol}>
            <Text style={styles.salary}>
              {item.salary ? numberWithSpaces(item.salary) : ''}
            </Text>
          </View>
          <View style={styles.next}>
            <IconExpandRight
              size={24}
              width={1.8}
              color={PrimaryColors.brand}
            />
          </View>
        </View>
      </Pressable>
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
  mt: {
    marginTop: 20,
  },
  row: {
    flexDirection: 'row',
  },
  alignCenter: {
    alignItems: 'center',
  },
  justifySpaceBetween: {
    justifyContent: 'space-between',
  },
  leftCol: {
    width: width - imageSize - padding * 2 - 8,
  },
  imageWrapper: {
    position: 'relative',
    marginLeft: 8,
    width: imageSize,
    height: imageSize,
    borderRadius: imageSize,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: imageSize,
    overflow: 'hidden',
  },
  indicator: {
    position: 'absolute',
    right: 2,
    bottom: 2,
    height: 12,
    width: 12,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: PrimaryColors.white,
    backgroundColor: StatusesColors.green,
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
  salary: {
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    lineHeight: 24,
    color: PrimaryColors.element,
  },
  next: {
    marginLeft: 8,
    width: imageSize,
    alignItems: 'center',
    overflow: 'hidden',
  },
});

ResumeCard.propTypes = propTypes;
export default ResumeCard;
