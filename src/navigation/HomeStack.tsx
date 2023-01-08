import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { HomeStackNavigatorParamList } from './types';

import HomeScreen from '../screens/home/HomeScreen';
import DetailsScreen from '../screens/home/DetailsScreen';
import TrackingScreen from '../screens/home/TrackingScreen';
import DetailProduct from '../screens/home/DetailProduct';
import DetailUserScreen from '../screens/home/DetailUser';
import RecomendationProduct from '../screens/home/RecomendationProduct';

const HomeStack = createNativeStackNavigator<HomeStackNavigatorParamList>(); // checking type for name stack & types params

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator 
        screenOptions={{
            headerShown: false,
            contentStyle:{
                backgroundColor:'#ebedf0',
                zIndex:1
              },
        }}
        initialRouteName="HomeScreenPage"
    >
      <HomeStack.Screen  name="HomeScreenPage" component={HomeScreen} />
      <HomeStack.Screen name="Details" component={DetailsScreen} />
      <HomeStack.Screen name="CategoryCourse" component={TrackingScreen} />
      <HomeStack.Screen name="DetailProduct" component={DetailProduct}/>
      <HomeStack.Screen name="DetailUser" component={DetailUserScreen}/>
      <HomeStack.Screen name="RecomendationProduct" component={RecomendationProduct} />
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;