import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {globalStyles} from '../styles/globalStyles';

const propTypes = {
  placeholderText: PropTypes.string,
};

class OnlineUsers extends React.PureComponent {
  render() {
    const {placeholderText} = this.props;
    return (
      <View style={globalStyles.fullScreenSection}>
        <Text style={styles.placeholderText}>{placeholderText}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  placeholderText: {
    fontFamily: 'Inter-Regular',
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
    color: '#8391A1',
  },
});

OnlineUsers.propTypes = propTypes;
export default OnlineUsers;
