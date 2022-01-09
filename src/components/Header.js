import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet, Dimensions} from 'react-native';

// styles
import {globalStyles} from '../styles/globalStyles';
import {PrimaryColors} from '../styles/colors';

// components
import BackButton from './buttons/BackButton';
import CloseButton from './buttons/CloseButton';

const dimensions = Dimensions.get('screen');

const propTypes = {
  onClose: PropTypes.func,
  children: PropTypes.object,
  goBack: PropTypes.bool,
  options: PropTypes.bool,
  modal: PropTypes.bool,
  title: PropTypes.string,
  subtitle: PropTypes.string,
  style: PropTypes.object,
};

class Header extends React.PureComponent {
  render() {
    const {onClose, children, goBack, options, modal, title, subtitle, style} =
      this.props;
    return (
      <React.Fragment>
        {goBack ? (
          <View style={[styles.headerSection, style]}>
            <View style={styles.leftCol}>
              <BackButton onPress={onClose} />
            </View>
            {title ? (
              <View style={styles.header}>
                <Text style={styles.headerTitle}>{title}</Text>
                <View style={styles.floatRightBlock}>{children}</View>
              </View>
            ) : (
              <View style={styles.rightCol}>{children}</View>
            )}
          </View>
        ) : options ? (
          <View
            style={[styles.headerSection, styles.optionsHeaderSection, style]}>
            <Text style={[styles.optionsLeftCol, styles.title]}>
              {title} <Text style={styles.subtitle}>{subtitle}</Text>
            </Text>
            <View style={styles.optionsRightCol}>{children}</View>
          </View>
        ) : modal ? (
          <View style={[styles.modalHeaderSection, style]}>
            <CloseButton onPress={onClose} />
            <Text style={[styles.title, globalStyles.mt4]}>{title}</Text>
          </View>
        ) : (
          <View style={[styles.headerSection, style]}>
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
    position: 'relative',
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
  floatRightBlock: {
    position: 'absolute',
    right: 0,
    top: 0,
  },
  leftCol: {
    width: leftColWidth,
  },
  rightCol: {
    width: rightColWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsLeftCol: {
    width: rightColWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionsRightCol: {
    width: leftColWidth - 8,
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
