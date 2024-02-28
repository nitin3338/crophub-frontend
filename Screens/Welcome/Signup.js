import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Animated,
  TextInput,
  useColorScheme,
  StatusBar,
  Image,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
import {useForm} from 'react-hook-form';
import styles, {Colors, darkStyles, lightStyles} from '../../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {useNavigation} from '@react-navigation/native';
import {API_PATH} from '../../env';
import { useToast } from '../../context/toastContext';
import ToastComponent from '../../Component/ToastComponent';

export default function Signup() {
  const { showToast } = useToast();
  const toast = useToast();
  const [useDarkMode, setUseDarkMode] = useState('');
  const isDarkMode = useColorScheme() === useDarkMode;
  const {t, i18n} = useTranslation();
  const [userData, setUserData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    otp: null,
    phone: '',
    password: '',
    confirmPassword: '',
    roles: '',
  });
  const [isFocused, setIsFocused] = useState(null);
  const {control, handleSubmit} = useForm();
  const [nextStep, setNextStep] = useState(0);
  const [resendOtp, setResendOtp] = useState(false);
  const navigation = useNavigation();

  const [secureTextEntry, setSecureTextEntry] = useState(true);

  const toggleSecureTextEntry = () => {
    setSecureTextEntry(!secureTextEntry);
  };

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
    console.log(userData);
    try {
      const sendOtp = await fetch(`${API_PATH}/signupwithemail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      console.log(sendOtp);
      if (sendOtp.status === 200) {
        showToast('OTP Sent', 'success');
        console.log(userData.email);
        setNextStep(1);
      } else if (sendOtp.status === 400) {
        showToast('OTP not sent', 'error');
        console.log('Error Status: ', sendOtp.status);
      }
    } catch (error) {
      showToast('Something Went Wrong')
      console.log('Error Message: ' + error);
    }
  };

  const verifyOtp = async () => {
    try {
      const response = await fetch(`${API_PATH}/verifyotp`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData), //{ otp: userData.otp, email: userData.email }
      });

      if (response.ok) {
      showToast('Otp Verified','success')
        setNextStep(2);
      } else {
        showToast('Invalid Otp','error')
      }
    } catch (error) {
      showToast('Something went wrong','error')
      console.log('Error Message: ' + error);
    }
  };

  const handleSignUp = async () => {
    if (
      !/^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[*.!@$%^&(){}:;<>,.?/~_+\-|=]).{8,32}$/.test(
        userData.password,
      )
    ) {
      alert('Enter Strong Password!');
    }
    try {
      const response = await fetch(`${API_PATH}/signup`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(userData),
      });

      if (response.status === 200) {
        showToast('Signup Succesful','success')

        //console.log("User data:", userData);
      } else {
        showToast('Signup Unsuccessful', 'error')
      }
    } catch (error) {
      showToast('Something Went Wrong', 'error')
      console.log('Error Message: ' + error);
    }
    navigation.navigate('Login');
  };
  return (
    <SafeAreaView style={[currentStyles.container, styles.container]}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{alignItems: 'flex-end'}}>
          <TouchableOpacity
            onPress={toggleTheme}
            style={[styles.togglebtn, currentStyles.bg]}>
            <Text style={currentStyles.bgText}>
              {useDarkMode === 'light' ? (
                <Ionicons name="moon-outline" size={16} />
              ) : (
                <Ionicons name="sunny-outline" size={20} />
              )}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={[styles.mt8, {alignItems: 'center'}]}>
          <Animated.Image
            source={require('../../assets/crophub-icon.png')}
            style={[
              {width: 100, height: 100},
              styles.mb2,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        </View>

        <View style={[styles.mt4]}>
          {/* <ToastComponent message={'otp sent'} type={'success'} /> */}
          <Text style={[styles.headingMedium, currentStyles.headingText]}>
            {t('common.createAccount')}
          </Text>
          <View
            style={[{height: 2, width: '16%'}, styles.mb1, currentStyles.bg]}
          />
          {nextStep !== 2 ? <Text style={[styles.paragraph, {color: '#a1a1a1', fontSize: 15}]}>
            {t('common.subText')}
          </Text> : null}
        </View>
        {nextStep === 0 ? (
          <>
            <TextInput
              placeholder={t('email')}
              placeholderTextColor={currentStyles.headingText.color}
              name="email"
              control={control}
              rules={{required: true}}
              style={[
                styles.input,
                styles.inputWidth100,

                {
                  borderColor: isFocused ? '#aac949' : 'lightgrey',
                  color: currentStyles.headingText.color,
                },
              ]}
              onChangeText={value => setUserData({...userData, email: value})}
            />

            <TouchableOpacity
              style={[styles.btnCont, styles.btnPrimary]}
              onPress={
                userData.email !== null || userData.email !== ''
                  ? SendOtp
                  : null
              }>
              <Text
                style={[styles.btnText, currentStyles.bgText, {fontSize: 16}]}>
                {t('common.sendOtp')}
              </Text>
            </TouchableOpacity>
          </>
        ) : nextStep === 1 ? (
          <View>
            <TextInput
              placeholder={t('otp')}
              placeholderTextColor={currentStyles.headingText.color}
              name="Enter OTP"
              control={control}
              rules={{required: true}}
              style={[
                styles.input,
                styles.inputWidth100,

                {
                  borderColor: isFocused ? '#aac949' : 'lightgrey',
                  color: currentStyles.headingText.color,
                },
              ]}
              onChangeText={value => setUserData({...userData, otp: value})}
            />

            <TouchableOpacity
              style={[styles.btnCont, styles.btnPrimary]}
              onPress={verifyOtp}>
              <Text
                style={[styles.btnText, currentStyles.bgText, {fontSize: 16}]}>
                {t('common.verifyOtp')}
              </Text>
            </TouchableOpacity>
          </View>
        ) : nextStep === 2 ? (
          <>
            <View>
              <TouchableOpacity
                onPress={() => {
                  setUserData({...userData, roles: 'farmer'}), setIsFocused(0);
                }}>
                <View
                  style={[
                    styles.col3,
                    {backgroundColor: '#d4d9fc'},
                    isFocused === 0 && {opacity: 0.4},
                  ]}>
                  <Image
                    source={require('../../assets/Pic/farmer.png')}
                    style={{width: 80, height: 80}}
                  />
                  <View>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>
                      Farmer
                    </Text>
                    <Text style={{fontSize: 14}}>"I Produce Crops."</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mt3]}
                onPress={() => {
                  setUserData({...userData, roles: 'merchant'}),
                    setIsFocused(1);
                }}>
                <View
                  style={[
                    styles.col3,
                    {backgroundColor: '#F2E6DC'},
                    isFocused === 1 && {opacity: 0.4},
                  ]}>
                  <Image
                    source={require('../../assets/Pic/corporate.png')}
                    style={{width: 80, height: 80}}
                  />
                  <View>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>
                      Buyer/Corporate
                    </Text>
                    <Text style={{fontSize: 14}}>"I Purchase the Crop"</Text>
                  </View>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.mt3]}
                onPress={() => {
                  setUserData({...userData, roles: 'expert'}), setIsFocused(2);
                }}>
                <View
                  style={[
                    styles.col3,
                    {backgroundColor: '#E3F7F1'},
                    isFocused === 2 && {opacity: 0.4},
                  ]}>
                  <View>
                    <Text style={{fontSize: 20, fontWeight: '600'}}>
                      Expert
                    </Text>
                    <Text style={{fontSize: 14}}>"I Produce Crop."</Text>
                  </View>
                  <Image
                    source={require('../../assets/Pic/expert.png')}
                    style={{width: 80, height: 80}}
                  />
                </View>
              </TouchableOpacity>
              {userData?.roles !== '' ? (
                <TouchableOpacity
                  onPress={() => setNextStep(3)}
                  style={[styles.btn, styles.btnMedium, styles.btnPrimary]}>
                  <Text style={{color: '#fff'}}>Next</Text>
                </TouchableOpacity>
              ) : null}
            </View>
          </>
        ) : nextStep === 3 ? (
          <>
            <View style={{flexDirection: 'row', gap: 5}}>
              <TextInput
                placeholder={t('common.firstName')}
                placeholderTextColor={currentStyles.headingText.color}
                name="firstname"
                control={control}
                rules={{required: true}}
                style={[
                  styles.input,
                  styles.inputWidth50,

                  {
                    borderColor: isFocused ? '#aac949' : 'lightgrey',
                    color: currentStyles.headingText.color,
                  },
                ]}
                onChangeText={value => {
                  setUserData({...userData, firstname: value});
                }}
              />
              <TextInput
                placeholder={t('common.lastName')}
                placeholderTextColor={currentStyles.headingText.color}
                name="lastname"
                control={control}
                rules={{required: true}}
                style={[
                  styles.input,
                  styles.inputWidth50,

                  {
                    borderColor: isFocused ? '#aac949' : 'lightgrey',
                    color: currentStyles.headingText.color,
                  },
                ]}
                onChangeText={value => {
                  setUserData({...userData, lastname: value});
                }}
              />
            </View>
            <TextInput
              placeholder={t('common.phoneNumber')}
              placeholderTextColor={currentStyles.headingText.color}
              name="phone"
              control={control}
              rules={{required: true}}
              style={[
                styles.input,
                styles.inputWidth100,

                {
                  borderColor: isFocused ? '#aac949' : 'lightgrey',
                  color: currentStyles.headingText.color,
                },
              ]}
              onChangeText={value => {
                setUserData({...userData, phone: value});
              }}
            />

            <View style={{flexDirection: 'row', gap: 5}}>
              <View style={[styles.passContainer, styles.inputWidth50]}>
                <TextInput
                  placeholder={t('common.password')}
                  placeholderTextColor={currentStyles.headingText.color}
                  name="password"
                  control={control}
                  rules={{required: true}}
                  secureTextEntry={secureTextEntry}
                  style={[
                    styles.input,

                    {
                      borderColor: isFocused ? '#aac949' : 'lightgrey',
                      color: currentStyles.headingText.color,
                    },
                  ]}
                  onChangeText={value => {
                    setUserData({...userData, password: value});
                  }}
                />
                <TouchableOpacity
                  style={styles.iconContainer}
                  onPress={toggleSecureTextEntry}>
                  <Ionicons
                    name={secureTextEntry ? 'eye-outline' : 'eye-off-outline'}
                    size={25}
                    color={currentStyles.headingText.color}
                  />
                </TouchableOpacity>
              </View>

              <TextInput
                placeholder={t('common.confirmPassword')}
                placeholderTextColor={currentStyles.headingText.color}
                name="confirmPassword"
                control={control}
                rules={{required: true}}
                secureTextEntry={secureTextEntry}
                style={[
                  styles.input,
                  styles.inputWidth50,

                  {
                    borderColor: isFocused ? '#aac949' : 'lightgrey',
                    color: currentStyles.headingText.color,
                  },
                ]}
                onChangeText={value => {
                  setUserData({...userData, confirmPassword: value});
                }}
              />
            </View>

            <TouchableOpacity style={[styles.btnCont, styles.btnMedium, styles.btnPrimary]} onPress={handleSignUp}>
              <Text style={[styles.btnText, currentStyles.headingText, {fontSize: 16}]}>
                {t('common.signup')}
              </Text>
            </TouchableOpacity>
          </>
        ) : null}
        {nextStep === 1 && (
          <TouchableOpacity
            style={{alignItems: 'center', marginTop: 20}}
            onPress={SendOtp}>
            <Text
              style={[
                styles.btnText,
                currentStyles.headingText,
                {fontSize: 16},
              ]}>
              {t('common.resendOtp')}
            </Text>
          </TouchableOpacity>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}
