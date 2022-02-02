import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

const IconMasterCard = ({style}) => (
  <Svg
    style={style}
    width={48}
    height={30}
    viewBox="0 0  48 30"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Path
      d="M33.197 30C41.373 30 48 23.284 48 15c0-8.284-6.627-15-14.803-15-8.176 0-14.803 6.716-14.803 15 0 8.284 6.627 15 14.803 15Z"
      fill="#F9A000"
    />
    <Path
      d="M14.803 30c8.176 0 14.804-6.716 14.804-15 0-8.284-6.628-15-14.803-15C6.627 0 0 6.716 0 15c0 8.284 6.628 15 14.803 15Z"
      fill="#EE0005"
    />
    <Path
      d="M18.394 15c0 4.763 2.19 9.007 5.607 11.755A15.045 15.045 0 0 0 29.608 15c0-4.763-2.191-9.007-5.607-11.755a15.046 15.046 0 0 0-5.607 11.755Z"
      fill="#FF6300"
    />
  </Svg>
);

export default IconMasterCard;
