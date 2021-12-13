import React from 'react';
import {View, StyleSheet, Dimensions} from 'react-native';
import BackButton from './buttons/BackButton';
import PropTypes from 'prop-types';

const dimensions = Dimensions.get('screen');

const propTypes = {
  navigation: PropTypes.object,
  children: PropTypes.array,
};

class Header extends React.PureComponent {
  render() {
    const {navigation, children} = this.props;
    return (
      <View style={styles.headerSection}>
        <View style={styles.leftCol}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.rightCol}>{children}</View>
      </View>
    );
  }
}

const headerSectionPadding = 20;
const leftColWidth = 40 + 16;
const rightColWidth =
  dimensions.width - leftColWidth - headerSectionPadding * 2;

const styles = StyleSheet.create({
  headerSection: {
    padding: 20,
    width: dimensions.width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  leftCol: {
    width: leftColWidth,
  },
  rightCol: {
    width: rightColWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
});

Header.propTypes = propTypes;

export default Header;
