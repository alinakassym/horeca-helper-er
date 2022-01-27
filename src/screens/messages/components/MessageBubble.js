import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions, Text} from 'react-native';
import {IconMessageStatus} from '../../../assets/icons/main/IconMessageStatus';
import moment from 'moment';
import LinearGradient from 'react-native-linear-gradient';
import {PrimaryColors, StatusesColors} from '../../../styles/colors';
import i18n from '../../../assets/i18n/i18n';
import OutlineButton from '../../../components/buttons/OutlineButton';

const dimensions = Dimensions.get('screen');

const propTypes = {
  item: PropTypes.object,
  itemKey: PropTypes.string,
  prev: PropTypes.object,
};

class MessageBubble extends React.PureComponent {
  render() {
    const {item, itemKey, prev} = this.props;
    const {senderType, bodyType, body, createdAt, isRead, job} = item;

    const titleKey = itemKey || 'title_ru';

    const formattedTime = val => {
      return moment(val).format('HH:mm');
    };

    const ErMessage = () => {
      const erMsgStyle = {
        marginTop: prev && prev.senderType === senderType ? 4 : 16,
        borderTopRightRadius: prev && prev.senderType === senderType ? 5 : 20,
      };
      return (
        <LinearGradient
          colors={['#38B6EC', '#31A0E8', '#2A8BE4']}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 1}}
          style={[styles.bubble, styles.er, erMsgStyle]}>
          {bodyType === 'JOB_INVITE' ? (
            jobInviteMessage()
          ) : (
            <Text style={styles.erText}>{body}</Text>
          )}

          <View style={styles.rightBottom}>
            <Text style={styles.rightBottomTextER}>
              {formattedTime(createdAt)}
            </Text>
            <IconMessageStatus
              size={20}
              color={isRead ? '#FFFFFF' : '#6CB5ED'}
            />
          </View>
        </LinearGradient>
      );
    };

    const EeMessage = () => {
      const messageBubbleStyle = {
        marginTop: prev && prev.senderType === senderType ? 4 : 16,
        borderTopLeftRadius: prev && prev.senderType === senderType ? 5 : 20,
      };

      return (
        <View style={[styles.bubble, styles.ee, messageBubbleStyle]}>
          <Text style={styles.eeText}>{body}</Text>
          <View style={styles.rightBottom}>
            <Text style={styles.rightBottomTextEE}>
              {formattedTime(createdAt)}
            </Text>
          </View>
        </View>
      );
    };

    const jobInviteMessage = () => {
      return (
        <>
          <View style={styles.article}>
            <Text style={styles.erText}>
              <Text style={styles.textBold}>{job.company.title}</Text>{' '}
              {i18n.t('invited you to job')}:
            </Text>
          </View>
          {job.position && (
            <View style={styles.article}>
              <Text style={styles.erText}>
                <Text style={styles.textBold}>{i18n.t('Position')}: </Text>
                {job.position[titleKey] ||
                  job?.position.title_ru ||
                  job?.position.title}
              </Text>
            </View>
          )}
          {job.schedule && (
            <View style={styles.article}>
              <Text style={styles.erText}>
                <Text style={styles.textBold}>{i18n.t('Schedule')}: </Text>
                {job.schedule[titleKey] ||
                  job.schedule.title_ru ||
                  job.schedule.title}
              </Text>
            </View>
          )}
          {job.city && (
            <View style={styles.article}>
              <Text style={styles.erText}>
                <Text style={styles.textBold}>{i18n.t('City')}: </Text>
                {job.city[titleKey] || job.city.title_ru || job.city.title}
              </Text>
            </View>
          )}
          <View style={styles.article}>
            <Text style={styles.erText}>{body}</Text>
          </View>
        </>
      );
    };
    const jobApplyMessage = () => {
      const jobApplyMsgStyle = {
        marginTop: prev && prev.senderType === senderType ? 4 : 16,
        borderTopLeftRadius: prev && prev.senderType === senderType ? 5 : 20,
        backgroundColor: StatusesColors.lightGreen,
      };
      const applyMsgTextStyle = {
        color: StatusesColors.green,
      };
      const btnMsgStyle = {
        marginTop: 4,
        borderTopLeftRadius: 5,
      };
      const btnStyle = {
        paddingVertical: 8,
        paddingHorizontal: 12,
        minHeight: 32,
        borderRadius: 32,
        backgroundColor: PrimaryColors.white,
      };

      return (
        <>
          <View style={[styles.bubble, styles.ee, jobApplyMsgStyle]}>
            <View style={styles.article}>
              <Text style={[styles.eeText, applyMsgTextStyle]}>
                {i18n.t('Applying for a job')}
                <Text style={styles.textBold}>
                  {' "'}
                  {job.position[titleKey] ||
                    job?.position.title_ru ||
                    job?.position.title}
                  {'"'}
                </Text>
              </Text>
            </View>
            {job.schedule && (
              <View style={styles.article}>
                <Text style={styles.eeText}>
                  <Text style={styles.textBold}>{i18n.t('Schedule')}: </Text>
                  {job.schedule[titleKey] ||
                    job?.schedule.title_ru ||
                    job?.schedule.title}
                </Text>
              </View>
            )}
            {job.city && (
              <View style={styles.article}>
                <Text style={styles.eeText}>
                  <Text style={styles.textBold}>{i18n.t('City')}: </Text>
                  {job.city[titleKey] || job?.city.title_ru || job?.city.title}
                </Text>
              </View>
            )}
            <View style={styles.article}>
              <Text style={styles.eeText}>{body}</Text>
            </View>
          </View>

          {/*TODO: add OutlineButton onPress event*/}
          <View style={[styles.bubble, styles.ee, btnMsgStyle]}>
            <OutlineButton style={btnStyle} label={i18n.t('View CV')} />
          </View>
        </>
      );
    };

    return (
      <View style={styles.bubbleWrapper}>
        {senderType === 'ee' && bodyType === 'JOB_APPLY'
          ? jobApplyMessage()
          : senderType === 'ee'
          ? EeMessage()
          : ErMessage()}
      </View>
    );
  }
}

const width = dimensions.width;
const bubbleWidth = dimensions.width * 0.8;

const styles = StyleSheet.create({
  bubbleWrapper: {
    flex: 1,
    width: width - 40,
    alignItems: 'flex-end',
  },
  bubble: {
    position: 'relative',
    padding: 12,
    maxWidth: bubbleWidth,
  },
  ee: {
    alignSelf: 'flex-start',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: PrimaryColors.grey3,
  },
  er: {
    alignSelf: 'flex-end',
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 5,
    borderTopRightRadius: 20,
  },
  article: {
    marginBottom: 8,
  },
  eeText: {
    paddingRight: 44,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.element,
  },
  erText: {
    paddingRight: 72,
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 18,
    color: PrimaryColors.white,
  },
  textBold: {
    fontFamily: 'Roboto-Bold',
  },
  rightBottom: {
    position: 'absolute',
    right: 8,
    bottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  rightBottomTextEE: {
    marginRight: 4,
    fontSize: 13,
    lineHeight: 23,
    color: PrimaryColors.grey1,
  },
  rightBottomTextER: {
    marginRight: 4,
    fontSize: 13,
    lineHeight: 23,
    color: PrimaryColors.white,
  },
});

MessageBubble.propTypes = propTypes;
export default MessageBubble;
