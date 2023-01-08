import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthNavigatorParamList } from './types';


import LoginScreen from '../screens/auth/LoginScreen';
import RegisterScreen from '../screens/auth/RegisterScreen';
import ForgotPasswordScreen from '../screens/auth/ForgotPassword';

const AuthStack = createNativeStackNavigator<AuthNavigatorParamList>(); // checking type for name stack & types params

const AuthStackNavigator = () => {
  return (
    <AuthStack.Navigator 
        screenOptions={{
            headerShown: false,
            contentStyle:{
                backgroundColor:'#ebedf0',
                zIndex:999
              },
        }}
        initialRouteName="LoginUser"
    >
      <AuthStack.Screen name="LoginUser" component={LoginScreen} />
      <AuthStack.Screen name="RegisterUser" component={RegisterScreen} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />

    </AuthStack.Navigator>
  );
};

export default AuthStackNavigator;