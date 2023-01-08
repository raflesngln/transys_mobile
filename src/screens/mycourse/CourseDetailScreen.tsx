import { useRoute } from '@react-navigation/native';
import React,{useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  StatusBar,
  StyleSheet,
  Animated,
  useWindowDimensions ,
  TouchableOpacity,
  useColorScheme,
  RefreshControl
} from 'react-native';
import { AspectRatio, Pressable, Image, Box, Container, Heading, Center, NativeBaseProvider, VStack, ZStack, HStack, Flex, Spacer, Stack, ScrollView, Divider, FlatList, SectionList, Avatar, Badge, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';

import { TabView,TabBar, SceneMap } from 'react-native-tab-view';
import { useAppSelector, useAppDispatch } from '@redux/hooks'

// import HomeScreenNavigation that check fro routes in homescreen
import { HomeScreenNavigation } from '@navigation/types';


const DetailScreen = (props:any) => {
  const route = useRoute();
  // const { title } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Content/>
    </View>
  );
};

const wait = (t:any, v:any) => {
  // return new Promise(resolve => setTimeout(resolve, timeout));
  return new Promise(resolve => setTimeout(resolve, t, v));
}

  function Content(){
    let screenHeight = Dimensions.get('window').height;
  const navigation = useNavigation<HomeScreenNavigation>(); // check which routes is navigates

  const[jam,setJam]=React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const datalogin = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch()

  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(()=>{
        setRefreshing(false)
      },2000)
    }, []);
  
        return (
          <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
            {/* <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              > */}
            <Flex direction="row" mb="2" mt="-3">
              <VStack space={2}  w='100%'>
                <LinearGradient
                  // colors={['#030e28','#2d3a85','#030e28' ]}
                  colors={['#1e5569','#05876e','#1e5569']}
                  style={styles.headerBox}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >

                  <Box>
                    <Box p="2" pt="8%" display="flex" flexDirection="row" justifyContent="space-between">
                        <Box>
                        <Text style={{color:'#ffff',fontWeight:'600',fontSize:22}}><MaterialCommunityIcons name="chat-processing-outline" color='#bfe0ce' size={28} /> Message's</Text>
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
              </LinearGradient>
                <Box mt="-15%"  >
                  <TabMenu/>
                </Box>
              </VStack>
            </Flex>
        </SafeAreaView>
      </NativeBaseProvider>
        );
    };

  const ItemCard=()=>{
    
    return(
      <Box mt="5" mb="25" >
        {
          data.map((val,i)=>{
            return(
              <Box key={i} mb="2">
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
                        <Text style={styles.sectionTitle}>{val.fullName}</Text>
                        <Text>{val.recentText}</Text>
                        <Text>{val.avatarUrl}</Text>
                      </VStack>
                    </HStack>
                    
                  </HStack>
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

const FirstRoute = () => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Box minH="100%" p="2" pb="30%" style={{ flex: 1, backgroundColor: '#e3e3e8'}}>
        <ItemCard/>
      </Box>
  </ScrollView>
);
const SecondRoute = () => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Box minH="100" p="2" pb="30%" style={{ flex: 1, backgroundColor: '#e3e3e8'}} >
      <ItemCard/>
    </Box>
  </ScrollView>
);
const ThirdRoute = () => (
  <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
    <Box minH="100" p="2" style={{ flex: 1, backgroundColor: '#cbced1'}} >
      <Text style={{color:'#0a0af5'}}>Group Messgae</Text>
    </Box>
  </ScrollView>
);
 
// type AppProps = {}

const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});

function TabMenu() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Private' },
    { key: 'third', title: 'Group' },
  ]);

  return (
    <View style={{height: layout.height,}}>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <TabBar {...props} 
                    indicatorStyle={{ backgroundColor: '#09ebb1',height:3 }}
                    style={{backgroundColor: '#1e4957'}}
                    renderLabel={({ route, focused, colora }:any) => (
                          <Text style={{ color:colora, margin: 5 }}>
                              {route.title}
                          </Text>
                      )}
                    />
                  }
      />
      </View>
  );
}


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
  fullName: "Kiara",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-142456e2968",
  fullName: "Kiara",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-142456e5672",
  fullName: "Kiara",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-142456e86772",
  fullName: "Kiara",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-6789456e29d72",
  fullName: "Kiara",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-146756e29d72",
  fullName: "Kiara",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-142459629d72",
  fullName: "Kiara",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-142455429d72",
  fullName: "Kiara",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-1424345629d72",
  fullName: "Kiara",
  timeStamp: "12:47 PM",
  recentText: "I will call today.",
  avatarUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBwgu1A5zgPSvfE83nurkuzNEoXs9DMNr8Ww&usqp=CAU"
},
{
  id: "28694a0f-3da1-471f-bd96-14242349d72",
  fullName: "Kiara",
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
        // marginTop: StatusBar.currentHeight,
      },
      scene: {
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
        minHeight: 150,
        width:'100%',
      },
    });

export default DetailScreen;