import React, {useRef, useState} from 'react';
import {View, ScrollView, Image, StyleSheet, Dimensions, Text} from 'react-native';

const windowWidth = Dimensions.get('window').width;
const imageWidth = windowWidth * 0.9; // 80% of the window width
const gap = 10; // Gap between images

const ImageSlider = ({images}) => {

    const scrollViewRef = useRef();

  const [active, setActive] = useState(0);
  const change = ({ nativeEvent }) => {
    const viewSize = nativeEvent.layoutMeasurement.width;
    // Adjust the calculation to consider the gap
    const contentOffset = nativeEvent.contentOffset.x;
    const selectedImage = Math.floor((contentOffset + (gap / 2)) / (imageWidth + gap));
    if (selectedImage !== active) {
      setActive(selectedImage);
    }
  };

  // Function to calculate the offset and scroll to the image
  const scrollToImage = (index) => {
    let position = (imageWidth + gap) * index;
    scrollViewRef.current.scrollTo({ x: position, animated: true });
  };

//console.log(images);
  return (
    <View style={styles.container}>
      <ScrollView
        horizontal
        onScroll={change}
        showsHorizontalScrollIndicator={false}
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        ref={scrollViewRef}
        scrollEventThrottle={16} // Handle onScroll events at most every 16ms
        // Disable pagingEnabled and implement manual snap
        snapToInterval={imageWidth + gap} // Snap to the width of the image plus the gap
        decelerationRate="fast" // Make the scroll speed faster
      >
        {images.map((image, index) => (
          <Image key={index} source={{uri:image}} style={styles.image} />
        ))}
      </ScrollView>
      <View style={styles.dotView}>
        {images.map((i, k) => (
          <Text key={k} style={k == active ? styles.dotActive : styles.dot}>⬤</Text>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: windowWidth,
    height: 250, // Adjust based on your needs
    position: 'relative',
  },
  scrollView: {
    paddingHorizontal: 6,
    width: windowWidth,
    height: 300, // Adjust based on your needs
  },
  image: {
    width: windowWidth * 0.9,
    height: 250, // Adjust based on your needs
    //resizeMode: 'cover',
    borderRadius: 15,
    marginRight:5
  },
  dotView: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'center',
    bottom: 5,
    left: 0,
    right: 0,
  },
  dot: {
    margin: 3,
    color: '#888',
  },
  dotActive: {
    margin: 3,
    color: 'black',
  },
});

export default ImageSlider;
