import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useState} from 'react';
import styles, {lightStyles, darkStyles, Colors} from '../Styles';
import {useDarkModeContext} from '../context/darkMode';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {Items} from '../Utilities/Database';
import CustomHeader from './CustomHeader';
import ImageSlider from './ImageSlider';
import SingleProductBtns from './products/productBtns';
import {Picker} from '@react-native-picker/picker';
const ProductsDetail = ({route}) => {
  const navigation = useNavigation();
  const {isDarkMode} = useDarkModeContext();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const {product} = route.params;
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false); 
  const [productData, setProductData] = useState({
    _id: product._id,
    name: product.productName,
    image: product.productImage,
    price: product.productPrice,
    quantity: 1 || quantity,
  });
  
  const handleProductPress = (event, newProduct) => {
    event.persist();
    const newProductData = {
      _id: newProduct._id,
      name: newProduct.productName,
      image: newProduct.productImage,
      price: newProduct.productPrice,
      quantity: 1, // Reset quantity to 1 for the new product
    };

    // Navigate to the new product details page
    navigation.navigate('ProductDetail', { product: newProduct });

    // Update the state with the new product data
    setProductData(newProductData);
    setQuantity(1); // Reset quantity to 1 for the new product
  };

  const handleToggleLike = () => {
    setLiked(!liked);
  };
  const handleIncreaseQuantity = () => {
    setQuantity(prevQuantity => {
      return prevQuantity + 1;
    });
    setProductData({...productData, quantity: quantity + 1});
  };

  const handleDecreaseQuantity = () => {
    setQuantity(prevQuantity => {
      if (prevQuantity > 1) {
        return prevQuantity - 1;
      }
      return prevQuantity;
    });
    if (quantity > 1) {
      setProductData({...productData, quantity: quantity - 1});
    }
  };

  if (
    !product ||
    !product.productImageList ||
    product.productImageList.length === 0
  ) {
    // Handle case where product or productImageList is null, undefined, or empty
    return (
      <View>
        <Text>Error: Invalid product details</Text>
      </View>
    );
  }
 

  const renderStars = rating => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <Ionicons
          key={i}
          name={i <= rating ? 'star' : 'star-outline'}
          size={12}
          color={Colors.secondary}
        />,
      );
    }
    return stars;
  };
  // console.log('product Info: ' + JSON.stringify(productData));
  return (
    <SafeAreaView style={[currentStyle.bg, styles.plr1, {flex: 1}]}>
      <CustomHeader />
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={[{marginBottom: 70}]}>
        <View style={[styles.mt2]}>
          <ImageSlider images={product.productImageList} />

          {/* Product details */}
          <View style={[styles.mt2]}>
            <View style={[styles.row, {justifyContent: 'space-between'}]}>
              <Text
                style={[currentStyle.bgText, styles.plr1, styles.headingLarge]}>
                {product.productName}
              </Text>
              <View>
                <TouchableOpacity
                  style={[
                    currentStyle.fieldsBg,
                    {padding: 5, borderRadius: 30, marginRight: 10},
                  ]}  onPress={handleToggleLike}>
                  <Text style={[currentStyle.bgText]}>
                    {liked ? (
                      <Ionicons name="heart" size={30} color={Colors.primary} />
                    ) : (
                      <Ionicons name="heart-outline" size={30}  color={Colors.primary}/>
                    )}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>

            <View
              style={[
                styles.row,
                styles.mt3,
                {justifyContent: 'space-between'},
              ]}>
              <View
                style={[
                  styles.row,
                  currentStyle.fieldsBg,
                  {
                    gap: 15,
                    paddingHorizontal: 10,
                    paddingVertical: 3,
                    borderRadius: 30,
                  },
                ]}>
                <TouchableOpacity
                  onPress={handleIncreaseQuantity}
                  key="increase">
                  <Text style={[currentStyle.bgText]}>
                    <Ionicons name="add" size={25} />
                  </Text>
                </TouchableOpacity>
                <Text style={[currentStyle.bgText, {fontSize: 20}]}>
                  {quantity}
                </Text>
                <TouchableOpacity
                  onPress={handleDecreaseQuantity}
                  key="decrease">
                  <Text style={[currentStyle.bgText]}>
                    <Ionicons name="remove" size={25} />
                  </Text>
                </TouchableOpacity>
              </View>
              <View>
                <Text
                  style={[
                    currentStyle.bgText,
                    styles.plr1,
                    {fontSize: 18, fontWeight: '600'},
                  ]}>
                  ₹ {productData.price}
                </Text>
                {product.isOff && (
                  <Text
                    style={[
                      styles.offPercentage,
                      styles.plr1,
                    ]}>{`${product.offPercentage}% off`}</Text>
                )}
              </View>
            </View>
            <View>
              <Text
                style={[
                  currentStyle.bgText,
                  styles.mt3,
                  {fontSize: 18, fontWeight: '700'},
                ]}>
                About The Product
              </Text>
              <Text style={[currentStyle.bgText, styles.mt3]}>
                {product.description}
              </Text>
            </View>
          </View>

          {/* Quantity controls */}

          <View style={[styles.mt4]}>
            <Text style={[currentStyle.bgText, styles.headingNormal]}>
              Also Bought Together.....
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}>
              {Items.map((otherProduct, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.card, {marginRight: 15}]} onPress={(event) => handleProductPress(event, otherProduct)}>
                  <Image
                    source={{uri:otherProduct.productImageList[0]}} // Use a small image here
                    style={{width: 120, height: 120, borderRadius: 5}}
                  />
                  <View style={[styles.row, {gap: 30}]}>
                    <Text style={[currentStyle.bgText, styles.mt1]}>
                      {otherProduct.productName}
                    </Text>
                    <Text style={[currentStyle.bgText, styles.mt1]}>
                      ₹ {otherProduct.productPrice}
                    </Text>
                  </View>
                  <View style={[styles.ratingContainer, styles.mt3]}>
                    {renderStars(otherProduct.rating)}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
          <View style={[styles.mt4]}>
            <Text style={[currentStyle.bgText, styles.headingNormal]}>
              You might also like ...
            </Text>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              nestedScrollEnabled={true}>
              {Items.map((otherProduct, index) => (
                <TouchableOpacity
                  key={otherProduct._id}
                  style={[styles.card, {marginRight: 15}]} 
                  onPress={(event) => handleProductPress(event, otherProduct)}>
                  <Image
                    source={{uri:otherProduct.productImageList[0]}} // Use a small image here
                    style={{width: 120, height: 120, borderRadius: 5}}
                  />
                  <View style={[styles.row, {gap: 30}]}>
                    <Text style={[currentStyle.bgText, styles.mt1]}>
                      {otherProduct.productName}
                    </Text>
                    <Text style={[styles.mt1, {color: Colors.primary}]}>
                      {otherProduct.offPercentage}%off
                    </Text>
                  </View>
                  <Text style={[currentStyle.bgText, styles.mt3]}>
                    ₹ {otherProduct.productPrice}
                  </Text>
                  <View style={styles.ratingContainer}>
                    {renderStars(otherProduct.rating)}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </ScrollView>
      <SingleProductBtns data={productData} />
    </SafeAreaView>
  );
};

export default ProductsDetail;
