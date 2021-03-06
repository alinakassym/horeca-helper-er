import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  View,
  SafeAreaView,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

// styles
import {globalStyles} from '../../styles/globalStyles';
import {PrimaryColors} from '../../styles/colors';

// components
import MessagePreview from './components/MessagePreview';
import {MessageSearch} from './components/MessageSearch';

// services
import {getChats, getChatsSearch} from '../../services/ChatService';

export const MessagesScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [searchText, setSearchText] = useState('');

  const searchMessage = async () => {
    try {
      if (searchText.length > 0) {
        const res = await getChatsSearch(searchText);
        setChats(res);
      } else {
        const res = await getChats();
        setChats(res);
      }
    } catch (e) {
      console.log('searchMessage err: ', e);
    }
  };

  const getAllChats = async () => {
    try {
      setLoading(true);
      const res = await getChats();
      setChats(res);
      setSearchText('');
      setLoading(false);
    } catch (e) {
      console.error('getAllChats err: ', e);
    }
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      await getAllChats();
    });
  }, [navigation]);

  if (loading) {
    return (
      <SafeAreaView style={globalStyles.container}>
        <MessageSearch
          text={searchText}
          onChangeText={val => setSearchText(val)}
          onEndEditing={() => searchMessage()}
          onClear={() => getAllChats()}
        />
        <View style={globalStyles.fullScreenSection}>
          <ActivityIndicator size={'large'} />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={globalStyles.container}>
      <MessageSearch
        text={searchText}
        onChangeText={val => setSearchText(val)}
        onEndEditing={() => searchMessage()}
        onClear={() => getAllChats()}
      />
      <ScrollView>
        <View style={styles.chats}>
          {chats.map((item, index) => (
            <MessagePreview
              key={index}
              item={item}
              onPress={() =>
                navigation.navigate('MessagesChat', {
                  chatId: item.id,
                  user: item.employee,
                })
              }
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  chats: {
    backgroundColor: PrimaryColors.white,
  },
});
