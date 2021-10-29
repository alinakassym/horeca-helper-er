import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {IconStar} from '../../assets/icons/main/IconStar';

export const ResumeCard = ({item}) => {
  return (
    <View style={[styles.row, styles.divider]}>
      <View style={styles.col}>
        <View>
          <Text style={globalStyles.positionTitle}>{item.position?.title}</Text>
          <Text style={globalStyles.title}>
            {item.firstName} {item.lastName}
          </Text>
          <Text style={globalStyles.caption}>{item.city?.title}</Text>
          {/*<Text style={globalStyles.caption}>{item}</Text>*/}
        </View>
      </View>
      <View style={[styles.col, styles.floatLeftTop]}>
        <View style={styles.imageWrapper}>
          <Image style={styles.img} source={{uri: item.photoUrl}} />
        </View>
      </View>
      {/*<View style={styles.col}>
        <Text style={[globalStyles.text, {marginRight: 8}]}>5</Text>
        <IconStar color={'#F1C40F'} fillColor={'#F1C40F'} />
      </View>*/}
    </View>
  );
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  col: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
  },
  floatLeftTop: {
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  imageWrapper: {
    height: 40,
    width: 40,
    borderRadius: 30,
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
});
