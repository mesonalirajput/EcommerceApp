import {ApplicationProvider} from '@ui-kitten/components';
import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {LandingScreen} from './Screens';
import * as eva from '@eva-design/eva';
import Main from './src/navigators/mainStack';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <ApplicationProvider {...eva} theme={eva.light}>
      <NavigationContainer>
        <Main />
      </NavigationContainer>
    </ApplicationProvider>
  );
};

const styles = StyleSheet.create({});

export default App;
