import { View, HStack, Box, Heading, Text, Avatar, Center, Button, VStack, ScrollView, Stack, AspectRatio, Image, Spacer, Badge } from 'native-base';
import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useAppSelector } from '@redux/hooks';

var deviceHeight: any = Dimensions.get('window').height;
var deviceWidth: any = Dimensions.get('window').width;
import LayoutBackground from '@components/LayoutBackground'
import COLORS from '@config/colors';

// const image = { uri: "https://www.baltana.com/files/wallpapers-5/Blue-Background-Wallpaper-HD-16273.jpg" };
const image = { uri: "https://i.pinimg.com/564x/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg" };

function HomePage() {
  const redux_profile = useAppSelector((state: any) => state.login)
  const [itemData, setItemData] = useState<undefined | any>([])
  const [itemDataUsers, setItemDataUsers] = useState<undefined | any>()
  const [products, setProducts] = useState<undefined | any>()
  const navigation = useNavigation<any>();


  const getUsers = async () => {
    const res = await fetch('https://reqres.in/api/users?page=1')
    const respon = await res.json()
    return respon.data
  }

  const getPhotos = async () => {
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
    async function dataUsers() {
      const datausers = await getUsers()
      setItemData(datausers)
    }
    dataUsers()
    getPhotos()
  }, []);

  const getDetailShipment = () => {
    console.log(' get detail');
  }
  //   bg="#93f0fb40"
  return (
    <View style={styles.container}>
      <LayoutBackground>
        <View style={[styles.maincontainer]}>
          <SafeAreaView style={{ backgroundColor: COLORS.transparant100, zIndex: 999, marginTop: "0%", borderTopLeftRadius: 20, borderTopRightRadius: 20 }}>
            <ScrollView showsVerticalScrollIndicator={false} >
              <HStack justifyContent="space-between" w="100%" bg="#93f0fb40" h="140" borderBottomLeftRadius={2} borderBottomRightRadius={70} zIndex={1}  >
                <Box p={2}>
                  <HStack space={3} mb={2}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeStack' as never,{ screen: 'NotificationsScreen', params: {title:'inpuyt jobs' } })}>
                    {/* <TouchableOpacity onPress={() => navigation.navigate('JobsStack' as never,{ screen: 'NotificationsScreen', params: {title:'inpuyt jobs' } })}> */}
                      <Stack>
                        <Badge // bg="red.400"
                          colorScheme="danger" rounded="full" mb={-3} mr={-2} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                            fontSize: 10
                          }}>
                          99+
                        </Badge>
                        <Text style={{ backgroundColor: '#93f0fb7a', padding: 7, borderRadius: 10 }}>
                          <MaterialIcons name="notifications" color='#ffff' size={20} />
                        </Text>
                      </Stack>
                    </TouchableOpacity>

                    <TouchableOpacity>
                      <Stack>
                        <Badge // bg="red.400"
                          colorScheme="danger" rounded="full" mb={-3} mr={-2} zIndex={1} variant="solid" alignSelf="flex-end" _text={{
                            fontSize: 10
                          }}>
                          2
                        </Badge>
                        <Text style={{ backgroundColor: '#93f0fb7a', padding: 7, borderRadius: 10 }}>
                          <MaterialIcons name="email" color='#ffff' size={20} />
                        </Text>
                      </Stack>
                    </TouchableOpacity>
                  </HStack>

                  <Text color="gray.200" mt={2} mb={2}>Welcome,</Text>
                  <Text style={styles.textBig}>{redux_profile.dataLogin.name}</Text>
                </Box>
                <Box p={2}>
                  <Avatar bg="green.500" source={{
                    uri: "https://hris.att-group.co.id/assets/images/karyawan/F01A-150885933/tmp/F01A-150885933-26102021134633.jpeg"
                  }} size="lg"> RN
                  </Avatar>
                </Box>
              </HStack>

              <HStack p={2} pt={5} space={3} justifyContent="space-between">
                <Button opacity={0.90} w="22%" h={75} p={2} bg={COLORS.mint200} borderColor={COLORS.mint200} borderWidth="1" borderRadius={12} >
                  <Center><MaterialIcons name="360" style={styles.iconColor} size={30} /></Center>
                  <Center><Text color={COLORS.white400} style={styles.textDefault}>Tracking</Text></Center>
                </Button>
                <Button opacity={0.90} w="22%" h={75} p={2} bg={COLORS.mint200} borderColor={COLORS.mint200} borderWidth="1" borderRadius={12} >
                  <Center><MaterialIcons name="control-point" style={styles.iconColor} size={30} /></Center>
                  <Center><Text color={COLORS.white400}>New Jobs</Text></Center>
                </Button>
                <Button opacity={0.90} w="22%" h={75} p={2} bg={COLORS.mint200} borderColor={COLORS.mint200} borderWidth="1" borderRadius={12} >
                  <Center><MaterialIcons name="approval" style={styles.iconColor} size={30} /></Center>
                  <Center><Text color={COLORS.white400}>Approval</Text></Center>
                </Button>
                <Button opacity={0.90} w="22%" h={75} p={2} bg={COLORS.mint200} borderColor={COLORS.mint200} borderWidth="1" borderRadius={12} >
                  <Center><MaterialIcons name="addchart" style={styles.iconColor} size={30} /></Center>
                  <Center><Text color={COLORS.white400}>Jobs</Text></Center>
                </Button>
              </HStack>
              <HStack p={2} pt={3} space={3} justifyContent="space-between">
                <Button opacity={0.90} w="22%" h={75} p={2} bg={COLORS.mint200} borderColor={COLORS.mint200} borderWidth="1" borderRadius={12}  onPress={() => getDetailShipment()}>
                  <Center><MaterialIcons name="donut-small" style={styles.iconColor} size={30} /></Center>
                  <Center><Text color={COLORS.white400}>Info</Text></Center>
                </Button>
                <Button opacity={0.90} w="22%" h={75} p={2} bg={COLORS.mint200} borderColor={COLORS.mint200} borderWidth="1" borderRadius={12}  onPress={() => getDetailShipment()}>
                  <Center><MaterialIcons name="notifications-active" style={styles.iconColor} size={30} /></Center>
                  <Center><Text color={COLORS.white400}>Notif</Text></Center>
                </Button>
                <Button opacity={0.90} w="22%" h={75} p={2} bg={COLORS.mint200} borderColor={COLORS.mint200} borderWidth="1" borderRadius={12} >
                  <Center><MaterialIcons name="message" style={styles.iconColor} size={30} /></Center>
                  <Center><Text color={COLORS.white400}>Message</Text></Center>
                </Button>
                <Button opacity={0.90} w="22%" h={75} p={2} bg={COLORS.mint200} borderColor={COLORS.mint200} borderWidth="1" borderRadius={12} >
                  <Center><MaterialIcons name="contactless" style={styles.iconColor} size={30} /></Center>
                  <Center><Text color={COLORS.white400}>Status</Text></Center>
                </Button>
              </HStack>

              <HStack mt={4} pl={3} pr={2} justifyContent="space-between">
                <Text color="gray.200" fontWeight="700" style={{ fontSize: 17 }}>Courier</Text>
                <Text color='gray.200'>See All <MaterialIcons name="keyboard-arrow-right" color='#ffff' size={15} /></Text>
              </HStack>
              <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                <HStack p={2} justifyContent="space-between" space={1} w="98%">
                  {
                    Courier && Courier.map((val: any, i: number) => {
                      return <Pressable key={i} onPress={() => getDetailShipment()}
                        style={({ pressed }) => [
                          {
                            backgroundColor: pressed
                              ? '#c6eefbde'
                              : COLORS.contentBg600,
                            width: '20%',
                            opacity: pressed ? 0.4 : 1,
                            borderRadius: 9
                          }
                        ]}>

                        <Box key={i} bg="#9dd8eba8" borderRadius={6} borderWidth={1} borderColor="#cdd0d154" p={2}>
                          <HStack>
                            <Avatar bg="green.500" source={{
                              uri: val.avatar
                            }} size="sm"> AJ
                            </Avatar>
                            <Box pl={2}>
                              <Text>{val.name}</Text>
                              <Text>{val.jobs}</Text>
                            </Box>
                          </HStack>
                        </Box>
                      </Pressable>

                    })
                  }
                </HStack>
              </ScrollView>

              <VStack space={1}>
                <HStack justifyContent="space-between">
                  <Box><Text pl="3" pb="2" pt="4" color="gray.200" fontWeight="700" fontSize={16}>Last Shipment</Text></Box>
                  <Box><Text pt={4} pr={2} color="gray.200" >See More <MaterialIcons name="keyboard-arrow-right" color='#ffff' size={15} style={{ marginTop: 15 }} /></Text></Box>
                </HStack>
                {
                  itemData && itemData.map((val: any, i: number) => {
                    return <Pressable key={i} onPress={() => getDetailShipment()}
                      style={({ pressed }) => [
                        {
                          backgroundColor: pressed
                            ? '#c6eefbde'
                            : COLORS.contentBg300,
                          width: '100%',
                          opacity: pressed ? 0.6 : 1
                        }
                      ]}>
                      <HStack pl="3" pb={3} pt={3} justifyContent="space-between" borderBottomColor="gray.200" borderBottomWidth={0}>
                        <Stack w="10%" borderRadius={6} justifyContent="center" alignItems="center">
                          <Stack justifyContent="center" alignItems="center" bg={COLORS.contentBg200} h={45} w={45} borderRadius={9}><Text color='#3d3d3d'><MaterialIcons name="av-timer" size={30} /></Text></Stack>
                        </Stack>
                        <Box w="83%" pl={3}>
                          <Text fontWeight="500" color="#3d3d3d">JOBS0026372672647</Text>
                          <Text color="gray.600">In warehouse</Text>
                        </Box>
                        <Box w="7%"><Text color='#000'><MaterialIcons name="keyboard-arrow-right" size={20} /></Text></Box>
                      </HStack>
                    </Pressable >
                  })
                }
              </VStack>

              <VStack p={1} pb={3} mt={5} space={2} w="100%" >
                <HStack justifyContent="space-between">
                  <Text pl="3" color="gray.200" fontWeight="700" style={{ fontSize: 17 }}>Annouchement</Text>
                  <Text color='gray.200'>See All <MaterialIcons name="keyboard-arrow-right" color='#ffff' size={15} /></Text>
                </HStack>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                  <HStack p={2} justifyContent="space-between" space={2} >
                    {
                      itemData && itemData.map((val: any, i: any) => {
                        return <VStack key={i} bg={COLORS.contentBg600} w={deviceWidth / 3} pt={0} borderRadius={8} borderWidth={1} borderColor="#cdd0d154" >
                          <Stack w="100%" >
                            <Image source={{
                              uri: val.avatar
                            }} alt="image" w="100%" h={110} />
                          </Stack>
                          <HStack>
                            <Box pl={2}>
                              <Text>{val.first_name}</Text>
                              <Text>{val.email}</Text>
                            </Box>
                          </HStack>
                        </VStack>

                      })
                    }
                  </HStack>
                </ScrollView>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
                  <HStack p={2} justifyContent="space-between" space={2} >
                    {
                      products && products.map((val: any, i: any) => {
                        return <VStack key={i} bg={COLORS.contentBg500} w={deviceWidth / 3} borderRadius={10} borderWidth={1} borderColor="#cdd0d154" p={2}>
                          <Stack w="100%" >
                            <Image source={{
                              uri: val.thumbnail
                            }} alt="image" w="100%" h={120} />
                          </Stack>
                          <HStack>
                            <Box pl={2}>
                              <Text>{val.title}</Text>
                              <Text>{val.price}</Text>
                            </Box>
                          </HStack>
                        </VStack>

                      })
                    }
                  </HStack>
                </ScrollView>
              </VStack>
              
              <Spacer mt={60} />
            </ScrollView>
          </SafeAreaView>
        </View>
      </LayoutBackground>
    </View>
  );
}


