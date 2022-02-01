import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../styles/globalStyles';
import {PrimaryColors} from '../styles/colors';
import {IconCheck} from '../assets/icons/main/IconCheck';

const propType = {
  label: PropTypes.string,
};

class Point extends React.PureComponent {
  render() {
    const {label} = this.props;
    return (
      <View
        style={[globalStyles.row, globalStyles.alignCenter, globalStyles.mb4]}>
        <View style={styles.icon}>
          <IconCheck size={16} />
        </View>
        <Text style={styles.label}>{label}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  icon: {
    marginRight: 10,
    padding: 6,
    borderRadius: 24,
    backgroundColor: PrimaryColors.white,
  },
  label: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.white,
  },
});

Point.propType = propType;
export default Point;
