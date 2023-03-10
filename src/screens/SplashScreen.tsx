// Example of Splash, Login and Sign Up in React Native
// https://aboutreact.com/react-native-login-and-signup/

// Import React and Component
import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  View,
  StyleSheet,
  Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient'
import AsyncStorage from '@react-native-async-storage/async-storage';


import { RootNavigation } from '@navigation/types';
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { setDataLogin, logout } from '@redux/apps/LoginSlice'
// import {  } from 'react-native-svg';
import { Text, Avatar, Badge, VStack, Center, Box, Flex, Heading } from 'native-base';
import LayoutBackground from '@components/LayoutBackground';




const SplashScreen = ({navigation}:any) => {
  //State for ActivityIndicator animation
  const Rootnavigation = useNavigation<RootNavigation>(); // root Navigations
  const datalogin = useAppSelector((state) => state.login)
    const dispatch = useAppDispatch()
  const [animating, setAnimating] = useState(true);

  const clearAllDataAsynStorage = async () => {
    try {
      await AsyncStorage.clear()
    } catch(e) {
    }
    console.log('Done Clear AsynStorage')
  }

  
  useEffect(() => {
    // clearAllDataAsynStorage()
    
    function GetStatusLogin(){
      const cekLogin:boolean=datalogin.dataLogin.isLogin
      const username:any=datalogin.dataLogin.username
      // Rootnavigation.replace(cekLogin === true ? 'BottomMenu' : 'Auth') // langsung ke home jika login sudah ada
      // Rootnavigation.replace(cekLogin === true ? 'BottomMenu' : 'StartUpScreen') // langsung ke home jika login sudah ada
      if(cekLogin === true && username.length > 2){
        Rootnavigation.replace('BottomMenu') // langsung ke home jika login sudah ada
      }else{
        Rootnavigation.replace('StartUpScreen') // masuk ke startup screen
      }
      console.log('Checking status login')
      console.log(datalogin)
    }
    setTimeout(() => {
      GetStatusLogin()
      setAnimating(false);
    }, 1000);
  }, []);

  return (
    <LayoutBackground>
       <Flex style={styles.headerBox} direction="column" justifyContent="center"  alignItems="center">         
          <Image
            source={require('../../assets/images/delivery2.png')}
            style={{width: '75%',resizeMode: 'contain',marginTop:'20%',marginLeft:'-2%'}}
            />
        <Box>
          <Heading>
              <Text mt="5" color="#cffffd" style={{fontSize:30}} >ATT Logistics Mobile</Text>
          </Heading>
        </Box>
        <Box style={styles.box_circle}>
        </Box>
        <Box style={styles.box_circle2}>
        </Box>
        <Box>  
          <ActivityIndicator
            animating={animating}
            color="#FFFFFF"
            size="large"
            style={styles.activityIndicator}
            />
      </Box>
      </Flex>
    </LayoutBackground>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#307ecc',
  },
  headerBox: {
    height: '100%',
    width:'100%',
  },
  activityIndicator: {
    alignItems: 'center',
    height: 150,
  },
  box_circle: {
    height:250,width:250,backgroundColor:'#b2d3ff38',position:'absolute',
    borderRadius:250,
    top:'68%',
    left:'65%'
  },
  box_circle2: {
    height:250,width:250,
    backgroundColor:'#65c1f738',
    position:'absolute',
    borderRadius:250,
    top:'-15%',
    left:'-6%',
    border:'none',
    shadowColor: "#a9ceff61",
    // shadowOffset: {
    //   width: 10,
    //   height: 10,
    // },
    // shadowOpacity: 0.51,
    // shadowRadius: 13.16,
    // elevation: 20,
  },
});