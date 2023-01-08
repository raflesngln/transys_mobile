import { useRoute, useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  SafeAreaView,
  Dimensions,
  View,
  StatusBar,
  StyleSheet,
  TouchableHighlight,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { AspectRatio, Card, Text, Pressable, Image, Box, Container, Heading, Center, NativeBaseProvider, VStack, ZStack, HStack, Flex, Spacer, Stack, ScrollView, Divider, FlatList, SectionList, Avatar, Badge, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';

import { TextCustom } from '@components/TextCustom';
import CardHorizontal from '@components/cardHorizontal'
import COLORS from '@config/colors'
import { useAppSelector, useAppDispatch } from '@redux/hooks'

// import HomeScreenNavigation that check fro routes in homescreen
import { HomeScreenNavigation, AuthNavigation, RootNavigation } from '@navigation/types';

var deviceHeight:any = Dimensions.get('window').height.toFixed();
var deviceWidth:any = Dimensions.get('window').width;

const DetailScreen = (props: any) => {
  return (
    <View style={{ flex: 1 }}>
      <Content />
    </View>
  );
};


function Content() {
  var Today = moment().format('ddd, MMMM Do YYYY')
  const navigationHome = useNavigation<HomeScreenNavigation>(); // check which routes is navigates

  const datalogin = useAppSelector((state: any) => state.login)

  return (
    <NativeBaseProvider>
      <Contents />
    </NativeBaseProvider>
  );
};


function Contents() {
  var Today = moment().format('ddd, MMMM Do YYYY')
  const redux_profile = useAppSelector((state: any) => state.login)
  const navigation = useNavigation<HomeScreenNavigation>(); // check which routes is navigates

  const [jam, setJam] = React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const datalogin = useAppSelector((state: any) => state.login)
  const dispatch = useAppDispatch()

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, []);

  return (
    <NativeBaseProvider>
      <SafeAreaView style={styles.container} >
        <ScrollView
        showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
            />
          }
        >
          <Flex direction="row" mb="2" mt="-3">
            <VStack space={4} w='100%'>
              <LinearGradient
                // colors={['#030e28','#2d3a85','#030e28' ]}
                // colors={['#0960d9', '#438cf0', '#0960d9']}
                colors={[COLORS.gradient1,COLORS.gradient2,COLORS.gradient3 ]}
                style={styles.headerBox}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                
              >
                <VStack pt="5" p="3">
                  <HStack justifyContent="space-between"  zIndex={999}>
                    <HStack space={2}>
                      
                      <Box>
                            <Button bg="#545b83"  h="42" w="42" variant="subtle" size="sm" rounded='full'><MaterialIcons name="notifications-none" color='#ffff' size={20} /></Button>
                      </Box>
                      <Box>
                            <Button bg="#545b83"  h="42" w="42" variant="subtle" size="sm" rounded='full'><MaterialIcons name="mail-outline" color='#ffff' size={20} /></Button>
                      </Box>
                    </HStack>
                    <TouchableOpacity>
                      <Box>
                        <Avatar  bg="green.500" alignSelf="center" size="60px" source={{
                          uri: "https://hris.att-group.co.id/assets/images/karyawan/F01A-150885933/tmp/F01A-150885933-26102021134633.jpeg"
                        }}>
                          RN
                        </Avatar>
                      </Box>
                    </TouchableOpacity>
                  </HStack>
                  <VStack>
                    <Text style={{ fontSize: 14, color: '#ebebeb' }}> Good Morning !</Text>
                    <Text mt="2" style={{ fontSize: 22, color: '#ffffff', fontWeight: 'bold', borderRadius: 6, padding: 3 }}>{redux_profile.dataLogin.name}</Text>
                  </VStack>
                </VStack>
                <Box style={styles.box_circle} ></Box>
                <Box style={styles.box_circle2} ></Box>
              </LinearGradient>

              <Box w="100%" h="auto" mt="-36%" pt={3}>
              <LinearGradient
                // colors={['#438cf075','#438cf075','#438cf075']}
                // colors={['#438cf075','#438cf075','#438cf075']}
                colors={['#474c6e','#474c6e','#474c6e']}
                style={{height:150,padding:9,paddingTop:18,borderTopRightRadius:23,borderTopLeftRadius:23,}}
                start={{x: 1, y: 1}}  end={{x:1, y:1}}
              >
                <HStack pb={3} space={2} justifyContent="space-between">
                  <Pressable
                    onPress={() =>
                      navigation.navigate('CategoryCourse', {
                        title: 'My Works'
                      })
                    }
                  >
                    <Center h="70px" w="70"   >
                      <Center h="60" w="60" bg={COLORS.IconBg} borderColor={COLORS.IconBorder} borderWidth={1} borderRadius="200"><MaterialCommunityIcons name="folder-home-outline" color='#ffff' size={30} /></Center>
                      <Text style={{ color: '#f0f9fc', fontWeight: 'normal' }}>My Works</Text>
                    </Center>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('CategoryCourse', {
                        title: 'Pending'
                      })
                    }
                  >
                    {/* colors={["#357187","#3e8eab","#3e8eab","#357187" ]} */}
                    <Center h="70px">
                      <Center h="60" w="60" bg={COLORS.IconBg} borderColor={COLORS.IconBorder} borderWidth={1} borderRadius="200"><MaterialCommunityIcons name="adjust" color='#ffff' size={30} /></Center>
                      <Text style={{ color: '#f0f9fc', fontWeight: 'normal' }}>Pending</Text>
                    </Center>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('CategoryCourse', {
                        title: 'Pending Status'
                      })
                    }
                  >
                    <Center h="70px" >
                      <Center h="60" w="60" bg={COLORS.IconBg} borderColor={COLORS.IconBorder} borderWidth={1} borderRadius="200"><MaterialCommunityIcons name="chart-donut" color='#ffff' size={30} /></Center>
                      <Text style={{ color: '#f0f9fc', fontWeight: 'normal' }}>Progress</Text>
                    </Center>
                  </Pressable>
                  <Pressable
                    onPress={() =>
                      navigation.navigate('CategoryCourse', {
                        title: 'Complete Status'
                      })
                    }
                  >
                    <Center h="70px" >
                      <Center h="60" w="60" bg={COLORS.IconBg} borderColor={COLORS.IconBorder} borderWidth={1} borderRadius="200"><MaterialCommunityIcons name="check-circle-outline" color='#ffff' size={30} /></Center>
                      <Text style={{ color: '#f0f9fc', fontWeight: 'normal' }}>Complete</Text>
                    </Center>
                  </Pressable>
                </HStack>
                </LinearGradient>
              </Box>
            <Box mt="-13%" bg="#ffff" roundedTopRight="20" roundedTopLeft="20" >
              <Box p={2} mb={2}>
                <Box w="100%" pl={3} pr={3}>
                  <HStack flexDirection="row" justifyContent="space-between">
                    <Box pb={1}> <Text style={[styles.sectionTitle]} >Courier</Text></Box>
                    <Box pt="4"><Text style={{ color: '#3f51b5', textDecorationLine: 'underline' }}>View more</Text></Box>
                  </HStack>
                </Box>
                <ItemCardList />
              </Box>
              <Box p={2} mt="-5" pb="155">
                <Box w="100%" pl={3} pr={3}>
                  <HStack flexDirection="row" justifyContent="space-between">
                    <Box> <Text style={styles.sectionTitle} >Users</Text></Box>
                    <Box pt="4"><Text style={{ color: '#3f51b5', textDecorationLine: 'underline' }}>View more</Text></Box>
                  </HStack>
                </Box>
                <ProducttemCardList />
                <HStack pl={3} pr="2" justifyContent="space-between">
                  <Text>Product</Text>
                  <Text style={{ color: '#3f51b5', textDecorationLine: 'underline' }}>View more</Text>
                </HStack>
                <ProducttemCardList />
              </Box>
            </Box>
            </VStack>
          </Flex>
        </ScrollView>
      </SafeAreaView>
    </NativeBaseProvider>
  );
};


