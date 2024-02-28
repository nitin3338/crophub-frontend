import { StyleSheet, Text, View ,useColorScheme,StatusBar,  TouchableOpacity, Animated, SafeAreaView,} from 'react-native'
import React ,{useState,useEffect,useRef}from 'react'
import styles, {Colors, darkStyles, lightStyles} from '../Styles';
import Ionicons from "react-native-vector-icons/Ionicons";


export default function DarkMode({currentStyles}) {
  const [useDarkMode, setUseDarkMode] = useState('');
  const isDarkMode = useColorScheme() === useDarkMode;  

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'dark-content' : 'light-content');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setUseDarkMode(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  // Get styles based on theme
  const currentStyles = isDarkMode ? lightStyles : darkStyles;
  return (
    <SafeAreaView style={[currentStyles.container,styles.container]}>
       <View style={{alignItems:'flex-end'}}>
          <TouchableOpacity onPress={toggleTheme} style={[styles.togglebtn, currentStyles.bg]}>
            <Text style={currentStyles.bgText}>
            {useDarkMode === 'light' ? (<Ionicons
              name="moon-outline"
              size={16}
            />) : (<Ionicons
            name="sunny-outline"
            size={20}
          />)}
            </Text>
          </TouchableOpacity>
        </View>
    </SafeAreaView>
  )
};