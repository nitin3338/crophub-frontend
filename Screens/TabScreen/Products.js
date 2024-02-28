import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import styles, {lightStyles, darkStyles, Colors} from '../../Styles';
import {useDarkModeContext} from '../../context/darkMode';
import {useNavigation} from '@react-navigation/native';
import CustomHeader from '../../Component/CustomHeader';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {useTranslation} from 'react-i18next';
import {Items} from '../../Utilities/Database';

const Products = () => {
  const {t} = useTranslation();
  const navigation = useNavigation();
  const {isDarkMode} = useDarkModeContext();
  const currentStyle = isDarkMode ? darkStyles : lightStyles;

  const uniqueCategories = [
    'All ',
    ...new Set(Items.map(item => item.category)),
  ];
  const [selectedCategory, setSelectedCategory] = useState('All ');
  const [cartItems, setCartItems] = useState({});

  const filteredProducts =
    selectedCategory === 'All '
      ? Items
      : Items.filter(item => item.category === selectedCategory);

      const addToCart = (productId) => {
        setCartItems((prevCartItems) => ({
          ...prevCartItems,
          [productId]: !prevCartItems[productId], // Toggle between true and false
        }));
      };

      const renderStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
          stars.push(
            <Ionicons
              key={i}
              name={i <= rating ? 'star' : 'star-outline'}
              size={12}
              color={Colors.secondary}
            />
          );
        }
        return stars;
      };
      const handleProductPress = (event,product) => {
        event.persist();
        navigation.navigate('ProductDetail', { product });
      };

  return (
    <SafeAreaView style={[currentStyle.bg, {flex: 1}]}>
      <CustomHeader />
      <ScrollView showsVerticalScrollIndicator={false} style={[styles.mb6]}>
        <View style={[styles.plr1]}>
          {/* search BAR */}
          <View
            style={[
              {
                flexDirection: 'row',
                alignItems: 'center',
                borderRadius: 30,
                borderWidth: 1,
                paddingHorizontal: 4,
              },
              currentStyle.inputbg,
              styles.mt4,
            ]}>
            <TextInput
              placeholder={t('homepage.hero.FirstInput')}
              placeholderTextColor={Colors.dimgrey}
              style={[{flex: 1, padding: 9}, currentStyle.bgText]}
              // Add necessary props and handlers for the search functionality
            />
            <TouchableOpacity>
              <Ionicons
                name="search"
                size={20}
                color="#fff"
                style={[{padding: 10, borderRadius: 30}, currentStyle.bgText]}
              />
            </TouchableOpacity>
          </View>

          {/* Displaying Categories */}
          <View>
            <Text
              style={[currentStyle.bgText, styles.headingNormal, styles.mt3]}>
              Categories
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              {uniqueCategories.map(category => (
                <TouchableOpacity
                  key={category}
                  style={[
                    styles.categoryChip,
                    currentStyle.fieldsBg,
                    selectedCategory === category && styles.selectedCategory,
                  ]}
                  onPress={() => setSelectedCategory(category)}>
                  <Text style={[currentStyle.bgText, {fontWeight: '500'}]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>

          {/* Displaying Product Cards */}
          <View
            style={[
              styles.mt3,
              {
                flexDirection: 'row',
                flexWrap: 'wrap',
                alignItems: 'center',
                justifyContent:'space-around'
              },
            ]}>
            {filteredProducts.map(product => (
              <TouchableOpacity
                key={product._id}
                style={[styles.productCard]}
                onPress={(event) => handleProductPress(event, product)}
                >
                 
                <Image
                  source={{ uri: product.productImage }}
                  style={styles.productImage}
                />
               
                <View style={styles.addToCartContainer}>
                    <TouchableOpacity onPress={() => addToCart(product.id)}>
                      <Ionicons
                        name={cartItems[product.id] ? 'cart' : 'cart-outline'}
                        size={20}
                        color={Colors.secondary}
                      />
                    </TouchableOpacity>
                  </View>
                <View style={[styles.row,{justifyContent:'space-between',alignItems:'center'}]}>
                <Text style={[currentStyle.bgText, styles.productName]}>
                  {product.productName}
                </Text>
                <View style={styles.ratingContainer}>{renderStars(product.rating)}</View>
                  </View>
                <View style={[styles.productDetails, styles.mt4]}>
                  <Text style={[currentStyle.bgText, styles.productPrice]}>
                    ${product.productPrice}
                  </Text>
                  {product.isOff && (
                  <Text
                    style={[
                      styles.offPercentage,
                    ]}>{`${product.offPercentage}% off`}</Text>
                )}
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Products;
