import React from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {IconSearch} from '../../../assets/icons/tabs/IconSearch';
import {IconClose} from '../../../assets/icons/main/IconClose';
import Header from '../../../components/Header';

export const MessageSearch = ({text, onChangeText, onEndEditing, onClear}) => {
  return (
    <View style={styles.search}>
      <Header title={'Чат'} subtitle={'с соискателями'} />
      <View style={styles.inputSection}>
        <TextInput
          value={text}
          style={styles.input}
          placeholder={'Search'}
          placeholderTextColor={'#B9C1CA'}
          onChangeText={onChangeText}
          onEndEditing={onEndEditing}
        />
        <View style={styles.iconSearch}>
          <IconSearch size={24} color={'#B9C1CA'} />
        </View>

        {text.length > 0 && (
          <TouchableOpacity onPress={onClear} style={styles.iconClear}>
            <IconClose size={15} color={'#8391A1'} width={2} />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    backgroundColor: '#FFFFFF',
  },
  inputSection: {
    position: 'relative',
    paddingHorizontal: 20,
  },
  input: {
    marginBottom: 12,
    paddingHorizontal: 0,
    paddingLeft: 48,
    paddingRight: 38,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    backgroundColor: '#F0F2F4',
    color: '#151F47',
  },
  iconSearch: {
    position: 'absolute',
    top: 12,
    left: 32,
  },
  iconClear: {
    position: 'absolute',
    top: 15,
    right: 33,
    padding: 2,
  },
});
