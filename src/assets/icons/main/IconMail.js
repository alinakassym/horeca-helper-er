import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconMail = ({color, size, width}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M20.055 4.5H3.945a1.945 1.945 0 0 0-1.06 3.575l7.371 4.791c.631.41.947.616 1.287.696.3.07.613.07.914 0 .34-.08.656-.285 1.287-.696l7.371-4.79a1.945 1.945 0 0 0-1.06-3.576Z"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
      <Path
        d="M21.5 8v8.3c0 1.12 0 1.68-.218 2.108a2 2 0 0 1-.874.874c-.428.218-.988.218-2.108.218H5.7c-1.12 0-1.68 0-2.108-.218a2 2 0 0 1-.874-.874C2.5 17.98 2.5 17.42 2.5 16.3V8"
        stroke={color || '#000000'}
        strokeWidth={width || 2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};
