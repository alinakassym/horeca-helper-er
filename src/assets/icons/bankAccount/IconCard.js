import * as React from 'react';
import Svg, {Rect, Path} from 'react-native-svg';

const IconCard = ({style, size, color}) => (
  <Svg
    style={style}
    width={size || 24}
    height={size || 24}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <Rect
      x={3}
      y={6}
      width={18}
      height={13}
      rx={2}
      stroke={color || '#151F47'}
    />
    <Path
      d="M7 15h.01M4 11h17"
      stroke={color || '#151F47'}
      strokeLinecap="round"
    />
  </Svg>
);

export default IconCard;
