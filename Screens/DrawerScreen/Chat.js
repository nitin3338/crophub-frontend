// Chat.js

import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  SafeAreaView,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import {useDarkModeContext} from '../../context/darkMode';
import {useToast} from '../../context/toastContext';
import {API_PATH} from '../../env';
import styles, {Colors, lightStyles, darkStyles} from '../../Styles';
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../Component/CustomHeader';

const Chat = () => {
  const [experts, setExperts] = useState([]);
  const [filteredExperts, setFilteredExperts] = useState([]);
  const [searchText, setSearchText] = useState('');
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const {isDarkMode} = useDarkModeContext();
  const {showToast} = useToast();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;

  const fetchChatUsers = async () => {
    try {
      const response = await fetch(
        `${API_PATH}/api/chat/users`,
        {
          method: "GET",
          headers: {
            Authorization: user.token,
          },
        }
      );
      if (response.ok) {
        const users = await response.json();
        setExperts(users);
      } else {
        showToast("Failed loading History", 'error');
      }
    } catch (error) {
      console.error("Error loading chat users:", error);
      showToast("Failed loading History", 'error');
    }
  };

  useEffect(() => {

    fetchChatUsers();
  }, [user])

  // Fetch New Expert for Messaging
  const fetchExpertsData = async () => {
    try {
      const response = await fetch(`${API_PATH}/get-booked-experts`,
        {
        method: "GET",
        headers: {
          Authorization: user.token,
        },
      }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data);
        setExperts((prevExperts) => [data[0], ...prevExperts]);
        //setFilteredExperts(data); // Initialize filteredExperts with all experts
      } else {
        console.error('Failed to fetch experts data');
      }
    } catch (error) {
      console.error('Error fetching experts data:', error);
    }
  };

 // console.log(experts);


  const renderChatItem = ({item}) => {
    return (
      <TouchableOpacity
        style={[
          styles.customHeaderContainer,
          {paddingLeft: 16, paddingRight: 16},
        ]}
        onPress={() => navigation.navigate('UserChat', {expert: item})}>
        <View style={[styles.row, {gap: 10, position: 'relative'}]}>
          <Image
            source={
              item?.image.includes('/uploads/users/user.png')
                ? require('../../assets/Pic/user.png')
                : {uri: `${API_PATH}${item?.image}`}
            }
            style={styles.chatUserImg}
          />
          <View style={{paddingRight: 25}}>
            <Text style={currentStyle.bgText}>{item.name}</Text>
            <Text
              style={{color: 'grey'}}
              numberOfLines={1}
              ellipsizeMode="tail">
              {item.role}
            </Text>
          </View>
          <View style={{marginLeft: 'auto', alignItems: 'flex-end'}}>
            <Text style={[styles.messageTime, currentStyle.bgText]}>
              {item.messageTime}
            </Text>
            {item.unreadMessages > 0 ? <Text style={styles.unreadMessages}>{item.unreadMessages}</Text> : null}
          </View>
        </View>
      </TouchableOpacity>
    );
  };

  // Function to filter experts based on search text
  const filterExperts = async () => {
    console.log(searchText);
    const lowerCaseText = searchText.toLowerCase();
  
    // Check if the search value is present in the existing experts array
    const existingExpert = experts.find(
      (expert) => expert.name.toLowerCase() === lowerCaseText
    );
  
    if (existingExpert) {
      // If found in the existing array, set the found expert on top
      setExperts((prevExperts) => [existingExpert, ...prevExperts]);
    } else {
      // If not found, make an API call
      try {
        const response = await fetch(
          `${API_PATH}/get-booked-experts?name=${lowerCaseText}`, {
            method: "GET",
            headers: {
              Authorization: user.token,
            },
          }
        );
  
        if (response.ok) {
          const data = await response.json();
          if (data.length > 0) {
            // If API call has matched data, set it on top
            setExperts((prevExperts) => [...data, ...prevExperts]);
          }
        } else {
          console.error('Failed to fetch experts data');
        }
      } catch (error) {
        console.error('Error fetching experts data:', error);
      }
    }
  };

 
  
  const handleGoBack = () => {
    navigation.goBack();
  };
  return (
    <SafeAreaView style={[currentStyle.bg, {flex: 1}]}>
      <View
        style={[
          styles.customHeaderContainer,
          {justifyContent: 'space-between', paddingLeft: 16, paddingRight: 16},
        ]}>
          <View style={[styles.row,{gap:10}]}>
           <TouchableOpacity onPress={handleGoBack}>
            <Text style={[currentStyle.bgText]}>
              <Ionicons name="arrow-back" size={25} />
            </Text>
          </TouchableOpacity>
        <TouchableOpacity
          style={{paddingLeft: 0}}
          onPress={() => navigation.navigate('Settings')}>
          <Image
            source={
              user?.user?.image.includes('/uploads/users/user.png')
                ? require('../../assets/Pic/user.png')
                : {uri: `${API_PATH}${user?.user?.image}`}
            }
            style={{height: 35, width: 35, borderRadius: 100}}
          />
        </TouchableOpacity>
        </View>
        <TouchableOpacity
          style={[
            {paddingHorizontal: 20, paddingVertical: 10, borderRadius: 30},
          ]}>
          <Text style={[currentStyle.bgText, {fontWeight: 500, fontSize: 18}]}>
            Messages
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={{paddingHorizontal: 10}}>
          <Text style={[currentStyle.bgText]}>
            <Ionicons name="notifications-circle-outline" size={25} />
          </Text>
        </TouchableOpacity>
      </View>
      <View style={[styles.passContainer, styles.inputWidth100]}>
        <TextInput
          value={searchText}
          placeholder={'Search Expert...'}
          placeholderTextColor={currentStyle.bgText.color}
          style={[
            styles.ChatInput,
            {borderColor: 'lightgrey', color: currentStyle.bgText.color},
          ]}
          onChangeText={(value) => setSearchText(value)} // Call filterExperts on text change
        />
        <TouchableOpacity style={[styles.iconContainer]} onPress={filterExperts}>
          <Ionicons name="search" size={20} color={currentStyle.bgText.color} />
        </TouchableOpacity>
      </View>
      <View>
        {experts.length > 0 ? 
          <FlatList
          data={experts} // Render the filtered experts
          keyExtractor={item => item._id}
          renderItem={renderChatItem}
          showsVerticalScrollIndicator={false}
        />
        :
        <ActivityIndicator color={'#fff'} />
        }
      </View>
    </SafeAreaView>
  );
};

export default Chat;
