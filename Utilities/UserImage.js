import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, SafeAreaView, Platform, PermissionsAndroid  } from 'react-native';
//import ImagePicker from 'react-native-image-picker';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { useToast } from '../context/toastContext';
import { API_PATH } from '../env';
import styles,{lightStyles,darkStyles,Colors} from '../Styles';
import { Ionicons } from 'react-native-vector-icons';
import { useTranslation } from 'react-i18next';
import { selectUser, updateProfileImage } from '../redux/slices/userSlice';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';


const UserImage = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { showToast } = useToast();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);
  const [selectedImage, setSelectedImage] = useState(null);

  // useEffect(() => {
  //   const requestPermissions = async () => {
  //     try {
  //       if (Platform.OS === 'android') {
  //         const granted = await PermissionsAndroid.check(
  //           PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE
  //         );
          
  //         if (!granted) {
  //           const requestResult = await PermissionsAndroid.request(
  //             PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
  //             {
  //               title: 'Permission needed',
  //               message: 'We need your permission to access your photos',
  //             }
  //           );
  
  //           if (requestResult !== PermissionsAndroid.RESULTS.GRANTED) {
  //             // Only show an alert if the user has explicitly denied the permission
  //             if (requestResult === PermissionsAndroid.RESULTS.DENIED) {
  //               alert('Permission denied');
  //             }
  //           }
  //         }
  //       }
  //       // For iOS, handle permissions based on the platform's guidelines
  //     } catch (err) {
  //       console.warn(err);
  //     }
  //   };
  
  //   // You can call requestPermissions here based on user action, not immediately
  //   // requestPermissions();
  // }, []);
  


  const options = {
    title: 'Select Avatar',
    mediaType: 'photo',
    maxWidth: 200,
    maxHeight: 200,
    storageOptions: {
      skipBackup: true,
      path: 'images',
    },
  };
  const selectImage = async() => {
    launchImageLibrary(options, (response) => {
      if(response.didCancel){
        console.log('Image Selector Closed by user');
      }else if(response.errorCode){
        console.log(response.errorMessage);
      }else{
        const source = { uri: response.assets[0].uri };
        setSelectedImage(source.uri);
        uploadImage(response.assets[0]);
      }
    });
  }

  const uploadImage = async (response) => {
    if (response.uri) {
      const formData = new FormData();
      formData.append('file', {
        uri: response.uri,
        name: 'image.jpg',
        type: 'image/jpeg',
      });

      try {
        const userToken = user.token || '';
        const uploadResponse = await fetch(`${API_PATH}/update-profile-picture`, {
          method: 'POST',
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: userToken,
          },
          body: formData,
        });

        if (uploadResponse.ok) {
          const resp = await uploadResponse.json();
          dispatch(updateProfileImage({ image: resp.image }));
          showToast('Picture Updated!', 'success');
        } else {
          showToast('Picture upload failed', 'error');
        }
      } catch (error) {
        console.error('Image upload error:', error);
        showToast('Error uploading image', 'error');
      }
    }
  };

  return (
    <SafeAreaView>
      <View>
        <TouchableOpacity style={[styles.imageContainer]} onPress={selectImage}>
          <View style={[styles.imagePicker]}>
            <Image source={{ uri: selectedImage || `${API_PATH}${user?.user?.image}` }} style={styles.ProfileImage} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default UserImage;
