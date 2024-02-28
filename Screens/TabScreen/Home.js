import React, {useState} from 'react';
import {
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
} from 'react-native';
import {useTranslation} from 'react-i18next';
import {selectUser, setUser} from '../../redux/slices/userSlice';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import styles, {lightStyles, darkStyles, Colors} from '../../Styles';
import Weather from '../../Component/Weather';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeader from '../../Component/CustomHeader';
import {useDarkModeContext} from '../../context/darkMode';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {isDarkMode} = useDarkModeContext();
  const {t} = useTranslation();
  const [jwtToken, setJwtToken] = useState(null);
  const user = useSelector((state) => state.user.user);
  const [loading, setLoading] = useState(true);

  const currentStyle = isDarkMode ? darkStyles : lightStyles;

  const getImageSource = (index) => {
    switch (index) {
      case 0:
        return require('../../assets/image1.jpg');
      case 1:
        return require('../../assets/image2.jpg');
      case 2:
        return require('../../assets/image3.jpg');
      default:
        return null;
    }
  };

  return (
    <SafeAreaView style={currentStyle.bg}>
      <CustomHeader />
      <ScrollView>
        <View style={[styles.plr1, styles.mt2]}>
          {/* Search Bar */}
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 30,
                borderWidth: 1,
                paddingHorizontal: 4,
              },
              currentStyle.inputbg,
            ]}>
            <TextInput
              placeholder={t("homepage.hero.FirstInput")}
              placeholderTextColor={Colors.dimgrey}
              style={[{flex: 1, padding: 9}, currentStyle.bgText]}
              // Add necessary props and handlers for the search functionality
            />
            <TouchableOpacity>
              <Ionicons
                name="search"
                size={20}
                color="#fff"
                style={[{padding: 10, borderRadius: 30}, currentStyle.bgText]}
              />
            </TouchableOpacity>
          </View>
            {/* Banner Aria */}
          <View>
            <ScrollView horizontal nestedScrollEnabled={true} showsHorizontalScrollIndicator={false}>
              {[...Array(3)].map((_, index) => (
                <TouchableOpacity style={[styles.row,styles.col3]} key={index}>
                  <Image
                    source={getImageSource(index)}
                    style={{width: 320, height: 150,borderRadius: 10}}
                  />
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={[styles.mt4]}>
            <TouchableOpacity
             onPress={() => navigation.navigate("UpcomingWeather")}
            >
              <Weather />
            </TouchableOpacity>
          </View>
              
  
          <View style={[styles.mt7]}>
            <View style={[styles.row, {justifyContent: 'space-around'}]}>
              <View style={[styles.smallCont, currentStyle.bgGrey]}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Pic/money.png')}
                    style={[styles.contImage]}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.mt1,
                    currentStyle.bgText,
                    {fontSize: 14, fontWeight: '500'},
                  ]}>
                  {t("homepage.hero.Schemes")}
                </Text>
              </View>

              <View style={[styles.smallCont, currentStyle.bgGrey]}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Pic/commodity.png')}
                    style={[styles.contImage]}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.mt1,
                    currentStyle.bgText,
                    {fontSize: 14, fontWeight: '500'},
                  ]}>
                  {t("homepage.hero.Product")}
                </Text>
              </View>

              <View style={[styles.smallCont, currentStyle.bgGrey]}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Pic/sale.png')}
                    style={[styles.contImage]}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.mt1,
                    currentStyle.bgText,
                    {fontSize: 14, fontWeight: '500'},
                  ]}>
                 {t("homepage.hero.Sale")}
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.row,
                styles.mt5,
                {justifyContent: 'space-around'},
              ]}>
              <View style={[styles.smallCont, currentStyle.bgGrey]}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Pic/care.png')}
                    style={[styles.contImage]}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.mt1,
                    currentStyle.bgText,
                    {fontSize: 14, fontWeight: '500'},
                  ]}>
                  {t("homepage.hero.Care")}
                </Text>
              </View>

              <View style={[styles.smallCont, currentStyle.bgGrey]}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Pic/protection.png')}
                    style={[styles.contImage]}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.mt1,
                    currentStyle.bgText,
                    {fontSize: 14, fontWeight: '500'},
                  ]}>
                  {t("homepage.hero.Protection")}
                </Text>
              </View>

              <View style={[styles.smallCont, currentStyle.bgGrey]}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Pic/mandi.png')}
                    style={[styles.contImage]}
                  />
                </TouchableOpacity>
                <Text
                  style={[
                    styles.mt1,
                    currentStyle.bgText,
                    {fontSize: 14, fontWeight: '500'},
                  ]}>
                   {t("homepage.hero.Mandi")}
                </Text>
              </View>
            </View>
          </View>
          {/* <View style={[styles.mt5, styles.mb2]}>
            <Slider />
          </View> */}

          <Text
            style={[
              styles.langText,
              styles.mt2,
              currentStyle.bgText,
              {fontWeight: '500'},
            ]}>
            Categories
          </Text>

          <View
            style={[
              styles.row,
              styles.mt5,
              styles.mb5,
              {justifyContent: 'space-around', paddingBottom: 100},
            ]}>
            <View style={{alignItems: 'center'}}>
              <View style={[styles.catCont, currentStyle.bgGrey]}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Pic/care.png')}
                    style={[styles.catImage]}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  currentStyle.bgText,
                  {fontSize: 12, fontWeight: '500'},
                ]}>
                Crop Care
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <View style={[styles.catCont, currentStyle.bgGrey]}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Pic/care.png')}
                    style={[styles.catImage]}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  currentStyle.bgText,
                  {fontSize: 12, fontWeight: '500'},
                ]}>
                Crop Care
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <View style={[styles.catCont, currentStyle.bgGrey]}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Pic/care.png')}
                    style={[styles.catImage]}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  currentStyle.bgText,
                  {fontSize: 12, fontWeight: '500'},
                ]}>
                Crop Care
              </Text>
            </View>

            <View style={{alignItems: 'center'}}>
              <View style={[styles.catCont, currentStyle.bgGrey]}>
                <TouchableOpacity>
                  <Image
                    source={require('../../assets/Pic/care.png')}
                    style={[styles.catImage]}
                  />
                </TouchableOpacity>
              </View>
              <Text
                style={[
                  currentStyle.bgText,
                  {fontSize: 12, fontWeight: '500'},
                ]}>
                Crop Care
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
