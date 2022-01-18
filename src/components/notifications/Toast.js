import React from 'react';
import PropTypes from 'prop-types';
import {Text, View, Pressable, Dimensions, StyleSheet} from 'react-native';
import {PrimaryColors, StatusesColors} from '../../styles/colors';
import {globalStyles} from '../../styles/globalStyles';
import {IconOk} from '../../assets/icons/main/IconOk';

const dimensions = Dimensions.get('screen');
const width = dimensions.width;

const propTypes = {
  title: PropTypes.string,
  text: PropTypes.string,
  visible: PropTypes.bool,
  onPress: PropTypes.func,
};

class Toast extends React.PureComponent {
  render() {
    const {title, text, visible, onPress} = this.props;
    return (
      <>
        {visible && (
          <Pressable onPress={onPress} style={styles.toast}>
            <View style={[globalStyles.row, globalStyles.alignCenter]}>
              <View style={styles.icon}>
                <IconOk color={PrimaryColors.white} />
              </View>
              <View>
                <Text style={styles.title} numberOfLines={1}>
                  {title}
                </Text>
                <Text style={styles.text} numberOfLines={2}>
                  {text}
                </Text>
              </View>
            </View>
          </Pressable>
        )}
      </>
    );
  }
}

const styles = StyleSheet.create({
  toast: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    padding: 11,
    width: width - 40,
    minHeight: 70,
    borderRadius: 15,
    backgroundColor: PrimaryColors.element,
    zIndex: 9,
  },
  icon: {
    marginRight: 11,
    height: 48,
    width: 48,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 15,
    backgroundColor: StatusesColors.green,
  },
  title: {
    marginBottom: 4,
    fontFamily: 'Inter-SemiBold',
    fontSize: 18,
    lineHeight: 22,
    color: PrimaryColors.white,
  },
  text: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    lineHeight: 14,
    color: PrimaryColors.grey2,
  },
});

Toast.propTypes = propTypes;
export default Toast;
