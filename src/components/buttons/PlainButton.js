import React from 'react';
import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import {PrimaryColors} from '../../styles/colors';

const propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
  color: PropTypes.string,
};

class PlainButton extends React.PureComponent {
  render() {
    const {label, color, onPress} = this.props;
    const children = this.props.children;
    const btnColor = color ? color : PrimaryColors.brand;
    return (
      <TouchableOpacity
        activeOpacity={0.5}
        onPress={onPress}
        style={styles.btn}>
        {children}
        <Text style={[styles.btnLabel, {color: btnColor}]}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    padding: 2,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnLabel: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 18,
    textAlign: 'center',
  },
});

PlainButton.propTypes = propTypes;

export default PlainButton;
