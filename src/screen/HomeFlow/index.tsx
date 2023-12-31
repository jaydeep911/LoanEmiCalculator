import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from './HomeScreen';
import AddPaymentScreen from './AddPaymentScreen';
import PaymentDetailScreen from './PaymentDetailScreen';
import PaymentListScreen from './PaymentListScreen';
const Stack = createNativeStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="HomeScreen"
        component={HomeScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="AddPaymentScreen"
        component={AddPaymentScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentDetailScreen"
        component={PaymentDetailScreen}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="PaymentListScreen"
        component={PaymentListScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
