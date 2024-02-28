// FullScreenImage.js
import React from 'react';
import { Modal, View, Image, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { selectPhoto } from '../redux/slices/pictureSlice';
import Ionicons from 'react-native-vector-icons/Ionicons';

const FullScreenImage = ({ isVisible, onClose, onFlashToggle, onSelectPhoto }) => {
  const photo = useSelector(selectPhoto);

  // Check if the photo object has a valid path
  const isValidPhoto = photo && photo.path;

  return (
    <Modal visible={isVisible} transparent={true} animationType="slide">
      <View style={styles.modalContainer}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.backButton} onPress={onClose}>
            <Ionicons name='chevron-back-outline' size={24} style={styles.buttonText}/>
          </TouchableOpacity>
        </View>
        {isValidPhoto ? (
          <Image source={{ uri: `file://${photo.path}` }} style={styles.image} resizeMode="contain" />
        ) : (
          <Text style={styles.errorText}>Invalid photo source</Text>
        )}
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'black',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    // Customize your back button styles
  },
  flashButton: {
    // Customize your flash button styles
  },
  closeButton: {
    position: 'absolute',
    top: 20,
    right: 20,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 20,
  },
  selectorButton: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
    backgroundColor: '#3498db',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default FullScreenImage;
