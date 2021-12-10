import * as React from 'react';
import Svg, {Path, Defs, LinearGradient, Stop} from 'react-native-svg';

export const IconFire = ({size}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.25 14.25a8.25 8.25 0 1 1-16.5 0c0-2.177.72-4.41 2.14-6.64a.75.75 0 0 1 1.091-.19l2.415 1.86 2.65-7.286a.75.75 0 0 1 1.165-.336c.287.224 7.039 5.556 7.039 12.592Z"
        fill="url(#a)"
      />
      <Defs>
        <LinearGradient
          id="a"
          x1={12}
          y1={1.5}
          x2={12}
          y2={22.5}
          gradientUnits="userSpaceOnUse">
          <Stop stopColor="#FDA40E" />
          <Stop offset={0.521} stopColor="#FD560E" />
          <Stop offset={1} stopColor="#FD0E0E" />
        </LinearGradient>
      </Defs>
    </Svg>
  );
};
