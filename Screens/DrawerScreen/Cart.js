import {
  ImageBackground,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import {useNavigation} from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import styles, {lightStyles, darkStyles, Colors} from '../../Styles';
import {useDarkModeContext} from '../../context/darkMode';
import CustomHeader from '../../Component/CustomHeader';
import {useSelector} from 'react-redux';
import {useDispatch} from 'react-redux';
import {removeProduct, updateProduct} from '../../redux/slices/cartSlice';
export default function Cart() {
  const {isDarkMode} = useDarkModeContext();
  const products = useSelector(state => state.products.items);
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(1);
  const [itemQuantities, setItemQuantities] = useState({});

  // Update quantity function
  const updateCartItems = (id, newQuantity) => {
    const existingProduct = products.find(product => product._id === id);

    if (existingProduct) {
      const updatedQuantities = {
        ...itemQuantities,
        [id]: newQuantity,
      };

      setItemQuantities(updatedQuantities);

      // Dispatch update action with immutable state
      const updatedProduct = {
        ...existingProduct,
        quantity: newQuantity,
      };

      dispatch(updateProduct(updatedProduct));
    }
  };

  const handleIncreaseQuantity = id => {
    const newQuantity = (itemQuantities[id] || 0) + 1;
    updateCartItems(id, newQuantity);
  };

  // Decrease quantity function
  const handleDecreaseQuantity = id => {
    const newQuantity = Math.max((itemQuantities[id] || 0) - 1, 1);
    updateCartItems(id, newQuantity);
  };

  const removeCartItem = id => {
    dispatch(removeProduct(id));
  };

  const calculateSubtotal = (products, itemQuantities) => {
    let subtotal = 0;

    // Iterate through each product in the cart
    products.forEach(product => {
      subtotal += product.price * (itemQuantities[product._id] || 1);
    });

    return subtotal;
  };
  //console.log(products);
  return (
    <SafeAreaView style={[currentStyle.bg, {flex: 1, position: 'relative'}]}>
      <ImageBackground source={require('../../assets/cartBg.jpg')}>
        <View
          style={[
            {
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 25,
              paddingVertical: 10,
              paddingHorizontal: 10,
              height: 120,
              zIndex: 1,
            },
          ]}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={[
              {
                padding: 4,
                borderWidth: 2,
                borderColor: '#656967',
                borderRadius: 6,
              },
            ]}>
            <Ionicons
              name="chevron-back-outline"
              size={22}
              style={{color: '#fff'}}
            />
          </TouchableOpacity>
          <Text
            style={[
              {
                fontSize: 20,
                fontWeight: '600',
                color: Colors.white,
                letterSpacing: 2,
              },
            ]}>
            CART
          </Text>
          <View></View>
        </View>
      </ImageBackground>
      <View
        style={[
          currentStyle.fieldsBg,
          {
            borderTopLeftRadius: 30,
            borderTopRightRadius: 30,
            zIndex: 2,
            marginTop: -25,
            paddingHorizontal: 15,
            paddingTop: 10,
            paddingBottom: 285,
          },
        ]}>
        <ScrollView
          nestedScrollEnabled={true}
          showsVerticalScrollIndicator={false}>
          <View
            style={{
              gap: 5,
              flexDirection: 'column',
              justifyContent: 'flex-start',
            }}>
            {products.length > 0 ? (
              products.map(product => (
                <View
                  key={product.id}
                  style={[
                    {
                      flexDirection: 'row',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      marginBottom: 0,
                      paddingVertical: 5,
                      paddingHorizontal: 0,
                      zIndex: 1,
                    },
                  ]}>
                  <View
                    key={product._id}
                    style={[
                      {
                        flexDirection: 'row',
                        alignItems: 'center',
                        width: '100%',
                        justifyContent: 'space-between',
                        padding: 10,
                        borderRadius: 15,
                      },
                      currentStyle.bg,
                    ]}>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'flex-start',
                        alignItems: 'center',
                        gap: 10,
                      }}>
                      <Image
                        source={{uri: product.image}}
                        style={[{width: 60, height: 60, borderRadius: 10}]}
                      />
                      <View>
                        <Text
                          style={[
                            currentStyle.bgText,
                            {fontSize: 15, fontWeight: '700'},
                          ]}>
                          {product.name}
                        </Text>
                        <Text
                          style={[
                            {fontSize: 11, fontWeight: '500', color: '#a1a1a1'},
                          ]}>
                          {!product?.size && 'Small'}
                        </Text>
                      </View>
                    </View>
                    <View
                      style={{
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        alignContent: 'center',
                        marginRight: 40,
                      }}>
                      <View
                        style={[
                          styles.row,
                          //currentStyle.fieldsBg,
                          {
                            gap: 8,
                            borderRadius: 30,
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            alignContent: 'center',
                          },
                        ]}>
                        <TouchableOpacity
                          onPress={() => handleIncreaseQuantity(product._id)}
                          key="increase">
                          <Text style={[currentStyle.bgText]}>
                            <Ionicons name="add" size={20} />
                          </Text>
                        </TouchableOpacity>
                        <Text style={[currentStyle.bgText, {fontSize: 20}]}>
                          {product.quantity}
                        </Text>
                        <TouchableOpacity
                          onPress={() => handleDecreaseQuantity(product._id)}
                          key="decrease">
                          <Text style={[currentStyle.bgText]}>
                            <Ionicons name="remove" size={20} />
                          </Text>
                        </TouchableOpacity>
                      </View>
                      <Text
                        style={[
                          currentStyle.bgText,
                          {fontSize: 16, fontWeight: '600'},
                        ]}>
                        ₹ {product.price}
                      </Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    onPress={() => removeCartItem(product._id)}
                    style={[
                      {
                        position: 'absolute',
                        right: 0,
                        width: 30,
                        height: 30,
                        borderRadius: 20,
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: 5,
                      },
                      currentStyle.fieldsBg,
                    ]}>
                    <Ionicons
                      name={'trash-outline'}
                      size={15}
                      style={{color: 'red'}}
                    />
                  </TouchableOpacity>
                </View>
              ))
            ) : (
              <View
                style={{
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  paddingTop: '40%',
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  <Text
                    style={[
                      {fontSize: 16, fontWeight: '600'},
                      currentStyle.bgText,
                    ]}>
                    Nothing here{' '}
                  </Text>
                  <Ionicons
                    name="sad-outline"
                    style={currentStyle.bgText}
                    size={22}
                  />
                </View>
                <TouchableOpacity
                  style={[
                    styles.btn100,
                    styles.btnPrimary,
                    styles.btnText,
                    {paddingVertical: 10, borderRadius: 10, marginTop: 10},
                  ]}>
                  <Text style={{color: '#fff'}}>Shop Now</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </ScrollView>
      </View>
      {products.length > 0 && (
        <View
          style={[
            {
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              width: '100%',
              paddingHorizontal: 10,
              paddingVertical: 2,

              zIndex: 3,
            },
            currentStyle.fieldsBg,
          ]}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
              paddingVertical: 5,
            }}>
            <Text
              style={[currentStyle.bgText, {fontSize: 16, fontWeight: '600'}]}>
              Subtotal:
            </Text>
            <Text
              style={[currentStyle.bgText, {fontSize: 16, fontWeight: '600'}]}>
              ₹{' '}
              {Math.round(
                products.reduce(
                  (accumulator, currentProduct) =>
                    accumulator +
                    currentProduct.price * currentProduct.quantity,
                  0,
                ),
              )}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 10,
            }}>
            <Text
              style={[currentStyle.bgText, {fontSize: 16, fontWeight: '600'}]}>
              Delivery Charges:
            </Text>
            <Text
              style={[currentStyle.bgText, {fontSize: 16, fontWeight: '600'}]}>
              ₹ 40
            </Text>
          </View>
          <View style={[styles.mb1, styles.mt1]} />

          <TouchableOpacity
            style={[
              styles.btnFull,
              styles.btnCircle,
              styles.btnPrimary,
              styles.btnText,
              {paddingVertical: 15},
            ]} onPress={()=> navigation.navigate('CheckOut')}>
            <Text style={{color: '#fff'}}>
              Place Order  ₹{' '}
              {Math.round(
                products.reduce(
                  (accumulator, currentProduct) =>
                    accumulator +
                    currentProduct.price * currentProduct.quantity,
                  0,
                ),
              )+ 40}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
}
