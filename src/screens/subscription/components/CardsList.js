import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
// styles
import {globalStyles} from '../../../styles/globalStyles';
import {PrimaryColors} from '../../../styles/colors';
// icons
import IconMasterCard from '../../../assets/icons/bankAccount/IconMasterCard';
import IconVisa from '../../../assets/icons/bankAccount/IconVisa';
import IconCard from '../../../assets/icons/bankAccount/IconCard';
// utils
import {cardNumber} from '../../../utils/common';
// components
import RadioBtn from '../../../components/buttons/RadioBtn';

const propTypes = {
  items: PropTypes.array,
  activeItem: PropTypes.object,
  onPress: PropTypes.func,
};

class CardsList extends React.PureComponent {
  render() {
    const {items, activeItem, onPress} = this.props;
    return (
      <TouchableOpacity activeOpacity={0.7} onPress={onPress}>
        {items.map((item, index) => (
          <View key={index} elevation={5} style={styles.shadow}>
            <View style={styles.card}>
              <View style={[globalStyles.row, globalStyles.alignCenter]}>
                {item.type === 'mc' ? (
                  <IconMasterCard style={globalStyles.mr4} />
                ) : item.type === 'visa' ? (
                  <IconVisa style={globalStyles.mr4} />
                ) : (
                  <IconCard style={globalStyles.mr4} size={50} />
                )}
                <Text>{cardNumber(item.cardNumber)}</Text>
              </View>
              <RadioBtn
                item={item}
                activeItem={activeItem}
                style={globalStyles.mb0}
              />
            </View>
          </View>
        ))}
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  shadow: {
    position: 'relative',
    marginTop: -6,
    marginBottom: 20,
    marginHorizontal: -6,
    height: 80,
    borderRadius: 12,
    shadowColor: PrimaryColors.shadow,
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowRadius: 5,
    shadowOpacity: 1,
  },
  card: {
    position: 'absolute',
    top: 6,
    left: 6,
    right: 6,
    bottom: 0,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 12,
    backgroundColor: PrimaryColors.white,
  },
});

CardsList.propTypes = propTypes;
export default CardsList;
