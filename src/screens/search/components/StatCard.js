import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, StyleSheet} from 'react-native';
import {PrimaryColors} from '../../../styles/colors';

const propTypes = {
  numUsers: PropTypes.number,
  numResumes: PropTypes.number,
};

class StatCard extends React.PureComponent {
  render() {
    const {numUsers, numResumes} = this.props;
    return (
      <View style={styles.row}>
        <View style={styles.card}>
          <Text style={styles.number}>{numUsers}</Text>
          <Text style={styles.text}>{`количество\nзарегистрированных`}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.number}>{numResumes}</Text>
          <Text style={styles.text}>{`резюме\nдобавлено`}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginLeft: -15,
    flexDirection: 'row',
  },
  card: {
    flex: 1,
    marginLeft: 15,
    paddingVertical: 31,
    paddingHorizontal: 10,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: PrimaryColors.grey3,
  },
  number: {
    fontFamily: 'Inter-Light',
    fontSize: 48,
    lineHeight: 56,
    textAlign: 'center',
    color: PrimaryColors.element,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 16,
    textAlign: 'center',
    color: PrimaryColors.grey1,
  },
});

StatCard.propTypes = propTypes;
export default StatCard;
