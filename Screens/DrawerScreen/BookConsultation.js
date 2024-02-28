import React, {useRef, useMemo, useState, useEffect} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  Platform,
  DatePickerIOS,
  Button,
  FlatList,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import styles, {Colors, lightStyles, darkStyles} from '../../Styles';
import {useSelector} from 'react-redux';
import {selectUser} from '../../redux/slices/userSlice';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Picker} from '@react-native-picker/picker';
import {API_PATH} from '../../env';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import RazorpayCheckout from 'react-native-razorpay';
import {useDarkModeContext} from '../../context/darkMode';
import {useToast} from '../../context/toastContext';
import CustomHeader from '../../Component/CustomHeader';
import Dropdown from '../../Component/dropdown';

const BookConsultation = ({isVisible, onClose}) => {
  const user = useSelector(selectUser);
  //console.log(user);
  const navigation = useNavigation();
  const {isDarkMode} = useDarkModeContext();
  const [experts, setExperts] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedOption, setSelectedOption] = useState(null);
  const [date, setDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [selectedDateString, setSelectedDateString] = useState('');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState(null);
  const [isTimeSlotVisible, setTimeSlotVisibility] = useState(false);
  const [description, setDescription] = useState('');
  const [selectedExpert, setSelectedExpert] = useState('');
  
  const items = [{"_id": 1, "name": 'Select Option'}, {"_id": 2, "name":'Soil Testing'}, {"_id": 3, "name": 'Crops Production'}, {"_id": 4, "name": 'Insects & Desease'}, {"_id": 5, "name": 'Others'}]

  const {showToast} = useToast();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const selectTimeSlot = time => {
    setSelectedTimeSlot(time);
    setTimeSlotVisibility(false);
    setData({
      ...data,
      time: time, // Update the 'time' property in data
    });
  };


  const [data, setData] = useState({
    expert: '' || selectedExpert,
    type: '',
    date: selectedDate || '',
    time: selectedTimeSlot || '', // Update with selectedTimeSlot
    description: description || '',
    payment_id: '',
  });

//console.log(data);

  useEffect(() => {
    // Fetch experts when the component mounts
    const fetchExperts = async () => {
      const response = await fetch(`${API_PATH}/getexperts`, {
        method: 'GET',
        headers: {Authorization: user.token},
      });
      const data = await response.json();
      //console.log(data);
      setExperts(data);
    };
    fetchExperts();
  }, []);
  //console.log(experts);
  const currentDateTime = new Date(); // This gives the current date and time.
  const minimumDate = new Date(currentDateTime);
  minimumDate.setDate(minimumDate.getDate() + 30);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    setSelectedDate(date);
    setSelectedDateString(date.toLocaleDateString());
    hideDatePicker();
    setTimeSlotVisibility(true);
    setData({
      ...data,
      date: date.toISOString(), // Update the 'date' property in data
    });
  };

  useEffect(() => {
   //console.log(selectedExpert + ' ' +selectedDate);
    const getSlots = async () => {
      const resp = await fetch(
        `${API_PATH}/get-available-slots/?expertId=${selectedExpert}&date=${selectedDate}`,
        {
          method: 'GET',
          headers: {
            Authorization: user.token,
          },
        },
      );
      if (resp.ok) {
        const response = await resp.json();
        //console.log(response);
        setAvailableSlots(response.availableTimes);
      }
    };

    if (selectedExpert && selectedDate) {
      getSlots();
    }
  }, [selectedExpert, selectedDate]);

  const OptionSelector = (selectedOption) => {
    setData({...data, type: selectedOption.name})
  }
  const handleSelectedExpert = (selectedExpert) => {
    setSelectedExpert(selectedExpert._id);
    setData({...data, expert: selectedExpert._id})
  }

  // Final Booking Function
  const createBooking = async () => {
    const dataToSend = {
      consultationSubject: selectedOption?.label || '', // assuming this is where you store the consultation subject
      expertData: selectedExpert || '', // expert data
      date: selectedDate?.toISOString() || '', // convert date to string
      time: selectedTimeSlot || '', // selected time slot
      description: description || '', // user's description
    };
    //console.log(dataToSend);

    try {
      const order = await fetch(`${API_PATH}/create-order`, {
        method: 'POST',
        headers: {
          Authorization: user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({amount: 50000}),
      }).then(response => response.json());

      const options = {
        key: 'rzp_test_MySWOeq1w368XO', // Enter the Key ID generated from the Dashboard
        amount: order.amount, // Amount is in currency subunits. Default currency is INR.
        currency: order.currency,
        name: 'Consultation Service',
        description: 'Consultation Booking Payment',
        order_id: order.id, // Pass the `id` obtained in the previous step
        handler: function (response) {
          if (
            response.razorpay_payment_id !== null &&
            response.razorpay_payment_id !== ''
          ) {
            setData({
              ...data,
              payment_id: response.razorpay_payment_id,
            });
            showToast('Payment Success', 'success');
            // BookingHandler(response);
          } else {
            showToast('Payment Failed', 'error');
          }
        },
        modal: {
          ondismiss: function () {
            // Handle the case when user closes the modal
            // setLoading(false);
            showToast('Payment Failed', 'error');
          },
        },
        theme: {
          color: '#6cd44a',
        },
      };

      const paymentObject = await RazorpayCheckout.open(options);
      console.log(paymentObject);

      const fetchRequest = await fetch(`${API_PATH}/book-consultations`, {
        method: 'POST',
        headers: {
          Authorization: user.token,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });
      console.log(fetchRequest);

      if (fetchRequest.ok) {
        const resp = await fetchRequest.json();
        // console.log(JSON.stringify(resp));
        showToast('Payment Success', 'Success');
      } else if (fetchRequest.status === 401) {
        showToast('Payment Cancelled', 'error');
      }
    } catch (error) {
      showToast(error.message, 'error');
    }
  };
  //console.log('updated data: '+ JSON.stringify(data));
  return (
    <SafeAreaView style={[styles.modalContainer, currentStyle.bg]}>
      <CustomHeader />
      <Text style={[{color:Colors.secondary},styles.centered,styles.headingMedium,styles.mt5]}>
          Consultation
        </Text>
       
      <ScrollView style={[styles.mt8]}>
      
        <View style={[{ paddingHorizontal: 20, zIndex: 10}]}>
          <Text
            style={[currentStyle.bgText, styles.mb1,{fontWeight: '500', fontSize: 16}]}>
            Select Consultation Subject
          </Text>
          <Dropdown  style={{color: 'lightgrey'}} options={items} onSelect={OptionSelector} />
            
        </View>

        <View style={{marginTop: 20, paddingHorizontal: 20, zIndex: 5}}>
          <Text
            style={[currentStyle.bgText, styles.mb1,{fontWeight: '500', fontSize: 16}]}>
            Select Expert
          </Text>
          <View>
          <Dropdown style={{color: 'lightgrey'}} options={experts} onSelect={handleSelectedExpert} /> 
            
          </View>
        </View>
        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <Text
            style={[currentStyle.bgText,styles.mb1, {fontWeight: '500', fontSize: 16}]}>
            Select Date
          </Text>
          <View style={[styles.dateBox,currentStyle.fieldsBg]}>
            <TouchableOpacity
              onPress={showDatePicker}
              style={styles.datePickerButton}>
              <Text style={[currentStyle.bgText]}>
                {selectedDateString || 'Select Date'}
              </Text>
            </TouchableOpacity>
          </View>

          {/* Date Picker Modal */}
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirm}
            onCancel={hideDatePicker}
            minimumDate={new Date()} // Set minimum date to today
            style={{backgroundColor: isDarkMode ? 'grey' : '#fff'}}
          />
        </View>

        {/* Display selected time on the screen */}
        {selectedTimeSlot && (
          <View style={{marginTop: 20, paddingHorizontal: 20}}>
            <Text
              style={[currentStyle.bgText, {fontWeight: '500', fontSize: 16}]}>
              Selected Time:
            </Text>
            <View style={[styles.dateBox,currentStyle.fieldsBg]}>
              <Text style={[currentStyle.bgText]}>{selectedTimeSlot}</Text>
            </View>
          </View>
        )}

        {/* Time Slot Modal */}
        {isTimeSlotVisible && (
          <Modal transparent animationType="slide" visible={isTimeSlotVisible}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.5)',
              }}>
              <View
                style={[
                  currentStyle.bgGrey,
                  {
                    padding: 20,
                    borderRadius: 10,
                    width: '80%',
                  },
                ]}>
                <Text
                  style={[
                    currentStyle.bgText,
                    {
                      fontSize: 18,
                      fontWeight: 'bold',
                      marginBottom: 10,
                    },
                  ]}>
                  Select Time Slot
                </Text>
                <FlatList
                  data={availableSlots}
                  keyExtractor={item => item}
                  renderItem={({item}) => (
                    <TouchableOpacity
                      onPress={() => selectTimeSlot(item)}
                      style={[{
                        paddingVertical: 15,
                        borderBottomWidth: 1,
                        borderBottomColor: Colors.lightgrey,
                      }]}>
                      <Text style={[currentStyle.bgText, {fontSize: 16}]}>
                        {item}
                      </Text>
                    </TouchableOpacity>
                  )}
                />
                <TouchableOpacity
                  onPress={() => setTimeSlotVisibility(false)}
                  style={{
                    marginTop: 20,
                    padding: 10,
                    backgroundColor: Colors.primary,
                    borderRadius: 5,
                    alignItems: 'center',
                  }}>
                  <Text style={[currentStyle.bgText, {fontSize: 16}]}>
                    Close
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
        )}

        <View style={{marginTop: 20, paddingHorizontal: 20}}>
          <Text
            style={[currentStyle.bgText,styles.mb1, {fontWeight: '500', fontSize: 16}]}>
            Description
          </Text>
          <TextInput
            multiline={true}
            numberOfLines={4}
            textAlignVertical="top"
            placeholder="Enter Additional Information"
            placeholderTextColor={currentStyle.bgText}
            style={[styles.textArea, currentStyle.bgText,currentStyle.fieldsBg]}
            onChangeText={setDescription}
            value={description}
          />
        </View>

        <View
          style={[
            styles.btn2,
            styles.centered,
            {
              backgroundColor: Colors.primary,
              paddingHorizontal: 20,
              margin: 20,
              borderRadius: 5,
            },
          ]}>
          <TouchableOpacity onPress={createBooking}>
            <Text
              style={{fontSize: 16, fontWeight: '500', color: Colors.white}}>
              Book Consultation
            </Text>
          </TouchableOpacity>
        </View>
      
      </ScrollView>
    </SafeAreaView>
  );
};

export default BookConsultation;
