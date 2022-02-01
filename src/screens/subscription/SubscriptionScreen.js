import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Platform,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';
import BackgroundImage from '../../assets/images/BackgroundImage';

// components
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import Header from '../../components/Header';
import Point from '../../components/Point';

const dimensions = Dimensions.get('screen');
const imageSize = dimensions.width;
const paddingTop = Platform.OS === 'ios' ? 50 : 0;

const pointsData = [
  'Приглашение соискателей',
  'Возможность вести диалог',
  'Оценка внутренних сотрудников',
  'Продвижение вакансий',
];

export const SubscriptionScreen = () => {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setPoints(pointsData);
    };
    fetchData().then();
  }, []);
  return (
    <SafeAreaView style={globalStyles.container}>
      <KeyboardAwareScrollView
        style={styles.container}
        enableResetScrollToCoords={false}>
        <BackgroundImage size={imageSize} />
        <View style={styles.topSection}>
          <Header style={styles.header} goBack />
          <View style={styles.section}>
            <Text style={styles.title}>В подписку входит:</Text>
            {points.map((item, index) => (
              <Point key={index} label={item} />
            ))}
          </View>
        </View>
      </KeyboardAwareScrollView>
      <View style={globalStyles.btnSection} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  header: {
    backgroundColor: 'transparent',
  },
  topSection: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    paddingTop: paddingTop,
    width: imageSize,
    height: imageSize,
  },
  section: {
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
    fontSize: 26,
    lineHeight: 32,
    color: PrimaryColors.white,
  },
});
