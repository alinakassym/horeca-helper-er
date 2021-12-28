import React from 'react';
import {View, StyleSheet, Dimensions, Text} from 'react-native';

// styles
import {globalStyles} from '../styles/globalStyles';
import {PrimaryColors} from '../styles/colors';

// components
import BackButton from './buttons/BackButton';
import CloseButton from './buttons/CloseButton';

import PropTypes from 'prop-types';

const dimensions = Dimensions.get('screen');

const propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.object,
  goBack: PropTypes.bool,
  options: PropTypes.bool,
  modal: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
};

class Header extends React.PureComponent {
  render() {
    const {onClose, children, goBack, options, modal, title, subtitle} =
      this.props;
    return (
      <React.Fragment>
        {goBack ? (
          <View style={styles.headerSection}>
            <View style={styles.leftCol}>
              <BackButton onPress={onClose} />
            </View>
            {title ? (
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
              </View>
            ) : (
              <View style={styles.rightCol}>{children}</View>
            )}
          </View>
        ) : options ? (
          <View style={[styles.headerSection, styles.optionsHeaderSection]}>
            <Text style={[styles.optionsRightCol, styles.title]}>
              {title} <Text style={styles.subtitle}>{subtitle}</Text>
            </Text>
            <View style={styles.optionsLeftCol}>{children}</View>
          </View>
        ) : modal ? (
          <View style={styles.modalHeaderSection}>
            <CloseButton onPress={onClose} />
            <Text style={[styles.title, globalStyles.mt4]}>{title}</Text>
          </View>
        ) : (
          <View style={styles.headerSection}>
            <Text style={[styles.title, globalStyles.mt3]}>
              {title} <Text style={styles.subtitle}>{subtitle}</Text>
            </Text>
          </View>
        )}
      </React.Fragment>
    );
  }
}

const headerSectionPadding = 20;
const leftColWidth = 40 + 8;
const rightColWidth =
  dimensions.width - leftColWidth - headerSectionPadding * 2;

const styles = StyleSheet.create({
  headerSection: {
    padding: headerSectionPadding,
    width: dimensions.width,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: PrimaryColors.white,
  },
  optionsHeaderSection: {
    paddingTop: 16,
    justifyContent: 'space-between',
  },
  modalHeaderSection: {
    padding: headerSectionPadding,
    width: dimensions.width,
    backgroundColor: PrimaryColors.white,
  },
  headerTitle: {
    fontFamily: 'Inter-Medium',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  header: {
    width: dimensions.width - headerSectionPadding * 2,
    marginLeft: -leftColWidth,
    paddingLeft: leftColWidth,
    paddingRight: leftColWidth - headerSectionPadding,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  leftCol: {
    width: leftColWidth,
  },
  rightCol: {
    width: rightColWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsRightCol: {
    width: rightColWidth - 48,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsLeftCol: {
    width: leftColWidth + 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    marginTop: 4,
    fontFamily: 'Inter-ExtraBold',
    fontSize: 24,
    lineHeight: 28,
    color: '#151F47',
  },
  subtitle: {
    fontFamily: 'Inter-Light',
  },
});

Header.propTypes = propTypes;

export default Header;
