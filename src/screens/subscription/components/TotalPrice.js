import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {typography} from '../../../styles/typography';
import i18n from '../../../assets/i18n/i18n';
import {numberWithSpaces} from '../../../utils/common';
import {PrimaryColors} from '../../../styles/colors';
import PropTypes from 'prop-types';

const propTypes = {
  price: PropTypes.number,
};

class TotalPrice extends React.PureComponent {
  render() {
    const {price} = this.props;
    return (
      <View style={styles.priceSection}>
        <Text style={[typography.text2, typography.textColorElement]}>
          {i18n.t('To pay')}
        </Text>
        {price && price > 0 ? (
          <Text style={styles.price}>{`${numberWithSpaces(price)} ₸`}</Text>
        ) : (
          <Text style={styles.price}>{i18n.t('Free')}</Text>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  priceSection: {
    paddingHorizontal: 12,
    paddingVertical: 13,
    marginVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 10,
    borderWidth: 1.5,
    borderStyle: 'dashed',
    borderColor: PrimaryColors.grey3,
    color: PrimaryColors.brand,
    textAlignVertical: 'center',
  },
  price: {
    fontFamily: 'Inter-Bold',
    fontSize: 18,
    lineHeight: 22,
  },
});

TotalPrice.propTypes = propTypes;
export default TotalPrice;
