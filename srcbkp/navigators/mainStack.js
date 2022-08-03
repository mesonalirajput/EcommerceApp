import React, {useEffect, useState} from 'react';
import {createStackNavigator, TransitionPresets} from '@react-navigation/stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {Home, Cart} from '../components/pages';
import {StatusBar, View} from 'react-native';

import {Layout, useTheme} from '@ui-kitten/components';

const Stack = createStackNavigator();

const Main = () => {
  const theme = useTheme();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          gestureEnabled: true,
          animationEnabled: true,
          gestureDirection: 'horizontal',
          headerShown: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}>
        <Stack.Screen
          name={'HOME'}
          component={Home}
          options={{
            ...TransitionPresets.ModalSlideFromBottomIOS,
            gestureEnabled: false,
          }}
        />
        <Stack.Screen
          name={'CART'}
          component={Cart}
          options={{
            ...TransitionPresets.SlideFromRightIOS,
            gestureEnabled: false,
          }}
        />
      </Stack.Navigator>
      <StatusBar backgroundColor={theme['background-basic-color-3']} />
    </>
  );
};

export default Main;
