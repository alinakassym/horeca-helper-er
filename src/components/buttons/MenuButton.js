import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {IconDots} from '../../assets/icons/main/IconDots';

const propTypes = {
  onPress: PropTypes.func,
};

class MenuButton extends React.PureComponent {
  render() {
    const {onPress} = this.props;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.btn}>
        <IconDots color={'#151F47'} size={16} width={3} />
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    height: 40,
    width: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 12,
    borderColor: '#E2E5E8',
    borderWidth: 0.7,
  },
});

MenuButton.propTypes = propTypes;

export default MenuButton;
