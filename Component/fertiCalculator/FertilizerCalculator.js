import React, {useState} from 'react';
import {
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons'
import styles, {lightStyles, darkStyles, Colors} from '../../Styles';
import {useDarkModeContext} from '../../context/darkMode';
import {useNavigation} from '@react-navigation/native';
import {Picker} from '@react-native-picker/picker';

export default function FertilizerCalculator() {
  const navigation = useNavigation();
  const {isDarkMode} = useDarkModeContext();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const [fieldSize, setFieldSize] = useState('');
  const [result, setResult] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Select Option');
  const [selectedCrop, setSelectedCrop] = useState('Select Crop');
  const [selectedTab, setSelectedTab] = useState('acre');
  const [data, setData] = useState({
    type: '',
    crops: '',
  });

  const handleTabPress = tab => {
    setSelectedTab(tab);
  };

  const items = [
    {_id: 1, name: 'D.A.P'},
    {_id: 2, name: 'Urea'},
    {_id: 3, name: 'M.O.P'},
    {_id: 4, name: 'Sulfer'},
    {_id: 5, name: 'Others'},
  ];

  const crops = [
    {_id: 1, name: 'Maize'},
    {_id: 2, name: 'Wheat'},
    {_id: 3, name: 'Paddy'},
    {_id: 4, name: 'Tomato'},
    {_id: 5, name: 'Potato'},
    {_id: 6, name: 'Cabbage'},
    {_id: 7, name: 'Soybean'},
    {_id: 8, name: 'Mustard'},
    {_id: 9, name: 'Brinzal'},
    {_id: 10, name: 'Zuccini'},
    {_id: 11, name: 'Cauliflower'},
    {_id: 12, name: 'Pumpkin'},
    {_id: 13, name: 'Apple'},
    {_id: 14, name: 'Orange'},
    {_id: 15, name: 'Banana'},
    {_id: 16, name: 'Papaya'},
    {_id: 17, name: 'Mango'},
  ];

  const OptionSelector = itemValue => {
    setData({...data, type: itemValue});
    setSelectedOption(itemValue);
  };

  const CropSelector = itemValue => {
    setData({...data, crops: itemValue});
    setSelectedCrop(itemValue);
  };
  const calculateEquivalentValues = (value, unit) => {
    switch (unit) {
      case 'acre':
        return {
          hectare: value * 0.404686,
          beegha: value * 1.613,
        };
      case 'hectare':
        return {
          acre: value * 2.47105,
          beegha: value * 3.954,
        };
      case 'beegha':
        return {
          acre: value * 0.619,
          hectare: value * 0.250838,
        };
      default:
        return null;
    }
  };

  const handleCalculate = () => {
    // Convert the entered value to equivalent values for other units
    const equivalentValues = calculateEquivalentValues(
      parseFloat(fieldSize),
      selectedTab,
    );
    setResult(equivalentValues);
  };

  const isTabSelected = tab => selectedTab === tab;

  return (
    <SafeAreaView style={[currentStyle.bg, {flex: 1}]}>
      <ScrollView showsVerticalScrollIndicator={false}>
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
            Fertilizer Calculator
          </Text>
          <View></View>
        </View>
        <View style={[styles.plr1, styles.mt3]}>
          <Text
            style={[currentStyle.bgText, {fontSize: 16, fontWeight: '500'}]}>
            Choose Area
          </Text>
          <View
            style={[
              styles.row,
              styles.plr1,
              styles.mt3,
              {justifyContent: 'space-between'},
              currentStyle.fieldsBg,
              {justifyContent: 'space-between', padding: 10, borderRadius: 10},
            ]}>
            <TouchableOpacity
              onPress={() => handleTabPress('acre')}
              style={[
                currentStyle.bg,
                {paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8},
              ]}>
              <Text
                style={[
                  {fontSize: 16, fontWeight: '500', color: Colors.dimgrey},
                  isTabSelected('acre') && {color: Colors.secondary},
                ]}>
                Acre
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabPress('hectare')}
              style={[
                currentStyle.bg,
                {paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8},
              ]}>
              <Text
                style={[
                  {fontSize: 16, fontWeight: '500', color: Colors.dimgrey},
                  isTabSelected('hectare') && {color: Colors.secondary},
                ]}>
                Hectare
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleTabPress('beegha')}
              style={[
                currentStyle.bg,
                {paddingHorizontal: 12, paddingVertical: 6, borderRadius: 8},
              ]}>
              <Text
                style={[
                  {fontSize: 16, fontWeight: '500', color: Colors.dimgrey},
                  isTabSelected('beegha') && {color: Colors.secondary},
                ]}>
                Beegha
              </Text>
            </TouchableOpacity>
          </View>
          {selectedTab === 'acre' && (
            <View>
              <TextInput
                style={[
                  currentStyle.fieldsBg,
                  currentStyle.bgText,
                  styles.mt2,
                  styles.plr2,
                  {borderRadius: 10},
                ]}
                keyboardType="numeric"
                placeholder="Enter Field Size In Acres"
                placeholderTextColor={Colors.dimgrey}
                value={fieldSize}
                onChangeText={text => setFieldSize(text)}
              />
            </View>
          )}
          {selectedTab === 'hectare' && (
            <View>
              <TextInput
                style={[
                  currentStyle.fieldsBg,
                  currentStyle.bgText,
                  styles.mt2,
                  styles.plr2,
                  {borderRadius: 10},
                ]}
                keyboardType="numeric"
                placeholder="Enter Field Size In Hectare"
                placeholderTextColor={Colors.dimgrey}
                value={fieldSize}
                onChangeText={text => setFieldSize(text)}
              />
            </View>
          )}
          {selectedTab === 'beegha' && (
            <View>
              <TextInput
                style={[
                  currentStyle.fieldsBg,
                  currentStyle.bgText,
                  styles.mt2,
                  styles.plr2,
                  {borderRadius: 10},
                ]}
                keyboardType="numeric"
                placeholder="Enter Field Size In Beegha"
                placeholderTextColor={Colors.dimgrey}
                value={fieldSize}
                onChangeText={text => setFieldSize(text)}
              />
            </View>
          )}

          <Text
            style={[
              currentStyle.bgText,
              styles.mt2,
              styles.mb1,
              {fontSize: 16, fontWeight: '500'},
            ]}>
            Choose Type
          </Text>

          <View style={[currentStyle.fieldsBg, styles.mt2, {borderRadius: 10}]}>
            <Picker
              selectedValue={selectedOption}
              onValueChange={itemValue => OptionSelector(itemValue)}
              style={[currentStyle.bgText]}>
              <Picker.Item label="Fertilizer" value="Select Option" />
              {items.map(item => (
                <Picker.Item
                  key={item._id}
                  label={item.name}
                  value={item.name}
                />
              ))}
            </Picker>
          </View>

          <Text
            style={[
              currentStyle.bgText,
              styles.mt2,
              styles.mb1,
              {fontSize: 16, fontWeight: '500'},
            ]}>
            Choose Crop
          </Text>

          <View style={[currentStyle.fieldsBg, styles.mt2, {borderRadius: 10}]}>
            <Picker
              selectedValue={selectedCrop}
              onValueChange={itemValue => CropSelector(itemValue)}
              style={[currentStyle.bgText]}>
              <Picker.Item label="Crops" value="Select Crop" />
              {crops.map(crop => (
                <Picker.Item
                  key={crop._id}
                  label={crop.name}
                  value={crop.name}
                />
              ))}
            </Picker>
          </View>
          <TouchableOpacity
            style={[styles.mt4,styles.btnPrimary,styles.btnHalf,{paddingHorizontal:14,paddingVertical:8,borderRadius:10,alignSelf:'flex-end'}]}
            onPress={handleCalculate}>
            <Text style={[{color:Colors.white,textAlign:'center'}]}>Calculate</Text>
          </TouchableOpacity>

          {result !== null && (
            <View style={[styles.mt3]}>
              <Text
                style={[
                  currentStyle.bgText,
                  {fontSize: 16, fontWeight: '500'},
                ]}>
                Equivalent Values:
              </Text>
              <Text style={[currentStyle.bgText]}>
                {`Acre: ${result.acre || 0} | Hectare: ${
                  result.hectare || 0
                } | Beegha: ${result.beegha || 0}`}
              </Text>
            </View>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}
