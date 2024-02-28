import React, { useEffect, useRef } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View, Animated,TouchableOpacity } from 'react-native';
import styles, { Colors } from '../../Styles';
import i18next, { languageResources } from "../../Utilities/i18next"; // Assuming you import i18next correctly
import { useTranslation } from "react-i18next";;
import LanguageList from "../../Utilities/LanguageList.json";

export default function Welcome({navigation}) {
  const { t } = useTranslation();

  const changeLang = (lng) => {
    i18next.changeLanguage(lng);
    navigation.navigate('Login');
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
    <SafeAreaView style={[styles.justifiedContainer, Colors.dimgrey, { paddingHorizontal: 50, backgroundColor: '#FFF' }]}>
      <ScrollView contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }} >
        <View style={[styles.centered, { flexWrap: 'wrap', width: '100%', justifyContent: 'center', alignItems: 'center' }]}>
         
          <Animated.Image
            source={require('../../assets/logo-crophub.png')}
            style={[
              { width: 150, height: 41 },
              styles.mb2,
              {
                opacity: fadeAnim,
              },
            ]}
          />
          <Text style={{ marginTop: 10, color: Colors.secondary ,fontSize:14,fontWeight:'600'}}>Harvesting Possibilities</Text>
        </View>
      
        <View style={[styles.justifyCenter, styles.mt5]}>
        
          {Object.keys(languageResources).map((item) => (
            <TouchableOpacity
              key={item}
              style={[styles.langBtn, styles.langBtn1]}
              onPress={() => changeLang(item)}
            >
              <Text style={{color: Colors.secondary,fontSize:16,fontWeight:'500'}}>
                {LanguageList[item].nativeName}
              </Text>
            </TouchableOpacity>
          ))}
          </View>
      </ScrollView>
    </SafeAreaView>
  );
}
