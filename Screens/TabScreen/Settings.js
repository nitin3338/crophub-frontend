import {
  View,
  Image,
  Text,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import React, { useState } from "react";
import styles,{lightStyles,darkStyles,Colors} from "../../Styles";
import { useSelector } from "react-redux";
import { selectUser } from "../../redux/slices/userSlice";
//import UserProfile from "../../Component/UserProfile";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_PATH } from "../../env";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { useDarkModeContext } from "../../context/darkMode";
import CustomHeader from "../../Component/CustomHeader";
import UserProfile from "../../Component/UserProfile";

const Settings = () => {
  const user = useSelector(selectUser);
  const [isUserProfileVisible, setIsUserProfileVisible] = useState(false);
  const navigation = useNavigation();
  const {isDarkMode} = useDarkModeContext();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const toggleUserProfileModal = () => {
    setIsUserProfileVisible(!isUserProfileVisible);
  };
  const handleLogOut = async () => {
    try {
      // Remove userToken and user from AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('user');

      // Navigate to the Login screen
     navigation.navigate('Login');
    } catch (error) {
      // Handle error if necessary
      console.error('Error logging out:', error);
    }
  };

  return (
    <SafeAreaView style={[currentStyle.bg, { flex: 1 }]} >
      <CustomHeader />
      
      <ScrollView style={[styles.plr1,{flex:1}]}>
       
         <TouchableOpacity
        style={[styles.row, styles.col6, currentStyle.bgGrey]}
        onPress={toggleUserProfileModal} // Toggle modal on press
      >
        <View>
          <Image
            source={
              user?.user?.image.includes('/uploads/users/user.png')
                ? require('../../assets/Pic/user.png')
                : { uri: `${API_PATH}${user?.user?.image}` }
            }
            style={{ height: 40, width: 40, borderRadius: 100 }}
          />
        </View>
        <View style={[styles.row, { paddingLeft: 20, gap: 90 }]}>
          <Text style={[currentStyle.bgText,{ fontSize: 16 }]}>
            Account Settings
          </Text>
          <Text style={[currentStyle.bgText]}>
          <Ionicons name="chevron-forward-outline" size={22} />
          </Text>
        </View>
      </TouchableOpacity>

      {/* UserProfile Modal */}
      <UserProfile isVisible={isUserProfileVisible} onClose={toggleUserProfileModal} />
        
        <View style={[styles.col6, styles.mt7,currentStyle.bgGrey]}>
          <View style={[styles.row]}>
            <Text style={[currentStyle.bgText]}>
            <Ionicons name="language-outline" size={22} />
            </Text>
            <TouchableOpacity style={[{ paddingLeft: 20 }]}>
              <Text style={[currentStyle.bgText,{ fontSize: 16 }]}>
                Language and Region
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.row, styles.mt4]}>
          <Text style={[currentStyle.bgText]}>
            <Ionicons name="notifications-outline" size={22} />
            </Text>
            <TouchableOpacity style={[{ paddingLeft: 20 }]} onPress={()=>navigation.navigate('Notification')}>
              <Text style={[currentStyle.bgText,{fontSize: 16 }]}>
                Notifications
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.row, styles.mt4]}>
          <Text style={[currentStyle.bgText]}>
            <Ionicons name="card-outline" size={22} />
            </Text>
            <TouchableOpacity style={[{ paddingLeft: 20 }]}>
              <Text style={[currentStyle.bgText,{fontSize: 16 }]}>
                Payment Settings
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.col6, styles.mt7,currentStyle.bgGrey]}>
          <View style={[styles.row]}>
          <Text style={[currentStyle.bgText]}>
            <Ionicons name="key-outline" size={22} />
            </Text>
            <TouchableOpacity style={[{ paddingLeft: 20 }]}>
              <Text style={[currentStyle.bgText,{ fontSize: 16 }]}>
               Privacy
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.row, styles.mt4]}>
          <Text style={[currentStyle.bgText]}>
            <Ionicons name="analytics-outline" size={22} />
            </Text>
            <TouchableOpacity style={[{ paddingLeft: 20 }]}>
              <Text style={[currentStyle.bgText,{ fontSize: 16 }]}>
               Data & Permissions
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.row, styles.mt4]}>
          <Text style={[currentStyle.bgText]}>
            <Ionicons name="shield-checkmark-outline" size={22} />
            </Text>
            <TouchableOpacity style={[{ paddingLeft: 20 }]}>
              <Text style={[currentStyle.bgText,{ fontSize: 16 }]}>
                Terms & Conditions
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={[styles.col6, styles.mt7 ,currentStyle.bgGrey]}>
          <View style={[styles.row]}>
          <Text style={[currentStyle.bgText]}>
            <Ionicons name="information-circle-outline" size={22} />
            </Text>
            <TouchableOpacity style={[{ paddingLeft: 20 }]}>
              <Text style={[currentStyle.bgText,{ fontSize: 16 }]}>
                Help Center
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.row, styles.mt4]}>
          <Text style={[currentStyle.bgText]}>
            <Ionicons name="help-circle-outline" size={22} />
            </Text>
            <TouchableOpacity style={[{ paddingLeft: 20 }]}>
              <Text style={[currentStyle.bgText,{ fontSize: 16 }]}>
               FAQ
              </Text>
            </TouchableOpacity>
          </View>

          <View style={[styles.row, styles.mt4]}>
            <Ionicons name="log-out-outline" size={22} color={"red"} />
            <TouchableOpacity style={[{ paddingLeft: 20 }]} onPress={handleLogOut}>
              <Text style={[{ color: "#333", fontSize: 16,color:'red' }]}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        
      </ScrollView>
    </SafeAreaView>
  );
};

export default Settings;
