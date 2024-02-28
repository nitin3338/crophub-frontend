import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
const ToastComponent = ({message, type}) => {
  return (
    <View style={[styles.toast, styles[type]]}>
      {type === 'success' ? (
        <View style={{backgroundColor: '#e6ffef', padding: 7, borderRadius: 5}}>
          <Ionicons name={'checkmark-circle'} size={25} color="#67d990" />
        </View>
      ) : type === 'warning' ? (
        <View style={{backgroundColor: '#fff3e6', padding: 7, borderRadius: 5}}>
          <Ionicons name={'alert-circle'} size={20} color="orange" />
        </View>
      ) : (
        <View style={{backgroundColor: '#ffe6e6', padding: 7, borderRadius: 5}}>
          <Ionicons name={'alert-circle'} size={20} color="red" />
        </View>
      )}

      <Text style={styles.text}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  toast: {
    width: '100%',
    position: 'absolute',
    top: 20,
    paddingHorizontal: 15,
    paddingVertical: 6,
    borderRadius: 5,
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
    alignSelf: 'center',
    gap: 15,
    borderBottomWidth: 6,
    backgroundColor: '#fff',
    zIndex: 10,
  },
  success: {borderColor: '#67d990'},
  error: {borderColor: 'red'},
  warning: {borderColor: 'orange'},
  text: {color: '#333'},
});

export default ToastComponent;
