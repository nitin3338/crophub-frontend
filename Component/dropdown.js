import React, {useState} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import {useDarkModeContext} from '../context/darkMode';
import styles, {lightStyles, darkStyles, Colors} from '../Styles';

const Dropdown = ({label, options, onSelect}) => {
  const {isDarkMode} = useDarkModeContext();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(options && options.length > 0 ? options[0] : null);
  const toggleDropdown = () => setIsOpen(!isOpen);

  const currentStyle = isDarkMode ? darkStyles : lightStyles;

  const handleSelect = option => {
    setSelectedOption(option);
    onSelect(option);
    toggleDropdown();
  };
  console.log(selectedOption);
  return (
    <View style={[styles.pickerContainer, currentStyle.fieldsBg]}>
      <TouchableOpacity onPress={toggleDropdown} style={styles.header}>
        <Text style={[currentStyle.bgText]}>
          {label} {selectedOption?.name}
        </Text>
      </TouchableOpacity>
      {isOpen && (
        <View style={[styles.optionsContainer, currentStyle.fieldsBg]}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              onPress={() => handleSelect(option)}
              style={[styles.option]}
            >
              <Text style={[currentStyle.bgText]}>{option.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};


export default Dropdown;
