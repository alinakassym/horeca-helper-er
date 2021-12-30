import React from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, StyleSheet} from 'react-native';
import {PrimaryColors} from '../../styles/colors';

const propTypes = {
  label: PropTypes.string,
  labelColor: PropTypes.string,
  onPress: PropTypes.func,
  style: PropTypes.object,
};

class ModalButton extends React.PureComponent {
  render() {
    const {label, labelColor, onPress, style} = this.props;
    const labelColorStyle = {color: labelColor || PrimaryColors.brand};
    return (
      <TouchableOpacity
        activeOpacity={0.7}
        onPress={onPress}
        style={[styles.btn, style]}>
        <Text style={[styles.label, labelColorStyle]}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 20,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
  },
});

ModalButton.propTypes = propTypes;
export default ModalButton;
