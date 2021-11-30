import React from 'react';
import {View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {MessagePreview} from './components/MessagePreview';

const items = [
  {
    photoUrl:
      'https://images.generated.photos/VFWSzr8YcfkgyPzWVjViFQWI-aNTpga680XlpQyboic/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTU5NzA1LmpwZw.jpg',
    name: 'John Doe',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: 'Today',
  },
  {
    photoUrl:
      'https://images.generated.photos/PZTmTxTdQIF7Zp6lajGbwfv-uaSkyhjcK2qdISkr6Eo/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzI3MTMwLmpwZw.jpg',
    name: 'Felicity Wilkins',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: 'Yesterday',
  },
  {
    photoUrl:
      'https://images.generated.photos/VFWSzr8YcfkgyPzWVjViFQWI-aNTpga680XlpQyboic/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTU5NzA1LmpwZw.jpg',
    name: 'Christopher Buckland Butler Brown',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: '28.11.2021',
  },
];

export const MessagesScreen = () => {
  return (
    <View style={globalStyles.container}>
      {items.map((item, index) => (
        <MessagePreview key={index} item={item} />
      ))}
    </View>
  );
};
