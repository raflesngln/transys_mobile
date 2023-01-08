import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyProfileNavigatorParamList } from './types';


import ProfileScreen from '../screens/profile/ProfileScreen';
import DetailsUser from '../screens/profile/ProfileScreen';
import LogoutScreen from '../screens/auth/LoginScreen';

const ProfileStack = createNativeStackNavigator<MyProfileNavigatorParamList>(); // checking type for name stack & types params

const ProfileStackNavigator = () => {
  return (
    <ProfileStack.Navigator 
        screenOptions={{
            headerShown: false,
            contentStyle:{
                backgroundColor:'#ebedf0',
                zIndex:999
              },
        }}
        initialRouteName="MyProfile"
    >
      <ProfileStack.Screen name="MyProfile" component={ProfileScreen} />
      <ProfileStack.Screen name="DetailUser" component={DetailsUser} />
      <ProfileStack.Screen name="LogoutApp" component={LogoutScreen} />

    </ProfileStack.Navigator>
  );
};

export default ProfileStackNavigator;