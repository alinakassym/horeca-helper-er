import React from 'react';
import {Text, View} from 'react-native';
import PropTypes from 'prop-types';
import {globalStyles} from '../styles/globalStyles';
import {typography} from '../styles/typography';

const propTypes = {
  placeholderText: PropTypes.string,
};

class OnlineUsers extends React.PureComponent {
  render() {
    const {placeholderText} = this.props;
    return (
      <View style={globalStyles.fullScreenSection}>
        <Text style={[typography.text, globalStyles.mb6]}>
          {placeholderText}
        </Text>
      </View>
    );
  }
}

OnlineUsers.propTypes = propTypes;
export default OnlineUsers;
