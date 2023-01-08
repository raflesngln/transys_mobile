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

import { RootNavigation } from '@navigation/types';
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { setDataLogin, logout } from '@redux/apps/LoginSlice'
// import {  } from 'react-native-svg';
import { Text, Avatar, Badge, VStack, Center, Box, Flex, Heading } from 'native-base';
import LayoutBackground from '@components/LayoutBackground';




const SplashScreen = ({navigation}:any) => {
  //State for ActivityIndicator animation
  const Rootnavigation = useNavigation<RootNavigation>(); // croot Navigations
  const datalogin = useAppSelector((state) => state.login)
    const dispatch = useAppDispatch()
  const [animating, setAnimating] = useState(true);

  
  useEffect(() => {
    function GetStatusLogin(){
      const cekLogin:boolean=datalogin.dataLogin.isLogin
      Rootnavigation.replace(cekLogin === true ? 'BottomMenu' : 'Auth')
      console.log('Checking status login')
      // console.log(datalogin)
    }
    setTimeout(() => {
      GetStatusLogin()
      setAnimating(false);
    }, 1000);
  }, []);

  return (
    <LayoutBackground >
      {/* <LinearGradient
          // colors={['#0cc9b0','#fac15f','#0cc9b0' ]}
          // colors={['#07aba5','#95f0ee','#07aba5' ]}
          colors={['#0666eb','#0666eba3','#0666eb' ]}
          style={styles.headerBox}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        > */}

       <Flex style={styles.headerBox} pt="11" direction="column" justifyContent="center"  alignItems="center">         
          <Image
            source={require('../../assets/images/delivery2.png')}
            style={{width: '75%',resizeMode: 'contain',marginTop:'35%',marginLeft:'-2%'}}
            />
        <Box>
          <Heading>
              <Text mt="5" color="#cffffd" style={{fontSize:30,paddingTop:15}} >Online Delivery System</Text>
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
      {/* </LinearGradient> */}
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