import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableHighlight, TouchableOpacity, View } from 'react-native'
import React ,{useState}from 'react';
import styles,{lightStyles,darkStyles,Colors} from '../../Styles';
import { useDarkModeContext } from '../../context/darkMode';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Notification() {
    const {isDarkMode} = useDarkModeContext();
    const navigation = useNavigation();
    const currentStyle = isDarkMode ? darkStyles : lightStyles;
    const [selectedTab, setSelectedTab] = useState('recent');

    const handleTabPress = (tab) => {
        setSelectedTab(tab);
      };

      const isTabSelected = (tab) => selectedTab === tab;
  return (
    <SafeAreaView style={[currentStyle.bg,{flex:1}]}>
        <ScrollView showsVerticalScrollIndicator={false}>
            <View style={[styles.plr1,styles.mt2,styles.row,{justifyContent:'space-between'}]}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                <Ionicons name='arrow-back-outline' size={22} color={Colors.dimgrey}/>
                </TouchableOpacity>
                <Text style={[styles.headingMedium,currentStyle.bgText]}>Notifications</Text>
                <TouchableOpacity>
                    <Text style={{color:Colors.primary}}>Clear all</Text>
                </TouchableOpacity>
            </View>
            <View style={[styles.row,styles.plr2,styles.mt6,{justifyContent:'space-between'}]}>
                <TouchableOpacity onPress={() => handleTabPress('recent')}>
                    <Text style={[{ fontSize: 16, fontWeight: '500',color:Colors.dimgrey }, isTabSelected('recent') && { color: Colors.secondary }]}>Recent</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('earlier')}>
                    <Text style={[{ fontSize: 16, fontWeight: '500' ,color:Colors.dimgrey}, isTabSelected('earlier') && { color: Colors.secondary }]}>Earlier</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleTabPress('archived')}>
                    <Text style={[{ fontSize: 16, fontWeight: '500',color:Colors.dimgrey }, isTabSelected('archived') && { color: Colors.secondary }]}>Archived</Text>
                </TouchableOpacity>
            </View>
            {selectedTab === 'recent' && (
          <View>
           
            <Text>Recent Notifications</Text>
          </View>
        )}
        {selectedTab === 'earlier' && (
          <View>
            
            <Text>Earlier Notifications</Text>
          </View>
        )}
        {selectedTab === 'archived' && (
          <View>
            
            <Text>Archived Notifications</Text>
          </View>
        )}
        </ScrollView>
    </SafeAreaView>
  )
}

