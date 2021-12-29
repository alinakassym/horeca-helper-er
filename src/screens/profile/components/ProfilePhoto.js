import React from 'react';
import PropTypes from 'prop-types';
import {View, Pressable, StyleSheet, Image} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';
import PlainButton from '../../../components/buttons/PlainButton';

const propTypes = {
  photoUrl: PropTypes.string,
  onPress: PropTypes.func,
};

class ProfilePhoto extends React.PureComponent {
  render() {
    const {photoUrl, onPress} = this.props;
    return (
      <Pressable onPress={onPress} style={styles.section}>
        <View style={styles.imageWrapper}>
          <Image style={styles.image} source={{uri: photoUrl}} />
        </View>
        <PlainButton
          onPress={onPress}
          style={styles.btn}
          label={'Изменить фото'}
        />
      </Pressable>
    );
  }
}

const imageSize = 96;

const styles = StyleSheet.create({
  section: {
    paddingVertical: 4,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: PrimaryColors.white,
  },
  imageWrapper: {
    width: imageSize,
    height: imageSize,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderWidth: 0.7,
    borderColor: PrimaryColors.grey3,
    backgroundColor: PrimaryColors.white,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  btn: {
    paddingVertical: 16,
  },
});

ProfilePhoto.propTypes = propTypes;
export default ProfilePhoto;
