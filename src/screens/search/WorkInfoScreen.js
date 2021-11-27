import React from 'react';
import {Dimensions, Image, StyleSheet, Text, View} from 'react-native';
import {IconChecked} from '../../assets/icons/main/IconChecked';
import moment from 'moment';

const dimensions = Dimensions.get('screen');

export const WorkInfoScreen = ({route}) => {
  const item = route.params.item;
  console.log('item: ', item);
  return (
    <React.Fragment>
      <View style={[styles.section, styles.row]}>
        <View style={styles.leftCol}>
          <View style={styles.imageWrapper}>
            <Image style={styles.image} source={{uri: item.company.photoUrl}} />
            {item.isConfirmed && (
              <View style={styles.iconWrapper}>
                <IconChecked color={'#185AB7'} size={18} />
              </View>
            )}
          </View>
        </View>

        <View style={styles.rightCol}>
          <Text style={styles.title}>{item.position.title}</Text>
          <Text style={styles.text}>{item.company.title}</Text>
          {item.startDate && (
            <Text>
              {moment(item.startDate).format('MMM YYYY')}{' '}
              {item.endDate
                ? `- ${moment(item.endDate).format('MMM YYYY')}`
                : ''}
            </Text>
          )}
        </View>
      </View>

      {!!item.description && (
        <View style={[styles.section, styles.row]}>
          <View style={styles.flexWrap}>
            <Text textBreakStrategy={'simple'}>
              <Text style={styles.textBold}>About: </Text>
              {item.description}
            </Text>
          </View>
        </View>
      )}

      {item.employeeReview && (
        <View style={[styles.section, styles.col]}>
          <Text style={[styles.title, styles.textBold]}>Rating</Text>
          <View style={[styles.row, styles.flexWrap]}>
            <Text style={styles.text}>
              <Text style={[styles.text, styles.textBold]}>
                Average score:{' '}
              </Text>
              {item.employeeReview.avgScore}
            </Text>
          </View>
          <View style={[styles.row, styles.flexWrap]}>
            <Text style={styles.text}>
              <Text style={[styles.text, styles.textBold]}>Discipline: </Text>
              {item.employeeReview.disciplineScore}
            </Text>
          </View>
          <View style={[styles.row, styles.flexWrap]}>
            <Text style={styles.text}>
              <Text style={[styles.text, styles.textBold]}>
                Communications:{' '}
              </Text>
              {item.employeeReview.communicationsScore}
            </Text>
          </View>
          <View style={[styles.row, styles.flexWrap]}>
            <Text style={styles.text}>
              <Text style={[styles.text, styles.textBold]}>
                Professionalism:{' '}
              </Text>
              {item.employeeReview.professionalismScore}
            </Text>
          </View>
          <View style={[styles.row, styles.flexWrap]}>
            <Text style={styles.text}>
              <Text style={[styles.text, styles.textBold]}>Neatness: </Text>
              {item.employeeReview.neatnessScore}
            </Text>
          </View>
          <View style={[styles.row, styles.flexWrap]}>
            <Text style={styles.text}>
              <Text style={[styles.text, styles.textBold]}>Team: </Text>
              {item.employeeReview.teamScore}
            </Text>
          </View>
          <View style={[styles.row, styles.flexWrap]}>
            <Text style={styles.text}>
              <Text style={[styles.text, styles.textBold]}>Comment: </Text>
              {item.employeeReview.comment}
            </Text>
          </View>
        </View>
      )}
    </React.Fragment>
  );
};

const imageSize = dimensions.width * 0.16;

const styles = StyleSheet.create({
  section: {
    padding: 16,
    width: dimensions.width,
  },
  row: {
    flexDirection: 'row',
  },
  flexWrap: {
    flexWrap: 'wrap',
  },
  leftCol: {
    width: imageSize + 16,
    flexDirection: 'column',
  },
  rightCol: {
    width: dimensions.width - imageSize - 50,
  },

  imageWrapper: {
    position: 'relative',
    marginRight: 16,
    height: imageSize,
    width: imageSize,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: imageSize,
    borderWidth: 1,
    borderColor: '#cccccc',
  },
  iconWrapper: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontFamily: 'Roboto-Medium',
    marginBottom: 4,
    fontSize: 20,
    color: '#000000',
  },
  text: {
    fontFamily: 'Roboto-Regular',
    marginBottom: 6,
    fontSize: 16,
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
  },
});
