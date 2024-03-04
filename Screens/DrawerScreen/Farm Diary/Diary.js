import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';
import React, {useState} from 'react';
import styles, {lightStyles, darkStyles, Colors} from '../../../Styles';
import {useDarkModeContext} from '../../../context/darkMode';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Items} from '../../../Utilities/Database';
import PredefinedButton from './Predefiend';

export default function Diary() {
  const {isDarkMode} = useDarkModeContext();
  const navigation = useNavigation();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const [selectedItem, setSelectedItem] = useState(null);

  const handleItemPress = item => {
    if (selectedItem === item) {
      // If the same item is pressed again, unselect it
      setSelectedItem(null);
    } else {
      // Otherwise, select the pressed item
      setSelectedItem(item);
    }
  };
  return (
    <SafeAreaView style={[currentStyle.bg, {flex: 1}]}>
      <View
        style={[
          styles.plr1,
          styles.mt2,
          styles.row,
          {justifyContent: 'space-between'},
        ]}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons
            name="arrow-back-outline"
            size={22}
            color={Colors.dimgrey}
          />
        </TouchableOpacity>
        <Text style={[styles.headingMedium, currentStyle.bgText]}>
          Farm Diary
        </Text>
        <View></View>
      </View>
      <View style={{height: 140}}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={{marginBottom: 10}}>
        {Items.map(item => (
          <TouchableOpacity
            key={item._id}
            style={[styles.mt4, {alignItems: 'center'}]}
            onPress={() => handleItemPress(item)}>
            <View style={{padding: 5}}>
              <Image
                source={{uri: item.productImage}}
                style={
                  selectedItem?._id === item._id
                    ? {
                        width: 60,
                        height: 60,
                        borderRadius: 80,
                        borderWidth: 4,
                        borderColor: Colors.primary,
                      }
                    : {width: 60, height: 60, borderRadius: 80}
                }
              />
              <Text
                style={[
                  currentStyle.bgText,
                  {marginTop: 5, textAlign: 'center'},
                ]}>
                {item.productName}
              </Text>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      </View>
      {selectedItem ?
      <ScrollView nestedScrollEnabled>
        <PredefinedButton selectedItem={selectedItem} />
        </ScrollView>
       : null}
      
    </SafeAreaView>
  );
}
