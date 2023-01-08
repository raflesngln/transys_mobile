import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {BottomTabBar, createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Animated, { FadeInUp, FadeOutDown, Layout } from 'react-native-reanimated';
import {Image, View,TouchableOpacity, StyleSheet} from 'react-native';
import COLORS from '@config/colors'

import { BottomTabNavigatorParamList } from './types';

import HomeStackNavigator from './HomeStack';
import HomeScreen from '@screens/home/HomeScreen';
import Jobslist from '@screens/jobs/JobsList';
import MessageStack from '@navigation/MessageStack';
import ProfileStack from '@navigation/ProfileStack';
import ScannerStack from '@navigation/ScannerStack';
import { Button } from 'native-base';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


const CustomBottomMenu=({children,onPress}:any)=>(
  <TouchableOpacity activeOpacity={0.7}
  style={{
    justifyContent:'center',
    alignItems:'center',
    ...styles.shadow
  }}
  onPress={onPress}>
    <View style={{
      width:70,
      height:70,
      borderRadius:70,
      paddingBottom:6,
      backgroundColor:'trasparent'
    }}>
      {children}
    </View>
  </TouchableOpacity>
)


const Tab = createBottomTabNavigator<BottomTabNavigatorParamList>();

const BottomTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarActiveTintColor: "#024ce0",
        tabBarInactiveTintColor: "#707273",
        headerShown: false,
        gestureEnabled: true,
        unmountOnBlur: true,
        tabBarStyle: {
          height: 65,
          width:'100%',
          // marginLeft:'3%',
          paddingHorizontal:5,
          paddingTop: 5,
          paddingBottom:5,
          borderTopRightRadius:15,
          borderTopLeftRadius:15,
          position: 'absolute',
          // backgroundColor: '#0e4ca1',
          backgroundColor: '#ffff',
      },
        pressColor: 'gray',
        tabBarLabelStyle: {
          fontSize: 12,
          padding:2,
        },
      })}
    >
      <Tab.Screen
        name="Home"
        // component={HomeStackNavigator}
        component={HomeScreen}
        options={{ 
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="view-dashboard-outline" color={color} size={size+2} />
              ),
         }}
        
      />
      <Tab.Screen name="Jobs" component={Jobslist}
        options={{ 
        tabBarLabel: 'Shipment',
        tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="sticker-text" color={color} size={size+2} />
            ),
        }}
      />
      {/* <MaterialCommunityIcons name="camera-control" color={color} size={size+2} /> */}
      
      <Tab.Screen name="Scanner" component={ScannerStack}
        options={{
          tabBarLabel: 'Scanner',
          tabBarIcon: ({ color, size,focused }) => (
            <View
              style={{
                position: 'absolute',
                  flex: 1,
                  justifyContent:'center',alignItems:'center',
                  width:75,height:75,
                  bottom:-5,
                  // backgroundColor: '#175fc2',
                  backgroundColor: '#ebeced',
                  borderColor:COLORS.primary,
                  borderWidth: 5,
                  overflow: 'hidden',
                  shadowColor: 'black',
                  shadowRadius: 10,
                  shadowOpacity: 1,
                  borderRadius:100,
                  zIndex:999
              }}>
              <Image
                source={require('../../assets/images/scan.png')}
                style={{
                  width: 40,
                  height: 40,
                  tintColor: color,
                  alignContent: 'center',
                  shadowColor: '#05f28b',
                  shadowOffset: {width: 12, height: 24},
                  shadowOpacity: 2,
                  shadowRadius: 5,
                }}
              />
            </View>
            ),
            tabBarButton:(props:any)=>(
              <CustomBottomMenu {...props}/>
            )
          }}
      />

      <Tab.Screen name="Message" component={MessageStack}
        options={{ 
        tabBarLabel: 'Message',
        tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="email" color={color} size={size+2} />
            ),
            tabBarBadge: 55,
        }}
      />
      <Tab.Screen name="Profile" component={ProfileStack}
            options={{ 
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="account-circle" color={color} size={size+2} />
                ),
            }}
      />
    </Tab.Navigator>
  );
};


const styles = StyleSheet.create({
  shadow: {
    shadowColor:'#767285',
    shadowOffset:{
      width:0,height:10
    },
    shadowOpacity:0.30,
    shadowRadius:4,
    elevation:5
  },
})

export default BottomTabs;