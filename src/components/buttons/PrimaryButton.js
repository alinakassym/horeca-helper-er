import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  onPress: PropTypes.func,
};

class PrimaryButton extends React.PureComponent {
  render() {
    const {label, onPress} = this.props;
    return (
      <TouchableOpacity onPress={onPress} style={styles.btn}>
        <Text style={styles.btnLabel}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  btn: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
    backgroundColor: '#185AB7',
    shadowColor: '#777777',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
  },
  btnLabel: {
    textAlign: 'center',
    fontSize: 16,
    color: '#FFFFFF',
  }
});

PrimaryButton.propTypes = propTypes;

export default PrimaryButton;
