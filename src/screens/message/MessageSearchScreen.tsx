import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Image, Animated, StyleSheet, StatusBar, Dimensions, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions} from 'react-native';
import {View, Box, Text, Center, Button, HStack, Stack, Heading } from 'native-base';

import {
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import Header from '@components/Header';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
// import LoadinAnimation from '@components/LoadingAnimation';
import IndicatorLoading from '@components/indicatorLoading';
import ProgressingIndicator from '@components/Progressing'
import LayoutBackground from '@components/LayoutBackground';

var deviceHeight:any = Dimensions.get('window').height.toFixed();
var deviceWidth:any = Dimensions.get('window').width;

let AnimateHeaderValue=new Animated.Value(0)

const HEADR_MAX_HEIGHT=320;
const HEADR_MIN_HEIGHT=50;

const AnimateHeaderBackground=AnimateHeaderValue.interpolate({
  inputRange:[0,HEADR_MAX_HEIGHT - HEADR_MIN_HEIGHT],
  outputRange:['transparent','transparent'],
  extrapolate:'clamp'
})

const AnimatedImageHeight=AnimateHeaderValue.interpolate({
  inputRange:[0,HEADR_MAX_HEIGHT],
  outputRange:[HEADR_MAX_HEIGHT,HEADR_MIN_HEIGHT],
  extrapolate:'clamp'
})
const AnimatedImageWidth=AnimateHeaderValue.interpolate({
  inputRange:[0,deviceWidth],
  outputRange:[deviceWidth*1.2,deviceWidth/deviceWidth],
  extrapolate:'clamp'
})

const AnimatedTopHeaderHeight=AnimateHeaderValue.interpolate({
  inputRange:[0,60],
  outputRange:[60, 60],
  extrapolate:'clamp'
})
const AnimatedTopHeaderBg=AnimateHeaderValue.interpolate({
  inputRange:[0,60],
  outputRange:['#d5d5d559','#ffff'],
  extrapolate:'clamp'
})
const AnimatedTopHeaderColors=AnimateHeaderValue.interpolate({
  inputRange:[30,70],
  outputRange:['#ffff','#000'],
  extrapolate:'clamp'
})


const LoadingProgress=()=>{
  const { width } = useWindowDimensions();
  return(
    <LayoutBackground>
      <Myanimations2/>
    </LayoutBackground>
  )
}

const MessageDetail = () => {
  const navigation = useNavigation();
  const[loading,setLoading]=useState(true)
  const scrollRef = useRef<ScrollView>();
  const scrollViewRef = useRef(null);


  const ScrollToTOPPage=()=>{
    scrollRef.current?.scrollTo({
      y : 0,x:0,
      animated : true
  });
  }
  
  useEffect(()=>{
    setTimeout(()=>{
      setLoading(false)
    },9000)
  },[])


  return (
    <SafeAreaView style={styles.container}>
      {
        loading && <IndicatorLoading/>
      }
          {/* <StatusBar translucent backgroundColor="transparent" animated />      */}
          <Animated.View style={[styles.TopHeaderStyles,{height:AnimatedTopHeaderHeight,backgroundColor:AnimatedTopHeaderBg}]}>
            <HStack justifyContent="space-between">
                <Stack p={2} w="30%">
                    <TouchableOpacity style={{padding:6,borderRadius:100}} activeOpacity={0.2} onPress={() => {navigation.goBack()}}>
                      <Animated.View style={{backgroundColor:AnimatedTopHeaderBg,width:40,height:35,borderRadius:10,paddingLeft:6,paddingTop:4}}>
                      <Animated.Text style={{color:AnimatedTopHeaderColors}}>
                          <MaterialCommunityIcons name="arrow-left"  size={25} />
                      </Animated.Text>
                      </Animated.View>
                    </TouchableOpacity>
                </Stack>
                <Box w="53%" p={2} pt={5}><Animated.Text style={{color:AnimatedTopHeaderColors}}>Detail Shipment</Animated.Text></Box>
                <Stack w="20%" p={2}>
                  <TouchableOpacity activeOpacity={0.2} >
                    <Button bg="#545b83"  h="42" w="42" variant="subtle" size="sm"  rounded='full'><MaterialIcons name="mode-edit" color='#ffff' size={20} /></Button>
                  </TouchableOpacity>
                </Stack>
            </HStack>
          </Animated.View>
      <ScrollView
      // ref={scrollRef}
      scrollEventThrottle={16}
      onScroll={Animated.event(
        [{nativeEvent:{contentOffset:{y:AnimateHeaderValue}}}],
        {useNativeDriver:false}
      )}
      >
        <View h="100%" >
              <Animated.View style={[styles.styleHeader,{
                          height:AnimatedImageHeight,
                          backgroundColor:AnimateHeaderBackground
                        }]}>
                <Animated.Image
                source={require('../../../assets/images/banner.jpg')}
                style={{width:AnimatedImageWidth,height:AnimatedImageHeight}}
                />
            </Animated.View>
            <DummyText />
        </View>
      </ScrollView>
      <Button >naik keatas,</Button>
    </SafeAreaView>
  );
};

const DummyText = () => {
  const scrollRef = useRef<ScrollView>();
  const scrollViewRef = useRef(null);

  const animation=new Animated.Value(1)
  const animation2=new Animated.Value(1)

  const handlePress = () => {
  //   scrollRef.current?.scrollTo({
  //     y : 0,x:0,
  //     animated : true
  // });
  
    Animated.spring(animation, {
      toValue: 2,
      friction: 2,
      // tension: 10,
      tension: 160,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation, {
        toValue: 1,
        duration: 5,
        useNativeDriver: true,
      }).start();
    });
  };
  
  const handlePress2 = () => {
    
    Animated.spring(animation2, {
      toValue: 100,
      friction: 15,
      tension: 140,
      useNativeDriver: true,
    }).start(() => {
      Animated.timing(animation2, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    });
  };

  const animatedStyle = {
    transform: [{ scale: animation }],
  };
  const animatedStyle2 = {
    transform: [{ scale: animation2 }],
  };

  return (
    <Box>
      <Box>
    <Text style={{color:'#000',fontSize:16,margin:10,padding:5}}>
    MessageSearch

      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
      semper turpis. Ut in fringilla nisl, sit amet aliquet urna. Donec
      sollicitudin libero sapien, ut accumsan justo venenatis et. Proin iaculis
      ac dolor eget malesuada. Cras commodo, diam id semper sodales, tortor leo
      suscipit leo, vitae dignissim velit turpis et diam. Proin tincidunt
      euismod elit, at porttitor justo maximus vel. Proin viverra, nibh non
      accumsan sollicitudin, arcu metus sagittis nunc, et tempor tellus ligula
      et justo. Pellentesque ultrices fermentum efficitur. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Praesent nec convallis nisl, et rhoncus
      mauris. Morbi consequat sem tellus, in scelerisque lorem vehicula ut.
      {'\n\n'}Nam vel imperdiet massa. Donec aliquet turpis quis orci fermentum,
      eget egestas tellus suscipit. Sed commodo lectus ac augue mattis, a
      pulvinar metus venenatis. Vestibulum cursus rhoncus mauris, fringilla
      luctus risus eleifend ut. Vestibulum efficitur imperdiet scelerisque.
      Pellentesque sit amet lorem bibendum, congue dolor suscipit, bibendum est.
      Aenean leo nibh, varius vel felis nec, sagittis posuere nunc. Vestibulum
      ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
      curae; Duis ullamcorper laoreet orci, ac tempus dui aliquet et. Morbi
      porta nisi sed augue vestibulum tristique. Donec nisi ligula, efficitur at
      arcu et, sagittis imperdiet urna. Sed sollicitudin nisi eget pulvinar
      ultricies. Ut sit amet dolor luctus massa dapibus tincidunt non posuere
      odio. Aliquam sit amet vehicula nisi.
    </Text>
    </Box>
    <Box>
      
    <Text style={{color:'#000',fontSize:16,margin:10,padding:5}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
      semper turpis. Ut in fringilla nisl, sit amet aliquet urna. Donec
      sollicitudin libero sapien, ut accumsan justo venenatis et. Proin iaculis
      ac dolor eget malesuada. Cras commodo, diam id semper sodales, tortor leo
      suscipit leo, vitae dignissim velit turpis et diam. Proin tincidunt
      euismod elit, at porttitor justo maximus vel. Proin viverra, nibh non
      accumsan sollicitudin, arcu metus sagittis nunc, et tempor tellus ligula
      et justo. Pellentesque ultrices fermentum efficitur. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Praesent nec convallis nisl, et rhoncus
      mauris. Morbi consequat sem tellus, in scelerisque lorem vehicula ut.
      {'\n\n'}Nam vel imperdiet massa. Donec aliquet turpis quis orci fermentum,
      eget egestas tellus suscipit. Sed commodo lectus ac augue mattis, a
      pulvinar metus venenatis. Vestibulum cursus rhoncus mauris, fringilla
      luctus risus eleifend ut. Vestibulum efficitur imperdiet scelerisque.
      Pellentesque sit amet lorem bibendum, congue dolor suscipit, bibendum est.
      Aenean leo nibh, varius vel felis nec, sagittis posuere nunc. Vestibulum
      ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
      curae; Duis ullamcorper laoreet orci, ac tempus dui aliquet et. Morbi
      porta nisi sed augue vestibulum tristique. Donec nisi ligula, efficitur at
      arcu et, sagittis imperdiet urna. Sed sollicitudin nisi eget pulvinar
      ultricies. Ut sit amet dolor luctus massa dapibus tincidunt non posuere
      odio. Aliquam sit amet vehicula nisi.
    </Text>
    <View style={[styles.container,{marginBottom:50,alignItems:'center'}]}>
        <TouchableWithoutFeedback onPress={handlePress}>
          <Animated.View style={[styles.box, animatedStyle]} />
        </TouchableWithoutFeedback>
      </View>
    <View style={[styles.container,{marginBottom:50,alignItems:'center'}]}>
        <TouchableWithoutFeedback onPress={handlePress2}>
          <Animated.View style={[styles.box2, animatedStyle2]} />
        </TouchableWithoutFeedback>
      </View>
      <View style={[styles.container,{marginBottom:50,alignItems:'center'}]}>
      </View>
    </Box>
    </Box>
  );
};



function Myanimations(){
  const animation=new Animated.Value(0)

  const startAnimation = () => {
    Animated.loop(Animated.timing(animation, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true
    })).start();
  }

  const rotateInterpolate = animation.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "360deg"]
  });
  const animatedStyles = {
    transform: [
      { rotate: rotateInterpolate }
    ]
  }
    return (
      <View style={styles.container}>
        <TouchableWithoutFeedback onPress={startAnimation}>
          <Animated.View style={[styles.box, animatedStyles]} />
        </TouchableWithoutFeedback>
      </View>
    );
  }

  
  function Myanimations2(){
    const animation=new Animated.Value(0)
    // const translation=useRef(new Animated.Value(0)).current
  
    const startAnimation = () => {
      Animated.loop(Animated.timing(animation, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true
      })).start();
    }
  
    
    const rotateInterpolate = animation.interpolate({
      inputRange: [0, 1],
      outputRange: ["0deg", "360deg"]
    });
    const animatedStyles = {
      transform: [
        { rotate: rotateInterpolate }
      ]
    }
    useEffect(()=>{
      startAnimation()
    },[])
  
  
      return (
        <View style={{position: 'absolute', top: 0, left:0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center',padding:9,margin: 'auto'}}>
          <HStack>
          <Box>
            <Animated.View style={[styles.MyAnimation, animatedStyles]} />
          </Box>
          <Box>
            <Animated.View style={[styles.MyAnimation2, animatedStyles]} />
          </Box>
          <Box>
            <Animated.View style={[styles.MyAnimation3, animatedStyles]} />
          </Box>
          <Box>
            <Animated.View style={[styles.MyAnimation4, animatedStyles]} />
          </Box>
          </HStack>
        </View>
    
      );
    }



const styles = StyleSheet.create({
container:{
  flex:1,
  // marginTop:-35
},
styleHeader:{
  justifyContent:'center',
  left:0,
  right:0,
  alignItems:'center'
},
HeadetTxt:{
  color:'#ffff',
  fontSize:18,
  textAlign:'center'
},
bannerContainer: {
  // marginTop: -100,
  // paddingTop: 100,
  alignItems: 'center',
  overflow: 'hidden',
},

TopHeaderStyles:{
  position:'absolute',
  zIndex:999
},
box: {
  width: 50,
  height: 50,
  backgroundColor: "tomato",
},
box2: {
  width: 50,
  height: 50,
  backgroundColor: "#0cafeb",
},
MyAnimation: {
  width: 100,
  height: 100,
  position: 'relative',
  alignSelf: 'center',
  backgroundColor: "#fa1e34",
  zIndex: 1,
  // left: '35%',
  borderRadius:35
},
MyAnimation2: {
  width: 80,
  height: 80,
  // position: 'absolute',
  alignSelf: 'center',
  backgroundColor: "#0f94fa",
  zIndex: 1,
  // left: '35%',
  borderRadius:30
},
MyAnimation3: {
  width: 60,
  height: 60,
  // position: 'absolute',
  alignSelf: 'center',
  backgroundColor: "#0cf223",
  zIndex: 1,
  // left: '20%',
  borderRadius:15
},
MyAnimation4: {
  width: 35,
  height: 35,
  // position: 'absolute',
  alignSelf: 'center',
  backgroundColor: "#fac002",
  zIndex: 1,
  // left: '20%',
  borderRadius:5
},
});

export default MessageDetail;