import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {MessagePreview} from './components/MessagePreview';
import {getChats} from '../../services/ChatService';

const items = [
  {
    photoUrl:
      'https://images.generated.photos/VFWSzr8YcfkgyPzWVjViFQWI-aNTpga680XlpQyboic/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTU5NzA1LmpwZw.jpg',
    employee: {
      firstName: 'John',
      lastName: 'Doe',
    },
    createdAt: '2021-11-30T17:48:59.137Z',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: 'Today',
  },
  {
    photoUrl:
      'https://images.generated.photos/PZTmTxTdQIF7Zp6lajGbwfv-uaSkyhjcK2qdISkr6Eo/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzI3MTMwLmpwZw.jpg',
    employee: {
      firstName: 'Felicity',
      lastName: 'Wilkins',
    },
    createdAt: '2021-11-30T17:48:59.137Z',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: 'Yesterday',
  },
  {
    photoUrl:
      'https://images.generated.photos/VFWSzr8YcfkgyPzWVjViFQWI-aNTpga680XlpQyboic/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTU5NzA1LmpwZw.jpg',
    employee: {
      firstName: 'Christopher',
      lastName: 'Buckland Butler Brown',
    },
    createdAt: '2021-11-30T17:48:59.137Z',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: '28.11.2021',
  },
];

export const MessagesScreen = ({navigation}) => {
  const [chats, setChats] = useState();

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await getChats();
        setChats(res);
      } catch (e) {
        console.error('ProfileScreen err: ', e);
      }
    });
  }, [navigation]);
  return (
    <View style={globalStyles.container}>
      <ScrollView>
        {chats.map((item, index) => (
          <MessagePreview
            key={index}
            item={item}
            divider={index < chats.length - 1}
          />
        ))}

        {items.map((item, index) => (
          <MessagePreview
            key={index}
            item={item}
            divider={index < items.length - 1}
          />
        ))}
      </ScrollView>
    </View>
  );
};
