import * as React from 'react';
import Svg, {G, Path} from 'react-native-svg';

export const IconMessageStatus = ({color, size, width}) => {
  return (
    <Svg width={size || 20} height={size || 20} fill="none">
      <G
        stroke={color || '#000000'}
        strokeWidth={width || 1.5}
        strokeLinecap="round"
        strokeLinejoin="round">
        <Path d="m3 12 2.5 2.5 7-8.5M8.5 13.5l1 1 7-8.5" />
      </G>
    </Svg>
  );
};
