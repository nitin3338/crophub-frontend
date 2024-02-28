import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  TextInput,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { API_PATH } from "../../env";
import styles, { Colors,lightStyles,darkStyles } from "../../Styles";
import Ionicons from "react-native-vector-icons/Ionicons";
import { selectUser } from "../../redux/slices/userSlice";
import { useSelector } from "react-redux";
import BookConsultation from "../../Screens/DrawerScreen/BookConsultation";
import CustomHeader from "../../Component/CustomHeader";
import {useDarkModeContext} from '../../context/darkMode';
import { useToast } from '../../context/toastContext';
import { useNavigation } from "@react-navigation/native";


const Consultation = () => {
  const user = useSelector(selectUser);
  const navigation = useNavigation();
  //console.log(user);
  const [loading, setLoading] = useState(true);
  const [focusedButton, setFocusedButton] = useState("All");
  const [toggleBtn, setToggleBtn] = useState(null);
  const [data, setData] = useState([]);
  const [allCount, setAllCount] = useState(0);
  const [scheduledCount, setScheduledCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [cancelledCount, setCancelledCount] = useState(0);
  const [isBookConsultationVisible, setIsBookConsultationVisible] = useState(false);
  const {isDarkMode} = useDarkModeContext();  
  const {showToast} = useToast();

  const currentStyle = isDarkMode ? darkStyles : lightStyles;

  //console.log(data);

  const getCounts = () => {
    const all = data.length;
    const scheduled = data.filter(item => item.status === 'Scheduled').length;
    const completed = data.filter(item => item.status === 'Completed').length;
    const cancelled = data.filter(item => item.status === 'Cancelled').concat(data.filter(item => item.status === 'Expired')).length;

    setAllCount(all);
    setScheduledCount(scheduled);
    setCompletedCount(completed);
    setCancelledCount(cancelled);
  };

  const handleButtonPress = (buttonTitle) => {
    setFocusedButton(buttonTitle);
  };

  const handleTogglePress = (id) => {
    setToggleBtn((prev) => (prev === id ? null : id));
  };

  const handleGoBook=()=>{
    navigation.navigate('BookConsultation')
  };
  const getConsultations = async () => {
    try {
      const resp = await fetch(`${API_PATH}/getallconsultations`, {
        method: "GET",
        headers: {
          Authorization: user.token,
        },
      });
      //console.log(resp);
      if (resp.ok) {
        const response = await resp.json();
        //console.log(JSON.stringify(response));
        setData(response.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    // if(!data && data.length > 0){
    //   getConsultations();
    // }
    getConsultations();
  }, [data]);


  useEffect(() => {
    getCounts();
  }, [data]);

  // if (loading) {
  //   return <Loader />;
  // }
  const filteredData = () => {
    switch (focusedButton) {
      case 'All':
        return data;
      case 'Schedule':
        return data.filter(item => item.status === 'Scheduled');
      case 'Completed':
        return data.filter(item => item.status === 'Completed');
        case 'Cancelled':
          return data.filter(item => item.status === 'Cancelled').concat(data.filter(item => item.status === 'Expired'));        
      default:
        return [];
    }
  };

  const ButtonWithCount = ({ title, count, onPress, focused }) => (
    <TouchableOpacity 
      onPress={() => {
       // console.log(`Button pressed: ${title}`); // Debugging log
        onPress();
      }}
      style={[
        styles.row, 
        {  gap: 2,padding:10  },localstyles.button, focused && localstyles.focusedButton]}>
      <Text style={[localstyles.buttonText, currentStyle.bgText]}>{title}</Text>
      {count > 0 && <Text style={{ fontSize: 12, color: Colors.secondary,}}>{count}</Text>}
    </TouchableOpacity>
  );
  
  return (
    <SafeAreaView style={[styles.modalContainer,currentStyle.bg,{position:'relative'}]}>
      <CustomHeader/>
       <View style={[styles.row, currentStyle.bgGrey,{ justifyContent: "space-between", padding: 5, borderRadius: 10 }]}>
        <ButtonWithCount title="All" count={allCount} onPress={() => handleButtonPress("All")} focused={focusedButton === "All"} />
        <ButtonWithCount title="Schedule" count={scheduledCount} onPress={() => handleButtonPress("Schedule")} focused={focusedButton === "Schedule"} />
        <ButtonWithCount title="Completed" count={completedCount} onPress={() => handleButtonPress("Completed")} focused={focusedButton === "Completed"} />
        <ButtonWithCount title="Cancelled" count={cancelledCount} onPress={() => handleButtonPress("Cancelled")} focused={focusedButton === "Cancelled"} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false} >
      {filteredData().map((consultation) => (
          <View
            key={consultation._id}
            style={[styles.cardContainer, styles.mt2,currentStyle.bgGrey]}
          >
            <View style={styles.cardHeader}>
              <Text style={{ color: Colors.grey }}>
                {consultation.consultationId}
              </Text>
              <TouchableOpacity
                style={styles.cardToggle}
                onPress={() => handleTogglePress(consultation._id)}
              >
                <Ionicons
                  name="ellipsis-vertical-outline"
                  size={20}
                  style={{ color: Colors.grey }}
                />
              </TouchableOpacity>
              {toggleBtn === consultation._id ? (
                <View style={styles.cardToggle.toggle}>
                  <TouchableOpacity style={styles.cardToggle.toggle.item}>
                    <Text style={{ color: Colors.secondary }}>Reschedule</Text>
                  </TouchableOpacity>
                  <TouchableOpacity style={styles.cardToggle.toggle.item}>
                    <Text style={{ color: Colors.secondary }}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              ) : null}
            </View>
            <View style={styles.cardContent}>
              <View style={styles.justifyBetween}>
                <View style={[styles.justifyBetween, { gap: 10 }]}>
                  {consultation.expert && consultation.expert.image && (
                    <Image
                      source={{ uri: `${API_PATH}${consultation.expert.image}` }}
                      style={{ width: 35, height: 35, borderRadius: 50 }}
                    />
                  )}

                  <View>
                    <Text style={[{ fontSize: 14 },currentStyle.bgText]}>
                    {consultation.type}
                    </Text>
                    <Text style={{ fontSize: 13, color: Colors.grey }}>
                     With {consultation.expert.name}
                    </Text>
                  </View>
                </View>
                
                <Text
                  style={consultation.status === 'Scheduled' ? [
                    styles.cardContent.status,
                    styles.cardContent.Scheduled
                  ] : consultation.status === 'Completed' ? [
                    styles.cardContent.status,
                    styles.cardContent.Completed
                  ] : consultation.status === 'Cancelled' ? [
                    styles.cardContent.status,
                    styles.cardContent.Cancelled
                  ] : [
                    styles.cardContent.status,
                    styles.cardContent.Expired
                  ]}
                >
                  • {consultation.status}
                </Text>
              </View>
              <View style={[styles.justifyBetween, styles.mt4]}>
                <View style={[styles.justifyCenter, { gap: 6 }]}>
                  <Ionicons
                    name="calendar-outline"
                    size={20}
                    style={styles.cardContent.iconShape}
                  />
                  <Text style={[currentStyle.bgText]}>{consultation.date}</Text>
                </View>

                <View style={[styles.justifyCenter, { gap: 6 }]}>
                  <Ionicons
                    name="time-outline"
                    size={20}
                    style={styles.cardContent.iconShape}
                  />
                  <Text style={[currentStyle.bgText]}>{consultation.time}</Text>
                </View>
              </View>
            </View>
          </View>
        ))}
        
      </ScrollView>
      <View style={[styles.BookBtn]}>
        <TouchableOpacity  onPress={handleGoBook}>
          <Ionicons name="add-outline" size={40} color={Colors.white}/>
        </TouchableOpacity>
        {/* <BookConsultation
            isVisible={isBookConsultationVisible}
            onClose={() => setIsBookConsultationVisible(false)}
          /> */}
      </View>
    </SafeAreaView>
  );
};

const localstyles = StyleSheet.create({
  button: {
    borderBottomWidth: 2,
    borderBottomColor: "transparent", // Default border color
    // padding: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "500",
  },
  focusedButton: {
    borderBottomColor: "green",
  },
});

export default Consultation;
