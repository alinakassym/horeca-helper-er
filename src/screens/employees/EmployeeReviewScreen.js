import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet, Dimensions} from 'react-native';

// styles
import {PrimaryColors} from '../../styles/colors';
import {globalStyles} from '../../styles/globalStyles';

// components
import Header from '../../components/Header';
import RatingScale from './components/RatingScale';
import MultilineInput from '../../components/MultilineInput';
import DisabledButton from '../../components/buttons/DisabledButton';
import GradientButton from '../../components/buttons/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import lodash from 'lodash';
import {putEmployeeReview} from '../../services/EmployeesService';

const dimensions = Dimensions.get('screen');

export const EmployeeReviewScreen = ({route, navigation}) => {
  const employeeId = route.params.id;

  const [isFocused, setIsFocused] = useState(false);
  const [valid, setValid] = useState(false);
  const [comment, setComment] = useState('');
  const [review, setReview] = useState({
    disciplineScore: null,
    communicationsScore: null,
    professionalismScore: null,
    neatnessScore: null,
    teamScore: null,
  });

  const sendReview = async () => {
    const data = {...review, comment: comment};
    try {
      await putEmployeeReview(employeeId, data);
      navigation.navigate('Employees');
    } catch (e) {
      console.log('sendReview err: ', e);
    }
  };

  useEffect(() => {
    setValid(lodash.every(Object.values(review), val => val && val > 0));
  }, [review]);

  return (
    <SafeAreaView
      style={[globalStyles.container, styles.companyReviewContainer]}>
      <Header
        modal
        onClose={() => navigation.goBack()}
        title={'Оценка сотрудника'}
      />
      <KeyboardAwareScrollView enableResetScrollToCoords={false}>
        <RatingScale
          title={'Дисциплина и ответственность'}
          score={review.disciplineScore}
          onPress={val => setReview({...review, disciplineScore: val})}
        />
        <RatingScale
          title={'Коммуникация и грамотность'}
          score={review.communicationsScore}
          onPress={val => setReview({...review, communicationsScore: val})}
        />
        <RatingScale
          title={'Профессионализм и опыт'}
          score={review.professionalismScore}
          onPress={val => setReview({...review, professionalismScore: val})}
        />
        <RatingScale
          title={'Опрятность и этикет'}
          score={review.neatnessScore}
          onPress={val => setReview({...review, neatnessScore: val})}
        />
        <RatingScale
          title={'Командный игрок'}
          score={review.teamScore}
          onPress={val => setReview({...review, teamScore: val})}
        />
        <MultilineInput
          style={globalStyles.section}
          label={'Комментарий'}
          value={comment}
          marginBottom={isFocused ? 0 : 88}
          onChangeText={val => setComment(val)}
          onInputFocus={val => {
            setIsFocused(val);
          }}
        />
      </KeyboardAwareScrollView>
      {!isFocused && !valid && (
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 1)',
          ]}
          style={styles.btnSection}>
          <DisabledButton label={'Поставить оценку'} />
        </LinearGradient>
      )}
      {!isFocused && valid && (
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 1)',
          ]}
          style={styles.btnSection}>
          <GradientButton
            onPress={() => sendReview()}
            label={'Поставить оценку'}
          />
        </LinearGradient>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  companyReviewContainer: {
    position: 'relative',
    backgroundColor: PrimaryColors.white,
    zIndex: 1,
  },
  btnSection: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: 88,
    zIndex: 3,
  },
});
