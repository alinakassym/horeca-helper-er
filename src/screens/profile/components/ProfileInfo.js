import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Dimensions} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';
import {IconBuilding} from '../../../assets/icons/main/IconBuilding';
import {IconAddress} from '../../../assets/icons/main/IconAddress';
import {IconPhone} from '../../../assets/icons/main/IconPhone';
import {IconMail} from '../../../assets/icons/main/IconMail';

const dimensions = Dimensions.get('screen');
const iconSize = 24;

const propTypes = {
  category: PropTypes.object,
  address: PropTypes.string,
  contactInfo: PropTypes.string,
  email: PropTypes.string,
};

class ProfileInfo extends React.PureComponent {
  render() {
    const {category, address, contactInfo, email} = this.props;
    return (
      <View style={styles.col}>
        {category && (
          <View style={styles.row}>
            <IconBuilding size={iconSize} color={PrimaryColors.element} />
            <Text style={styles.text}>{category?.title_ru}</Text>
          </View>
        )}
        {address && (
          <View style={styles.row}>
            <IconAddress size={iconSize} color={PrimaryColors.element} />
            <Text style={styles.text}>{address}</Text>
          </View>
        )}
        {contactInfo && (
          <View style={styles.row}>
            <IconPhone size={iconSize} color={PrimaryColors.element} />
            <Text style={styles.text}>{contactInfo}</Text>
          </View>
        )}
        {email && (
          <View style={styles.row}>
            <IconMail size={iconSize} color={PrimaryColors.element} />
            <Text style={styles.text}>{email}</Text>
          </View>
        )}
      </View>
    );
  }
}

const width = dimensions.width;
const padding = 20;

const styles = StyleSheet.create({
  col: {
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
  text: {
    marginLeft: 16,
    width: width - iconSize - padding * 3,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
});

ProfileInfo.propTypes = propTypes;
export default ProfileInfo;
