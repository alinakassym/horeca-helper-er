import React from 'react';
import moment from 'moment';
import 'moment/locale/ru';
import PropTypes from 'prop-types';
import {View, Text, StyleSheet} from 'react-native';

// styles
import {PrimaryColors, StatusesColors} from '../../../styles/colors';
import {globalStyles} from '../../../styles/globalStyles';

// icons
import {IconSearch} from '../../../assets/icons/tabs/IconSearch';
import {IconDot} from '../../../assets/icons/main/IconDot';

// components
import MenuButton from '../../../components/buttons/MenuButton';
import PlainButton from '../../../components/buttons/PlainButton';

const propTypes = {
  item: PropTypes.object,
  onPress: PropTypes.func,
  findRelevant: PropTypes.func,
};

class JobCard extends React.PureComponent {
  render() {
    const {item, onPress, findRelevant} = this.props;

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
        <View style={globalStyles.card}>
          <View style={[globalStyles.row, globalStyles.spaceBetween]}>
            <View>
              <View style={[globalStyles.row, globalStyles.alignCenter]}>
                <Text style={styles.position}>{item.position.title_ru}</Text>
                <IconDot
                  size={8}
                  style={globalStyles.ml3}
                  color={
                    item.isActive ? StatusesColors.green : StatusesColors.red
                  }
                />
              </View>
              <Text style={styles.location}>{item.city.title_ru}</Text>
            </View>
            <MenuButton onPress={onPress} />
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
          ) : (
            item.salaryMax && (
              <Text style={styles.salary}>
                до {numberWithSpaces(item.salaryMax)} KZT
              </Text>
            )
          )}
          {!!item.description && (
            <Text style={styles.description}>{item.description}</Text>
          )}
          <PlainButton
            onPress={findRelevant}
            btnStyle={{
              ...globalStyles.mt6,
              ...globalStyles.row,
              ...globalStyles.alignSelfStart,
            }}
            label={'Найти подходящих кандидатов'}>
            <IconSearch
              style={globalStyles.mr3}
              size={16}
              width={3}
              color={PrimaryColors.brand}
            />
          </PlainButton>
        </View>
        <Text style={styles.updatedAt}>
          Обновлено {formattedDate(item.updatedAt)}
        </Text>
      </>
    );
  }
}

const styles = StyleSheet.create({
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

JobCard.propTypes = propTypes;
export default JobCard;
