import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, Text, View} from 'react-native';
// styles
import {PrimaryColors} from '../../../styles/colors';
// components
import Point from '../../../components/Point';
// locale
import i18n from '../../../assets/i18n/i18n';

const propTypes = {
  items: PropTypes.array,
  activeOption: PropTypes.object,
  selectedOption: PropTypes.object,
  onSelect: PropTypes.func,
};

class SubscriptionDescriptions extends React.PureComponent {
  render() {
    const {items} = this.props;
    return (
      <View style={styles.section}>
        <Text style={styles.title}>{i18n.t('Subscription includes')}:</Text>
        {items.map((item, index) => (
          <Point key={index} label={item} />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  section: {
    paddingTop: 12,
    paddingHorizontal: 20,
  },
  title: {
    marginBottom: 16,
    fontFamily: 'Inter-Bold',
    fontSize: 26,
    lineHeight: 32,
    color: PrimaryColors.white,
  },
});

SubscriptionDescriptions.propTypes = propTypes;
export default SubscriptionDescriptions;
