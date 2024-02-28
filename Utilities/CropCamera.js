import React, {useRef, useState} from 'react';
import {
  View,
  ActivityIndicator,
  StyleSheet,
  TouchableOpacity,
  Image,
  Text,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  useCameraFormat,
} from 'react-native-vision-camera';
import {useDispatch, useSelector} from 'react-redux';
import {setPhoto, selectPhoto} from '../redux/slices/pictureSlice';
import FullScreenImage from './FullScreenImage';
import {useIsFocused} from '@react-navigation/native';
import {useAppState} from '@react-native-community/hooks';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, { Colors, } from '../Styles';
import {useNavigation} from '@react-navigation/native';

const CropCamera = ({onClose}) => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const photo = useSelector(selectPhoto);
  const device = useCameraDevice('back', {
    physicalDevices: [
      'ultra-wide-angle-camera',
      'wide-angle-camera',
      'telephoto-camera',
    ],
  });
  const camera = useRef(null);
  const isFocused = useIsFocused();
  const appState = useAppState();
  const isActive = isFocused && appState === 'active';
  const format = useCameraFormat(device, [{photoHdr: true}]);
  const [isImageModalVisible, setImageModalVisible] = useState(false);

  if (device == null) return <ActivityIndicator size={20} color={'green'} />;

  const takePicture = async () => {
    try {
      const capturedPhoto = await camera.current.takePhoto({flash: 'auto'});
      // Dispatch the action to save the photo in Redux
      dispatch(setPhoto(capturedPhoto));
      //console.log(capturedPhoto);
    } catch (error) {
      console.error('Error capturing photo:', error);
    }
  };

  return (
    <View style={{flex: 1}}>
      <Camera
        ref={camera}
        style={StyleSheet.absoluteFill}
        device={device}
        isActive={isActive}
        photo={true}
        format={format}
        photoHdr={format.supportsPhotoHdr}
      />
      <View style={[styles.row]}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{paddingHorizontal: 12, paddingVertical: 18}}>
          <Ionicons name="arrow-back-outline" size={24} color={Colors.white} />
        </TouchableOpacity>
        <Text style={{color:'#fff',fontWeight:'500'}}>Take The Latest Picture Of The Damaged Plant</Text>
      </View>
      {photo && (
        <TouchableOpacity
          style={{
            width: 40,
            height: 40,
            borderRadius: 30,
            borderWidth: 2,
            borderColor: '#419c5e',
            position: 'absolute',
            bottom: 40,
            left: 10,
            alignSelf: 'flex-start',
          }}
          onPress={() => {
            setImageModalVisible(true);
          }}>
          <FullScreenImage
            isVisible={isImageModalVisible}
            onClose={() => setImageModalVisible(false)}
          />
          {photo && (
            <Image
              source={{uri: `file://${photo.path}`}}
              style={{flex: 1, borderRadius: 30}}
            />
          )}
        </TouchableOpacity>
      )}

      <TouchableOpacity
        style={{
          width: 60,
          height: 60,
          borderRadius: 30,
          borderWidth: 5,
          borderColor: '#fff',
          position: 'absolute',
          bottom: 40,
          alignSelf: 'center',
        }}
        onPress={() => {
          takePicture();
        }}></TouchableOpacity>
    </View>
  );
};

export default CropCamera;
