import React, {useEffect, useState} from 'react';
import {SafeAreaView, StyleSheet} from 'react-native';

// styles
import {PrimaryColors} from '../../styles/colors';
import {globalStyles} from '../../styles/globalStyles';

// components
import Header from '../../components/Header';
import RatingScale from './components/RatingScale';
import MultilineInput from '../../components/inputs/MultilineInput';
import DisabledButton from '../../components/buttons/DisabledButton';
import GradientButton from '../../components/buttons/GradientButton';
import LinearGradient from 'react-native-linear-gradient';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import lodash from 'lodash';
import {putEmployeeReview} from '../../services/EmployeesService';
import i18n from '../../assets/i18n/i18n';

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
        title={i18n.t("Employee's rating")}
      />
      <KeyboardAwareScrollView
        style={styles.section}
        enableResetScrollToCoords={false}>
        <RatingScale
          title={i18n.t('Discipline and responsibility')}
          score={review.disciplineScore}
          onPress={val => setReview({...review, disciplineScore: val})}
        />
        <RatingScale
          title={i18n.t('Communication and literacy')}
          score={review.communicationsScore}
          onPress={val => setReview({...review, communicationsScore: val})}
        />
        <RatingScale
          title={i18n.t('Professionalism and experience')}
          score={review.professionalismScore}
          onPress={val => setReview({...review, professionalismScore: val})}
        />
        <RatingScale
          title={i18n.t('Neatness and etiquette')}
          score={review.neatnessScore}
          onPress={val => setReview({...review, neatnessScore: val})}
        />
        <RatingScale
          title={i18n.t('Team player')}
          score={review.teamScore}
          onPress={val => setReview({...review, teamScore: val})}
        />
        <MultilineInput
          style={globalStyles.section}
          label={i18n.t('Comment')}
          value={comment}
          marginBottom={isFocused ? 0 : 88}
          onChangeText={val => setComment(val)}
          onInputFocus={val => {
            setIsFocused(val);
          }}
        />
      </KeyboardAwareScrollView>
      {!valid ? (
        <LinearGradient
          colors={[
            'rgba(255, 255, 255, 0)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 0.9)',
            'rgba(255, 255, 255, 1)',
          ]}
          style={styles.btnSection}>
          <DisabledButton label={i18n.t('Rate2')} />
        </LinearGradient>
      ) : (
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
  section: {
    flex: 1,
  },
  btnSection: {
    paddingTop: 20,
    paddingHorizontal: 20,
    paddingBottom: 20,
    height: 88,
  },
});
