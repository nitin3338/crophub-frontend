import {View, Text, TouchableOpacity} from 'react-native';
import styles, {darkStyles, lightStyles, Colors} from '../../Styles';
import React ,{useState}from 'react';
import {useDarkModeContext} from '../../context/darkMode';
import { addProducts, updateProduct } from '../../redux/slices/cartSlice';
import { useDispatch, useSelector } from 'react-redux';



const SingleProductBtns = (data) => {
  const dispatch = useDispatch();
  const {isDarkMode} = useDarkModeContext();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;
  const [addedToCart, setAddedToCart] = useState(false);
  const products = useSelector((state) => state.products.items);

  const handleAddToCart = () => {
    // 1. Efficiently check for existing product using find:
    const existingProduct = products.find(product => product._id === data.data._id);
   // console.log('existing '+JSON.stringify(existingProduct));
    if (existingProduct) {
      // 2. Create a new object with updated quantity:
      const updatedProduct = {
        ...existingProduct, // Spread existing product properties
        quantity: existingProduct.quantity + data.data.quantity, // Update quantity
      };
  
      // 3. Dispatch update action with immutable state:
      dispatch(updateProduct(updatedProduct));
    } else {
      // 4. If product doesn't exist, add it:
      dispatch(addProducts(data.data));
    }
  };
  

 //console.log(products);

  return (
    <View
      style={[
        {
          position: 'absolute',
          zIndex: 90,
          margin: 0,
          flexDirection: 'row',
          justifyContent: 'space-between',
          gap: 10,
          width: '106%',
          padding: 10,
          bottom: 0,
          left: 0,
          right: 0,
        },
        currentStyle.fieldsBg,
      ]}>
      <TouchableOpacity
        style={[
          styles.btnSecondary,
          styles.btnText,
          {
            width: '48%',
            paddingVertical: 12,
            paddingHorizontal: 5,
            borderRadius: 8,
          },
        ]}>
        <Text style={[{color: Colors.white}]}>BUY NOW</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[
          styles.btnText,
          {
            width: '48%',
            paddingVertical: 12,
            paddingHorizontal: 5,
            borderRadius: 8,
          },
          !isDarkMode
            ? {backgroundColor: '#ffffff'}
            : {backgroundColor: '#333'},
        ]}
        onPress={handleAddToCart}
        disabled={addedToCart}>
        <Text style={[isDarkMode ? {color: '#fff'} : {color: '#333'}]}>
        {addedToCart ? 'Added to Cart' : 'ADD TO CART'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SingleProductBtns;
