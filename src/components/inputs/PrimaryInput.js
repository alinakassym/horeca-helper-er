import React from 'react';
import {View, Text, TextInput} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import PropTypes from 'prop-types';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
};

class PrimaryInput extends React.PureComponent {
  render() {
    const {label, value, onChangeText} = this.props;
    return (
      <View>
        <Text style={globalStyles.label}>{label}</Text>
        <TextInput
          style={globalStyles.primaryInput}
          onChangeText={onChangeText}
          value={value}/>
      </View>
    );
  }
}

PrimaryInput.propTypes = propTypes;

export default PrimaryInput;
