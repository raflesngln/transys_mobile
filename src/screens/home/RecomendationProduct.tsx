import { useRoute } from '@react-navigation/native';
import React,{useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  SafeAreaView,
  Dimensions,
  View,
  Pressable,
  StatusBar,
  StyleSheet,
  useColorScheme,
  RefreshControl
} from 'react-native';
import { AspectRatio,Text ,Image,Box,Container, Heading, Center, NativeBaseProvider,VStack ,ZStack,HStack ,Flex, Spacer,Stack,ScrollView,Divider,FlatList,SectionList,Avatar,Badge } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';

import {TextCustom} from '@components/TextCustom';
import { useAppSelector, useAppDispatch } from '@redux/hooks'

// import HomeScreenNavigation that check fro routes in homescreen
import { HomeScreenNavigation } from '@navigation/types';


const DetailProduct = (props:any) => {
  const route = useRoute();
  const { title }:any = route.params;

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
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                  />
                }
              >
            <Flex direction="row" mb="2.5" mt="-6">
              <VStack space={4}  w='100%'>
                <LinearGradient
                  colors={['#f0eded','#f0eded','#f0eded' ]}
                  // colors={['#39c37a','#4d90a8','#39c37a' ]}
                  style={styles.headerBox}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <Center borderRadius="4">
                    <AspectRatio w="100%" ratio={16 / 9}>
                          <Image source={{
                          uri: "https://img.freepik.com/premium-vector/distance-learning-online-education-work-happy-woman-girl-working-office-remotely-using-laptop_503750-461.jpg"
                        }} alt="image"/>
                        </AspectRatio>
                  </Center>
              </LinearGradient>

                <Box w="96%" ml="2%" h="auto" mt="-15%" p="2" bg="#ffffff" roundedTopRight="8" roundedTopLeft="8" roundedBottomRight="8" roundedBottomLeft="8" shadow={9}
                   borderWidth="1" borderColor="coolGray.300">
                  <Center>
                    <HStack space={3} >
                    <Flex direction="column" mt="1">
                      <Box mt="1" mb="2">
                        <Text style={styles.cardTitleDetail}>The Complete 2023 Web Development Bootcamp</Text>
                        <Text style={styles.titlePrice}>Rp 12.000.000</Text>
                        <Text>Become a Full-Stack Web Developer with just ONE course. HTML, CSS, Javascript, Node, React, MongoDB, Web3 and DApps</Text>
                      </Box>
                    </Flex>
                      {/* </Flex> */}
                    </HStack>
                  </Center>
                </Box>
                <Box w="96%" ml="2%" h="auto" p="2" bg="#ffffff" roundedTopRight="8" roundedTopLeft="8" roundedBottomRight="8" roundedBottomLeft="8" shadow={5}>
                  <Center>
                    <HStack space={3} >
                    <Flex direction="column" mb="2.5" mt="1.5">
                      <Box p="2">
                        <Text style={styles.titleText}>Deskripsi :</Text>
                        <Text>Welcome to the Complete Web Development Bootcamp, the only course you need to learn to code and become a full-stack web developer. With 150,000+ ratings and a 4.8 average, my Web Development course is one of the HIGHEST RATED courses in the history of Udemy! </Text>
                        <Divider my="2" _light={{bg: "coolGray.300"}} _dark={{bg: "coolGray.300"}}/>
                        <Text>You Will Learn : </Text>
                        <Text>&nbsp;</Text>
                        <Text style={styles.contentLists}><MaterialCommunityIcons name="check-circle" color='#487d71' size={23} style={{marginBottom:'14px'}}/> You will build 16 web development projects for your portfolio, ready to apply for junior developer jobs</Text>
                        <Text style={styles.contentLists}><MaterialCommunityIcons name="check-circle" color='#487d71' size={23} style={{marginBottom:'14px'}}/> You will master both front and back-end development, becoming a full-stack developer by the end of the course.</Text>
                        <Text style={styles.contentLists}><MaterialCommunityIcons name="check-circle" color='#487d71' size={23} style={{marginBottom:'14px'}}/> Build fully-fledged websites and web apps for your startup or business.</Text>
                        <Text style={styles.contentLists}><MaterialCommunityIcons name="check-circle" color='#487d71' size={23} style={{marginBottom:'14px'}}/> Master frontend development with React</Text>
                        <Text style={styles.contentLists}><MaterialCommunityIcons name="check-circle" color='#487d71' size={23} style={{marginBottom:'14px'}}/> Master frontend development with React</Text>
                        <Text style={styles.contentLists}><MaterialCommunityIcons name="check-circle" color='#487d71' size={23} style={{marginBottom:'14px'}}/> Learn professional developer best practices.</Text>
                        <Text style={styles.contentLists}><MaterialCommunityIcons name="check-circle" color='#487d71' size={23} style={{marginBottom:'14px'}}/> You will learn the latest technologies, including Javascript, React, Node and even Web3 development.</Text>
                        <Text style={styles.contentLists}><MaterialCommunityIcons name="check-circle" color='#487d71' size={23} style={{marginBottom:'14px'}}/> After the course you will be able to build ANY website you want.</Text>
                      </Box>
                    </Flex>
                      {/* </Flex> */}
                    </HStack>
                  </Center>
                </Box>

                <Box w="96%" ml="2%" h="auto" mt="-1" minHeight="150" rounded="8" bg="#ffffff" shadow={5}>
                  <Box>
                  <Flex mt="3" mb="-5" p="3" flex={1}  flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                    <Text >Rekomendasi :</Text>
                    <Text style={{color:'#3f51b5',textDecorationLine:'underline'}}>View more</Text>
                  </Flex>

                  <Flex mt="5" p="2" flex={1}  flexDirection="row" justifyContent="space-between" alignItems="flex-start">
                        <Box w="49%"  rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                        borderColor: "coolGray.600",
                        backgroundColor: "gray.700"
                        }} _web={{
                          shadow: 2,
                          borderWidth: 0
                        }} _light={{
                          backgroundColor: "gray.50"
                        }}>
                      <Pressable
                          onPress={() =>
                            navigation.navigate('DetailProduct', {
                              title: 'Detail Artikel',
                              id:''
                            })
                          }
                        >
                        <Box>
                        <AspectRatio w="100%" ratio={16 / 9}>
                          <Image
                            source={{
                              uri: 'https://img-b.udemycdn.com/course/240x135/1565838_e54e_16.jpg',
                            }} alt="Javascript"
                          />
                          </AspectRatio>
                          <Center bg="warning.400" _dark={{
                          bg: "warning.400"
                        }} _text={{
                          color: "warmGray.50",
                          fontWeight: "700",
                          fontSize: "xs"
                        }} position="absolute" bottom="0" px="3" py="1.5">
                            Technology
                          </Center>
                        </Box>
                        <Stack p="2" space={3} h="230">
                          <Text style={styles.cardTitle}>Introduction to Finance, Accounting, Modeling and Valuation</Text>
                          <Text fontWeight="400">
                              Python and Selenium WebDriver from scratch for Automation Testing, SQL Crash Course, Framework Design
                          </Text>
                          <HStack alignItems="center" space={4} justifyContent="space-between">
                            <HStack alignItems="center">
                              <Badge colorScheme="warning" variant="outline" borderRadius="full">350.000</Badge>
                            </HStack>
                          </HStack>
                        </Stack>
                        </Pressable>
                      </Box>

                      <Box w="49%"  rounded="lg" overflow="hidden" borderColor="coolGray.200" borderWidth="1" _dark={{
                            borderColor: "coolGray.600",
                            backgroundColor: "gray.700"
                          }} _web={{
                            shadow: 2,
                            borderWidth: 0
                          }} _light={{
                            backgroundColor: "gray.50"
                          }}>
                        <Pressable
                            onPress={() =>
                              navigation.navigate('DetailProduct', {
                                title: 'Detail Artikel',
                                id:''
                              })
                            }
                          >
                        <Box>
                          <AspectRatio w="100%" ratio={16 / 9}>
                            <Image source={{
                            uri: "https://img-b.udemycdn.com/course/240x135/482754_7146_6.jpg"
                          }} alt="image" />
                          </AspectRatio>
                          <Center bg="warning.400" _dark={{
                          bg: "warning.400"
                        }} _text={{
                          color: "warmGray.50",
                          fontWeight: "700",
                          fontSize: "xs"
                        }} position="absolute" bottom="0" px="3" py="1.5">
                            FINANCE
                          </Center>
                        </Box>
                        
                        <Stack p="2" space={3} h="230">
                          <Text style={styles.cardTitle}>Building Modern Web Applications with Go (Golang)</Text>
                          <Text fontWeight="400">
                            Learn to program in Go from an award winning university professor
                          </Text>
                          <HStack alignItems="center" space={4} justifyContent="space-between">
                            <HStack alignItems="center">
                              <Badge colorScheme="warning" variant="outline" borderRadius="full">120.000</Badge>
                            </HStack>
                          </HStack>
                        </Stack>
                        </Pressable>
                      </Box>
                  </Flex>

                 </Box>
                </Box>
              </VStack>
            </Flex>
            </ScrollView>

            </SafeAreaView>
          </NativeBaseProvider>
        );
    };

    const Pengumuman = () => {
      const data = [{
        title: "Cyan",
        data: ["cyan.100", "cyan.200", "cyan.300", "cyan.400", "cyan.500"]
      }, {
        title: "Yellow",
        data: ["yellow.100", "yellow.200", "yellow.300", "yellow.400", "yellow.500"]
      }, {
        title: "Violet",
        data: ["violet.100", "violet.200", "violet.300", "violet.400", "violet.500"]
      }];
      return <Center h="80" w="100%">
          <SectionList maxW="300" w="100%" mb="4" sections={data} keyExtractor={(item, index) => item + index} renderItem={({
          item
        }) => <Center py="4" bg={item}>
                {item.split(".")[1]}
              </Center>} renderSectionHeader={({
          section: {
            title
          }
        }) => <Center>
                <Heading fontSize="xl" mt="8" pb="4">
                  {title}
                </Heading>
              </Center>} />
        </Center>
    };

    
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
        fontSize: 24,
        fontWeight: '600',
        color:'black'
      },
      sectionDescription: {
        marginTop: 8,
        fontSize: 18,
        fontWeight: '400',
      },
      headerTittle: {
        color:'#1d64f2'
      },
      headerBox: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 280,
        width:'100%',
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
        fontSize:16,
        marginBottom:5
      },
      cardTitle: {
        color:'#094deb',
        fontWeight: '500',
        fontSize:14,
        marginBottom:3
      },
      titlePrice:{
        fontSize:16,
        marginBottom:5,
        fontWeight:'bold',
        color:'#eb8509'
      },
    });

export default DetailProduct;