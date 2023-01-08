import React, {useEffect, useRef, useState} from 'react';
import {ScrollView, Image, Animated, StyleSheet, StatusBar, Dimensions, TouchableOpacity, TouchableWithoutFeedback, useWindowDimensions, RefreshControl} from 'react-native';
import { View, Box, Text, Center, Button, HStack, Stack, Heading, VStack, Flex, Input, Icon } from 'native-base';

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
import { useNavigation, useRoute } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import COLORS from '@config/colors';
import LayoutBackground from '@components/LayoutBackground';

var deviceHeight:any = Dimensions.get('window').height.toFixed();
var deviceWidth:any = Dimensions.get('window').width;

let AnimateHeaderValue=new Animated.Value(0)

const HEADR_MAX_HEIGHT=200;
const HEADR_MIN_HEIGHT=30;

const AnimateHeaderBackground=AnimateHeaderValue.interpolate({
  inputRange:[0,HEADR_MAX_HEIGHT - HEADR_MIN_HEIGHT],
  outputRange:['transparent','transparent'],
  extrapolate:'clamp'
})

const AnimatedHeaderHeight=AnimateHeaderValue.interpolate({
  inputRange:[0,30],
  outputRange:[200,150],
  extrapolate:'clamp'
})
const AnimateHeaderRadius=AnimateHeaderValue.interpolate({
  inputRange:[0,50],
  outputRange:[0,120],
  extrapolate:'clamp'
})
const AnimatedHeaderBg=AnimateHeaderValue.interpolate({
  inputRange:[0,100],
  outputRange:['#25294a','#3f51b596'],
  extrapolate:'clamp'
})


const AnimatedTopHeaderHeight=AnimateHeaderValue.interpolate({
  inputRange:[0,60],
  outputRange:[60, 60],
  extrapolate:'clamp'
})
const AnimatedTopHeaderBg=AnimateHeaderValue.interpolate({
  inputRange:[0,60],
  outputRange:['#00bcd46e','#ffff'],
  extrapolate:'clamp'
})
const AnimatedTopHeaderColors=AnimateHeaderValue.interpolate({
  inputRange:[30,70],
  outputRange:['#ffff','#000'],
  extrapolate:'clamp'
})




