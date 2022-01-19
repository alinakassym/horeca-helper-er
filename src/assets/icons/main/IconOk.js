import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconOk = ({color, size, style}) => {
  return (
    <Svg style={style} width={size || 32} height={size || 32} fill="none">
      <Path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.652 15.821h1.043a2.085 2.085 0 0 0 0-4.17h-10.06c.698-3.078 1.047-3.41 1.043-6.566a2.085 2.085 0 0 0-4.17 0s-2.084 8.652-9.38 8.652H4a2 2 0 0 0-2 2v8.508a2 2 0 0 0 2 2h3.212c2.085 0 6.254 2.085 8.339 2.085h9.017a2.085 2.085 0 0 0 0-4.17h1.042a2.085 2.085 0 0 0 0-4.17h1.043a2.085 2.085 0 0 0 0-4.169Z"
        fill={color || '#000000'}
      />
    </Svg>
  );
};
