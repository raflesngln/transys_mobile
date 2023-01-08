import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ScannerStackNavigatorParamList } from './types';


import ScannerPageScreen from '../screens/scanner/ScannerPageScreen';
import ScannerResultScreen from '../screens/scanner/ScannerResultScreen';

const ScanStack = createNativeStackNavigator<ScannerStackNavigatorParamList>(); // checking type for name stack & types params

const HomeStackNavigator = () => {
  return (
    <ScanStack.Navigator 
        screenOptions={{
            headerShown: false,
            contentStyle:{
                backgroundColor:'#ebedf0',
                zIndex:1
              },
        }}
        initialRouteName="ScannerPage"
    >
      <ScanStack.Screen  name="ScannerPage" component={ScannerPageScreen} />
      <ScanStack.Screen name="ScannerResult" component={ScannerResultScreen} />
    </ScanStack.Navigator>
  );
};

export default HomeStackNavigator;