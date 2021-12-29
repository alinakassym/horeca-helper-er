import React from 'react';
import PropTypes from 'prop-types';
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import {PrimaryColors} from '../styles/colors';
import {IconClose} from '../assets/icons/main/IconClose';

const propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  onChangeText: PropTypes.func,
  onEndEditing: PropTypes.func,
  onClear: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
};

class Input extends React.PureComponent {
  constructor() {
    super();
    this.state = {
      focused: false,
    };
  }
  render() {
    const {label, value, onChangeText, onFocus, onBlur, onClear} = this.props;
    const {focused} = this.state;
    return (
      <View style={styles.inputSection}>
        <Text style={styles.label}>
          {((!!label && focused) || (!!label && !!value)) && `${label}`}
        </Text>
        <TextInput
          value={value}
          style={[
            styles.input,
            {
              borderBottomColor: focused
                ? PrimaryColors.element
                : PrimaryColors.grey3,
            },
          ]}
          placeholder={focused ? '' : label}
          placeholderTextColor={PrimaryColors.grey2}
          onChangeText={onChangeText}
          onBlur={() => {
            if (onBlur) {
              onBlur(false);
            }
          }}
          onFocus={val => {
            if (onFocus) {
              onFocus(val);
            }
            this.setState({...this.state, focused: true});
          }}
          onEndEditing={() => this.setState({...this.state, focused: false})}
        />

        {value.length > 0 && (
          <TouchableOpacity
            onPress={onClear}
            activeOpacity={0.7}
            style={styles.iconClear}>
            <IconClose size={16} color={PrimaryColors.grey1} width={2} />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputSection: {
    position: 'relative',
  },
  label: {
    marginBottom: 4,
    height: 14,
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: PrimaryColors.grey1,
  },
  input: {
    marginBottom: 20,
    paddingTop: 0,
    paddingBottom: 10,
    paddingLeft: 0,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
    borderBottomWidth: 1.5,
    borderBottomColor: PrimaryColors.grey3,
  },
  iconClear: {
    position: 'absolute',
    top: 22,
    right: 4,
    padding: 2,
  },
});

Input.propTypes = propTypes;
export default Input;