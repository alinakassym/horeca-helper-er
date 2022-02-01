import React, {useState} from 'react';
import {
  View,
  ScrollView,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
} from 'react-native';

// styles
import {globalStyles} from '../styles/globalStyles';
import {typography} from '../styles/typography';

// components
import Header from '../components/Header';

import i18n from '../assets/i18n/i18n';
import {Trans} from 'react-i18next';
import CodeNumberInput from '../components/inputs/CodeNumberInput';

export const ConfirmationCodeScreen = ({route, navigation}) => {
  const username = (route.params && route.params.phoneEmail) || '';

  let numberInputRefs = {
    first: undefined,
    second: undefined,
    third: undefined,
    fourth: undefined,
  };

  const firstInputChanged = val => {
    if (val) {
      const sliced = val.slice(-1);
      setCode([...sliced, ...code.splice(1)]);
      sliced && numberInputRefs.second.focus();
    } else {
      setCode([null, ...code.splice(1)]);
    }
  };

  const secondInputChanged = val => {
    if (val) {
      const sliced = val.slice(-1);
      setCode([...code[0], sliced, ...code.splice(2)]);
      sliced && numberInputRefs.third.focus();
    } else {
      setCode([...code[0], null, ...code.splice(2)]);
    }
  };

  const thirdInputChanged = val => {
    if (val) {
      const sliced = val.slice(-1);
      setCode([code[0], code[1], sliced, code[3]]);
      sliced && numberInputRefs.fourth.focus();
    } else {
      setCode([code[0], code[1], null, code[3]]);
    }
  };

  const fourthInputChanged = val => {
    if (val) {
      const sliced = val.slice(-1);
      setCode([...code.slice(0, 3), ...sliced]);
    } else {
      setCode([...code.slice(0, 3), null]);
    }
  };

  const goTo = val => {
    if (!code[val]) {
      switch (val) {
        case 1:
          code[val] === null && numberInputRefs.first.focus();
          firstInputChanged(null);
          break;
        case 2:
          code[val] === null && numberInputRefs.second.focus();
          secondInputChanged(null);
          break;
        case 3:
          code[val] === null && numberInputRefs.third.focus();
          thirdInputChanged(null);
          break;
      }
    }
  };

  const [code, setCode] = useState([null, null, null, null]);

  return (
    <SafeAreaView style={globalStyles.rootStackContainer}>
      <Header goBack onClose={() => navigation.goBack()} />
      <KeyboardAvoidingView behavior="position">
        <ScrollView>
          <View style={globalStyles.section}>
            <Text style={[typography.h1, globalStyles.mt6]}>
              {i18n.t('Confirmation code')}
            </Text>
            <Text style={[typography.text, globalStyles.mt3, globalStyles.mb6]}>
              <Trans
                i18nKey="A verification code has been sent to"
                values={{phone: username}}
              />
            </Text>
            <View style={[globalStyles.row, globalStyles.mb6]}>
              {/*FIRST NUMBER*/}
              <CodeNumberInput
                autoFocus
                ref={input => {
                  numberInputRefs.first = input;
                }}
                value={code[0]}
                onChangeText={val => firstInputChanged(val)}
              />

              {/*SECOND NUMBER*/}
              <CodeNumberInput
                ref={input => {
                  numberInputRefs.second = input;
                }}
                value={code[1]}
                onChangeText={val => secondInputChanged(val)}
                onKeyPress={() => goTo(1)}
              />

              {/*THIRD NUMBER*/}
              <CodeNumberInput
                ref={input => {
                  numberInputRefs.third = input;
                }}
                value={code[2]}
                onChangeText={val => thirdInputChanged(val)}
                onKeyPress={() => goTo(2)}
              />

              {/*FOURTH NUMBER*/}
              <CodeNumberInput
                ref={input => {
                  numberInputRefs.fourth = input;
                }}
                value={code[3]}
                onChangeText={val => fourthInputChanged(val)}
                onKeyPress={() => goTo(3)}
              />
            </View>
          </View>
        </ScrollView>
        <View style={globalStyles.btnSection} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};
