import React, { useState } from 'react';
import { Pressable, Text, View, TextInput, Button, Modal, Alert, StyleSheet } from 'react-native';

export const ModalSelect = ({ label, value, valueKey, items, onChange, onCancel }) => {
  const [selected, setSelected] = useState(value[valueKey]);
  const [visible, setVisible] = useState(false);

  const saveHandler = (selectedItem) => {
    value[valueKey] = selectedItem;
    setVisible(false);
  }

  return (
    <React.Fragment>
      <Pressable onPress={() => {setVisible(true)}}>
        <Text style={styles.label}>{label}</Text>
        <Text
          style={styles.input}>
          {value[valueKey]}
        </Text>
      </Pressable>
      <Modal visible={visible} animationType='slide' transparent={true}>
        <View style={styles.overlay}>
          <View style={styles.wrap}>
            {items.map((item, index) => (
              <Pressable style={styles.item} key={index} onPress={() => {saveHandler(item)}}>
                <Text>{item}</Text>
              </Pressable>
            ))}
          </View>
        </View>
      </Modal>
    </React.Fragment>
  )
}

const styles = StyleSheet.create({
  label: {
    marginBottom: 8,
    fontFamily: 'Roboto-Medium',
    fontSize: 16
  },
  input: {
    marginBottom: 16,
    paddingVertical: 8,
    paddingHorizontal: 16,
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    color: '#000000',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#CCCCCC'
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.2)'
  },
  wrap: {
    padding: 16,
    width: '80%',
    borderRadius: 8,
    backgroundColor: '#FFFFFF'
  },
  item: {
    padding: 24,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
