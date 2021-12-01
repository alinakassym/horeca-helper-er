import React, {useEffect, useRef, useState} from 'react';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  Image,
  Platform,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {globalStyles} from '../../styles/globalStyles';
import {getChatById} from '../../services/ChatService';
import BackButton from '../../components/buttons/BackButton';
import {MessageBubble} from './components/MessageBubble';

const dimensions = Dimensions.get('screen');

export const MessagesChatScreen = ({route, navigation}) => {
  const scrollViewRef = useRef();
  const [user, setUser] = useState({
    photoUrl: null,
    firstName: '',
    lastName: '',
  });
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [viewHeight, setHeight] = useState(0);

  const getViewDimensions = layout => {
    const {height} = layout;
    setHeight(dimensions.height - height - 230);
  };

  useEffect(() => {
    return navigation.addListener('focus', async () => {
      try {
        const res = await getChatById(route.params?.chatId);
        setMessages(res);
        setUser(route.params?.user);
        setLoading(false);
      } catch (e) {
        console.error('MessagesChatScreen err: ', e);
      }
    });
  }, [navigation, route]);

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View style={globalStyles.container}>
      <View style={styles.headerSection}>
        <View style={styles.leftCol}>
          <BackButton onPress={() => navigation.goBack()} />
        </View>
        <View style={styles.rightCol}>
          <View style={styles.imageWrapper}>
            <Image style={styles.img} source={{uri: user.photoUrl}} />
          </View>
          <View>
            <Text style={styles.userName} numberOfLines={1}>
              {user.firstName} {user.lastName}
            </Text>
          </View>
        </View>
      </View>
      <ScrollView
        style={styles.scrollView}
        ref={scrollViewRef}
        onContentSizeChange={() =>
          scrollViewRef.current.scrollToEnd({animated: true})
        }>
        <View style={{height: viewHeight}} />
        <View
          onLayout={event => {
            getViewDimensions(event.nativeEvent.layout);
          }}
          style={styles.scrollViewInnerBlock}>
          {messages.map((message, index) => (
            <MessageBubble key={index} item={message} />
          ))}
          <MessageBubble
            item={{
              body: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium autem consequatur dignissimos earum excepturi fugit itaque magni molestias necessitatibus, odio reiciendis reprehenderit soluta totam. Aliquid blanditiis doloremque in nulla optio?',
            }}
          />
        </View>
      </ScrollView>
      <View style={styles.inputSection}>
        <TextInput style={styles.input} />
      </View>
    </View>
  );
};

const imageSize = 58;
const headerSectionPadding = 20;
const leftColWidth = 52 + 20;
const rightColWidth =
  dimensions.width - leftColWidth - headerSectionPadding * 2;

const styles = StyleSheet.create({
  inputSection: {
    paddingTop: 8,
    paddingHorizontal: 20,
    paddingBottom: 8,
    backgroundColor: '#FFFFFF',
  },
  input: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    height: 40,
    borderRadius: 20,
    borderWidth: 0.5,
    borderColor: '#8391A1',
  },
  scrollView: {
    padding: 20,
    backgroundColor: '#F5F8FE',
  },
  scrollViewInnerBlock: {
    paddingBottom: 20,
  },
  headerSection: {
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 20,
    paddingHorizontal: 20,
    width: dimensions.width,
    flexDirection: 'row',
    alignItems: 'center',
  },
  leftCol: {
    width: leftColWidth,
  },
  rightCol: {
    width: rightColWidth,
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageWrapper: {
    marginRight: 16,
    height: imageSize,
    width: imageSize,
  },
  img: {
    height: '100%',
    width: '100%',
    borderRadius: imageSize,
    backgroundColor: '#767676',
  },
  userName: {
    width: rightColWidth - imageSize - 16,
    fontFamily: 'Roboto-Medium',
    fontSize: 18,
    color: '#151F47',
  },
});
