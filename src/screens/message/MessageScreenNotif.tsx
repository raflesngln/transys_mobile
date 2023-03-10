import { View, HStack, Box, Heading, Text, Avatar, Center, Button, VStack, ScrollView,Stack, AspectRatio, Image, Spacer } from 'native-base';
import React, { useEffect, useState } from "react";
import { Dimensions,SafeAreaView, ImageBackground, Pressable, StyleSheet ,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import notifee, { EventType } from '@notifee/react-native';

import CrudDataWithClass from '@services/sample_api/crudDataWIthClass'
import { color } from 'native-base/lib/typescript/theme/styled-system';
import COLORS from '@config/colors';
import { useNavigation } from '@react-navigation/native';
import LayoutBackground from '@components/LayoutBackground';

var deviceHeight:any = Dimensions.get('window').height;
var deviceWidth:any = Dimensions.get('window').width;

// const image = { uri: "https://www.baltana.com/files/wallpapers-5/Blue-Background-Wallpaper-HD-16273.jpg" };
const image = { uri: "https://i.pinimg.com/564x/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg" };

const App = () =>{
  const [itemData, setItemData] = useState<undefined | any>([])
  const [itemDataUsers, setItemDataUsers] = useState<undefined | any>()
  const [products, setProducts] = useState<undefined | any>()
  const [users, setUsers] = useState<undefined | any>()
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

async function onDisplayNotification() {
  // Request permissions (required for iOS)
  await notifee.requestPermission()

  // Create a channel (required for Android)
  const channelId = await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
  });

  // Display a notification
  await notifee.displayNotification({
    title: 'Notification Title',
    body: 'Main body content of the Local Notification',
    android: {
      channelId,
      // smallIcon: 'name-of-a-small-icon', // optional, defaults to 'ic_launcher'.
      // pressAction is needed if you want the notification to open the app when pressed
      pressAction: {
        id: 'default',
      },
    },
  });
}

  useEffect(() => {
    async function dataUsers(){
      const datausers=await getUsers()
      setItemData(datausers)
    }
    dataUsers()
    getPhotos()

    setTimeout(() => {
      onDisplayNotification()
    }, 5000);

    //Notifications on Listener
    return notifee.onForegroundEvent(({ type, detail }) => {
      switch (type) {
        case EventType.DISMISSED:
          console.log('User dismissed notification', detail.notification);
          break;
        case EventType.PRESS:
          console.log('User pressed notification', detail.notification);
          break;
      }
    });
    
  }, []);
  
  const getDetailShipment=()=> {
    console.log('Function not implemented.');
  }
  const getallDataClass=async ()=> {
    let datas=await CrudDataWithClass.getAllData({page:1,limit:10,search:'lorem ipsum'})
    setUsers(datas)
    console.log(JSON.stringify(datas));
  }

  return(
  <View style={styles.container}>
    <LayoutBackground>
        
      <View style={[styles.maincontainer]}>

        <SafeAreaView style={{backgroundColor:'#00bcd44a',zIndex:999,marginTop:"0%",borderTopLeftRadius:20,borderTopRightRadius:20}}>
        <ScrollView showsVerticalScrollIndicator={false} >
        <HStack justifyContent="flex-start" bg="#9cf4ff36" h="66" p={2} pt={3}  zIndex={1}>
          <Stack p={2} w="20%">
              <TouchableOpacity style={{padding:6,borderRadius:100}} activeOpacity={0.2} onPress={() => {navigation.goBack()}}>
                <Text style={{color:'#fff'}}>
                    <MaterialCommunityIcons name="arrow-left"  size={25} />
                </Text>
              </TouchableOpacity>
          </Stack>
          <Box pt={2}>
            <Text style={styles.textBig}>Design & Color Pallete</Text>
          </Box>
          
        </HStack>
          
     

          <VStack mt={4} p={1} justifyContent="space-between">
            <Text color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>TRANSPARANS</Text>
            <VStack space={1} minH={200} p={1}>
                <Box h={45} bg={COLORS.transparant100} borderRadius={8} p={2}><Text>transparant100</Text></Box>
                <Box h={45} bg={COLORS.transparant200} borderRadius={8} p={2}><Text>transparant200</Text></Box>
                <Box h={45} bg={COLORS.transparant300} borderRadius={8} p={2}><Text>transparant300</Text></Box>
                <Box h={45} bg={COLORS.transparant400} borderRadius={8} p={2}><Text>transparant400</Text></Box>
                <Box h={45} bg={COLORS.transparant500} borderRadius={8} p={2}><Text>transparant500</Text></Box>
                
                <Text mt={4} color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>CONTENT BG</Text>
                <Box h={45} bg={COLORS.contentBg100} borderRadius={8} p={2}><Text>contentBg100</Text></Box>
                <Box h={45} bg={COLORS.contentBg200} borderRadius={8} p={2}><Text>contentBg200</Text></Box>
                <Box h={45} bg={COLORS.contentBg300} borderRadius={8} p={2}><Text>contentBg300</Text></Box>
                <Box h={45} bg={COLORS.contentBg400} borderRadius={8} p={2}><Text>contentBg400</Text></Box>
                <Box h={45} bg={COLORS.contentBg500} borderRadius={8} p={2}><Text>contentBg500</Text></Box>
                <Box h={45} bg={COLORS.contentBg600} borderRadius={8} p={2}><Text>contentBg600</Text></Box>

                <Text mt={4} color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>COLORS</Text>
                <HStack space={3} flexWrap="wrap">
                 <VStack>
                 <Button mb="3" borderRadius={6} bg={COLORS.success100}>success100</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.success200}>success200</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.success300}>success300</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.success400}>success400</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.success500}>success500</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.success600}>success600</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.success700}>success700</Button>
                 </VStack>
                  <VStack>
                  <Button mb="3" borderRadius={6} bg={COLORS.mint100}><Text color={COLORS.mint500}>mint100</Text></Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.mint200}><Text color={COLORS.mint500}>mint200</Text></Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.mint300}><Text color={COLORS.teal600}>mint300</Text></Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.mint400}><Text color={COLORS.teal600}>mint400</Text></Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.mint500}><Text color={COLORS.teal600}>mint500</Text></Button>
                  </VStack>

                  <VStack>
                  <Button mb="3" borderRadius={6} bg={COLORS.teal100}>teal100</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.teal200}>teal200</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.teal300}>teal300</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.teal400}>teal400</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.teal500}>teal500</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.teal600}>teal600</Button>
                  </VStack>
                  <VStack>
                    
                  <Button mb="3" borderRadius={6} bg={COLORS.warning100}>warning100</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.warning200}>warning200</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.warning300}>warning300</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.warning400}>warning400</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.warning500}>warning500</Button>
                  </VStack>
                  <VStack>
                  <Button mb="3" borderRadius={6} bg={COLORS.danger100}>danger100</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.danger200}>danger200</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.danger300}>danger300</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.danger400}>danger400</Button>
                  <Button mb="3" borderRadius={6} bg={COLORS.danger500}>danger500</Button>
                  <Button mb="3" disabled borderRadius={6} bg={COLORS.ButtonDisable}>ButtonDisable</Button>
                  </VStack>
                </HStack>

                <Text mt={4} color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>NOTIFICATIONS</Text>
                <HStack>
                  <Button mb="3" borderRadius={6} bg={COLORS.teal600} onPress={() => onDisplayNotification()}>
                  <Text color='#fff'><MaterialIcons name="notifications" size={20} />Show Local Notifications</Text>
                    </Button>
                </HStack>

                <Text mt={4} color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>LINE COLOR</Text>
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
                      <Stack justifyContent="center" alignItems="center"  bg={COLORS.contentBg100} h={45} w={45} borderRadius={9}><Text color="gray.600"><MaterialIcons name="av-timer" size={30} /></Text></Stack>
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

          <Text mt={4} color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>CRUD DATA CLASSS</Text>
                <HStack p={4} bg={COLORS.contentBg600}>
                  <Button mb="3" borderRadius={6} bg={COLORS.teal600} onPress={() => getallDataClass()}>
                    <Text color='#fff'>get all users With Class</Text>
                    </Button>
                </HStack>

            <Box bg={COLORS.contentBg600}>
              <Text>
                {JSON.stringify(users)}
              </Text>
            </Box>
          </VStack>

          <Spacer mt={30} />

       
        
      </ScrollView>
      </SafeAreaView>
      </View>
    </LayoutBackground>
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