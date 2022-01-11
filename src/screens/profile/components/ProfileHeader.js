import React from 'react';
import PropTypes from 'prop-types';
import {View, Text, Image, StyleSheet, Dimensions} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';
import {IconChecked} from '../../../assets/icons/main/IconChecked';
import ProfilePhotoPlaceholder from './ProfilePhotoPlaceholder';

const dimensions = Dimensions.get('screen');

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  photoUrl: PropTypes.string,
  verificationStatus: PropTypes.string,
};

class ProfileHeader extends React.PureComponent {
  render() {
    const {title, description, photoUrl, verificationStatus} = this.props;
    return (
      <View style={styles.col}>
        <View style={styles.row}>
          <Text style={styles.title}>{title}</Text>
          <View style={styles.imageWrapper}>
            {photoUrl ? (
              <Image style={styles.image} source={{uri: photoUrl}} />
            ) : (
              <ProfilePhotoPlaceholder
                imageSize={64}
                iconSize={28}
                style={styles.imagePlaceholder}
              />
            )}
            {verificationStatus === 'VERIFIED' && (
              <IconChecked style={styles.icon} />
            )}
          </View>
        </View>
        {description?.length && (
          <Text numberOfLines={3} style={styles.description}>
            {description}
          </Text>
        )}
      </View>
    );
  }
}

const width = dimensions.width;
const padding = 20;
const imageSize = 64;

const styles = StyleSheet.create({
  col: {
    paddingVertical: 24,
    paddingHorizontal: padding,
    width: width,
    flexDirection: 'column',
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  title: {
    width: width - imageSize - padding * 3,
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    lineHeight: 28,
    color: PrimaryColors.element,
  },
  imagePlaceholder: {
    paddingVertical: 0,
  },
  imageWrapper: {
    marginLeft: padding,
    width: imageSize,
    height: imageSize,
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 12,
    overflow: 'hidden',
  },
  icon: {
    position: 'absolute',
    top: -8,
    right: -8,
  },
  description: {
    marginTop: padding,
    width: width - padding * 2,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
});

ProfileHeader.propTypes = propTypes;
export default ProfileHeader;
