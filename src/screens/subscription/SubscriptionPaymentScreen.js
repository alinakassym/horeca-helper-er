import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Dimensions} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// components
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import Input from '../../components/inputs/Input';
import GradientButton from '../../components/buttons/GradientButton';

// utils
import {numberWithSpaces} from '../../utils/common';

// locale
import i18n from '../../assets/i18n/i18n';
import {typography} from '../../styles/typography';

const dimensions = Dimensions.get('screen');
const width = dimensions.width;

export const SubscriptionPaymentScreen = ({route, navigation}) => {
  const optionParam = route.params && route.params.option;

  const [option, setOption] = useState();
  useEffect(() => {
    const fetchData = async () => {
      setOption(optionParam);
    };
    fetchData().then();
  }, [optionParam]);
  return (
    <SafeAreaView style={styles.container}>
      <Header
        style={styles.header}
        title={i18n.t('Payment')}
        goBack
        onClose={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
        <View style={[globalStyles.section, globalStyles.mt5]}>
          <Input label={i18n.t('Card number')} />
          <Input label={i18n.t('Cardholder name')} />
          <View style={styles.row}>
            <View style={styles.col}>
              <Input label={i18n.t('Valid until')} />
            </View>
            <View style={styles.col}>
              <Input label={i18n.t('CV-code')} />
            </View>
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={globalStyles.btnSection}>
        <View style={styles.priceSection}>
          <Text style={[typography.text2, typography.textColorElement]}>
            {i18n.t('To pay')}
          </Text>
          {option && (
            <Text style={styles.price}>
              {option.price
                ? `${numberWithSpaces(option.price)} ₸`
                : i18n.t('Free')}
            </Text>
          )}
        </View>
        <GradientButton style={globalStyles.mb5} label={i18n.t('Pay')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    height: dimensions.height,
    flex: 1,
    backgroundColor: PrimaryColors.white,
  },
  row: {
    marginHorizontal: -10,
    width: width - 40,
    flexDirection: 'row',
  },
  col: {
    marginHorizontal: 10,
    width: (width - 60) / 2,
  },
  priceSection: {
    paddingHorizontal: 12,
    paddingVertical: 13,
    marginBottom: 12,
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
