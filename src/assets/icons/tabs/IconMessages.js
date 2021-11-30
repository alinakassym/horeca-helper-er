import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconMessages = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M12 4a8 8 0 018 8v0a8 8 0 01-8 8H6.91c-.848 0-1.27 0-1.609-.126a2 2 0 01-1.175-1.175C4 18.36 4 17.937 4 17.09V12a8 8 0 018-8v0z"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
      <Path
        d="M9 11h6M9 15h3"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
