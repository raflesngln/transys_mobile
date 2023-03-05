/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import { Box, Button,Text, Alert,Center, Slide, useColorModeValue, VStack, HStack } from 'native-base';
import React, {useEffect, type PropsWithChildren} from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
  View,
  PixelRatio,
  TouchableOpacity
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

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import messaging from '@react-native-firebase/messaging';


function App(){
  const[notifications,setNotifications]=useState<boolean>(false)
  const[isnotif,setIsnotif]=useState<boolean>(false)
  const[pesan,setPesan]=useState<any>()


  const getNotificationListener=()=>{
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification froms background state:',
        remoteMessage.notification,
      );
      setPesan(remoteMessage)
      setIsnotif(true)
    });
  
    messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification froms quit state:',
          remoteMessage.notification,
        );
      setIsnotif(true)
      }
    });
  
    messaging().onMessage(async remoteMessage=>{
      console.log('Notification froms foreground',remoteMessage)
      setPesan(remoteMessage.data)
      setIsnotif(true)
    })
    
}


  //firebase notifications
  useEffect(()=>{
    requestUserPermission()
    GetTokenFIrebase()
    // NotificationListener()
    getNotificationListener()

  },[])

const setNotificationsClose=(e:any)=>{
  setIsnotif(false)
}


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
      {
         (isnotif && pesan) && <Notifikasi status={notifications} changeClose={(e:any)=>setNotificationsClose(e)} pesan={pesan}/>
      }

    <Provider store={store}>
      {/* <Text style={{color:'#fff'}}>{isnotif?'true':'false'}</Text> */}
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

  const setClose=()=>{
    console.log('closeee')
    props.changeClose(false)
  }
  return <HStack p={3} h={85 / PixelRatio.getFontScale()} bg="#ff9800" justifyContent="space-between">
      <View>
        <Text pt={1} style={{color:'#fff',fontSize:17,fontWeight:'bold'}}>
        <View><MaterialIcons name="notifications" color='#ffff' size={23} /></View>
        &nbsp;New Notification</Text>
        <Text color='#fff'>{props.pesan?.message}</Text>
      </View>
       <TouchableOpacity onPress={()=>setClose()}>
          <Text color='#fff' style={{color:'#fff',backgroundColor:'#000',paddingLeft:10,paddingRight:10,paddingTop:3,paddingBottom:5,borderRadius:10,marginTop:5}}>
          <View><MaterialIcons name="close" color='#ffff' size={15} /></View>
            Close
         </Text>
       </TouchableOpacity>
    </HStack>;
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