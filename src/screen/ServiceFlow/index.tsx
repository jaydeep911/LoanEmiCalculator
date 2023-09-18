import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ServiceScreen from './ServiceScreen';

const Stack = createNativeStackNavigator();

const ServiceStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ServiceScreen"
        component={ServiceScreen}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ServiceStack;