const MessageDetail = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { id }:any = route.params;
  
  useEffect(()=>{
    setTimeout(()=>{
    },30000)
  },[])


  return (
    <LayoutBackground>
      {/* {
        loading && <LoadingProgress/>
      } */}
          <Animated.View style={[styles.TopHeaderStyles,{
            height:AnimatedTopHeaderHeight,
            backgroundColor:AnimatedTopHeaderBg,
            borderBottomColor:'#7e7f87bf',
            borderBottomWidth:1
            }]}>
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
                  <Animated.View style={{backgroundColor:AnimatedTopHeaderBg,width:35,height:35,borderRadius:10,paddingLeft:8,paddingTop:5}}>
                    <Animated.Text style={{color:AnimatedTopHeaderColors}}><MaterialIcons name="mode-edit"  size={20} /></Animated.Text>
                  </Animated.View>
                  </TouchableOpacity>
                </Stack>
            </HStack>
          </Animated.View>
        <ScrollView
          showsVerticalScrollIndicator={false}
          alwaysBounceVertical={true}
          scrollEventThrottle={16}
          onScroll={Animated.event(
            [{nativeEvent:{contentOffset:{y:AnimateHeaderValue}}}],
            {useNativeDriver:false}
          )}
          >
        <View h="100%" >
                 <Animated.View  style={{
                    width:'100%',
                    // height:300,
                    // backgroundColor:AnimatedHeaderBg,
                    backgroundColor:'#26abbd8f',
                    height:AnimatedHeaderHeight,
                    borderBottomLeftRadius:AnimateHeaderRadius,
                    borderBottomRightRadius:AnimateHeaderRadius,
                    zIndex:99

                 }}>
                  <Box mt="15%" >
                    <VStack space={4} p={4} color="#ffff">
                    <HStack justifyContent="space-between">
                      <Heading>
                        <Text color="#fff">No : JOBS00001111</Text>
                        </Heading>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Box>
                          <Text color="#ffff" style={{fontSize:16,fontWeight:'bold'}}>Indonesian</Text>
                          </Box>
                        <Box>
                            <MaterialCommunityIcons name="airplane-takeoff" color='#ffff' size={25} />
                        </Box>
                        <Box>
                          <Text color="#ffff" style={{fontSize:16,fontWeight:'bold'}}>Singapoore</Text>
                        </Box>
                    </HStack>
                    <HStack justifyContent="space-between">
                        <Box>
                          <Text color="#ffff" style={{fontSize:16,fontWeight:'bold'}}>Budi</Text>
                          </Box>
                        <Box>
                            <MaterialCommunityIcons name="arrow-right-thin" color='#ffff' size={25} />
                        </Box>
                        <Box>
                          <Text color="#ffff" style={{fontSize:16,fontWeight:'bold'}}>Anto</Text>
                        </Box>
                    </HStack>
                    </VStack>
                  </Box>
                </Animated.View>
            <DummyText pid={id} />
        </View>
      </ScrollView>
    </LayoutBackground>
  );
};


  function DummyText(props:any):JSX.Element{

  const scrollRef = useRef<ScrollView>();
  const scrollViewRef = useRef(null);
  const [refreshing, setRefreshing] = React.useState(false);


  const animation=new Animated.Value(1)
  const animation2=new Animated.Value(1)

  const handlePress = () => {
  
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

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(()=>{
      setRefreshing(false)
    },2000)
  }, []);

  
  return (
      <VStack h="125%" mt="-8%" >
        <Flex zIndex={1}  p={2}  mb={8}   borderTopRadius={20}  w="100%" h="78%">
          <ScrollView
              showsVerticalScrollIndicator={false}
              nestedScrollEnabled={true}
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
            <Box bg="transparent" p={2} pl="4" borderRadius="6" mb={5} >
              {/* <Text>..</Text> */}
            </Box>

            <Box bg="#c6eefbde" p={2} pl="4" borderRadius="6" mb={2} >
              <VStack>
                <HStack mb={5} space={4}>
                  <Box w="85%">
                  <Input  h="40px" variant="rounded" w={{base: "100%",md: "100%"}} InputLeftElement={<Icon as={<MaterialIcons name="search" />} size={5} ml="2" color="muted.400" />} placeholder="Enter Email / Username"
                        />
                  </Box>
                  <Button  bg="#d4f5f9" borderColor="gray.200" borderWidth={1} p={2} pt={3} borderRadius={10}>
                  <MaterialIcons name="filter-list" color='#000' size={23} />
                  </Button>
                </HStack>
                <HStack pb={5} space={10} mb={5} borderBottomColor="gray.200" borderBottomWidth={1}>
                <Box>
                      <Text style={{color:'blue'}}>Approve</Text>
                  </Box>
                  <Box>
                      <Text style={{color:'red'}}>Reject</Text>
                  </Box>
                </HStack>

              <HStack justifyContent="space-between">
                  <Heading>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Item charge 1</Text>
                  </Heading>
                  <Text>
                    <MaterialIcons name="keyboard-control" color='#000' size={18} />
                  </Text>
                </HStack>
                <HStack pb="3"  justifyContent="flex-start" borderRadius={4} minH="30">
                  <Stack space={4} pt={2} w="50%">
                    <Text>mawb</Text>
                    <Text>{props.pid}</Text>
                  </Stack>
                  <Stack space={4} pt={2} w="50%">
                    <Text>date hghgh hghg</Text>
                    <Text>{props.pid}</Text>
                  </Stack>
                </HStack>
                <HStack pb="3"  justifyContent="flex-start"  borderRadius={4} minH="30">
                  <Stack space={4} pt={2} w="50%">
                    <Text>mawbss</Text>
                    <Text>12345</Text>
                  </Stack>
                  <Stack space={4} pt={2} w="50%">
                    <Text>datess</Text>
                    <Text>324554</Text>
                  </Stack>
                </HStack>
                <Center>
                  <Text style={{color:'#fff',backgroundColor:'#2196f3',padding:4,paddingLeft:10,paddingRight:10,borderRadius:10}}>complete</Text>
                </Center>
                
              </VStack>
            </Box>

            <Box bg="#c6eefbde" p={2} pl="4" borderRadius="6" mb={2} >
              <VStack>
                <HStack justifyContent="space-between">
                  <Heading>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Item charge 2</Text>
                  </Heading>
                  <Text>
                    <MaterialIcons name="keyboard-control" color='#000' size={18} />
                  </Text>
                </HStack>
                <HStack pb="3"  justifyContent="space-between"  borderRadius={4} minH="30">
                  <Stack space={4} pt={2} w="50%">
                    <Text>mawb</Text>
                    <Text>12345</Text>
                  </Stack>
                  <Stack space={4} pt={2} w="50%">
                    <Text>date</Text>
                    <Text>324554</Text>
                  </Stack>
                </HStack>
                <HStack pb="3"  justifyContent="space-between"  borderRadius={4} minH="30">
                  <Stack space={4} pt={2} w="50%">
                    <Text>mawb</Text>
                    <Text>12345</Text>
                  </Stack>
                  <Stack space={4} pt={2} w="50%">
                    <Text>date</Text>
                    <Text>324554</Text>
                  </Stack>
                </HStack>
               
                <Center>
                  <Text style={{color:'#fff',backgroundColor:'#ffc107',padding:4,paddingLeft:10,paddingRight:10,borderRadius:10}}>Pending</Text>
                </Center>
              </VStack>
            </Box>
            <Box bg="#c6eefbde" p={2} pl="4" borderRadius="6" mb={2} >
              <VStack>
              <HStack justifyContent="space-between">
                  <Heading>
                    <Text style={{fontSize:18,fontWeight:'bold'}}>Item charge 3</Text>
                  </Heading>
                  <Text>
                    <MaterialIcons name="keyboard-control" color='#000' size={18} />
                  </Text>
                </HStack>
                <HStack pb="3"  justifyContent="space-between"  borderRadius={4} minH="30">
                  <Stack space={4} pt={2} w="50%">
                    <Text>mawb</Text>
                    <Text>12345</Text>
                  </Stack>
                  <Stack space={4} pt={2} w="50%">
                    <Text>date</Text>
                    <Text>324554</Text>
                  </Stack>
                </HStack>
                <HStack pb="3"  justifyContent="space-between"  borderRadius={4} minH="30">
                  <Stack space={4} pt={2} w="50%">
                    <Text>mawb</Text>
                    <Text>12345</Text>
                  </Stack>
                  <Stack space={4} pt={2} w="50%">
                    <Text>date</Text>
                    <Text>324554</Text>
                  </Stack>
                </HStack>
              </VStack>
              <Center>
                  <Text style={{color:'#fff',backgroundColor:'#ffc107',padding:4,paddingLeft:10,paddingRight:10,borderRadius:10}}>Pending</Text>
                </Center>
            </Box>
            </ScrollView>
          </Flex>
        </VStack>
  );
};



const styles = StyleSheet.create({
container:{
  flex:1,
  // marginTop:-35
},
headerBox: {
  minHeight: 210,
  width:'100%',
  // borderBottomLeftRadius:20,
  // borderBottomRightRadius:20,
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
});

export default MessageDetail;