import React from 'react';
import PropTypes from 'prop-types';
import {View, Pressable, StyleSheet} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';
import {IconBuilding} from '../../../assets/icons/main/IconBuilding';
import PlainButton from '../../../components/buttons/PlainButton';

const propTypes = {
  onPress: PropTypes.func,
};

class ProfilePhotoPlaceholder extends React.PureComponent {
  render() {
    const {onPress} = this.props;
    return (
      <Pressable onPress={onPress} style={styles.section}>
        <View style={styles.imageWrapper}>
          <IconBuilding size={36} width={1.3} color={PrimaryColors.grey2} />
        </View>
        <PlainButton
          onPress={onPress}
          style={styles.btn}
          label={'Добавить фото'}
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
    backgroundColor: PrimaryColors.grey4,
  },
  btn: {
    paddingVertical: 16,
  },
});

ProfilePhotoPlaceholder.propTypes = propTypes;
export default ProfilePhotoPlaceholder;
