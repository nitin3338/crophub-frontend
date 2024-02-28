import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import styles, {Colors, lightStyles, darkStyles} from '../Styles';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';
import {useDispatch} from 'react-redux';
import {useDarkModeContext} from '../context/darkMode';
import {useNavigation} from '@react-navigation/native';
import {setLocation, setLocationError} from '../redux/slices/locationSlice';
import {useSelector} from 'react-redux';
import {selectLocation} from '../redux/slices/locationSlice';
import getCurrentDayAndTime from './getCurrentDayAndTime';
import Geolocation from '@react-native-community/geolocation';
import axios from 'axios';

export default function UpcomingWeather() {
  const dispatch = useDispatch();
  const navigation = useNavigation();
  const {isDarkMode} = useDarkModeContext();
  const [isLoading, setIsLoading] = useState(true);
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const [weatherData, setWeatherData] = useState(null);
  const locationData = useSelector(selectLocation);
  const fetchWeather = async () => {
    const apiURL = `http://api.weatherapi.com/v1/forecast.json?key=3712904e07e7468db7052039240701&q=${locationData.latitude},${locationData.longitude}&aqi=yes&alerts=yes`;

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
    if (!locationData) {
      Geolocation.getCurrentPosition(
        async position => {
          const {latitude, longitude} = position.coords;
          dispatch(setLocation(position.coords));
        },
        error => {
          console.error('Location Error:', error);
          Alert.alert(
            'Location Permission',
            'Please enable location services.',
          );
        },
        {enableHighAccuracy: false, timeout: 15000, maximumAge: 10000},
      );
    }

    if (locationData) {
      fetchWeather();
    }
  }, [locationData, dispatch, setLocation]);
  //console.log(weatherData?.forecast?.forecastday);

  return (
    <>
      {weatherData ? (
        <SafeAreaView style={[currentStyle.bg, {flex: 1}]}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={[
                styles.row,
                {justifyContent: 'space-between', paddingRight: 10},
              ]}>
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons
                  name="arrow-back-outline"
                  size={25}
                  style={{
                    paddingHorizontal: 12,
                    paddingVertical: 10,
                    color: Colors.secondary,
                  }}
                />
              </TouchableOpacity>
              <Feather name="filter" size={25} color={Colors.secondary} />
            </View>
            <View style={[styles.plr1]}>
              <Text style={[styles.headingNormal, currentStyle.bgText]}>
                Weather Information
              </Text>
              <View style={[styles.col2, currentStyle.fieldsBg]}>
                <View style={[styles.row, {gap: 80}]}>
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../assets/png/protection.png')}
                      style={{width: 30, height: 30}}
                    />

                    <Text
                      style={[
                        currentStyle.bgText,
                        {fontWeight: '500', fontSize: 18},
                      ]}>
                      {weatherData?.current?.uv}.0
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../assets/png/storm.png')}
                      style={{width: 30, height: 30}}
                    />

                    <Text
                      style={[
                        currentStyle.bgText,
                        {fontWeight: '500', fontSize: 16},
                      ]}>
                      {weatherData?.current?.wind_kph} kph
                    </Text>
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../assets/png/cloudy.png')}
                      style={{width: 30, height: 30}}
                    />

                    <Text
                      style={[
                        currentStyle.bgText,
                        {fontWeight: '500', fontSize: 16},
                      ]}>
                      {weatherData?.current?.precip_mm}%
                    </Text>
                  </View>
                </View>

                <View
                  style={[styles.row, styles.mt6, {gap: 50, marginLeft: 15}]}>
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../assets/png/humidity.png')}
                      style={{width: 30, height: 30}}
                    />
                    <Text
                      style={[
                        currentStyle.bgText,
                        {fontWeight: '500', fontSize: 16},
                      ]}>
                      {weatherData?.current?.humidity}
                    </Text>
                  </View>
                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../assets/png/sunrise.png')}
                      style={{width: 30, height: 30}}
                    />
                    <Text
                      style={[
                        currentStyle.bgText,
                        {fontWeight: '500', fontSize: 16},
                      ]}>
                      {weatherData?.forecast?.forecastday[0]?.astro?.sunrise}
                    </Text>
                  </View>

                  <View style={{alignItems: 'center'}}>
                    <Image
                      source={require('../assets/png/sunset.png')}
                      style={{width: 30, height: 30}}
                    />
                    <Text
                      style={[
                        currentStyle.bgText,
                        {fontWeight: '500', fontSize: 16},
                      ]}>
                      {weatherData?.forecast?.forecastday[0]?.astro?.sunset}
                    </Text>
                  </View>
                </View>
              </View>
             
              <View
                style={[styles.smallCont,  styles.mt3]}>
                {weatherData?.forecast?.forecastday.map(item => {
                  const dateObject = new Date(item.date);
                  const dayName = dateObject.toLocaleDateString('en-US', {
                    weekday: 'long',
                  });

                  return (
                    <View key={item.date} style={styles.weatherEntryContainer}>
                      <Image
                        source={{uri: `http:${item.day.condition.icon}`}}
                        style={styles.weatherIcon}
                      />
                      <Text style={[styles.weatherLabel, currentStyle.bgText]}>
                        {dayName}
                      </Text>
                      <View style={[styles.row, {gap: 10}]}>
                        <Text
                          style={[
                            styles.weatherValue,
                            currentStyle.bgText,
                          ]}>{`${item.day.maxtemp_c}°C`}</Text>
                        <Text
                          style={[
                            styles.weatherValue,
                            currentStyle.bgText,
                          ]}>{`${item.day.mintemp_c}°C`}</Text>
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </ScrollView>
        </SafeAreaView>
      ) : (
        <ActivityIndicator
          size={50}
          style={{alignItems: 'center', justifyContent: 'center', flex: 1}}
        />
      )}
    </>
  );
}
