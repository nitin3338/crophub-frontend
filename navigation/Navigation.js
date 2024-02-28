import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Welcome from '../Screens/Welcome/Welcome';
import Login from '../Screens/Welcome/Login';
import Signup from '../Screens/Welcome/Signup';
import ForgetPassword from '../Screens/Welcome/ForgetPassword';
import Home from '../Screens/TabScreen/Home';
import TabNavigator from './TabNavigation';
import Cart from '../Screens/DrawerScreen/Cart';
import Consultation from '../Screens/DrawerScreen/Consultation';
import CropAgreement from '../Screens/DrawerScreen/CropAgreement';
import Invoices from '../Screens/DrawerScreen/Invoices';
import Orders from '../Screens/DrawerScreen/Orders';
import Crops from '../Screens/DrawerScreen/Crops';
import UpdateProfile from '../Component/UpdateProfile';
import BookConsultation from '../Screens/DrawerScreen/BookConsultation';
import Chat from '../Screens/DrawerScreen/Chat';
import UserChat from '../Utilities/UserChat';
import CropCamera from '../Utilities/CropCamera';
import UpcomingWeather from '../Component/UpcomingWeather';
import ProductsDetail from '../Component/ProductsDetail';
import Checkout from '../Component/products/Checkout';
import Notification from '../Utilities/Notification/Notification';

const Stack = createNativeStackNavigator();
export default function Navigation() {

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false  , gestureEnabled: true,
    gestureDirection: 'horizontal',}}>
        <Stack.Screen name="Welcome" component={Welcome} />
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Signup" component={Signup} />
        <Stack.Screen name="ForgotPassword" component={ForgetPassword} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Main" component={TabNavigator} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Consultation" component={Consultation} />
        <Stack.Screen name="CropAgreement" component={CropAgreement} />
        <Stack.Screen name="Invoices" component={Invoices} />
        <Stack.Screen name="Orders" component={Orders} />
        <Stack.Screen name="Crops" component={Crops} />
        <Stack.Screen name="UpdateProfile" component={UpdateProfile} />
        <Stack.Screen name="BookConsultation" component={BookConsultation} />
        <Stack.Screen name="Chat" component={Chat} />
        <Stack.Screen name="UserChat" component={UserChat} />
        <Stack.Screen name="CropCamera" component={CropCamera} />
        <Stack.Screen name="UpcomingWeather" component={UpcomingWeather} />
        <Stack.Screen name="ProductDetail" component={ProductsDetail} />
        <Stack.Screen name="CheckOut" component={Checkout} />
        <Stack.Screen name="Notification" component={Notification} />
        
      </Stack.Navigator>
    </NavigationContainer>
  )
}

