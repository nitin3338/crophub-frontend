import React, { useState } from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Home from '../Screens/TabScreen/Home';
import Products from '../Screens/TabScreen/Products';
import Services from '../Screens/TabScreen/Services';
import Settings from '../Screens/TabScreen/Settings';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import styles, {darkStyles, lightStyles, Colors} from '../Styles';
import {View, Text} from 'react-native';
import {useDarkModeContext} from '../context/darkMode';
import Chat from '../Screens/DrawerScreen/Chat';
import FertilizerCalculator from '../Component/fertiCalculator/FertilizerCalculator';
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const {isDarkMode} = useDarkModeContext();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const [focused, setFocused] = useState('Home');

  const screenOptions = {
    tabBarShowLabel: false,
    headerShown: false,
    tabBarActiveTintColor: 'green', // Set active tab icon and text color to yellow
    tabBarInactiveTintColor: '#333',
    tabBarStyle: {
      flex: 1,
      position: 'absolute',
      justifyContent: 'space-between',
      bottom: 0,
      height: 60,
      alignItems: 'center',
      alignContent: 'center',
      borderTopWidth: 0,
      elevation: 0,
      ...currentStyle.bgGrey,
      
    },
    activeTintColor: Colors.primary,  // Change icon and text color when focused
    inactiveTintColor: currentStyle.bgGrey, 
  };

  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen
        name="Home"
        component={Home}
        onPress={() => setFocused('Home')}
        options={{
          tabBarIcon: ({color}) => (
            <View style={styles.MenuItem}>
              <Text
                style={[currentStyle.bgText]}>
                <Ionicons name="home-outline" style={styles.MenuIcon} color={color}  />
                
              </Text>
              <Text style={[currentStyle.bgText, styles.MenuLabel]}>Home</Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Products"
        component={Products}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.MenuItem}>
              <Text
                style={
                   currentStyle.bgText
                }>
                <Ionicons name="cube-outline" style={styles.MenuIcon} />
                
              </Text>
              <Text style={[currentStyle.bgText, styles.MenuLabel]}>Products</Text>
            </View>
          ),
        }}
      />
       <Tab.Screen
        name="Fertilizer Calculator"
        component={FertilizerCalculator}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.MenuItem}>
              <Text
                style={[
                   currentStyle.bgText]}>
                <Feather name="plus-circle" size={40} />
                
              </Text>
              
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Services"
        component={Services}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.MenuItem}>
              <Text style={
                   currentStyle.bgText
                }>
              <Ionicons
                name="paw-outline"
                style={styles.MenuIcon}
              />
              </Text>
              <Text
                style={[currentStyle.bgText, styles.MenuLabel]}>
                Services
              </Text>
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarIcon: ({focused}) => (
            <View style={styles.MenuItem}>
              <Text style={[currentStyle.bgText]}>
              <Ionicons
                name="settings-outline"
                style={styles.MenuIcon}
              />
              </Text>
              <Text
                style={[currentStyle.bgText, styles.MenuLabel]}>
                Settings
              </Text>
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
