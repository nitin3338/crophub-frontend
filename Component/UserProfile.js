import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  Animated,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import styles,{lightStyles,darkStyles,Colors} from '../Styles';
import UserImage from '../Utilities/UserImage';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/slices/userSlice';
import { useNavigation } from '@react-navigation/native';
import { useDarkModeContext } from "../context/darkMode";

const UserProfile = ({ isVisible, onClose }) => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  const {isDarkMode} = useDarkModeContext();

  const currentStyle = isDarkMode ? darkStyles : lightStyles;

  return (
    <Modal visible={isVisible} transparent animationType="slide">
      <View style={[styles.modalContainer]}>
        {/* Add a transparent background to close the modal when tapped outside */}
        <TouchableOpacity
          
          onPress={onClose}
        />
        <View style={[styles.bottomSheetContainer,currentStyle.bgGrey,styles.modalBottom]}>
          <View style={{ marginLeft: 20 ,paddingTop:20}}>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="chevron-back-outline" size={25} color={'#4a4a4a'} />
            </TouchableOpacity>
          </View>
          <UserImage />
          <View style={[styles.centered, styles.mt3]}>
            <Text style={[currentStyle.bgText,{ fontSize: 16, fontWeight: '600' }]}>{user?.user.name}</Text>
            <TouchableOpacity style={[styles.mt1]}>
              <Text style={{ fontSize: 13, color: '#ababab' }}>{user?.user.email}</Text>
            </TouchableOpacity>
            <View style={[styles.mt4]}>
              <TouchableOpacity
                style={[
                  styles.btnMedium,
                  styles.row,
                  { backgroundColor: '#449243', borderRadius: 30 },
                ]}
                onPress={() => navigation.navigate('UpdateProfile')}
              >
                <Text style={{ fontWeight: '500', color: '#fff' }}>Edit Profile</Text>
                <Ionicons name="chevron-forward-outline" size={16} color={'#fff'} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.mt8}>
              {/* Repeat the following structure for each section */}
              <View style={styles.section}>
                <View style={styles.rowWithGap}>
                  <Text style={[currentStyle.bgText]}>
                  <Ionicons name="settings-outline" size={25}/>
                  </Text>
                  <Text style={[styles.sectionText,currentStyle.bgText]}>Settings</Text>
                </View>
                <Text style={[currentStyle.bgText]}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={22}
                />
                </Text>
              </View>

              <View style={styles.section}>
                <View style={styles.rowWithGap}>
                <Text style={[currentStyle.bgText]}>
                  <AntDesign name="user" size={25}  />
                  </Text>
                  <Text style={[styles.sectionText,currentStyle.bgText]}>Account Activity</Text>
                </View>
                <Text style={[currentStyle.bgText]}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={22}
                />
                </Text>
              </View>

              <View style={styles.section}>
                <View style={styles.rowWithGap}>
                <Text style={[currentStyle.bgText]}>
                  <Entypo name="address" size={25}  />
                  </Text>
                  <Text style={[styles.sectionText,currentStyle.bgText]}>Address Details</Text>
                </View>
                <Text style={[currentStyle.bgText]}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={22}
                />
                </Text>
              </View>

              <View style={styles.section}>
                <View style={styles.rowWithGap}>
                <Text style={[currentStyle.bgText]}>
                  <Entypo name="notification" size={25}  />
                  </Text>
                  <Text style={[styles.sectionText,currentStyle.bgText]}>Notifications</Text>
                </View>
                <Text style={[currentStyle.bgText]}>
                <Ionicons
                  name="chevron-forward-outline"
                  size={22}
                />
                </Text>
              </View>
            </View>
          
        </View>
      </View>
    </Modal>
  );
};

export default UserProfile;
