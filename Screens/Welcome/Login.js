import React, {useState, useEffect,useRef} from 'react';
import {
  SafeAreaView, 
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  useColorScheme,StatusBar,
} from 'react-native';
import { useForm } from "react-hook-form";
import styles, {Colors, darkStyles, lightStyles} from '../../Styles';
import Ionicons from "react-native-vector-icons/Ionicons";
import { setUser } from "../../redux/slices/userSlice";
import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import {API_PATH} from '../../env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useToast } from '../../context/toastContext';
import { useSelector } from 'react-redux';
import { selectLocation } from '../../redux/slices/locationSlice'


export default function Login({navigation}) {
  const locationData = useSelector(selectLocation);
  //console.log(locationData);
  const {showToast} = useToast();
  const [useDarkMode, setUseDarkMode] = useState('');
  const isDarkMode = useColorScheme() === useDarkMode;  
  const { control, handleSubmit } = useForm();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const dispatch = useDispatch();
  const [isFocused, setIsFocused] = useState(false);
  const { t } = useTranslation();
  const [userData, setUserData] = useState({
    email: "",
    otp: "",
    password: "",
    loginwithpassword: "false",
  });
  const [jwtToken, setJwtToken] = useState(null);
  const [nextStep, setNextStep] = useState(0);
  const [otpSet, setOtpSet] = useState(true);
  const [emailValidate, setEmailValidate] = useState(true);

  useEffect(() => {
    StatusBar.setBarStyle(isDarkMode ? 'dark-content' : 'light-content');
  }, [isDarkMode]);

  const toggleTheme = () => {
    setUseDarkMode(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };
  // Get styles based on theme
  const currentStyles = isDarkMode ? lightStyles : darkStyles;

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

  
  const sendLoginOTP = async () => {
    //console.log(userData)
    try {
      const response = await fetch(`${API_PATH}/loginotp`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({userData}),
      });
      //console.log(response)

      if (response.status === 200) {
        showToast('Otp Sent','success');
       
      } else {
        showToast('Otp Sending Failed','error');
      
      }
    } catch (error) {
      showToast('Something Went Wrong','error');
      console.log("Error Message: " + error);
    }
  };

  const validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email);
  };

  const handlePasswordValidation = (text) => {
    if (text.length >= 6) {
      setOtpSet(false);
    } else {
      setOtpSet(true);
    }
  };


  //console.log(setUser);
  

  const HandleLogin = async () => {
    try {
      const response = await fetch(`${API_PATH}/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        const data = await response.json();
        const token = data.token;
        dispatch(setUser(data));
        await AsyncStorage.setItem('jwtToken', token);
      setJwtToken(token);
      
      setUserData({
        email: '',
        otp: '',
        password: '',
        loginwithpassword: false
      });
      setNextStep(0);
      showToast('Welcome To Crophub', 'success');
      setTimeout(() => {
        navigation.navigate("Main");
      }, 2000)

      } else if(response.status === 400) {
        showToast('Please Try Again','error')
      }else if(response.status === 401){
        showToast('Invalid Otp', 'error')
      }else if(response.status === 402){
        showToast('Invalid Password', 'error')
      }
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    
    Animated.timing(fadeAnim, {
      toValue: 1, 
      duration: 3000,
      useNativeDriver: true,
    }).start(); 

  }, []); 
  return (
    <SafeAreaView style={[currentStyles.container,styles.container]}>
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
        <View style={[styles.mt6]}>
          <Text style={[styles.headingMedium, currentStyles?.headingText || {}]}>
            {t("common.login")}
          </Text>
          <View
            style={[
              { height: 2, width: "16%" },
              styles.mb1, currentStyles.bg
            ]}
          />
          <Text
            style={[
              styles.paragraph,
              { paddingRight: 50, color: "#a1a1a1", fontSize: 15 },
            ]}
          >
            {t("common.loginSubtext")}
          </Text>
        </View>

        <View>
          <TextInput
            placeholder={t("common.email")} 
            placeholderTextColor={currentStyles.headingText.color}
            value={userData.email}
            onChangeText={(text) => {
              text = text.toLowerCase();
              const isValidEmail = validateEmail(text);
              setEmailValidate(!isValidEmail);
              setUserData({ ...userData, email: text });
            }}
            style={[
              styles.input,
              styles.inputWidth100,
              { borderColor: isFocused ? "#aac949" : "lightgrey",color:currentStyles.headingText.color },
            ]}
          />
          {nextStep === 0 ? (
            <TouchableOpacity
              style={[
                styles.btn,
                styles.btnFull,
                styles.btnMedium,
                emailValidate ? null : styles.btnSecondary
              ]}
              onPress={sendLoginOTP}
              disabled={emailValidate}
            >
              
              <Text style={[styles.btnText,currentStyles.bgText]}>{t("common.sendOtp")}</Text>
              
            </TouchableOpacity>
          ) : null}

          {nextStep === 1 ? (
            <TextInput
            value={userData.otp}
              placeholder="• • • • • •"
              name="otp"
              control={control}
              rules={{ required: true }}
              style={[
                styles.input,
                {
                  borderColor: isFocused ? "#aac949" : "lightgrey",
                  textAlign: "center",
                  fontSize: 20,
                  letterSpacing: 5,
                  color:currentStyles.headingText.color
                },
              ]}
              onChangeText={(text) => {
                handlePasswordValidation(text);
                setUserData({ ...userData, otp: text });
              }}
              maxLength={6}
            />
          ) : null}

          {nextStep === 2 ? (
            <View style={[styles.passContainer, styles.inputWidth100]}>
              <TextInput
              value={userData.password}
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
                onChangeText={(text) => {
                  handlePasswordValidation(text);
                  setUserData({ ...userData, password: text });
                }}
              />
              <TouchableOpacity
                style={[styles.iconContainer]}
                onPress={toggleSecureTextEntry}
              >
                <Ionicons
                  name={secureTextEntry ? "eye-off-outline" : "eye-outline"}
                  size={20}
                  color={currentStyles.headingText.color}
                />
              </TouchableOpacity>
            </View>
          ) : null}

          {nextStep === 1 || nextStep === 2 ? (
            <TouchableOpacity
              style={[
                styles.btn,
                styles.btnFull,
                styles.btnMedium,
                otpSet ? null : styles.btnPrimary,
              ]}
              onPress={HandleLogin}
              disabled={otpSet}
            >
              <Text style={[styles.btnText,currentStyles.bgText]}>
                {t("common.login")}
              </Text>
            </TouchableOpacity>
          ) : null}

          <View
            style={[
              styles.plr1,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                alignItems: "center",
              },
            ]}
          ></View>

          <View style={[styles.row, styles.spaceBetween, styles.plr1]}>
            <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={[currentStyles.headingText,{fontWeight:'600',fontSize: 16}]}>{t("common.goToSignup")}</Text>
            </TouchableOpacity>
            {/* Forgot Password */}
            {nextStep === 2 ? (
              <TouchableOpacity
              style={styles.btn}
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text style={[currentStyles.headingText,{ fontWeight:'600',fontSize: 16 }]}>
                {t("common.forgotPassword")}
              </Text>
            </TouchableOpacity> 
            ) : (
              <TouchableOpacity onPress={() => {setNextStep(2), userData.loginwithpassword = "true"}}>
              <Text
                style={[currentStyles.headingText,{fontSize: 16,fontWeight:'600'}]}
              >
                {t("common.loginWithPassword")}
              </Text>
            </TouchableOpacity>
            )}
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
