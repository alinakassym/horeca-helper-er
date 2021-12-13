import React from 'react';
import {Dimensions, View, Text, Image, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {globalStyles} from '../../../styles/globalStyles';
import {PrimaryColors} from '../../../styles/colors';
import OutlineButton from '../../../components/buttons/OutlineButton';

const dimensions = Dimensions.get('screen');

const propTypes = {
  item: PropTypes.object,
  openChat: PropTypes.func,
};

class JobApply extends React.PureComponent {
  render() {
    const {item, openChat} = this.props;
    const {job, employee} = item;
    return (
      <View style={globalStyles.card}>
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <View style={styles.imageWrapper}>
              <Image style={styles.img} source={{uri: employee.photoUrl}} />
            </View>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.userName}>
              {employee.firstName} {employee.lastName}
            </Text>
            <Text style={styles.text}>
              Отправил вам сопроводительное письмо на вакансию{' '}
              <Text style={styles.markedText}>{job.position.title_ru}</Text>
            </Text>
          </View>
        </View>
        <OutlineButton label={'Перейти в чат'} onPress={openChat} />
      </View>
    );
  }
}

const imageSize =
  dimensions.width * 0.15 > 60
    ? 60
    : dimensions.width * 0.15 < 52
    ? 52
    : dimensions.width * 0.15;

const pa = 20;
const leftColWidth = imageSize + 12;
const rightColWidth = dimensions.width - leftColWidth - pa * 2;

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
  },
  leftCol: {
    width: leftColWidth,
  },
  rightCol: {
    width: rightColWidth,
  },
  imageWrapper: {
    height: imageSize,
    width: imageSize,
    borderWidth: 0.7,
    borderRadius: imageSize,
    borderColor: PrimaryColors.grey3,
    overflow: 'hidden',
  },
  img: {
    height: '100%',
    width: '100%',
    backgroundColor: PrimaryColors.grey3,
  },
  userName: {
    marginBottom: 6,
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    lineHeight: 20,
    color: PrimaryColors.element,
  },
  text: {
    marginBottom: 20,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: PrimaryColors.grey1,
  },
  markedText: {
    lineHeight: 20,
    color: PrimaryColors.element,
  },
});

JobApply.propTypes = propTypes;
export default JobApply;
