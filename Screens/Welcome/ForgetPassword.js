import {  SafeAreaView,
    View,
    Image,
    Text,
    TouchableOpacity,
    TextInput,
    ScrollView,
Animated ,useColorScheme,StatusBar,} from 'react-native'
import React , { useState, useEffect,useRef }from 'react'
import { API_PATH } from '../../env'
import styles, {Colors, darkStyles, lightStyles} from '../../Styles';
import { useForm } from "react-hook-form";
import Toast from "react-native-toast-message";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useToast } from '../../context/toastContext';



export default function ForgetPassword() {
  const {showToast} = useToast();
    const [useDarkMode, setUseDarkMode] = useState('');
    const isDarkMode = useColorScheme() === useDarkMode;  
    const { t, i18n } = useTranslation();
    const [nextStep, setNextStep] = useState(0);
    const { control, handleSubmit } = useForm();
    const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [isFocused, setIsFocused] = useState(false);
    const navigation = useNavigation();
  
    const toggleSecureTextEntry = () => {
      setSecureTextEntry(!secureTextEntry);
    };
    const [userData, setUserData] = useState({
      email: "",
      otp: null,
      password: "",
      confirmPassword: "",
    });

    useEffect(() => {
        StatusBar.setBarStyle(isDarkMode ? 'dark-content' : 'light-content');
      }, [isDarkMode]);
    
      const toggleTheme = () => {
        setUseDarkMode(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
      };
      // Get styles based on theme
      const currentStyles = isDarkMode ? lightStyles : darkStyles;
    
    
      const fadeAnim = useRef(new Animated.Value(0)).current;
    
      useEffect(() => {
        
        Animated.timing(fadeAnim, {
          toValue: 1, 
          duration: 3000,
          useNativeDriver: true,
        }).start(); 
    
      }, []); 
    const SendOtp = async () => {
      try {
        const sendOtp = await fetch(`${API_PATH}send-reset-password-otp`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email: userData.email }),
        });
        //console.log(sendOtp);
        if (sendOtp.status === 200) {
          showToast('OTP Sent','success');
          //console.log(userData.email);
          setNextStep(1);
        } else {
          showToast('Invalid OTP','error');
        }
      } catch (error) {
        showToast('Something Went Wrong','error');
        console.log("Error Message: " + error);
      }
    };
  
    const verifyOtp = async () => {
      try {
        const response = await fetch(`${API_PATH}verify-reset-password`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(userData), //{ otp: userData.otp, email: userData.email }
        });
  
        if (response.ok) {
          showToast('OTP Sent','success');
          setNextStep(2);
        } else {
          showToast('Invalid OTP','error');
        }
      } catch (error) {
        showToast('Something Went Wrong','error');
        console.log("Error Message: " + error);
      }
    };
  
    const ResetPassword= async()=>{
      if (
          !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+\-|=]).{8,32}$/.test(
            userData.password
          )
        ) {
          alert("Enter Strong Password!");
        }
        try {
          const response = await fetch(`${API_PATH}reset-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(userData),
          });
    
          if (response.ok) {
            showToast(`${t("common.resetPasswordSuccess")}`,'success');
           
    
            //console.log("User data:", userData);
          } else {
            showToast(`${t("common.resetPasswordFailed")}`,'error')
           
          }
        } catch (error) {
          showToast('Something Went Wrong', 'error')
          console.log("Error Message: " + error);
        }
        navigation.navigate("Login");
      };



  return (
   <SafeAreaView style={[styles.container,currentStyles.container]}>
    <ScrollView>
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
        <View style={[styles.mt8,{alignItems:'center'}]}>
        <Animated.Image
            source={require('../../assets/crophub-icon.png')}
            style={[
              { width: 100, height: 100 },
              styles.mb2,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </View>

        <View style={[styles.mt4]}>
          <Text style={[styles.headingMedium, currentStyles.headingText]}>
            {t("common.forgotPassword")}
          </Text>
          <View
            style={[
              { height: 2, width: "16%" },
              styles.mb1,currentStyles.bg
            ]}
          />
          <Text style={[styles.paragraph, { color: "#a1a1a1", fontSize: 15 }]}>
            {t("common.subText")}
          </Text>
        </View>
        {nextStep === 0 ? (
          <>
            <TextInput
              placeholder={t("email")}
              placeholderTextColor={currentStyles.headingText.color}
              name="email"
              control={control}
              rules={{ required: true }}
              style={[
                styles.input,
                styles.inputWidth100,
                
                { borderColor: isFocused ? "#aac949" : "lightgrey",color:currentStyles.headingText.color },
              ]}
              onChangeText={(value) =>
                setUserData({ ...userData, email: value })
              }
            />

            <TouchableOpacity
              style={[styles.btnCont,styles.btnPrimary]}
              onPress={
                userData.email !== null || userData.email !== ""
                  ? SendOtp
                  : null
              }
            >
              <Text style={[styles.btnText,currentStyles.bgText ,  { fontSize: 16 }]}>
                {t("common.sendOtp")}
              </Text>
            </TouchableOpacity>
          </>
        ) : nextStep === 1 ? (
            <View>
            <TextInput
              placeholder={t("otp")}
              placeholderTextColor={currentStyles.headingText.color}
              name="Enter OTP"
              control={control}
              rules={{ required: true }}
              style={[
                styles.input,
                styles.inputWidth100,
                
                { borderColor: isFocused ? "#aac949" : "lightgrey",color:currentStyles.headingText.color },
              ]}
              onChangeText={(value) => setUserData({ ...userData, otp: value })}
            />

            <TouchableOpacity style={[styles.btnCont,styles.btnPrimary]} onPress={verifyOtp}>
              <Text style={[styles.btnText,currentStyles.bgText ,  { fontSize: 16 }]}>
                {t("common.verifyOtp")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : nextStep === 2 ? (
          <View>
            <View style={[styles.mt4]}>
              <Text style={[styles.headingSmall, currentStyles.headingText]}>
                {t("common.resetPassword")}
              </Text>
            
            </View>
            <View style={[styles.passContainer, styles.inputWidth100]}>
              <TextInput
                placeholder={t("common.password")}
                placeholderTextColor={currentStyles.headingText.color}
                name="password"
                control={control}
                rules={{ required: true }}
                secureTextEntry={secureTextEntry}
                style={[
                  styles.input,
                  { borderColor: isFocused ? "#aac949" : "lightgrey" ,color:currentStyles.headingText.color},
                ]}
                onChangeText={(value) => {
                  setUserData({ ...userData, password: value });
                }}
              />
              <TouchableOpacity
                style={styles.iconContainer}
                onPress={toggleSecureTextEntry}
              >
                <Ionicons
                  name={secureTextEntry ? "eye-outline" : "eye-off-outline"}
                  size={25}
                  color={currentStyles.headingText.color}
                />
              </TouchableOpacity>
            </View>

            <TextInput
              placeholder={t("common.confirmPassword")}
              placeholderTextColor={currentStyles.headingText.color}
              name="confirmPassword"
              control={control}
              rules={{ required: true }}
              secureTextEntry={secureTextEntry}
              style={[
                styles.input,
                styles.inputWidth100,
                { borderColor: isFocused ? "#aac949" : "lightgrey",color:currentStyles.headingText.color },
              ]}
              onChangeText={(value) => {
                setUserData({ ...userData, confirmPassword: value });

              }}
            />
            <TouchableOpacity style={[styles.btnCont,styles.btnPrimary]} onPress={ResetPassword} >
              <Text style={[styles.btnText,currentStyles.headingText.color, { fontSize: 16 }]}>
                {t("common.resetPassword")}
              </Text>
            </TouchableOpacity>
          </View>
        ) : null}
    </ScrollView>
   </SafeAreaView>
  )
}

