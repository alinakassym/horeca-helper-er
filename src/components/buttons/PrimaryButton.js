import React from 'react';
import {Image, Dimensions, StyleSheet, Text, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';

const dimensions = Dimensions.get('screen');
const posterPlaceholder = require('../assets/images/poster-placeholder.png');

const propTypes = {
  label: PropTypes.string,
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
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
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
