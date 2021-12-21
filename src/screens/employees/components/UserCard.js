import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet, Dimensions, Image} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';

const dimensions = Dimensions.get('screen');

const propTypes = {
  photoUrl: PropTypes.string,
  firstName: PropTypes.string,
  lastName: PropTypes.string,
};

class UserCard extends React.PureComponent {
  render() {
    const {photoUrl, firstName, lastName} = this.props;
    return (
      <View style={styles.row}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: photoUrl}} />
        </View>
        <Text style={[styles.rightCol, styles.firstName]}>
          {firstName} <Text style={styles.lastName}>{lastName}</Text>
        </Text>
      </View>
    );
  }
}

const width = dimensions.width;
const imageSize = 96;
const padding = 20;

const styles = StyleSheet.create({
  row: {
    padding: padding,
    width: width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PrimaryColors.white,
  },
  imageWrapper: {
    marginRight: 16,
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
  rightCol: {
    width: width - imageSize - 56,
  },
  firstName: {
    fontFamily: 'Inter-Light',
    fontSize: 26,
    lineHeight: 32,
    color: PrimaryColors.element,
  },
  lastName: {
    fontFamily: 'Inter-Bold',
  },
});

UserCard.propTypes = propTypes;
export default UserCard;
