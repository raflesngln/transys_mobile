import { useRoute } from '@react-navigation/native';
import React,{FC, useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StatusBar,
  StyleSheet,
  useColorScheme,
  RefreshControl
} from 'react-native';
import { AspectRatio, Pressable, Image, Box, Container, Heading, Center, NativeBaseProvider, VStack, ZStack, HStack, Flex, Spacer, Stack, ScrollView, Divider, FlatList, SectionList, Avatar, Badge, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';
import Animated, {
  LightSpeedInLeft, 
  LightSpeedOutRight,
  Layout
} from 'react-native-reanimated';

import {TextCustom} from '@components/TextCustom';
import { useAppSelector, useAppDispatch } from '@redux/hooks'

// import HomeScreenNavigation that check fro routes in homescreen
import { HomeScreenNavigation } from '@navigation/types';

const wait = (t:any, v:any) => {
  // return new Promise(resolve => setTimeout(resolve, timeout));
  return new Promise(resolve => setTimeout(resolve, t, v));
}

interface KategoriProps {
  numCategory: number,
  title: any
}

const MyCourseScreen = (props:any) => {
  const route = useRoute();
  // const { title } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Content/>
    </View>
  );
};


  function Content(){
  var Today=moment().format('ddd, MMMM Do YYYY')
  const navigation = useNavigation<HomeScreenNavigation>(); // check which routes is navigates
  const[jam,setJam]=React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tab, setTab] = React.useState(0);

  const datalogin = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch()


  const changeCategory=(num:any)=>{
    setTab(num)
    console.warn("OKOKO "+num)
  }
  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(()=>{
        setRefreshing(false)
      },2000)
    }, []);
  
        return (
          <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
            <Flex direction="row" mb="2" mt="-15%">
              <VStack space={2}  w='100%'>
                <LinearGradient
                  // colors={['#030e28','#2d3a85','#030e28' ]}
                  colors={['#1e5569','#05876e','#1e5569']}
                  style={styles.headerBox}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
              <Box mt="19%">
                <VStack>
                  <Box mb="2">
                    <Box p="2" display="flex" flexDirection="row" justifyContent="space-between">
                        <Box>
                        <Text style={{color:'#ffff',fontWeight:'600',fontSize:22}}><MaterialCommunityIcons name="book-open-page-variant-outline" color='#bfe0ce' size={28} /> MY Course</Text>
                      </Box>
                      <HStack>
                        <Box pl="1"><MaterialCommunityIcons name="file-search-outline" color='#ffff' size={25} /></Box>
                        <Box pl="1"><MaterialCommunityIcons name="bell-outline" color='#ffff' size={25} /></Box>
                        <Box pl="2" mt="-10%">
                        <Avatar bg="green.500" alignSelf="center" size="45px" source={{
                              uri: "https://hris.att-group.co.id/assets/images/karyawan/F01A-150885933/tmp/F01A-150885933-26102021134633.jpeg"
                            }}>
                            AJ
                        </Avatar>
                        </Box>
                      </HStack>
                    </Box>
                  </Box>
                  <Box>
                    <ButtonTabsMenu numCategory={0} title={(e:any)=>changeCategory(e)}/>
                  </Box>
                </VStack>
              </Box>
              </LinearGradient>
              </VStack>
            </Flex>
              <Box p="2" mt="-14%" bg="coolGray.200" roundedTopRight="22" roundedTopLeft="22" roundedBottomRight="8" roundedBottomLeft="8" shadow={5}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                    <ItemCard numCategory={0} title={'nainggolan'}/>
                </ScrollView>
              </Box>
        </SafeAreaView>
      </NativeBaseProvider>
        );
    };

    // const ItemCard=()=>{
const ItemCard: FC<KategoriProps> = (props): JSX.Element => {
    return(
      <Box mt="4" minH="100%" pb="47%" style={{ flex: 1, }}>
        {
          data.map((val,i)=>{
            return(
              <Box key={i} mb="5">
                <Pressable maxW="100%">
                {({
                isHovered,
                isFocused,
                isPressed
              }) => {
                return <Box bg={isPressed ? "coolGray.200" : isHovered ? "coolGray.200" : "coolGray.100"} style={{
                  transform: [{
                    scale: isPressed ? 0.96 : 1
                  }]
                }} p="2" pt="3" pb="3" rounded="8" shadow={8} borderWidth="1" borderColor="coolGray.300">
                  <HStack  justifyContent="space-between" >
                    <HStack justifyContent="flex-start">
                      <Box><Avatar size="48px" source={{
                          uri: val.avatarUrl
                        }} />
                      </Box>
                      <VStack pl="2" maxWidth="72%">
                        <Text style={styles.sectionTitle}>{val.fullName} {props.numCategory}</Text>
                        <Text>{val.recentText}</Text>
                        <Text>{val.avatarUrl}</Text>
                      </VStack>
                    </HStack>
                    <Box>
                      <Text><MaterialCommunityIcons name="account-edit" color='#7a7b7d' size={25} /></Text>
                    </Box>
                  </HStack>

                      {/* <HStack alignItems="center">
                      <Avatar size="48px" source={{
                          uri: val.avatarUrl
                        }} />
                        <Spacer />
                        <Text fontSize={10} color="coolGray.800">
                          1 month ago
                        </Text>
                      </HStack> */}
                      {/* <Text color="coolGray.800" mt="3" fontWeight="medium" fontSize="xl">
                        {val.fullName}
                      </Text>
                      <Text mt="2" fontSize="sm" color="coolGray.700">
                        {val.recentText}
                      </Text>
                      <Flex>
                        {isFocused ? <Text mt="2" fontSize={12} fontWeight="medium" textDecorationLine="underline" color="darkBlue.600" alignSelf="flex-start">
                            Read More
                          </Text> : <Text mt="2" fontSize={12} fontWeight="medium" color="darkBlue.600">
                            Read More
                          </Text>}
                      </Flex> */}
                    </Box>;
              }}
              </Pressable>
              </Box>
            )
          })
        }
      </Box>
    )
}

