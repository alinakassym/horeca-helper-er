import React from 'react';
import PropTypes from 'prop-types';
import {PrimaryColors} from '../../styles/colors';
import {Dimensions, Text} from 'react-native';

const dimensions = Dimensions.get('screen');
const width = dimensions.width;

const propTypes = {
  label: PropTypes.string,
  offsetLeft: PropTypes.number,
  value: PropTypes.string,
  itemPosition: PropTypes.number,
};

class SliderLabel extends React.PureComponent {
  render() {
    const {label, offsetLeft, value, itemPosition} = this.props;

    const position = offsetLeft || 100;

    const leftPosition =
      itemPosition > width - position ? width - position : itemPosition;

    const labelStyle = {
      position: 'absolute',
      padding: 9,
      left: leftPosition,
      bottom: 0,
      borderRadius: 8,
      backgroundColor: PrimaryColors.grey4,
    };
    return (
      <Text style={labelStyle}>
        {value} {label}
      </Text>
    );
  }
}

SliderLabel.propTypes = propTypes;
export default SliderLabel;
