import React, {useState, useEffect} from 'react';
import {
  View,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
  Image,
  Text,
  TextInput,
  Button,
} from 'react-native';
import styles, {darkStyles, lightStyles, Colors} from '../Styles';
import {Ionicons} from 'react-native-vector-icons';
import CustomHeader from './CustomHeader';
import {useTranslation} from 'react-i18next';
import {API_PATH} from '../env';
import {useDispatch, useSelector} from 'react-redux';
import {selectUser, setUser} from '../redux/slices/userSlice';
import UserImage from '../Utilities/UserImage';
import { useDarkModeContext } from '../context/darkMode';
import { useForm } from "react-hook-form";
import { useToast } from '../context/toastContext';

export default function UpdateProfile({navigation}) {
   const {t} = useTranslation();
  const {isDarkMode} = useDarkModeContext();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const { control, handleSubmit, setValue } = useForm();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const {showToast} = useToast();
  const [userData, setUserData] = useState({
    firstname: "",
    lastname: "",
    phone: "",
    whatsapp: "",
    address: "",
    postalcode: "",
    city: "",
    state: "",
  });

  const [pincode, setPincode] = useState("");

  //   Get Logged in User Data
  const getUserInfo = async () => {
    
    try {
      const getData = await fetch(`${API_PATH}/getuserinfo`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: user?.user.email,
        },
        body: JSON.stringify(userData),
      });
      // console.log("Request URL:", `${API_PATH}getuserinfo`);
      // console.log("Request Headers:", headers);
      
      if (getData.ok) {
        const userInfo = await getData.json();
        //console.log(userInfo);
        if (userInfo && userInfo.user) {
          setUserData({
            ...userData,
            firstname: userInfo.user.firstname,
            lastname: userInfo.user.lastname,
            phone: userInfo.user.phone,
            address: userInfo.user.address,
            city: userInfo.user.city,
            state: userInfo.user.state,
            postalcode: userInfo.user.postalCode
          })
        } else {
          console.error("getUserInfo response is missing user data:", userInfo);
        }
      } else {
        console.error("Error fetching user info. Status:", getData.status);
        // Log or display more details about the error
      }
    } catch (error) {
      console.error("Error getting user info:", error);
      // Log or display more details about the error
    }
  };

  useEffect(() => {
    getUserInfo()
  }, []);

//   const CustomCheckbox = () => {
//     return (
//       <TouchableOpacity
//         style={[styles.customCheckbox, isChecked && styles.checkedBox]}
//         onPress={() => setIsChecked(!isChecked)}
//       >
//         {isChecked && (
//           <Ionicons
//             name="checkmark"
//             size={20}
//             color="green"
//             style={{
//               textShadowColor: "black",
//               textAlign: "center",
//               lineHeight: 20,
//             }}
//           />
//         )}
//       </TouchableOpacity>
//     );
//   };

  const CallPinAPI = async (pin) => {
    if (pin.length === 6) {
      try {
        const getData = await fetch(
          `https://api.postalpincode.in/pincode/${pin}`
        );
        if (getData.ok) {
          const res = await getData.json();
          //console.log(res);
          if (
            res &&
            res[0] &&
            res[0].PostOffice &&
            res[0].PostOffice.length > 0
          ) {
            const response = res[0].PostOffice[0];
            setUserData({
              ...userData,
              postalcode: response.Pincode,
              city: response.District,
              state: response.State,
            });
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const handlePincodeChange = (value) => {
    setPincode(value);
    if (value.length === 6) {
      CallPinAPI(value);
    }
  };

  const onSubmit = async () => {
    setUserData({
      ...userData,
      name: userData.firstname + " " + userData.lastname,
    });
    try {
      const response = await fetch(`${API_PATH}/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: `${user.token}`,
        },
        body: JSON.stringify(userData),
      });
      //console.log(response);

      if (!response.ok) {
        console.error("Error updating profile:", response.statusText);
        showToast('Something went wrong, Please try again', 'error')
      } else {
        const responseData = await response.json();

        showToast('Profile updated successfully', 'success')
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
    navigation.navigate("Main");
  };
  

  return (
    <SafeAreaView style={[currentStyle.bg,{flex:1}]}>
        <CustomHeader/>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={[styles.plr1, styles.mt2]}>
            <View style={[styles.centered]}>
                <Text style={[currentStyle.bgText,styles.headingMedium]}>Personal Details</Text>
            </View>
            <View style={[styles.mt7]}>
            <UserImage/>
            </View>
            <View style={[styles.mt6, { flexDirection: "row", gap: 5 }]}>
            <TextInput
              placeholder={t("common.firstName")}
              name="firstname"
              control={control}
              value={userData.firstname}
              rules={{ required: true }}
              style={[
                styles.input,
                styles.inputWidth50,
                currentStyle.bgText,
                { borderColor: Colors.dimgrey },
              ]}
              onChangeText={(value) => {
                setUserData({ ...userData, firstname: value });
              }}
            />
            <TextInput
              placeholder={t("common.lastName")}
              name="lastname"
              control={control}
              value={userData.lastname}
              rules={{ required: true }}
              style={[
                styles.input,
                styles.inputWidth50,
                currentStyle.bgText,
                { borderColor: Colors.dimgrey },
              ]}
              onChangeText={(value) => {
                setUserData({ ...userData, lastname: value });
              }}
            />
          </View>
          <TextInput
            placeholder={t("common.phoneNumber")}
            name="phone"
            control={control}
            value={userData.phone}
            rules={{ required: true }}
            style={[
              styles.input,
              styles.inputWidth100,
              currentStyle.bgText,
              { borderColor:Colors.dimgrey },
            ]}
            onChangeText={(value) => {
              setUserData({ ...userData, phone: value });
            }}
          />

          {/* <View style={[styles.checkboxContainer, styles.row, { padding: 10 }]}>
            <CustomCheckbox />
            <Text style={styles.checkBoxText}>
              Allow WhatsApp Notifications
            </Text>
          </View> */}
          <TextInput
            placeholder={t("common.Address")}
            name="address"
            control={control}
            value={userData.address}
            rules={{ required: true }}
            style={[
              styles.input,
              styles.inputWidth100,
              currentStyle.bgText,
              { borderColor:Colors.dimgrey},
            ]}
            onChangeText={(value) => {
              setUserData({ ...userData, address: value });
            }}
          />
          <View style={[styles.mt2, { flexDirection: "row", gap: 5 }]}>
            <TextInput
              placeholder="PIN Code"
              value={userData.postalcode}
              style={[
                styles.input,
                styles.inputWidth50,
                currentStyle.bgText,
                { borderColor: Colors.dimgrey},
              ]}
              onChangeText={(value) => {
                setUserData({ ...userData, postalcode: value });
                handlePincodeChange(value);
              }}
            />

            <TextInput
              placeholder="City"
              value={userData.city}
              style={[
                styles.input,
                styles.inputWidth50,
                currentStyle.bgText,
                {
                  borderColor:Colors.dimgrey,
                },
              ]}
              editable={false}
            />
          </View>

          <TextInput
            placeholder="State"
            value={userData.state}
            style={[
              styles.input,
              styles.inputWidth100,
              currentStyle.bgText,
              {
                borderColor:Colors.dimgrey ,
              },
            ]}
            editable={false}
          />

          <View style={[styles.mt5, { alignItems: "center" }]}>
            <TouchableOpacity
              style={[styles.btnLarge, styles.btnFull, styles.btnPrimary,{borderRadius:30}]}
              onPress={onSubmit}
            >
              <Text style={[styles.btnText]}>Update Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        
      </ScrollView>
    </SafeAreaView>
  );
}
