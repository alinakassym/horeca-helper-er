import React from 'react';
import {View, StyleSheet, Text, TextInput} from 'react-native';
import {IconSearch} from '../../../assets/icons/tabs/IconSearch';

export const MessageSearch = () => {
  return (
    <View style={styles.search}>
      <Text style={styles.header}>
        <Text style={styles.textBold}>Chat </Text>
        with candidates
      </Text>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder={'Search'}
          placeholderTextColor={'#B9C1CA'}
        />
        <View style={styles.iconSearch}>
          <IconSearch size={24} color={'#B9C1CA'} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  search: {
    paddingTop: 30,
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
    fontSize: 24,
    lineHeight: 28,
    color: '#151F47',
  },
  textBold: {
    fontFamily: 'Inter-SemiBold',
  },
  inputSection: {
    position: 'relative',
  },
  input: {
    marginBottom: 12,
    paddingHorizontal: 0,
    paddingLeft: 48,
    paddingRight: 8,
    borderRadius: 10,
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 14,
    backgroundColor: '#F0F2F4',
    color: '#151F47',
  },
  iconSearch: {
    position: 'absolute',
    top: 12,
    left: 12,
  },
});
