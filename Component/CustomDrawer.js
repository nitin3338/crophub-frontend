import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  TextInput,
  ScrollView,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useSelector} from 'react-redux';
import {selectUser} from '../redux/slices/userSlice';
import {useTranslation} from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import styles, {Colors,lightStyles,darkStyles} from '../Styles';
import { useNavigation } from '@react-navigation/native';
import { useDarkModeContext } from "../context/darkMode";
import { API_PATH } from '../env';



const CustomDrawer = ({onClose}) => {
  const navigation = useNavigation();
  const {t} = useTranslation();
  const user = useSelector(selectUser);
  const {isDarkMode} = useDarkModeContext();
  const [username, setUsername] = useState('');



  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  //console.log(user);
  useEffect(() => {
    if (user && user.user) {
      setUsername(user.user.name);
    } else {
      setUsername('Guest');
    }
  }, [user]);

  //console.log(user?.user?.image);
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
    <>
      <ScrollView showsVerticalScrollIndicator={false}>
      <View>
        <TouchableOpacity
          onPress={onClose}
          style={[styles.toggleClose, {backgroundColor: '#e1e2e3'}]}>
          <Ionicons name="close-outline" size={25} style={{color: '#333'}} />
        </TouchableOpacity>
      </View>
      <View style={{flex: 1}}>
        {/* Header */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'left',
            borderBottomWidth: 2,
            borderStyle: 'solid',
            borderColor: Colors.dimgrey,
            paddingHorizontal: 5,
            paddingVertical: 30,
            gap: 10,
          }}>
        
          <Image
            source={
              user?.user?.image.includes('/uploads/users/user.png')
                ? require('../assets/Pic/user.png')
                : {uri: `${API_PATH}${ user?.user?.image}`}
            }
            style={{height: 60, width: 60, borderRadius: 100}}
          />

          {/* View to Hold User Name & Links */}
          <View>
            {user?.user ? (
              <>
                <Text style={[currentStyle.bgText,{fontSize: 17, fontWeight: 600}]}>
                  Hi {user.user.firstname}
                </Text>
                <Text
                  style={{
                    fontSize: 12,
                    color: 'grey',
                    maxWidth: 200, // Set a maximum width for the email to prevent overflow
                  }}
                  numberOfLines={1}
                  ellipsizeMode="tail">
                  {user?.user?.email}
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'left',
                    gap: 6,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                  //   onPress={() => props.navigation.navigate('Profile')}
                  >
                    <Text
                      style={[currentStyle.bgText,{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }]}>
                      Account
                    </Text>
                  </TouchableOpacity>
                  <Text>|</Text>
                  <TouchableOpacity onPress={handleLogOut}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: 'red',
                      }}>
                      LogOut
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <>
                <Text style={{fontSize: 17, fontWeight: 600}}>Hi Guest</Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'left',
                    gap: 6,
                    alignItems: 'center',
                  }}>
                  <TouchableOpacity
                  //   onPress={() => props.navigation.navigate('Profile')}
                  >
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                      }}>
                      Account
                    </Text>
                  </TouchableOpacity>
                  <Text>|</Text>
                  <TouchableOpacity onPress={handleLogOut}>
                    <Text
                      style={{
                        fontSize: 11,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        color: 'red',
                      }}>
                      Login/SignUp
                    </Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </View>
        </View>

        {/* Menu Items */}
        <View style={[currentStyle.bg,{flex: 1}]}>

        <TouchableOpacity
            style={[localstyles.drawerItem,currentStyle.bgGrey]}
            onPress={() => navigation.navigate('Main')}>
              <Text style={[currentStyle.bgText]}>
              <Ionicons name="home-outline" size={22} />
              </Text>
            <Text style={[localstyles.drawerItemText,currentStyle.bgText]}>Home</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[localstyles.drawerItem]}
            onPress={() => navigation.navigate('Cart')}>
              <Text style={[currentStyle.bgText]}>
              <Ionicons name="cart-outline" size={22} />
              </Text>
            <Text style={[localstyles.drawerItemText,currentStyle.bgText]}>Cart</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={localstyles.drawerItem}
            onPress={() => navigation.navigate('Consultation')}>
               <Text style={[currentStyle.bgText]}>
              <Ionicons name="calendar-outline" size={22}/>
              </Text>
            <Text style={[localstyles.drawerItemText,currentStyle.bgText]}>Consultation</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={localstyles.drawerItem}
            onPress={() => navigation.navigate('CropAgreement')}>
               <Text style={[currentStyle.bgText]}>
              <Ionicons name="receipt-outline" size={22}/>
              </Text>
            <Text style={[localstyles.drawerItemText,currentStyle.bgText]}>CropAgreement</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={localstyles.drawerItem}
            onPress={() => navigation.navigate('Invoices')}>
               <Text style={[currentStyle.bgText]}>
              <Ionicons name="documents-outline" size={22}/>
              </Text>
            <Text style={[localstyles.drawerItemText,currentStyle.bgText]}>Invoices</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={localstyles.drawerItem}
            onPress={() => navigation.navigate('Orders')}>
               <Text style={[currentStyle.bgText]}>
              <Feather name="truck" size={22}/>
              </Text>
            <Text style={[localstyles.drawerItemText,currentStyle.bgText]}>Orders</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={localstyles.drawerItem}
            onPress={() => navigation.navigate('Crops')}>
               <Text style={[currentStyle.bgText]}>
              <Ionicons name="leaf-outline" size={22}/>
              </Text>
            <Text style={[localstyles.drawerItemText,currentStyle.bgText]}>Crops</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={localstyles.drawerItem}
            onPress={() => navigation.navigate('Chat')}>
               <Text style={[currentStyle.bgText]}>
              <Ionicons name="chatbubbles-outline" size={22}/>
              </Text>
            <Text style={[localstyles.drawerItemText,currentStyle.bgText]}>Chat</Text>
          </TouchableOpacity>

          <View style={[styles.menuHelpCenter,currentStyle.bgGrey]}>
            <Text style={[currentStyle.bgText,{fontSize: 18, fontWeight: '600'}]}>Help Center</Text>
            <TouchableOpacity style={[styles.menuHelpCenter.Items,currentStyle.bg, styles.mt3]}>
            <Text style={[currentStyle.bgText]}>
              <Ionicons name="headset-outline" 
              size={18} /></Text>
              <Text style={[styles.menuHelpCenter.Text,currentStyle.bgText]}>
                Chat With Support Team{' '}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuHelpCenter.Items,currentStyle.bg ]}>
              <Text style={[currentStyle.bgText]}>
              <Ionicons name="mail-unread-outline" size={18} />
              </Text>
              <Text style={[styles.menuHelpCenter.Text,currentStyle.bgText]}>
                Support Ticket Center
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={[styles.menuHelpCenter.Items, currentStyle.bg]}>
              <Text style={[currentStyle.bgText]}>
              <Ionicons name="call-outline" size={18} />
              </Text>
              <Text style={[styles.menuHelpCenter.Text, {color: '#258af7'}]}>
                +91 916 116 9360{' '}
              </Text>
            </TouchableOpacity>
          </View>
          <View style={[styles.plr2, styles.mt4]}>
            <Text style={{fontSize: 12, color: '#c4c2c2'}}>
              © 2023 Crophub Agritech LLC®
            </Text>
          </View>
        </View>
      </View>
      </ScrollView>
    </>
  );
};

const localstyles = StyleSheet.create({
  drawerItem: {
    paddingVertical: 14,
    paddingHorizontal: 16,
    flexDirection:'row',
    gap:15,
    alignItems:'center'
  },
  drawerItemText: {
    fontSize: 16,
  },
});

export default CustomDrawer;
