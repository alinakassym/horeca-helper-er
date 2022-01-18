import React from 'react';
import PropTypes from 'prop-types';
import {FlatList, Text, StyleSheet, Pressable} from 'react-native';
import {PrimaryColors} from '../styles/colors';

const propTypes = {
  items: PropTypes.array,
  onSelect: PropTypes.func,
};

class HorizontalFilter extends React.PureComponent {
  render() {
    const {items, onSelect} = this.props;

    const renderItem = ({item}) => (
      <Pressable onPress={() => onSelect(item)} style={styles.badge}>
        <Text style={styles.badgeTitle}>{item.title_ru}</Text>
      </Pressable>
    );

    return (
      <FlatList
        contentContainerStyle={styles.horizontalScroll}
        horizontal
        data={items}
        keyExtractor={item => item.id}
        renderItem={renderItem}
      />
    );
  }
}

const styles = StyleSheet.create({
  horizontalScroll: {
    paddingLeft: 20,
    paddingRight: 12,
    height: 60,
    paddingBottom: 20,
    backgroundColor: PrimaryColors.white,
  },
  badge: {
    marginRight: 8,
    paddingHorizontal: 12,
    height: 40,
    justifyContent: 'center',
    borderRadius: 8,
    backgroundColor: PrimaryColors.grey4,
  },
  badgeTitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
});

HorizontalFilter.propTypes = propTypes;
export default HorizontalFilter;
