/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { Box, Button,Text, Alert,Center, Slide, useColorModeValue, VStack } from 'native-base';
import React, {useEffect, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
} from 'react-native';

import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import HomePage from '@screens/home/HomePage';
import RootNavigator from '@navigation/index';
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PersistGate } from 'redux-persist/integration/react';

import {persistor, store } from './src/redux/store'
import {requestUserPermission,GetTokenFIrebase,NotificationListener} from '@config/Pushnnotification_helper'
import {useState} from 'react';
import COLORS from '@config/colors';


const App = () => {

  const[notifications,setNotifications]=useState<boolean>(false)

  useEffect(()=>{
    requestUserPermission()
    GetTokenFIrebase()
    // NotificationListener()
    function getNotifInformationClick(){
      const pesan:any= NotificationListener()[0].title;
      if(pesan.length > 2){
        setNotifications(true)
      }
      setTimeout(()=>{
        setNotifications(false)
      },2000)
    }
    getNotifInformationClick()

  },[])


  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    // backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    backgroundColor: isDarkMode ? '#0e809b' : Colors.lighter,
  };

  return (
    <>
    <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
    <Provider store={store}>
      {/* <QueryClientProvider client={my_queryClient}> */}
        <PersistGate loading={null} persistor={persistor}>
          {/* <NativeBaseProvider theme={mytheme}> */}
            <RootNavigator />
            {/* <Text>{JSON.stringify(mytheme)}</Text> */}
          {/* </NativeBaseProvider> */}
        </PersistGate>
        {/* </QueryClientProvider> */}
        {/* <Notifikasi status={notifications} title="informasi pesan"/> */}
    </Provider>
    </>
  );
};



const Notifikasi = (props:any) => {
  const [isOpenTop, setIsOpenTop] = React.useState(false);
  const str = `${isOpenTop ? "Hide" : "Check Internet Connection"}`;


  useEffect(()=>{
    if(props.status==true){
      setIsOpenTop(true)
      setTimeout(()=>{
        setIsOpenTop(false)
      },2000)
    }

  },[])



  return <Center h="20">
      <Slide in={isOpenTop} placement="top">
        <Alert justifyContent="center" status="error" safeAreaTop={8}>
          <Alert.Icon />
          <Text color="error.600" fontWeight="medium">
            {props.title}
          </Text>
        </Alert>
      </Slide>
      <Button onPress={() => setIsOpenTop(!isOpenTop)} variant="unstyled" bg={COLORS.contentBg100} _text={{
      color: useColorModeValue("darkText", "lightText")
    }}>
        {str}
      </Button>
    </Center>;
};

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;