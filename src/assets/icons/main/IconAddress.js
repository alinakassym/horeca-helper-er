import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconAddress = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 12.75a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <Path
        d="M19.5 9.75c0 6.75-7.5 12-7.5 12s-7.5-5.25-7.5-12a7.5 7.5 0 0 1 15 0v0Z"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
