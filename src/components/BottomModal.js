import React from 'react';
import PropTypes from 'prop-types';
import {View, Modal, Pressable, StyleSheet} from 'react-native';
import {PrimaryColors} from '../styles/colors';
import ModalButton from './buttons/ModalButton';

const propTypes = {
  visible: PropTypes.bool,
  onCancel: PropTypes.func,
};

class BottomModal extends React.PureComponent {
  render() {
    const {visible, onCancel, children} = this.props;
    return (
      <Modal visible={visible} animationType="fade" transparent={true}>
        <Pressable onPress={onCancel} style={styles.overlay}>
          <View style={styles.wrapper}>
            <Pressable style={styles.block}>{children}</Pressable>
            <Pressable onPress={onCancel} style={styles.block}>
              <ModalButton label={'Отмена'} onPress={onCancel} />
            </Pressable>
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
    backgroundColor: 'rgba(0,0,0,0.2)',
  },
  wrapper: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 8,
  },
  block: {
    marginTop: 4,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: PrimaryColors.grey5,
    overflow: 'hidden',
  },
});

BottomModal.propTypes = propTypes;
export default BottomModal;
