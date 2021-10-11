import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
}


class PrimarySelect extends React.PureComponent {
  render() {
    const {label, value, items, onChange} = this.props;
    return (
      <View>
        <Text style={styles.label}>{label}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  input: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC'
  }
});

PrimarySelect.propTypes = propTypes;

export default PrimarySelect;
