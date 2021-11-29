import * as React from 'react';
import Svg, {Path} from 'react-native-svg';

export const IconStar = ({color, size, width, fillColor}) => {
  return (
    <Svg width={size || 24} height={size || 24} viewBox="0 0 24 24" fill="none">
      <Path
        d="M10.144 6.628c.786-1.961 1.18-2.942 1.856-2.942.676 0 1.07.98 1.856 2.942l.037.09c.444 1.109.666 1.663 1.12 2 .452.336 1.047.39 2.236.496l.214.019c1.946.174 2.92.261 3.127.88.209.62-.514 1.277-1.96 2.591l-.481.44c-.732.665-1.098.997-1.268 1.434a1.997 1.997 0 00-.08.25c-.111.454-.004.937.21 1.902l.067.3c.393 1.775.59 2.662.247 3.045a1 1 0 01-.481.296c-.496.136-1.2-.438-2.61-1.587-.925-.753-1.388-1.13-1.919-1.215a1.997 1.997 0 00-.63 0c-.532.085-.994.462-1.92 1.215-1.408 1.149-2.113 1.723-2.609 1.587a1 1 0 01-.48-.296c-.344-.383-.147-1.27.246-3.044l.067-.301c.214-.966.321-1.448.21-1.903a1.997 1.997 0 00-.08-.25c-.17-.436-.536-.768-1.268-1.434l-.482-.439c-1.445-1.314-2.168-1.972-1.96-2.59.209-.62 1.182-.707 3.128-.881l.214-.02c1.19-.106 1.784-.159 2.237-.496.453-.336.675-.89 1.12-1.998l.036-.091z"
        fill={fillColor || '#ffffff'}
        stroke={color || '#000000'}
        strokeWidth={width || 2}
      />
    </Svg>
  );
};
