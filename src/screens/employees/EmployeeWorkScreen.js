import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import moment from 'moment';
import PrimaryButton from '../../components/buttons/PrimaryButton';
import PlainButton from '../../components/buttons/PlainButton';
import {IconChecked} from '../../assets/icons/main/IconChecked';
import {EmployeeReview} from './EmployeeReview';
import {EmployeeReviewForm} from './EmployeeReviewForm';

const dimensions = Dimensions.get('screen');

export const EmployeeWorkScreen = ({route, navigation}) => {
  const [item, setItem] = useState({
    isConfirmed: null,
    employee: {
      firstName: '',
      lastName: '',
    },
    employeeReview: null,
  });

  const getAge = birthDate => {
    return moment().diff(birthDate, 'years', false);
  };

  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  const getFormattedDate = date => {
    return moment(date).format('MMM YYYY');
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        setItem(route.params.value);
      } catch (e) {
        console.log('setItem err: ', e);
      }
    });
  });

  return (
    <ScrollView>
      <View style={[styles.section, styles.row]}>
        <View style={styles.leftCol}>
          <Text style={styles.title}>
            {item.employee.firstName} {item.employee.lastName}
          </Text>

          {item.employee.birthDate && (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Age:</Text>
              <Text style={styles.text}>
                {' '}
                {getAge(item.employee.birthDate)} y.o.
              </Text>
            </View>
          )}
          {item.employee.gender && (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Gender:</Text>
              <Text style={styles.text}> {item.employee.gender.title}</Text>
            </View>
          )}
          {item.employee.position && (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Position:</Text>
              <Text style={styles.text}> {item.employee.position.title}</Text>
            </View>
          )}
          {item.employee.city && (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Location:</Text>
              <Text style={styles.text}> {item.employee.city.title}</Text>
            </View>
          )}
          {item.employee.schedule && (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Schedule:</Text>
              <Text style={styles.text}> {item.employee.schedule.title}</Text>
            </View>
          )}
        </View>
        <View style={styles.rightCol}>
          <View style={styles.imageWrapper}>
            <Image style={styles.img} source={{uri: item.employee.photoUrl}} />
          </View>
        </View>
      </View>

      <View style={[styles.section, styles.col]}>
        <Text style={styles.text}>
          <Text style={[styles.text, styles.textBold]}>Dates: </Text>
          {getFormattedDate(item.startDate)} - {getFormattedDate(item.endDate)}
        </Text>
      </View>
      {!item.isConfirmed ? (
        <View style={[styles.section, styles.row]}>
          <View style={styles.col}>
            <PrimaryButton label={'Confirm'} />
          </View>
          <View style={styles.col}>
            <PlainButton label={'Deny'} />
          </View>
        </View>
      ) : (
        <View style={[styles.section, styles.row, styles.alignCenter]}>
          <View style={styles.confirmedIcon}>
            <IconChecked color={'#185AB7'} size={18} />
          </View>
          <Text style={[styles.text, styles.textBold]}>Confirmed</Text>
        </View>
      )}

      {item.employeeReview ? (
        <EmployeeReview item={item.employeeReview} />
      ) : (
        <EmployeeReviewForm workId={item.id} navigation={navigation} />
      )}
    </ScrollView>
  );
};

const imageSize = dimensions.width * 0.24;

const styles = StyleSheet.create({
  section: {
    paddingTop: 16,
    paddingHorizontal: 16,
    width: dimensions.width,
  },
  leftCol: {
    width: dimensions.width - (imageSize + 34),
  },

  rightCol: {
    width: imageSize,
  },

  row: {
    flexDirection: 'row',
  },
  col: {
    flexDirection: 'column',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  alignCenter: {
    alignItems: 'center',
  },

  imageWrapper: {
    height: imageSize,
    width: imageSize,
    borderRadius: 10,
    backgroundColor: '#767676',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  title: {
    marginBottom: 16,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    marginBottom: 6,
    fontSize: 16,
  },
  confirmedIcon: {
    marginRight: 4,
    marginBottom: 4,
  },
});
