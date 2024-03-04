import React, {useState,useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import styles, {lightStyles, darkStyles, Colors} from '../../../Styles';
import {useDarkModeContext} from '../../../context/darkMode';
import Ionicons from 'react-native-vector-icons/Ionicons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';


const PredefinedButton = ({selectedItem}) => {
  const [expenses, setExpenses] = useState({
    fertilizer: '',
    pesticide: '',
    tractor: '',
    seeds: '',
    other: '',
  });
  const { isDarkMode } = useDarkModeContext();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;

  const [totalIncome, setTotalIncome] = useState(0);
  const [profit, setProfit] = useState(0);


  const handleInputChange = (category, text) => {
    setExpenses((prevExpenses) => ({
      ...prevExpenses,
      [category]: text,
    }));
  };

  const calculateTotalExpenses = () => {
    const expenseValues = Object.values(expenses);
    const filteredValues = expenseValues.filter((value) => value !== '');
    const total = filteredValues.reduce((acc, value) => {
      const numericValue = parseFloat(value) || 0;
      return acc + numericValue;
    }, 0);
    return total;
  };

  useEffect(() => {
    const updateProfit = () => {
      const totalExpenses = calculateTotalExpenses();
      setProfit(totalIncome - totalExpenses);
    };

    updateProfit();
  }, [expenses, totalIncome]);

  



  return (
    <ScrollView>
      <View
        style={[
          {
            flex: 1,
            marginHorizontal: 10,
            marginVertical: 3,
            borderRadius: 10,
            backgroundColor: '#8fc9441f',
            padding:10
          },
        ]}>
        <View
          style={[
            styles.row,
            styles.mt5,
            {justifyContent: 'space-between', backgroundColor:'#8fc9442b',borderRadius:10},
          ]}>
          <View style={[styles.row, {width: '80%', flexDirection: 'row', justifyContent: 'space-between'}]}>
          
            <View style={{flexDirection: 'row', alignItems: 'center'}}><Image
              source={require('../../../assets/Pic/fertilizer.png')}
              style={{width: 50, height: 50,resizeMode:'contain'}}
            />
            <Text style={[currentStyle.bgText,{fontWeight: '500', fontSize: 16}]}>Fertilizer</Text>
            </View>
            <Text style={[currentStyle.bgText]}>₹</Text>
          </View>
          <View style={[styles.row,{width: '20%'}]}>
            <TextInput
             value={expenses.fertilizer}
              keyboardType='numeric'
              placeholder='0.0'
              placeholderTextColor={isDarkMode ? '#000' : '#fff'}
              onChangeText={(text) => handleInputChange('fertilizer', text)}
              style={[currentStyle.bgText]}
            />
          </View>
        </View>

        <View
          style={[
            styles.row,
            styles.mt5,
            {justifyContent: 'space-between', backgroundColor:'#8fc9442b',borderRadius:10},
          ]}>
          <View style={[styles.row, {width: '80%', flexDirection: 'row', justifyContent: 'space-between'}]}>
          
            <View style={{flexDirection: 'row', alignItems: 'center'}}><Image
              source={require('../../../assets/Pic/pestiside.png')}
              style={{width: 50, height: 50,resizeMode:'contain'}}
            />
            <Text style={[currentStyle.bgText,{fontWeight: '500', fontSize: 16}]}>Pestiside</Text>
            </View>
            <Text style={[currentStyle.bgText]}>₹</Text>
          </View>
          <View style={[styles.row,{width: '20%'}]}>
            <TextInput
              value={expenses.pestified}
              keyboardType='numeric'
              placeholder='0.0'
              placeholderTextColor={isDarkMode ? '#000' : '#fff'}
              onChangeText={(text) => handleInputChange('pestified', text)}
              style={[currentStyle.bgText]}
            />
          </View>
        </View>

        <View
          style={[
            styles.row,
            styles.mt5,
            {justifyContent: 'space-between', backgroundColor:'#8fc9442b',borderRadius:10},
          ]}>
          <View style={[styles.row, {width: '80%', flexDirection: 'row', justifyContent: 'space-between'}]}>
          
            <View style={{flexDirection: 'row', alignItems: 'center'}}><Image
              source={require('../../../assets/Pic/tractor.png')}
              style={{width: 50, height: 50,resizeMode:'contain'}}
            />
            <Text style={[currentStyle.bgText,{fontWeight: '500', fontSize: 16}]}>Plough</Text>
            </View>
            <Text style={[currentStyle.bgText]}>₹</Text>
          </View>
          <View style={[styles.row,{width: '20%'}]}>
            <TextInput
              value={expenses.tractor}
              keyboardType='numeric'
              placeholder='0.0'
              placeholderTextColor={isDarkMode ? '#000' : '#fff'}
              onChangeText={(text) => handleInputChange('tractor', text)}
              style={[currentStyle.bgText]}
            />
          </View>
        </View>

        <View
          style={[
            styles.row,
            styles.mt5,
            {justifyContent: 'space-between', backgroundColor:'#8fc9442b',borderRadius:10},
          ]}>
          <View style={[styles.row, {width: '80%', flexDirection: 'row', justifyContent: 'space-between'}]}>
          
            <View style={{flexDirection: 'row', alignItems: 'center'}}><Image
              source={require('../../../assets/Pic/packedSeeds.png')}
              style={{width: 50, height: 50,resizeMode:'contain'}}
            />
            <Text style={[currentStyle.bgText,{fontWeight: '500', fontSize: 16}]}>Seeds</Text>
            </View>
            <Text style={[currentStyle.bgText]}>₹</Text>
          </View>
          <View style={[styles.row,{width: '20%'}]}>
            <TextInput
              value={expenses.seeds}
              keyboardType='numeric'
              placeholder='0.0'
              placeholderTextColor={isDarkMode ? '#000' : '#fff'}
              onChangeText={(text) => handleInputChange('seeds', text)}
              style={[currentStyle.bgText]}
            />
          </View>
        </View>

        <View
          style={[
            styles.row,
            styles.mt5,
            {justifyContent: 'space-between', backgroundColor:'#8fc9442b',borderRadius:10},
          ]}>
          <View style={[styles.row, {width: '80%', flexDirection: 'row', justifyContent: 'space-between'}]}>
          
            <View style={{flexDirection: 'row', alignItems: 'center'}}><Image
              source={require('../../../assets/Pic/tomatoes.png')}
              style={{width: 50, height: 50,resizeMode:'contain'}}
            />
            <Text style={[currentStyle.bgText,{fontWeight: '500', fontSize: 16}]}>Other</Text>
            </View>
            <Text style={[currentStyle.bgText]}>₹</Text>
          </View>
          <View style={[styles.row,{width: '20%'}]}>
            <TextInput
              value={expenses.other}
              keyboardType='numeric'
              placeholder='0.0'
              placeholderTextColor={isDarkMode ? '#000' : '#fff'}
              onChangeText={(text) => handleInputChange('other', text)}
              style={[currentStyle.bgText]}
            />
          </View>
        </View>

        <View style={styles.dottedDivider} />
        <View
          style={[
            styles.row,
            styles.mt5,
            { justifyContent: 'space-between', backgroundColor: '#fcb6c975', borderRadius: 10 },
          ]}
        >
          <View style={[styles.row, { width: '75%', flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, paddingLeft: 10 }}>
              <Ionicons name='calculator-outline' size={25} color={'green'} />
              <Text style={[currentStyle.bgText, { fontWeight: '500', fontSize: 16 }]}>Total Expenses</Text>
            </View>
            <Text style={[currentStyle.bgText]}>₹</Text>
          </View>
          <View style={[styles.row, { width: '25%' }]}>
            <TextInput
              value={calculateTotalExpenses().toString()}
              keyboardType='numeric'
              placeholder='0.0'
              placeholderTextColor={isDarkMode ? '#000' : '#fff'}
              editable={false}
              style={[currentStyle.bgText]}
            />
          </View>
        </View>



        <View
          style={[
            styles.row,
            styles.mt5,
            { justifyContent: 'space-between', backgroundColor: '#82deabc7', borderRadius: 10 },
          ]}
        >
          <View style={[styles.row, { width: '75%', flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, paddingLeft: 10 }}>
              <FontAwesome6 name='hand-holding-dollar' size={25} color={Colors.secondary} />
              <Text style={[currentStyle.bgText, { fontWeight: '500', fontSize: 16 }]}>Total Income</Text>
            </View>
            <Text style={[currentStyle.bgText]}>₹</Text>
          </View>
          <View style={[styles.row, { width: '25%' }]}>
            <TextInput
              value={totalIncome.toString()}
              keyboardType='numeric'
              placeholder='0.0'
              placeholderTextColor={isDarkMode ? '#000' : '#fff'}
              onChangeText={(text) => setTotalIncome(parseFloat(text) || 0)}
              style={[currentStyle.bgText]}
            />
          </View>
        </View>
        
        <View
          style={[
            styles.row,
            styles.mt5,
            { justifyContent: 'space-between', backgroundColor: '#fff', borderRadius: 10 },
          ]}
        >
          <View style={[styles.row, { width: '75%', flexDirection: 'row', justifyContent: 'space-between' }]}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20, paddingLeft: 10 }}>
              <FontAwesome6 name='money-bill' size={25} color={Colors.secondary} />
              <Text style={[currentStyle.bgText, { fontWeight: '500', fontSize: 16 }]}>Profit</Text>
            </View>
            <Text style={[currentStyle.bgText]}>₹</Text>
          </View>
          <View style={[styles.row, { width: '25%' }]}>
            <TextInput
              value={isNaN(profit) ? '' : profit.toString()}
              keyboardType='numeric'
              placeholder='0.0'
              placeholderTextColor={isDarkMode ? '#000' : '#fff'}
              editable={false}
              style={[currentStyle.bgText]}
            />
          </View>
        </View>

        
      </View>
    </ScrollView>
  );
};

export default PredefinedButton;
