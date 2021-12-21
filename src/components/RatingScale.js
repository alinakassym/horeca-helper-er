import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {IconStar} from '../assets/icons/main/IconStar';
import {PrimaryColors, StatusesColors} from '../styles/colors';
import PropTypes from 'prop-types';

const propTypes = {
  score: PropTypes.number,
};

class RatingScale extends React.PureComponent {
  render() {
    const {score} = this.props;
    const scale = [1, 2, 3, 4, 5];
    return (
      <View style={styles.row}>
        {scale.map((item, index) => (
          <View key={index} style={styles.icon}>
            <IconStar
              width={1.5}
              size={12.75}
              fillColor={
                Number(item) <= Number(score)
                  ? StatusesColors.orange
                  : PrimaryColors.white
              }
              color={StatusesColors.orange}
            />
          </View>
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    marginTop: 12,
    flexDirection: 'row',
  },
  icon: {
    marginRight: 3.5,
  },
});

RatingScale.propTypes = propTypes;
export default RatingScale;
