import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { RootNavigatorList } from './types';


const Stack = createNativeStackNavigator<RootNavigatorList>(); // checking type for name stack & types params

import SplashScreen from '../screens/SplashScreen';
import StartUpScreen from '../screens/StartUpScreen';
import AuthStackNavigator from './AuthStack';
import BottomTabsStack from './Tabs';
import HomeStackNavigator from './HomeStack';
import JobsStack from './JobsStack';   
import MessageStack from './MessageStack';
import ScannerStack from './ScannerStack';

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SplashScreen">
          <Stack.Screen name="StartUpScreen" component={StartUpScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Auth" component={AuthStackNavigator} />
          <Stack.Screen name="HomeStack" component={HomeStackNavigator} />
          <Stack.Screen name="BottomMenu" component={BottomTabsStack} />
          <Stack.Screen name="JobsStack" component={JobsStack} />
          <Stack.Screen name="MessageStack" component={MessageStack} />
          <Stack.Screen name="ScannerStack" component={ScannerStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;