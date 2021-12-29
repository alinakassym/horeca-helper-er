import React from 'react';
import PropTypes from 'prop-types';
import {Dimensions, View, Text, Image, StyleSheet} from 'react-native';
import {globalStyles} from '../../../styles/globalStyles';
import {PrimaryColors} from '../../../styles/colors';
import {IconChecked} from '../../../assets/icons/main/IconChecked';

const dimensions = Dimensions.get('screen');

const propTypes = {
  photoUrl: PropTypes.string,
  title: PropTypes.string,
  text: PropTypes.string,
};

class CompanyVerification extends React.PureComponent {
  render() {
    const {photoUrl, title, text} = this.props;
    return (
      <View style={globalStyles.card}>
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <View style={styles.imageWrapper}>
              <Image style={styles.img} source={{uri: photoUrl}} />
              <IconChecked size={16} style={styles.icon} />
            </View>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.text}>{text}</Text>
          </View>
        </View>
      </View>
    );
  }
}

const imageSize =
  dimensions.width * 0.15 > 60
    ? 60
    : dimensions.width * 0.15 < 52
    ? 52
    : dimensions.width * 0.15;

const pa = 20;
const leftColWidth = imageSize + 12;
const rightColWidth = dimensions.width - leftColWidth - pa * 2;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  leftCol: {
    width: leftColWidth,
  },
  rightCol: {
    width: rightColWidth,
  },
  imageWrapper: {
    position: 'relative',
    height: imageSize,
    width: imageSize,
  },
  img: {
    height: '100%',
    width: '100%',
    borderWidth: 0.7,
    borderRadius: imageSize,
    borderColor: PrimaryColors.grey3,
    backgroundColor: PrimaryColors.white,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
  title: {
    marginBottom: 6,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: PrimaryColors.grey1,
  },
});

CompanyVerification.propTypes = propTypes;
export default CompanyVerification;
