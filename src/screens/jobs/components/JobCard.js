import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {PrimaryColors} from '../../../styles/colors';
import MenuButton from '../../../components/buttons/MenuButton';
import moment from 'moment';
import 'moment/locale/ru';
import { IconSearch } from "../../../assets/icons/tabs/IconSearch";

export const JobCard = ({item, onPress, findRelevant}) => {
  const numberWithSpaces = val => {
    let parts = val.toString().split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
    return parts.join('.');
  };
  moment.locale('ru');
  const formattedDate = date => {
    const fd = moment(date).format('DD MMM YYYY');
    return fd.slice(0, 1).toUpperCase() + fd.substr(1, fd.length - 1);
  };

  return (
    <>
      <View style={styles.card}>
        <View style={[styles.row, styles.spaceBetween]}>
          <View>
            <Text style={styles.position}>{item.position.title}</Text>
            <Text style={styles.location}>{item.city.title_ru}</Text>
          </View>
          <MenuButton />
        </View>
        {item.salaryMin && item.salaryMax ? (
          <Text style={styles.salary}>
            {numberWithSpaces(item.salaryMin)} -{' '}
            {numberWithSpaces(item.salaryMax)} KZT
          </Text>
        ) : item.salaryMin ? (
          <Text style={styles.salary}>
            от {numberWithSpaces(item.salaryMin)} KZT
          </Text>
        ) : item.salaryMax ? (
          <Text style={styles.salary}>
            до {numberWithSpaces(item.salaryMax)} KZT
          </Text>
        ) : (
          false
        )}
        {item.description && (
          <Text style={styles.description}>{item.description}</Text>
        )}
        <TouchableOpacity activeOpacity={0.7} style={styles.btn}>
          <IconSearch size={16} width={3} color={PrimaryColors.brand} />
          <Text style={styles.btnText}>Найти подходящих кандидатов</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.updatedAt}>
        Обновлено {formattedDate(item.updatedAt)}
      </Text>
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    marginTop: 8,
    padding: 20,
    backgroundColor: PrimaryColors.white,
  },
  row: {
    flexDirection: 'row',
  },
  spaceBetween: {
    justifyContent: 'space-between',
  },
  btn: {
    marginTop: 24,
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnText: {
    marginLeft: 8,
    fontFamily: 'Inter-SemiBold',
    fontSize: 14,
    lineHeight: 20,
    color: PrimaryColors.brand,
  },
  position: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  location: {
    marginTop: 4,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
  salary: {
    marginTop: 24,
    fontFamily: 'Inter-Regular',
    fontSize: 20,
    lineHeight: 24,
    color: PrimaryColors.element,
  },
  description: {
    marginTop: 8,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.grey1,
  },
  updatedAt: {
    paddingVertical: 8,
    paddingHorizontal: 20,
    fontFamily: 'Inter-Regular',
    fontSize: 13,
    lineHeight: 16,
    textAlign: 'center',
    color: PrimaryColors.grey1,
    backgroundColor: PrimaryColors.grey4,
  },
});