const ItemCardList = () => {
  const navigation = useNavigation<any>();
  const [ischeck, setIscheck] = useState(false)
  const [itemData, setitemData] = useState<undefined | any>([])

  useEffect(() => {
    fetch('https://reqres.in/api/users?page=1')
      .then((response) => response.json())
      .then((json) => setitemData(json.data));
  }, []);

  return (
    <View style={{ flexDirection: 'row', flex: 1 }}>
      <FlatList
        data={itemData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: any) =>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('HomeStack' as never,
            { screen: 'DetailUser', params: { id: item.id, name: item.first_name } })}>
            <CardHorizontal items={item} ischeck={ischeck} avatar={`${item.avatar}`} borderImage={50}>
              <Box>
                <Text>{item.email}</Text>
                <Text>{item.first_name}</Text>
                <Text>{item.last_name}</Text>
              </Box>
            </CardHorizontal>
          </TouchableOpacity>
        }
        keyExtractor={(item: any, index: any) => item.id}
      />
    </View>
  )
}
const ProducttemCardList = () => {
  const navigation = useNavigation<any>();
  const [ischeck, setIscheck] = useState(false)
  const [itemData, setitemData] = useState<undefined | any>([])

  useEffect(() => {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((json) => setitemData(json.products));
  }, []);

  return (
    <View style={{ flexDirection: 'row', flex: 0.5 }}>
      <FlatList
        data={itemData}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }: any) =>
          <TouchableOpacity activeOpacity={0.8} onPress={() => navigation.navigate('HomeStack' as never,
            { screen: 'DetailProduct', params: { id: item.id, title: item.title } })}>
            <Box alignItems="center" w="40" m={2}>
              <Box maxW="80" rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                borderColor: "coolGray.600",
                backgroundColor: "gray.700"
              }} _web={{
                shadow: 2,
                borderWidth: 0
              }} _light={{
                backgroundColor: "gray.50"
              }}>
                <Box>
                  <AspectRatio w="100%" ratio={16 / 9}>
                    <Image source={{
                      uri: item.thumbnail
                    }} alt="image" />
                  </AspectRatio>
                  <Center bg="violet.500" _dark={{
                    bg: "violet.400"
                  }} _text={{
                    color: "warmGray.50",
                    fontWeight: "700",
                    fontSize: "xs"
                  }} position="absolute" bottom="0" px="3" py="1.5">
                    {item.brand}
                  </Center>
                </Box>
                <Stack p="4" space={3}>
                  <Stack space={2}>
                    <Heading size="sm" ml="-1">
                      {item.title}
                    </Heading>
                    <Text fontSize="xs" _light={{
                      color: "violet.500"
                    }} _dark={{
                      color: "violet.400"
                    }} fontWeight="500" ml="-0.5" mt="-1">
                      {item.price}
                    </Text>
                  </Stack>
                </Stack>
              </Box>
            </Box>
          </TouchableOpacity>
        }
        keyExtractor={(item: any, index: any) => item.id}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: '#454545'
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
    fontSize: 16,
    fontWeight: '700',
    color:COLORS.colorlowContrast
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  headerTittle: {
    fontSize: 25,
    color: '#ffff',
    fontWeight: 'bold'
  },
  cardTitle: {
    color: '#094deb',
    fontWeight: '500',
    fontSize: 14,
    marginBottom: 3
  },
  headerBox: {
    minHeight: 280,
    height: 280,
    width: '100%',
  },
  box_circle: {
    height:150,width:150,
    // backgroundColor:'#438cf0bf',
    backgroundColor:'#545b83',
    position:'absolute',
    borderTopRightRadius:180,
    borderTopLeftRadius:180,
    borderBottomLeftRadius:180,
    borderBottomRightRadius:180,
    top:'-15%',
    left:'75%',
    zIndex:99,
    transform: [
      { skewX: "2deg" },
      { skewY: "10deg" }
    ],
    shadowColor: "#404673",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 1,
    shadowRadius: 10.32,

    elevation: 16,
  },
  box_circle2: {
    height:150,width:150,
    // backgroundColor:'#438cf075',
    backgroundColor:'#292c4a',
    position:'absolute',
    borderTopRightRadius:180,
    borderTopLeftRadius:180,
    borderBottomLeftRadius:180,
    borderBottomRightRadius:180,
    top:'-18%',
    left:'70%',
    zIndex:80,
    transform: [
      { skewX: "10deg" },
      { skewY: "10deg" }
    ],
    
  },
});

export default DetailScreen;