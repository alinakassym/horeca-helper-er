import React from 'react';
import PropTypes from 'prop-types';
import {Modal, Text, View, Pressable, StyleSheet} from 'react-native';
import {PrimaryColors} from '../styles/colors';
import ThemeImage from '../assets/images/ThemeImage';
import PlainButton from './buttons/PlainButton';

const propTypes = {
  visible: PropTypes.bool,
  text: PropTypes.string,
  actionBtnLabel: PropTypes.string,
  onAction: PropTypes.func,
  onCancel: PropTypes.func,
};

class CustomAlert extends React.PureComponent {
  render() {
    const {visible, text, actionBtnLabel, onAction, onCancel} = this.props;
    const label = actionBtnLabel || 'OK';
    return (
      <Modal visible={visible} animationType="fade" transparent={true}>
        <Pressable onPress={onCancel} style={styles.overlay}>
          <View style={styles.wrapper}>
            <ThemeImage height={96} />
            <Text style={styles.text}>{text}</Text>
            <View style={styles.btnSection}>
              <PlainButton
                btnStyle={styles.btn}
                onPress={onCancel}
                label={'Отмена'}
              />
              <PlainButton
                btnStyle={styles.btnRight}
                onPress={onAction}
                label={label}
              />
            </View>
          </View>
        </Pressable>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  overlay: {
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrapper: {
    position: 'relative',
    width: 280,
    borderRadius: 20,
    backgroundColor: PrimaryColors.white,
    overflow: 'hidden',
  },
  text: {
    paddingVertical: 24,
    paddingHorizontal: 16,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    textAlign: 'center',
    color: PrimaryColors.element,
  },
  btnRight: {
    flex: 1,
    borderLeftWidth: 0.5,
    borderLeftColor: PrimaryColors.grey1,
  },
  btnSection: {
    width: 280,
    flexDirection: 'row',
    borderTopWidth: 0.5,
    borderTopColor: PrimaryColors.grey1,
    backgroundColor: PrimaryColors.white,
  },
  btn: {
    flex: 1,
  },
});

CustomAlert.propTypes = propTypes;
export default CustomAlert;
