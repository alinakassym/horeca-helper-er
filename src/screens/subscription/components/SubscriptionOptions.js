import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
// styles
import {globalStyles} from '../../../styles/globalStyles';
import {typography} from '../../../styles/typography';
import {PrimaryColors} from '../../../styles/colors';
// components
import RadioBtn from '../../../components/buttons/RadioBtn';
// utils
import {numberWithSpaces} from '../../../utils/common';
// locale
import i18n from '../../../assets/i18n/i18n';

const propTypes = {
  items: PropTypes.array,
  activeOption: PropTypes.object,
  selectedOption: PropTypes.object,
  onSelect: PropTypes.func,
};

class SubscriptionOptions extends React.PureComponent {
  render() {
    const {items, activeOption, selectedOption, onSelect} = this.props;
    return (
      <View style={styles.optionSection}>
        {items.map((item, index) => (
          <View
            key={index}
            style={[
              globalStyles.card,
              globalStyles.row,
              globalStyles.spaceBetween,
              index === 0 && globalStyles.mt0,
            ]}>
            {item.id === activeOption.id ? (
              <>
                <RadioBtn
                  style={globalStyles.mb0}
                  activeItem={selectedOption}
                  labelStyle={{...styles.labelStyle, ...styles.active}}
                  item={item}
                  itemKey={'title_ru'}
                  onSelect={() => onSelect(item)}
                />
                <Text style={{...typography.text2, ...styles.active}}>
                  {item.price
                    ? `${numberWithSpaces(item.price)} ₸`
                    : i18n.t('Free')}
                </Text>
              </>
            ) : (
              <>
                <RadioBtn
                  style={globalStyles.mb0}
                  activeItem={selectedOption}
                  labelStyle={styles.labelStyle}
                  item={item}
                  itemKey={'title_ru'}
                  onSelect={() => onSelect(item)}
                />
                <Text style={typography.text2}>
                  {item.price
                    ? `${numberWithSpaces(item.price)} ₸`
                    : i18n.t('Free')}
                </Text>
              </>
            )}
          </View>
        ))}
        <View
          style={[
            globalStyles.row,
            globalStyles.alignCenter,
            globalStyles.contentCenter,
          ]}>
          {activeOption && (
            <Text style={[typography.text2, styles.activeOptionText]}>
              {activeOption.value}
            </Text>
          )}
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  optionSection: {
    marginTop: 16,
    backgroundColor: PrimaryColors.background,
  },
  labelStyle: {
    fontFamily: 'Inter-Bold',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
    textTransform: 'uppercase',
  },
  active: {
    color: PrimaryColors.brand,
  },
  activeOptionText: {
    marginTop: 25,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 100,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: PrimaryColors.brand,
    color: PrimaryColors.brand,
    textAlignVertical: 'center',
  },
});

SubscriptionOptions.propTypes = propTypes;
export default SubscriptionOptions;
