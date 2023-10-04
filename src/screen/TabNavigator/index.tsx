import React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Icons from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import HomeStack from '../HomeFlow';
import ServiceStack from '../ServiceFlow';
import ProfileStack from '../ProfileFlow';
import Colors from '../../component/constant/Colors';

const TabStack = () => {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        tabBarShowLabel: false,
        tabBarActiveTintColor: Colors.tabActive,
        tabBarInactiveTintColor: Colors.tabInActive,
        tabBarLabelStyle: {marginBottom: 10},
      }}>
      <Tab.Screen
        name="Home"
        component={HomeStack}
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarIcon: tabInfo => (
            <Icons name="home" size={25} color={tabInfo.color} />
          ),
        }}
      />

      <Tab.Screen
        name="Services"
        component={ServiceStack}
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarIcon: tabInfo => (
            <Icons name="cog" size={25} color={tabInfo.color} />
          ),
        }}
      />

      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          headerShown: false,
          tabBarShowLabel: true,
          tabBarIcon: tabInfo => (
            <MaterialCommunityIcons
              name="account-cog-outline"
              size={25}
              color={tabInfo.color}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default TabStack;
