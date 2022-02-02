import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';

//images
import BackgroundImage from '../../assets/images/BackgroundImage';

// components
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import SubscriptionOptions from './components/SubscriptionOptions';
import SubscriptionDescriptions from './components/SubscriptionDescriptions';
import GradientButton from '../../components/buttons/GradientButton';
import CardsList from './components/CardsList';

// locale
import i18n from '../../assets/i18n/i18n';
import BottomModal from '../../components/BottomModal';
import PlainButton from '../../components/buttons/PlainButton';
import TotalPrice from './components/TotalPrice';

const dimensions = Dimensions.get('screen');
const imageSize = dimensions.width;

const cardsData = [
  {id: 1, cardNumber: '************3456', type: 'mc'},
  // {id: 2, cardNumber: '************1234', type: 'visa'},
  // {id: 2, cardNumber: '************1234', type: 'card'},
];

const pointsData = [
  'Приглашение соискателей',
  'Возможность вести диалог',
  'Оценка внутренних сотрудников',
  'Продвижение вакансий',
];

const optionsData = [
  {
    id: 1,
    title: '3 days',
    title_ru: '3 дня',
    price: null,
    value: '3 месячная подписка активна',
  },
  {id: 2, title: '3 month', title_ru: '3 месяца', price: 9600},
  {id: 3, title: '6 month', title_ru: '6 месяцев', price: 13800},
  {id: 4, title: '1 year', title_ru: '1 год', price: 19990},
];

const activeOptionData = optionsData[0];

export const SubscriptionScreen = ({navigation}) => {
  const [cards, setCards] = useState([]);
  const [activeCard, setActiveCard] = useState();
  const [points, setPoints] = useState([]);
  const [options, setOptions] = useState([]);
  const [activeOption, setActiveOption] = useState();
  const [selectedOption, setSelectedOption] = useState();
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setCards(cardsData);
      setActiveCard(cardsData[0]);
      setPoints(pointsData);
      setOptions(optionsData);
      setActiveOption(activeOptionData);
      setSelectedOption(activeOptionData);
      setLoading(false);
    };
    fetchData().then();
  }, []);
  if (loading) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <Header
          style={styles.header}
          goBack
          onClose={() => navigation.goBack()}
        />
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size={'large'} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <BackgroundImage style={styles.bgImage} size={imageSize} />
      <Header
        style={styles.header}
        goBack
        onClose={() => navigation.goBack()}
      />
      <BottomModal
        visible={visible}
        title={i18n.t('Payment method')}
        onCancel={() => setVisible(false)}>
        <CardsList items={cards} activeItem={activeCard} />
        <PlainButton
          btnStyle={styles.btn}
          label={i18n.t('Change card')}
          onPress={() => {
            setVisible(false);
            navigation.navigate('SubscriptionPayment', {
              option: selectedOption,
            });
          }}
        />
        <TotalPrice price={selectedOption.price} />
        <GradientButton
          onPress={() => {
            setVisible(false);
            navigation.navigate('SubscriptionPayment', {
              option: selectedOption,
            });
          }}
          label={i18n.t('Pay')}
        />
      </BottomModal>
      <KeyboardAwareScrollView
        style={styles.container}
        enableResetScrollToCoords={false}>
        <SubscriptionDescriptions items={points} />
        <SubscriptionOptions
          items={options}
          activeOption={activeOption}
          selectedOption={selectedOption}
          onSelect={val => setSelectedOption(val)}
        />
      </KeyboardAwareScrollView>
      <View style={globalStyles.btnSection}>
        <GradientButton
          style={globalStyles.mt5}
          label={i18n.t('Subscribe')}
          onPress={() => setVisible(true)}
        />
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
  btn: {
    marginBottom: 32,
    paddingVertical: 12,
    minHeight: 18,
  },
});
