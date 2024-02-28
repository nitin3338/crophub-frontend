import React,{useState,useEffect} from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,useColorScheme,StatusBar
} from "react-native";
import { NavigationContainer, useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { selectUser } from "../redux/slices/userSlice";
import Ionicons from "react-native-vector-icons/Ionicons";
import Feather from "react-native-vector-icons/Feather";
import styles, {Colors, darkStyles, lightStyles} from "../Styles";
import CustomModal from "./customModal";
import { useRoute } from "@react-navigation/native";
import { useDarkModeContext } from "../context/darkMode";

const CustomHeader = () => {
  const navigation = useNavigation();
  const { isDarkMode, toggleTheme } = useDarkModeContext();
  const route = useRoute();
  const user = useSelector(selectUser);
  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'dark-content' : 'light-content');
  }, [isDarkMode]);


  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  // Get styles based on themer
  const currentStyles = isDarkMode ? lightStyles : darkStyles;

  return (
    <SafeAreaView style={[styles.customHeaderContainer]}>
      <View style={styles.customHeaderContainer.headerIcons}>
        {/* Use the CustomModal component */}
        <CustomModal isVisible={isModalVisible} toggleModal={toggleModal} />

        <TouchableOpacity onPress={() => toggleModal()} style={[styles.customHeaderContainer.headerIcon, currentStyles.bg]} >
          <Feather name="align-left" size={20} style={[currentStyles.bgText]} />
        </TouchableOpacity>
        {/* {route.name !== "Home" ? (
            <View style={styles.customHeaderContainer.headerIcons}>
              <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name="chevron-back-outline" size={25} color= {'#B6B6B6'}  />
                </TouchableOpacity>
                <Text style={{color: '#777777', fontWeight: "bold", fontSize: 16}}>{route.name}</Text>
            </View>
        ) : null} */}
      </View>
      <View style={styles.customHeaderContainer.headerIcons}>
        <TouchableOpacity style={[styles.customHeaderContainer.headerIcon, currentStyles.icobg]} onPress={()=>navigation.navigate('Notification')}>
        <Text style={currentStyles.headingText}><Ionicons name="notifications-outline" size={20} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.customHeaderContainer.headerIcon, currentStyles.icobg]} onPress={()=>navigation.navigate('Chat')}>
        <Text style={currentStyles.headingText}><Ionicons name="chatbox-ellipses-outline" size={20} /></Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.customHeaderContainer.headerIcon, currentStyles.icobg]} onPress={()=>navigation.navigate('Cart')}>
        <Text style={currentStyles.headingText}><Feather name="shopping-bag" size={20} /></Text>
        </TouchableOpacity>
        <View >
        <TouchableOpacity onPress={toggleTheme} style={[styles.customHeaderContainer.headerIcon, currentStyles.icobg]}>
            <Text style={currentStyles.headingText}>
            {isDarkMode ? (<Ionicons
              name="moon-outline"
              size={16}
            />) : (<Ionicons
            name="sunny-outline"
            size={20}
          />)}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default CustomHeader;
