import React, { useState } from 'react';
import { StyleSheet, View, Image, SafeAreaView, StatusBar } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import LoginScreen from '@screens/auth/LoginScreen';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {Box, Text, VStack} from 'native-base'


const slides = [
  {
    key: 1,
    title: 'What\'s Courier applications ? ',
    text: `Get something cools with our courier.\n Lorem ipsum dolor sit amet. \n Lorem ipsum dolor sit amet`,
    image: require('@assets/images/course.png'),
    bgColor: '#4d80f7',
  },
  {
    key: 2,
    title: 'Easy on Warehouse !',
    text: ` Dont be scaried with your goods warehouse.\n Lorem ipsum dolor sit amet. \n Lorem ipsum dolor sit amet`,
    image: require('@assets/images/course2.png'),
    bgColor: '#ffa65e',
  },
  {
    key: 3,
    title: 'All You want is Ready !',
    text: ` Dont be scaried with your goods warehouse.\n Lorem ipsum dolor sit amet. \n Lorem ipsum dolor sit amet`,
    image: require('@assets/images/delivery.png'),
    bgColor: '#30d1ca',
  },
];

export default function StartupSCreen() {
  const [showRealApp, setShowRealApp] = useState(false);
  const [colorstatus, setColorstatus] = useState(slides[0].bgColor);

  const _renderItem = ({ item }) => {

    return (
      <View style={[styles.slide,{backgroundColor:item.bgColor}]}>
          <StatusBar
          animated={true}
          backgroundColor={colorstatus}
        />
        <VStack space={1} justifyContent="center" flex={1}>
          <Text style={[styles.title]}>{item.title}</Text>
          <Box>
            <Image source={item.image} style={{maxHeight:'99%',maxWidth:'99%'}} />
          </Box>
          <Text style={styles.text}>{item.text}</Text>
        </VStack>
      </View>
    );
  };

  const _renderNextButton  = () => {
    return (
      <View style={styles.buttonCircle}>
        <MaterialCommunityIcons name="arrow-right" color={'#fff'} size={35} />
      </View>
    );
  };
  
  const _renderDoneButton  = () => {
    return (
      <>
        <StatusBar
          animated={true}
          backgroundColor={slides[2].bgColor}
        />
      <View style={styles.buttonCircle}>
        <MaterialCommunityIcons name="check" color={'#fff'} size={45} />
      </View>
      </>
    );
  };

  const _onSlideChange = (index: number, lastIndex: number) => {
    const getSlideItems=slides[index];
    setColorstatus(getSlideItems.bgColor)
  };
  const _onDone = () => {
    setShowRealApp(true);
  };

  if (showRealApp) {
    return <LoginScreen />;
  } else {
    return (
      <>
       <SafeAreaView style={styles.container}>
        <AppIntroSlider renderItem={_renderItem} data={slides} onDone={_onDone} showSkipButton={true}
          renderDoneButton={()=>_renderDoneButton()}
          renderNextButton={_renderNextButton}
          onSlideChange={_onSlideChange}
        />
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ECF0F1',
  },
  title: {
    fontSize: 24,
    lineHeight:45,
    color: '#fff',
    textAlign: 'center',
    marginBottom:45
  },
  slide: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 40,
    marginTop: 25,
  },
  buttonCircle: {
    width: 60,
    height: 60,
    backgroundColor: 'rgba(0, 0, 0, .2)',
    borderRadius: 55,
    justifyContent: 'center',
    alignItems: 'center',
    bottom:25,
  },
});