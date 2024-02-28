import {View, Text, useColorScheme, SafeAreaView, Alert} from 'react-native';
import React, {useEffect} from 'react';
import Navigation from './navigation/Navigation';
import {Provider} from 'react-redux';
import store from './redux/store';
import {ToastProvider} from './context/toastContext';
import Geolocation from '@react-native-community/geolocation';
import {useDispatch} from 'react-redux';
import {setLocation, setLocationError} from './redux/slices/locationSlice';
//import axios from 'axios';
import {DarkModeProvider} from './context/darkMode';
import {SocketProvider} from './context/SocketContext';
import { BackHandler } from 'react-native';
import { Camera, useCameraDevice } from 'react-native-vision-camera';

function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    const checkPermission = async () => {
      const newCameraPermissions = await Camera.requestCameraPermission();
      const newMicrophonePermissions = await Camera.requestMicrophonePermission();
    };

    checkPermission();
  }, []);
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        return true; // Return true to prevent default behavior (exit the app)
      }
    );

    return () => backHandler.remove(); // Cleanup on component unmount
  }, []);

  // Get Location Permission and Location of the User device
  useEffect(() => {
    // Request location permission and fetch weather data
    Geolocation.requestAuthorization();
    Geolocation.getCurrentPosition(
      async position => {
        const {latitude, longitude} = position.coords;
        dispatch(setLocation(position.coords));
      },
      error => {
        console.error('Location Error:', error); // Log the location error
        Alert.alert('Location Permission', 'Please enable location services.');
      },
      {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
    );
  }, [dispatch, setLocation]);

  return (
    <Provider store={store}>
      <DarkModeProvider>
        <SocketProvider>
          <ToastProvider>
            <Navigation />
          </ToastProvider>
        </SocketProvider>
      </DarkModeProvider>
    </Provider>
  );
}

const AppWrapper = () => {
  //const store = createStore(rootReducer);
  return (
    <Provider store={store}>
      <App />
    </Provider>
  );
};
export default AppWrapper;
