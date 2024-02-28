import React, {useState, useEffect} from 'react';
import {View, Text, TouchableOpacity, Image, Alert } from 'react-native';
import styles, {lightStyles, darkStyles} from '../Styles';
import getCurrentDayAndTime from './getCurrentDayAndTime';
import Geolocation from '@react-native-community/geolocation';
import { useDispatch } from 'react-redux';
import { setLocation, setLocationError } from '../redux/slices/locationSlice';
import { useSelector } from 'react-redux';
import { selectLocation } from '../redux/slices/locationSlice'
import axios from 'axios';
import { useToast } from '../context/toastContext';
import { useDarkModeContext } from '../context/darkMode';
import {useTranslation} from 'react-i18next';

const Weather = ({setLoading}) => {
  const {isDarkMode} = useDarkModeContext();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const dispatch = useDispatch();
  const {t} = useTranslation();
  const {showToast} = useToast();
  const [weatherData, setWeatherData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const locationData = useSelector(selectLocation);
  const fetchWeather = async () => {
    const apiURL = `https://api.weatherapi.com/v1/current.json?key= 3712904e07e7468db7052039240701&q=${locationData.latitude},${locationData.longitude}&aqi=yes`;
    try {
      const response = await axios.get(apiURL);
      setWeatherData(response.data);
      setIsLoading(false);
    } catch (error) {
      console.error('Error fetching weather:', error);
      // Handle error here
    }
  };
  //console.log(weatherData);
  useEffect(() => {

    if(!locationData){
      Geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          dispatch(setLocation(position.coords));
        },
        (error) => {
          console.error('Location Error:', error);
          Alert.alert('Location Permission', 'Please enable location services.');
        },
        { enableHighAccuracy: false, timeout: 15000, maximumAge: 10000 }
      );
    }

    if(locationData){
      fetchWeather()
    }
    
  }, [locationData, dispatch, setLocation]);

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>{t("common.Loading")}</Text>
      </View>
    );
  }

  //let weatherText = weatherData?.current?.condition?.text;
  //console.log();
  const getWeatherImage = (weatherText, is_day) => {
    switch (weatherText.toLowerCase()) {
      case 'clear sky':
        return is_day === 1
          ? require('../assets/png/sun.png')
          : require('../assets/png/night.png');
      case 'clouds':
        return require('../assets/png/cloudy-day.png');
      case 'mostly cloudy':
        return require('../assets/png/cloudy.png');
      case 'partly cloudy':
        return require('../assets/png/cloudy-day.png');
      case 'broken clouds':
        return require('../assets/png/cloudy-day.png');
      case 'scattered clouds':
        return require('../assets/png/cloudy-day.png');
      case 'rain':
        return require('../assets/png/heavy-rain.png');
      case 'thunderstorm':
        return require('../assets/png/thunderstorm.png');
      case 'snow':
        return require('../assets/png/snowflake.png');
      case 'mist':
        return require('../assets/png/mist.png');
      case 'fog':
        return require('../assets/png/fog.png');
      default:
        return is_day === 1
          ? require('../assets/png/sun.png')
          : require('../assets/png/night.png');
    }
  };

  return (
    <View>
      <View style={[styles.col1, currentStyle.bgGrey]}>
      {weatherData ? (
        <>

        <View>
          <Text style={[currentStyle.bgText]}>{getCurrentDayAndTime()}</Text>
          <Text style={[{fontSize: 30, fontWeight: '700'}, currentStyle.bgText]}>
            {Math.round(weatherData.current.temp_c)}°C
          </Text>
          <Text
            style={[currentStyle.bgText, {fontSize: 15, fontWeight: 500}]}>
            {weatherData.location.name}
          </Text>
        </View>
        <View style={{justifyContent: 'center', alignItems: 'center'}}>
          <Image
            source={getWeatherImage(
              weatherData?.current?.condition?.text,
              weatherData?.current?.is_day,
            )}
            style={styles.weathercolimage}
          />
          <Text
            style={[currentStyle.bgText, {fontSize: 15, fontWeight: 500}]}>
            {weatherData?.current?.condition?.text}
          </Text>
        </View>
        </>
      ) : (
        <Text>No weather updates...</Text>
      )}
      </View>
      <View></View>
    </View>
  );
};

export default Weather;
