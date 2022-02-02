import React, {useEffect, useState} from 'react';
import {SafeAreaView, View, Text, StyleSheet, Dimensions} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';
import {typography} from '../../styles/typography';

//images
import BackgroundImage from '../../assets/images/BackgroundImage';

// components
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import Point from '../../components/Point';
import RadioBtn from '../../components/buttons/RadioBtn';
import GradientButton from '../../components/buttons/GradientButton';

// utils
import {numberWithSpaces} from '../../utils/common';

// locale
import i18n from '../../assets/i18n/i18n';

const dimensions = Dimensions.get('screen');
const imageSize = dimensions.width;

const pointsData = [
  'Приглашение соискателей',
  'Возможность вести диалог',
  'Оценка внутренних сотрудников',
  'Продвижение вакансий',
];

const optionsData = [
  {id: 1, title: '3 days', title_ru: '3 дня', price: ''},
  {id: 2, title: '3 month', title_ru: '3 месяца', price: '9600'},
  {id: 3, title: '6 month', title_ru: '6 месяцев', price: '13800'},
  {id: 4, title: '1 year', title_ru: '1 год', price: '19990'},
];

const activeOptionData = optionsData[0];

export const SubscriptionScreen = ({navigation}) => {
  const [points, setPoints] = useState([]);
  const [options, setOptions] = useState([]);
  const [activeOption, setActiveOption] = useState();

  useEffect(() => {
    const fetchData = async () => {
      setPoints(pointsData);
      setOptions(optionsData);
      setActiveOption(activeOptionData);
    };
    fetchData().then();
  }, []);
  return (
    <SafeAreaView style={globalStyles.container}>
      <BackgroundImage style={styles.bgImage} size={imageSize} />
      <Header
        style={styles.header}
        goBack
        onClose={() => navigation.goBack()}
      />
      <KeyboardAwareScrollView
        style={styles.container}
        enableResetScrollToCoords={false}>
        <View style={styles.section}>
          <Text style={styles.title}>В подписку входит:</Text>
          {points.map((item, index) => (
            <Point key={index} label={item} />
          ))}
        </View>
        <View style={styles.optionSection}>
          {options.map((item, index) => (
            <View
              key={index}
              style={[
                globalStyles.card,
                globalStyles.row,
                globalStyles.spaceBetween,
                index === 0 && globalStyles.mt0,
              ]}>
              {item.id === activeOption.id ? (
                <RadioBtn
                  style={globalStyles.mb0}
                  labelStyle={styles.labelStyle}
                  activeItem={activeOption}
                  item={item}
                  itemKey={'title_ru'}
                />
              ) : (
                <RadioBtn
                  style={globalStyles.mb0}
                  labelStyle={styles.labelStyle}
                  item={item}
                  itemKey={'title_ru'}
                />
              )}
              <Text style={typography.text2}>
                {item.price
                  ? `${numberWithSpaces(item.price)} ₸`
                  : i18n.t('Free')}
              </Text>
            </View>
          ))}
        </View>
      </KeyboardAwareScrollView>
      <View style={globalStyles.btnSection}>
        <GradientButton style={globalStyles.mt5} label={i18n.t('Subscribe')} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  bgImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
  },
  header: {
    backgroundColor: 'transparent',
  },
  section: {
    paddingTop: 12,
    paddingHorizontal: 20,
  },
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
  title: {
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
    fontSize: 26,
    lineHeight: 32,
    color: PrimaryColors.white,
  },
});
