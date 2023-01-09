import { View, HStack, Box, Heading, Text, Avatar, Center, Button, VStack, ScrollView,Stack, AspectRatio, Image, Spacer } from 'native-base';
import React, { useEffect, useState } from "react";
import { Dimensions,SafeAreaView, ImageBackground, Pressable, StyleSheet ,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { color } from 'native-base/lib/typescript/theme/styled-system';
import COLORS from '@config/colors';
import { useNavigation } from '@react-navigation/native';

var deviceHeight:any = Dimensions.get('window').height;
var deviceWidth:any = Dimensions.get('window').width;

// const image = { uri: "https://www.baltana.com/files/wallpapers-5/Blue-Background-Wallpaper-HD-16273.jpg" };
const image = { uri: "https://i.pinimg.com/564x/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg" };

const App = () =>{
  const [itemData, setItemData] = useState<undefined | any>([])
  const [itemDataUsers, setItemDataUsers] = useState<undefined | any>()
  const [products, setProducts] = useState<undefined | any>()
  const navigation = useNavigation();


  const getUsers=async ()=>{
   const res=await fetch('https://reqres.in/api/users?page=1')
   const respon=await res.json()
   return respon.data
  }

  const getPhotos=async ()=>{
    Promise.all([
      fetch('https://reqres.in/api/users?page=1').then(value => value.json()),
      fetch('https://dummyjson.com/products').then(value => value.json())
      ])
      .then(([val1, val2]) => {
        //  console.log(val2)
        setItemDataUsers(val1.data)
        setProducts(val2.products)
      })
      .catch((err) => {
          console.log(err);
      });
}

  useEffect(() => {
    async function dataUsers(){
      const datausers=await getUsers()
      setItemData(datausers)
    }
    dataUsers()
    getPhotos()
  }, []);
  
  const getDetailShipment=()=> {
    console.log('Function not implemented.');
  }

  return(
  <View style={styles.container}>
    <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        
      <View style={[styles.maincontainer]}>

        <SafeAreaView style={{backgroundColor:'#00bcd44a',zIndex:999,marginTop:"0%",borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <ScrollView showsVerticalScrollIndicator={false} >
        <HStack justifyContent="flex-start" bg="#9cf4ff36" h="130" p={2} pt={3}  zIndex={1}>
          <Stack p={2} w="30%">
              <TouchableOpacity style={{padding:6,borderRadius:100}} activeOpacity={0.2} onPress={() => {navigation.goBack()}}>
                <Text style={{color:'#fff'}}>
                    <MaterialCommunityIcons name="arrow-left"  size={25} />
                </Text>
              </TouchableOpacity>
          </Stack>
          <Box>
            <Text style={styles.textBig}>Application Design</Text>
          </Box>
          
        </HStack>
          
     

          <VStack mt={4} p={1} justifyContent="space-between">
            <Text color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>COLORS</Text>
            <VStack space={1} minH={200} p={1}>
                <Box h={45} bg={COLORS.transparant100} borderRadius={8} p={2}><Text>Transparant100</Text></Box>
                <Box h={45} bg={COLORS.transparant200} borderRadius={8} p={2}><Text>Transparant100</Text></Box>
                <Box h={45} bg={COLORS.transparant300} borderRadius={8} p={2}><Text>Transparant100</Text></Box>
                <Box h={45} bg={COLORS.transparant400} borderRadius={8} p={2}><Text>Transparant100</Text></Box>
                <Box h={45} bg={COLORS.contentBg100} borderRadius={8} p={2}><Text>contentBg100</Text></Box>
                <Text color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>CONTENT BG</Text>
                <Box h={45} bg={COLORS.contentBg200} borderRadius={8} p={2}><Text>contentBg200</Text></Box>
                <Box h={45} bg={COLORS.contentBg300} borderRadius={8} p={2}><Text>contentBg300</Text></Box>
                <Box h={45} bg={COLORS.contentBg400} borderRadius={8} p={2}><Text>contentBg400</Text></Box>
                <Box h={45} bg={COLORS.contentBg500} borderRadius={8} p={2}><Text>contentBg500</Text></Box>
                <Box h={45} bg={COLORS.contentBg600} borderRadius={8} p={2}><Text>contentBg600</Text></Box>
                <Text color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>LINE COLOR</Text>
                <Box h={45} bg={COLORS.contentBg500} borderRadius={8} p={2}><Text style={{borderBottomColor:COLORS.LineColor100,borderBottomWidth:1}}>LineColor100</Text></Box>
                <Box h={45} bg={COLORS.contentBg500} borderRadius={8} p={2}><Text style={{borderBottomColor:COLORS.LineColor200,borderBottomWidth:1}}>LineColor200</Text></Box>
                <Box h={45} bg={COLORS.contentBg500} borderRadius={8} p={2}><Text style={{borderBottomColor:COLORS.LineColor300,borderBottomWidth:1}}>LineColor200</Text></Box>
              </VStack>
          </VStack>
           

          <VStack space={1}>
            <HStack justifyContent="space-between">
              <Box><Text pl="3" pb="2" pt="4" color="gray.200" fontWeight="700" fontSize={16}>Shipment History</Text></Box>
              <Box><Text pt={4} pr={2} color="gray.200" >See More <MaterialIcons name="keyboard-arrow-right" color='#ffff' size={15} style={{marginTop:15}}/></Text></Box>
            </HStack>
            {
              itemData && itemData.map((val:any,i:number)=>{
                return <Pressable key={i} onPress={()=>getDetailShipment()} 
                  style={({ pressed }) => [
                  {
                    backgroundColor: pressed
                      ? '#c6eefbde'
                      : COLORS.contentBg100,
                      width:'100%',
                      opacity:pressed?0.6:1
                  }
                ]}>
                  <HStack   pl="3" pb={3} pt={3} justifyContent="space-between" borderBottomColor="gray.200" borderBottomWidth={0}>
                    <Stack w="10%" borderRadius={6}  justifyContent="center" alignItems="center">
                      <Stack justifyContent="center" alignItems="center"  bg="#c6eefbde" h={45} w={45} borderRadius={9}><Text color='#3d3d3d'><MaterialIcons name="av-timer" size={30} /></Text></Stack>
                    </Stack>
                    <Box w="83%" pl={3}>
                      <Text fontWeight="500" color="#3d3d3d">JOBS123456789</Text>
                      <Text color="gray.600">In warehouse</Text>
                    </Box>
                    <Box w="7%"><Text color='#000'><MaterialIcons name="keyboard-arrow-right" size={20} /></Text></Box>
                  </HStack>
                </Pressable >
              })
            }
          </VStack>

          <Spacer mt={30} />

       
        <Box>
          {/* <Text> DATA2{JSON.stringify(itemData)}</Text> */}
        </Box>
      </ScrollView>
      </SafeAreaView>
      </View>
    </ImageBackground>
  </View>
  );
}


const Courier:{}[]=[
  {
    id:1,
    name:'David',
    jobs:'Senior Staff',
    avatar:'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id:1,
    name:'Thomas',
    jobs:'Junior Staff',
    avatar:'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    id:1,
    name:'Leany',
    jobs:'Senior Staff',
    avatar:'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    id:1,
    name:'Thomford',
    jobs:'Senior Staff',
    avatar:'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
  },
  {
    id:1,
    name:'Danield',
    jobs:'Junior Staff',
    avatar:'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
]
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  maincontainer: {
    display:'flex',
    flex: 1,
    flexDirection:'column',
    columnGap:5
    // backgroundColor:'#ffff',
    // opacity:0.8
  },
  image: {
    flex: 1,
    justifyContent: "flex-start"
  },
  iconColor:{
    color:'#eaf1f7',
  },
  defaultBg:{
    backgroundColor:'#9dd8eba8',
  },
  textDefault:{
    // color:'#11629f',
    color:'#eaf1f7',
    fontWeight:'600'
  },
  textBig: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  text: {
    color: "white",
    fontSize: 14,
    lineHeight: 84,
    fontWeight: "bold",
    textAlign: "center",
    backgroundColor: "#000000c0"
  },
  wrapperCustom: {
    borderRadius: 8,
    // padding: 6
  },
});

export default App;