const ButtonTabsMenu: FC<KategoriProps> = (props): JSX.Element => {
  const[aktif,setAktif]=useState(0)

  const changeTab=(e:any)=>{
    // props.numCategory=e
    // (props:any).title=()=>e
    setAktif(e)
  }

  return <HStack p="2" direction={{
    base: "row",
    md: "row"
  }} space={4}>
      <Button onPress={()=>changeTab(0)} leftIcon={<MaterialCommunityIcons name="cards-variant" color={aktif==0?'#0cb33e':'#f2f2f2'} size={17}/>} variant="outline" rounded="30" bg={aktif==0?'#ffff':'transparent'}  h="40px" >
        <Text style={{color:aktif==0?'#0fa855':'#f2f2f2',fontWeight:'bold'}}>All </Text>
      </Button>
      <Button onPress={()=>changeTab(1)} leftIcon={<MaterialCommunityIcons name="atom-variant" color={aktif==1?'#0cb33e':'#f2f2f2'} size={17}/>} variant="outline" rounded="30" bg={aktif==1?'#ffff':'transparent'} h="40px" >
        <Text style={{color:aktif==1?'#0fa855':'#f2f2f2',fontWeight:'600'}}>Progress </Text>
      </Button>
      <Button onPress={()=>changeTab(2)} leftIcon={<MaterialCommunityIcons name="alarm" color={aktif==2?'#0cb33e':'#f2f2f2'} size={17}/>} variant="outline" rounded="30" bg={aktif==2?'#ffff':'transparent'} h="40px" >
        <Text style={{color:aktif==2?'#0fa855':'#f2f2f2',fontWeight:'600'}}>Pending </Text>
      </Button>
    </HStack>;
};

const data = [{
  id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
  fullName: "MAWAR MERAH",
  timeStamp: "12:47 PM",
  recentText: "Good Day!",
  avatarUrl: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
}, {
  id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
  fullName: "Sujitha Mathur",
  timeStamp: "11:11 PM",
  recentText: "Cheer up, there!",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTyEaZqT3fHeNrPGcnjLLX1v_W4mvBlgpwxnA&usqp=CAU"
}, {
  id: "58694a0f-3da1-471f-bd96-145571e29d72",
  fullName: "Anci Barroco",
  timeStamp: "6:22 PM",
  recentText: "Good Day!",
  avatarUrl: "https://miro.medium.com/max/1400/0*0fClPmIScV5pTLoE.jpg"
}, {
  id: "68694a0f-3da1-431f-bd56-142371e29d72",
  fullName: "Aniket Kumar",
  timeStamp: "8:56 PM",
  recentText: "All the best",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSr01zI37DYuR8bMV5exWQBSw28C1v_71CAh8d7GP1mplcmTgQA6Q66Oo--QedAN1B4E1k&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-142456e29d72",
  fullName: "Kiara1",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-142456e2968",
  fullName: "Kiara2",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-142456e5672",
  fullName: "Kiara3",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-142456e86772",
  fullName: "Kiara4",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-6789456e29d72",
  fullName: "Kiara5",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-14242349d72",
  fullName: "Kiara10",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bcfvghj-142456e29d72",
  fullName: "DAVIT Schrume",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
];
    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      scrollView: {
        flex: 1,
        backgroundColor: '#dad9db',
        alignItems: 'center',
        justifyContent: 'center',
      },
      sectionContainer: {
        marginTop: 32,
        paddingHorizontal: 24,
      },
      sectionTitle: {
        fontSize: 15,
        fontWeight: '600',
        color:'black'
      },
      sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
      },
      headerTittle: {
        fontSize:25,
        color:'#ffff',
        fontWeight:'bold'
      },
      headerBox: {
        minHeight: 250,
        width:'100%',
      },
    });

export default MyCourseScreen;