const Courier: {}[] = [
  {
    id: 1,
    name: 'David',
    jobs: 'Senior Staff',
    avatar: 'https://images.unsplash.com/photo-1603415526960-f7e0328c63b1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
  {
    id: 1,
    name: 'Thomas',
    jobs: 'Junior Staff',
    avatar: 'https://images.unsplash.com/photo-1614289371518-722f2615943d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    id: 1,
    name: 'Leany',
    jobs: 'Senior Staff',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'
  },
  {
    id: 1,
    name: 'Thomford',
    jobs: 'Senior Staff',
    avatar: 'https://images.unsplash.com/photo-1510771463146-e89e6e86560e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=627&q=80'
  },
  {
    id: 1,
    name: 'Danield',
    jobs: 'Junior Staff',
    avatar: 'https://images.unsplash.com/photo-1607746882042-944635dfe10e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
  },
]

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerStyle: {
    flex: 1,
    backgroundColor: '93f0fb40',
    top: 0,
    // shadowColor: "#000",
    // shadowOffset: {
    //     width: 0,
    //     height: 6,
    // },
    // shadowOpacity: 0.37,
    // shadowRadius: 7.49,

    // elevation: 12,
  },
  maincontainer: {
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    columnGap: 5
    // backgroundColor:'#ffff',
    // opacity:0.8
  },
  image: {
    flex: 1,
    justifyContent: "flex-start"
  },
  iconColor: {
    color: '#eaf1f7',
  },
  defaultBg: {
    backgroundColor: '#9dd8eba8',
  },
  textDefault: {
    // color:'#11629f',
    // color: '#eaf1f7',
    fontWeight: '600'
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

export default HomePage;