import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Modal, FlatList, StyleSheet } from 'react-native';

const CustomPicker = ({ data, selectedValue, onSelect, placeholder }) => {
  const [isVisible, setIsVisible] = useState(false);

  const togglePicker = () => {
    setIsVisible(!isVisible);
  };

  const handleSelect = (value) => {
    onSelect(value);
    togglePicker();
  };

  return (
    <View>
      <TouchableOpacity onPress={togglePicker} style={styles.pickerButton}>
        <Text>{selectedValue || placeholder}</Text>
      </TouchableOpacity>

      <Modal visible={isVisible} transparent animationType="slide">
        <View style={[styles.modalContainer,styles.modelContent]}>
          <FlatList
            data={data}
            keyExtractor={(item) => item.value.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleSelect(item.value)} style={styles.pickerItem}>
                <Text>{item.label}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity onPress={togglePicker} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  pickerButton: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor:'#fff'
  },
  modelContent:{
    backgroundColor: 'white',
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  pickerItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  closeButton: {
    padding: 15,
    backgroundColor: 'white',
    alignItems: 'center',
  },
  closeButtonText: {
    color: 'blue',
  },
});

export default CustomPicker;
