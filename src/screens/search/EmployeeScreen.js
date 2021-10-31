import React, {useEffect, useState} from 'react';
import {ActivityIndicator, Image, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import moment from 'moment';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  getEmployeeById,
  searchEmployees,
} from '../../services/EmployeesService';
import {WorkList} from './WorkList';

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
  });
  const [loading, setLoading] = useState({});

  useEffect(() => {
    function fetchData() {
      return navigation.addListener('focus', async () => {
        const hhToken = await AsyncStorage.getItem('hhToken');
        getEmployeeById(employeeId, hhToken)
          .then(result => {
            setItem(result.data);
            setLoading(false);
          })
          .catch(e => {
            console.log('searchEmployees err:', e);
          });
      });
    }
    fetchData();
  }, [employeeId, navigation]);

  const getAge = birthDate => {
    return moment().diff(birthDate, 'years', false);
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <React.Fragment>
      <View style={[styles.row, styles.spaceBetween]}>
        <View style={[styles.col, styles.paddingTop]}>
          <View>
            <Text style={styles.title}>
              {item.firstName} {item.lastName}
            </Text>
            {(item.gender || item.birthDate) && (
              <View style={styles.row}>
                {item.gender && (
                  <Text style={styles.caption}>{item.gender.title}</Text>
                )}
                {item.gender && item.birthDate && (
                  <Text style={styles.caption}>, </Text>
                )}
                {item.birthDate && (
                  <Text style={styles.caption}>
                    {getAge(item.birthDate)} years
                  </Text>
                )}
              </View>
            )}
            {item.position && (
              <View style={styles.row}>
                <Text style={[styles.text, styles.textBold]}>Position:</Text>
                <Text style={styles.text}> {item.position.title}</Text>
              </View>
            )}
            {item.city && (
              <View style={styles.row}>
                <Text style={[styles.text, styles.textBold]}>Location:</Text>
                <Text style={styles.text}> {item.city.title}</Text>
              </View>
            )}
            {item.schedule && (
              <View style={styles.row}>
                <Text style={[styles.text, styles.textBold]}>Schedule:</Text>
                <Text style={styles.text}> {item.schedule.title}</Text>
              </View>
            )}
          </View>
        </View>
        <View style={[styles.col, styles.paddingTop, styles.floatLeftTop]}>
          <View style={styles.imageWrapper}>
            <Image style={styles.img} source={{uri: item.photoUrl}} />
          </View>
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.col}>
          {item.salary && (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Salary:</Text>
              <Text style={styles.text}> {item.salary.toString()} KZT</Text>
            </View>
          )}

          {item.email && (
            <View style={styles.row}>
              <Text style={[styles.text, styles.textBold]}>Email:</Text>
              <Text style={styles.text}> {item.email} KZT</Text>
            </View>
          )}

          {/*{item.description && item.description.length > 3 && (
            <View style={styles.column}>
              <Text style={[styles.text, styles.textBold]}>About:</Text>
              <Text style={styles.text}>{item.description}</Text>
            </View>
          )}*/}

          <Text style={[styles.text, styles.textBold]}>Experience: </Text>


          <WorkList items={item.works} />

        </View>
      </View>
    </React.Fragment>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'column',
    paddingHorizontal: 16,
  },
  paddingTop: {
    paddingTop: 16,
  },
  floatLeftTop: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageWrapper: {
    marginTop: 10,
    height: 100,
    width: 100,
    borderRadius: 10,
    backgroundColor: '#767676',
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
  },
  divider: {
    borderBottomWidth: 1,
    borderColor: '#F6F6F6',
  },
  title: {
    marginBottom: 4,
    fontFamily: 'Roboto-Bold',
    fontSize: 20,
  },
  text: {
    marginBottom: 6,
    fontSize: 16,
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
  },
  caption: {
    marginBottom: 12,
    color: '#555555',
  },
});
