import React, { useState, useRef, useEffect, useLayoutEffect } from 'react';
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import styles, { Colors, lightStyles, darkStyles } from '../Styles';
import { useDarkModeContext } from '../context/darkMode';
import { useToast } from '../context/toastContext';
import { useSelector, useDispatch } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import { API_PATH } from '../env';
import { useRoute } from '@react-navigation/native';
import { useSocket } from '../context/SocketContext';
import { addMessage, selectMessages, setMessages } from '../redux/slices/messageSlice';
import DocumentPicker from 'react-native-document-picker';

const ChatScreen = () => {
  const socket = useSocket();
  const [isConnected, setIsConnected] = useState(false);
  const route = useRoute();
  const { expert } = route.params;
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const { isDarkMode } = useDarkModeContext();
  const { showToast } = useToast();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const user = useSelector(selectUser);
  const [messages, setMessages] = useState([]);
  const [messageInput, setMessageInput] = useState('');
  const [cachedMessages, setCachedMessages] = useState([]);
  const [selectedDocument, setSelectedDocument] = useState(null);
  const flatListRef = useRef(null);
  
  const messagesRedux = useSelector(selectMessages);
 
  useEffect(() => {
    socket.on('connect', () => {
      if (user && user?.user?._id){
        socket.emit('register', user?.user?._id);
      }
    })
    
    const setupSocketListeners = () => {
      
      socket.on('new-message', (message) => {
        //console.log('Received message:', message);
        setMessages((prevMessages) => [...prevMessages, message]);
      });
    };
  
    setupSocketListeners();

    return () => {
      socket.off('new-message');
    };

  }, [socket]);
  const handleSocketConnect = () => {
    setIsConnected(true);
    console.log('Connected');

    // Register user on socket connection
    if (user && user?.user?._id) {
      socket.emit('register', user?.user?._id);
    }

    // Sync cached messages with the database
    if (cachedMessages.length > 0) {
      syncMessagesWithDatabase(cachedMessages);
      setCachedMessages([]);
    }
  };

  const handleSocketDisconnect = () => {
    setIsConnected(false);
  };

  const handleNewMessage = (message) => {
    // Convert the date property to a string
    const messageWithDateString = { ...message, date: message.date.toISOString() };
    
    // Append new message to Redux state
    dispatch(addMessage(messageWithDateString));
    // Append new message to local state
    setMessages((prevMessages) => [...prevMessages, messageWithDateString]);
  };
  

  const loadMessages = async () => {
   // console.log(expert._id);
    try {
      const userToken = user?.token;
  
      const response = await fetch(
        `${API_PATH}/api/chat/history/${expert._id}`,
        {
          method: 'GET',
          headers: {
            Authorization: userToken,
          },
        },
      );
      if (response.ok) {
        const fetchedMessages = await response.json();
        //console.log(fetchedMessages);
        // Convert date properties to strings before setting messages in the Redux state
        //const messagesWithDateStrings = fetchedMessages.map(message => ({ ...message, date: new Date(message.date).toISOString() }))
        dispatch(addMessage(fetchedMessages[0]));  
      } else {
        console.error('Failed to load messages');
      }
    } catch (error) {
      console.error('Error loading messages:', error);
    }
  };
  

  useEffect(() => {
    // Set messages from Redux state when component mounts
    // setMessages(messagesRedux);
    flatListRef.current.scrollToEnd({ animated: true });

    if (!messagesRedux.length > 0) {
      // Run your loadMessage function
      loadMessages();
    }
    
    // Setup socket listeners
    socket.on('connect', handleSocketConnect);
    socket.on('disconnect', handleSocketDisconnect);
    socket.on('new-message', handleNewMessage);

    return () => {
      // Clean up socket listeners
      socket.off('connect', handleSocketConnect);
      socket.off('disconnect', handleSocketDisconnect);
      socket.off('new-message', handleNewMessage);
    };
  }, [messagesRedux]);



  const renderMessage = ({ item }) => {
    const isOutgoing = item.fromUser === user?.user._id;


    return (
      <View
        key={item._id} // Make sure to use a unique key for each rendered item
        style={{

          flexDirection: isOutgoing ? 'row-reverse' : 'row',
          marginVertical: 8,
        }}>
        <View
          style={[
            isOutgoing ? currentStyle.MsgOutBg : currentStyle.MsgInBg,
            { padding: 8, borderRadius: 6 },
          ]}>
          <Text style={isDarkMode ? { color: '#333' } : { color: '#fff' }}>
            {item.message}
          </Text>
        </View>
      </View>
    );
  };

  const sendMessage = async () => {
    const messageObject = {
      fromUser: user?.user?._id,
      toUser: expert._id,
      message: messageInput,
      date: new Date().toISOString(),
    }

    // Send Message over Socket Connection
    socket.emit('new-message', messageObject);
     // Append Message to Redux state
     dispatch(addMessage(messageObject));
    setMessages((prevMessages) => [...prevMessages, messageObject]);
    setMessageInput('');
  };
  
  const syncMessagesWithDatabase = async (cachedMessages) => {
    // Implement logic to sync messages with the database
    try {
      const response = await fetch(`${API_PATH}/api/chat/sync`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: user.token,
        },
        body: JSON.stringify({ messages: cachedMessages }),
      });

      if (response.ok) {
        console.log('Messages synced with the database');
      } else {
        console.error('Failed to sync messages with the database');
      }
    } catch (error) {
      console.error('Error syncing messages with the database:', error);
    }
  };

  const handleCamera = ()=>{
    navigation.navigate('CropCamera');
  }
  return (
    <SafeAreaView style={[currentStyle.bg, { flex: 1 }]}>
      <View style={[styles.customHeaderContainer]}>
        <View
          style={{
            justifyContent: 'center',
            gap: 20,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Text style={[currentStyle.bgText]}>
              <Ionicons name="arrow-back" size={25} />
            </Text>
          </TouchableOpacity>
          <View>
            <Image
              source={
                expert?.image.includes('/uploads/users/user.png')
                  ? require('../assets/Pic/user.png')
                  : { uri: `${API_PATH}${expert?.image}` }
              }
              style={{ height: 35, width: 35, borderRadius: 100 }}
            />
          </View>
          <Text style={[currentStyle.bgText, { fontSize: 17, fontWeight: 600 }]}>
            {expert?.name}
          </Text>
        </View>
        <View style={[currentStyle.bgGrey, { padding: 5, borderRadius: 30 }]}>
          <Ionicons
            name="ellipsis-vertical-outline"
            size={20}
            color={Colors.dimgrey}
          />
        </View>
      </View>
      <View style={{ flex: 1, paddingHorizontal: 10, paddingTop: 16 }}>
      <FlatList
        ref={flatListRef}
        data={messagesRedux}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderMessage}
        onContentSizeChange={() => flatListRef.current.scrollToEnd({ animated: true })}
      />
        <View
          style={[
            styles.row,
            styles.mb1,
            { borderRadius: 30 },
            isDarkMode
              ? {
                  borderWidth: 2,
                  borderColor: '#ebebeb',
                  backgroundColor: '#ebebeb',
                }
              : {
                  borderWidth: 2,
                  borderColor: '#0a0a0a',
                  backgroundColor: '#0a0a0a',
                },
          ]}>
          <TouchableOpacity
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={handleCamera}>
            <Ionicons name="camera-outline" size={24} color={Colors.dimgrey} />
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 1,
              paddingHorizontal: 10,
              paddingVertical: 8,
              marginRight: 8,
              color: currentStyle.bgText.color,
            }}
            placeholder="Type a message..."
            placeholderTextColor={Colors.dimgrey}
            onChangeText={(text) => setMessageInput(text)}
            value={messageInput}
          />
          <TouchableOpacity
            style={{
              padding: 4,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Ionicons name="attach" size={24} color={Colors.dimgrey} />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              padding: 10,
              alignItems: 'center',
              justifyContent: 'center',
            }}
            onPress={sendMessage}>
            <Ionicons name="paper-plane" size={24} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ChatScreen;
