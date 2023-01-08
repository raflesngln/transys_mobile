import { useRoute } from '@react-navigation/native';
import React,{useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  Pressable,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Animated,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { AspectRatio, Image, Box, Container, Heading, Center, NativeBaseProvider, VStack, ZStack, HStack, Flex, Spacer, Stack, ScrollView, Divider, FlatList, SectionList, Avatar, Badge, Button, Input, Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';


import { useAppSelector, useAppDispatch } from '@redux/hooks'

import Header from '@components/Header'
import Mycolor from '@config/colors'
// import HomeScreenNavigation that check fro routes in homescreen
import { HomeScreenNavigation } from '@navigation/types';

const scrollOffset = new Animated.Value(0);

const wait = (t:any, v:any) => {
  // return new Promise(resolve => setTimeout(resolve, timeout));
  return new Promise(resolve => setTimeout(resolve, t, v));
}

const DetailProduct = ({ route, navigation }:any) => {
  // const route = useRoute();
  const[detail,setDetail]=useState<undefined|any>({})
  const{id, name} = route.params;


  const SearchData=()=>{
    console.log('DATASSS')
  }

  
  useEffect(() => {
    async function getdata(){
      let response=await fetch(`https://reqres.in/api/users/${id}`)
      const respon=await response.json();
      setDetail(respon.data)
    }
    getdata()
    // fetch(`https://reqres.in/api/users/${id}`)
    //   .then((response) => response.json())
    //   .then((json) => setDetail(json.data));

  }, []);


  return (
    <View style={{ flex: 1 }}>
      <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
            <Header
                  midmenu={
                    <Box w="80%">
                      <Input placeholder="Search" variant="filled" width="100%" borderRadius="10" py="1" px="2" InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<MaterialIcons name="search" color="#ffff" size={25} />} />} />
                    </Box>
                  }
                  rightmenu={
                    <TouchableOpacity activeOpacity={0.2} onPress={()=>SearchData()}>
                      <MaterialCommunityIcons name="filter-variant" color="#ffff" size={25} />
                    </TouchableOpacity>
                  }
                />

              <VStack space={4} mt="-7%" w='100%' >                
                <LinearGradient
                  colors={[Mycolor.darkMint,Mycolor.backBlue,Mycolor.darkMint ]}
                  // colors={['#39c37a','#4d90a8','#39c37a' ]}
                  style={styles.headerBox}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Center borderRadius="4">
                    <AspectRatio w="96%" ml="2%" ratio={16 / 9}>
                          <Image source={{
                          uri: detail.avatar
                        }} alt="image" borderRadius={10}/>
                    </AspectRatio>
                  </Center>
              </LinearGradient>

                <Box w="96%" ml="2%" h="auto" mt="-15%" p="2" bg="#ffffff" roundedTopRight="8" roundedTopLeft="8" roundedBottomRight="8" roundedBottomLeft="8" shadow={9}
                   borderWidth="1" borderColor="coolGray.300">
                    <HStack space={3} >
                    <Flex direction="column" mt="1">
                      <Box mt="1" mb="2">
                        <Text style={styles.cardTitleDetail}>{detail.first_name}</Text>
                        <Text  style={styles.cardTitleDetail}>{detail.last_name}</Text>
                        <Text style={styles.titlePrice}>{detail.email}</Text>
                      </Box>
                    </Flex>
                      {/* </Flex> */}
                    </HStack>
                </Box>

                <VStack w="96%" ml="2%" h="auto" mt="-1" minHeight="150" rounded="8" bg="#ffffff" shadow={5}>
                  <Box>
                    <Flex mt="3" mb="-5" p="3" flex={1}  flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                      <Text >Rekomendasi :</Text>
                      <Text style={{color:'#3f51b5',textDecorationLine:'underline'}}>View more</Text>
                    </Flex>
                  </Box>
                  <Box minH={300}>
                  <Animated.ScrollView style={{height:200, 
                            transform:[{ translateY:scrollOffset.interpolate({
                              inputRange:[0,200],outputRange:[0,200]})}]
                            }}>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                        <Text style={{color:'#44464a'}}>Something Random</Text>
                    </Animated.ScrollView>
                  </Box>
                </VStack>
              </VStack>
            </SafeAreaView>
          </NativeBaseProvider>
    </View>
  );
};
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      scrollView: {
        flex: 1,
        backgroundColor: '#dad9db',
        alignItems: 'center',
        justifyContent: 'center'
      },
      sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
      sectionTitle: {
        fontSize: 24,
        fontWeight: '600',
        color:'black'
      },
      sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400'
      },
      headerTittle: {
        color:'#1d64f2'
      },
      headerBox: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 280,
        width:'100%'
      },
      titleText:{
        fontSize:16,
        marginBottom:8,
        fontWeight:'bold',
        color:'#424242'
      },
      contentLists:{
        fontSize:14,
        marginBottom:8,
        color:'#424242'
      },
      cardTitleDetail: {
        color:'#094deb',
        fontWeight: '500',
        fontSize:18,
        marginBottom:5
      },
      cardTitle: {
        color:'#094deb',
        fontWeight: '500',
        fontSize:14,
        marginBottom:3
      },
      titlePrice:{
        fontSize:18,
        marginBottom:5,
        fontWeight:'bold',
        color:'#eb8509'
      },
    });
export default DetailProduct;