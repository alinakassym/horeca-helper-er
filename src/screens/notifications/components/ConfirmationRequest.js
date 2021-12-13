import React from 'react';
import {Dimensions, View, Text, StyleSheet, Image} from 'react-native';
import PropTypes from 'prop-types';
import {globalStyles} from '../../../styles/globalStyles';
import {PrimaryColors, StatusesColors} from '../../../styles/colors';
import PrimaryButton from '../../../components/buttons/PrimaryButton';
import OutlineButton from '../../../components/buttons/OutlineButton';

const dimensions = Dimensions.get('screen');

const propTypes = {
  item: PropTypes.object,
  onConfirm: PropTypes.func,
  onDeny: PropTypes.func,
};

class ConfirmationRequest extends React.PureComponent {
  render() {
    const {item, onConfirm, onDeny} = this.props;
    const {work} = item;

    return (
      <View style={globalStyles.card}>
        <View style={styles.row}>
          <View style={styles.leftCol}>
            <View style={styles.imageWrapper}>
              <Image
                style={styles.img}
                source={{uri: work.employee.photoUrl}}
              />
            </View>
          </View>
          <View style={styles.rightCol}>
            <Text style={styles.userName}>
              {work.employee.firstName} {work.employee.lastName}
            </Text>
            <Text style={styles.text}>
              Запросил подтверждение о работе в{' '}
              <Text style={styles.markedText}>
                {work.company.title} {work.city.title}
              </Text>
            </Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.col}>
            <PrimaryButton
              onPress={onConfirm}
              label={'Подтвердить'}
              color={StatusesColors.green}
            />
          </View>
          <View style={styles.col}>
            <OutlineButton
              onPress={onDeny}
              label={'Отклонить'}
              color={StatusesColors.red}
            />
          </View>
        </View>
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
  col: {
    width: dimensions.width / 2 - pa - 7,
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

ConfirmationRequest.propTypes = propTypes;
export default ConfirmationRequest;
