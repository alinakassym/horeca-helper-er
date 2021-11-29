import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  ActivityIndicator,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from 'react-native';
import moment from 'moment';
import {getEmployeeById} from '../../services/EmployeesService';
import {WorkList} from './WorkList';
import {IconStar} from '../../assets/icons/main/IconStar';

const dimensions = Dimensions.get('screen');

export const EmployeeScreen = ({route, navigation}) => {
  const employeeId = route.params.id;

  const [item, setItem] = useState({
    id: 9,
    firstName: null,
    lastName: null,
    email: null,
    photoFilename: null,
    googleId: null,
    positionId: null,
    description: null,
    cityId: null,
    birthDate: null,
    genderId: null,
    experience: null,
    scheduleId: null,
    salary: null,
    createdAt: null,
    updatedAt: null,
    works: [],
    position: null,
    city: null,
    gender: null,
    schedule: null,
    photoUrl: null,
    avgAvgScore: undefined,
  });
  const [loading, setLoading] = useState({});

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        try {
          const result = await getEmployeeById(employeeId);
          setItem(result.data);
          setLoading(false);
        } catch (e) {
          console.log('getEmployeeById err:', e);
        }
      });
    }
    fetchData();
  }, [employeeId, navigation]);

  const getAge = birthDate => {
    return moment().diff(birthDate, 'years', false);
  };

  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={[styles.section, styles.row]}>
        <View style={styles.leftCol}>
          <View style={styles.row}>
            <Text style={styles.title}>
              {item.firstName} {item.lastName}
            </Text>
          </View>

          {item.birthDate && (
            <View style={styles.row}>
              <Text style={styles.text}>
                <Text style={[styles.text, styles.textBold]}>Age: </Text>
                {getAge(item.birthDate)} y.o.
              </Text>
            </View>
          )}
          {item.gender && (
            <View style={styles.row}>
              <Text style={styles.text}>
                <Text style={[styles.text, styles.textBold]}>Gender: </Text>
                {item.gender.title}
              </Text>
            </View>
          )}
          {item.position && (
            <View style={styles.row}>
              <Text style={styles.text}>
                <Text style={[styles.text, styles.textBold]}>Position: </Text>
                {item.position.title}
              </Text>
            </View>
          )}
          {item.city && (
            <View style={styles.row}>
              <Text style={styles.text}>
                <Text style={[styles.text, styles.textBold]}>Location: </Text>
                {item.city.title}
              </Text>
            </View>
          )}
          {item.schedule && (
            <View style={styles.row}>
              <Text style={styles.text}>
                <Text style={[styles.text, styles.textBold]}>Schedule: </Text>
                {item.schedule.title}
              </Text>
            </View>
          )}
          {item.email && (
            <View style={[styles.row, styles.flexWrap]}>
              <Text style={styles.text}>
                <Text style={[styles.text, styles.textBold]}>Email: </Text>
                {item.email}
              </Text>
            </View>
          )}
        </View>
        <View style={[styles.rightCol, styles.alignCenter]}>
          <View style={styles.imageWrapper}>
            <Image style={styles.img} source={{uri: item.photoUrl}} />
          </View>
          {item.avgAvgScore && (
            <View style={[styles.row, styles.alignCenter]}>
              <View style={styles.scoreIcon}>
                <IconStar color={'#F1C40F'} fillColor={'#F1C40F'} size={18} />
              </View>
              <Text style={styles.text}>
                {JSON.stringify(item.avgAvgScore)}{' '}
              </Text>
            </View>
          )}
        </View>
      </View>

      <View style={[styles.section, styles.col]}>
        {item.salary && (
          <View style={styles.row}>
            <Text style={styles.text}>
              <Text style={[styles.text, styles.textBold]}>Salary: </Text>
              {numberWithSpaces(item.salary)} KZT
            </Text>
          </View>
        )}

        {!!item.description && item.description.length > 3 && (
          <View style={styles.row}>
            <Text textBreakStrategy={'simple'} style={styles.text}>
              <Text style={[styles.text, styles.textBold]}>About: </Text>
              {item.description}
            </Text>
          </View>
        )}
      </View>

      <View style={[styles.section, styles.col]}>
        <Text style={[styles.text, styles.textBold]}>Experience: </Text>
        <WorkList items={item.works} navigation={navigation} />
      </View>
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
  flexWrap: {
    flexWrap: 'wrap',
  },

  spaceBetween: {
    justifyContent: 'space-between',
  },

  alignCenter: {
    alignItems: 'center',
  },

  imageWrapper: {
    marginBottom: 8,
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
  scoreIcon: {
    marginBottom: 6,
    marginRight: 6,
    alignItems: 'center',
  },
});
