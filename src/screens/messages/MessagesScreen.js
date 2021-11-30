import React, {useEffect, useState} from 'react';
import {ScrollView, View} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {MessagePreview} from './components/MessagePreview';
import {getChats} from '../../services/ChatService';

const items = [
  {
    id: 1,
    employee: {
      photoUrl:
        'https://images.generated.photos/VFWSzr8YcfkgyPzWVjViFQWI-aNTpga680XlpQyboic/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTU5NzA1LmpwZw.jpg',
      firstName: 'John',
      lastName: 'Doe',
    },
    createdAt: '2021-11-29T17:48:59.137Z',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: 'Today',
  },
  {
    id: 2,
    employee: {
      photoUrl:
        'https://images.generated.photos/PZTmTxTdQIF7Zp6lajGbwfv-uaSkyhjcK2qdISkr6Eo/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzI3MTMwLmpwZw.jpg',
      firstName: 'Felicity',
      lastName: 'Wilkins',
    },
    createdAt: '2021-11-28T17:48:59.137Z',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: 'Yesterday',
  },
  {
    id: 3,
    employee: {
      photoUrl:
        'https://images.generated.photos/e1UPHzIpbxb38oeC-DSijCZj2R9Sgd6uw7VaSpn73xs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTYzMDY1LmpwZw.jpg',
      firstName: 'Christopher',
      lastName: 'Buckland Butler Brown',
    },
    createdAt: '2020-11-27T17:48:59.137Z',
    isRead: true,
    text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Ab, alias aperiam, at consectetur eius fuga harum ipsam libero nemo officiis praesentium quae, quia rem sint sit sunt vitae voluptate voluptates.',
    date: '28.11.2021',
  },
];

const photos = {
  1: 'https://images.generated.photos/Bp5R8jcl8yLAQttytJUEfLQl3Xt28CNCqg3UWYkyN-g/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTc3MDgxLmpwZw.jpg',
  2: 'https://images.generated.photos/pjYVKRylAM0InNQjzKPdxrcH-25Ocb3Q7-nLPhVXHVk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDMyOTY0LmpwZw.jpg',
  3: 'https://images.generated.photos/Teu-_4fl7MyPmSjqPBiLT7QLy8dAhayxrjMXdtJnHM8/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzE2MjI1LmpwZw.jpg',
  4: 'https://images.generated.photos/2T1Ujq1Max4MIwIQJrfMVh8oNrnDz2Ned2cj1i0p3Q0/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MDY4OTUwLmpwZw.jpg',
  5: 'https://images.generated.photos/U19euXXkW7sn9p_nxvaTgp9wazmkGllj8x2BtvQInNE/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MzYxNDU0LmpwZw.jpg',
  6: 'https://images.generated.photos/FBywF8-EwisNG6SFE9YVUSbWejcJi_DUxcGMnrDIJds/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/OTAwMTMyLmpwZw.jpg',
  7: 'https://images.generated.photos/xHMm_BsmgdIvtGMLpgRpoj2tqBjxC2t9T3LVjdJLo5I/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/ODYzNTYyLmpwZw.jpg',
  8: 'https://images.generated.photos/lbyMhmyw83v_mzYdfedOJFOr4patSNRLv-i9bgm7HIk/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/NDc5Mzc4LmpwZw.jpg',
  9: 'https://images.generated.photos/e1UPHzIpbxb38oeC-DSijCZj2R9Sgd6uw7VaSpn73xs/rs:fit:512:512/wm:0.95:sowe:18:18:0.33/czM6Ly9pY29uczgu/Z3Bob3Rvcy1wcm9k/LnBob3Rvcy92M18w/MTYzMDY1LmpwZw.jpg',
};

export const MessagesScreen = ({navigation}) => {
  const [chats, setChats] = useState([]);

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await getChats();
        setChats(
          res.map((item, i) => {
            return {
              ...item,
              text: items[0].text,
              employee: {...item.employee, photoUrl: photos[item.employee.id]},
            };
          }),
        );
      } catch (e) {
        console.error('MessagesScreen err: ', e);
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
            navigation={navigation}
          />
        ))}

        {items.map((item, index) => (
          <MessagePreview
            key={index}
            item={item}
            divider={index < items.length - 1}
            navigation={navigation}
          />
        ))}
      </ScrollView>
    </View>
  );
};
