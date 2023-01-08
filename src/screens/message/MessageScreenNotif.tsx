import { View, HStack, Box, Heading, Text, Avatar, Center, Button, VStack, ScrollView,Stack, AspectRatio, Image, Spacer } from 'native-base';
import React, { useEffect, useState } from "react";
import { Dimensions, ImageBackground, Pressable, StyleSheet ,TouchableOpacity} from "react-native";
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import { SafeAreaView } from 'react-native-safe-area-context';

var deviceHeight:any = Dimensions.get('window').height;
var deviceWidth:any = Dimensions.get('window').width;

// const image = { uri: "https://www.baltana.com/files/wallpapers-5/Blue-Background-Wallpaper-HD-16273.jpg" };
const image = { uri: "https://i.pinimg.com/564x/4c/7a/b1/4c7ab1da89e96e9051005526164af8ed.jpg" };

const App = () =>{
  const [itemData, setItemData] = useState<undefined | any>([])
  const [itemDataUsers, setItemDataUsers] = useState<undefined | any>()
  const [products, setProducts] = useState<undefined | any>()


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
        <HStack justifyContent="space-between" bg="#9cf4ff36" h="130" p={2} borderBottomLeftRadius={2} borderBottomRightRadius={70} zIndex={1}>
          <Box>
           <HStack space={3} mb={3}>
                <Text style={{backgroundColor:'#57e5f763',padding:7,borderRadius:10}}>
                  <MaterialIcons name="build" color='#ffff' size={20} />
                </Text>
                <Text style={{backgroundColor:'#57e5f763',padding:7,borderRadius:10}}>
                  <MaterialIcons name="comment" color='#ffff' size={20} />
                </Text>
           </HStack>

            <Text color="gray.200" mt={2} mb={2}>Welcome,</Text>
            <Text style={styles.textBig}>Rafles Nainggolan</Text>
          </Box>
          <Box>
            <Avatar bg="green.500" source={{
                uri: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
              }}> AJ
              </Avatar>
          </Box>
        </HStack>
          
        <HStack  p={2} pt={5} space={3} justifyContent="space-between">
          <Box opacity={0.9} w="22%" h={75} p={2} bg="#9dd8eba8" borderRadius={12} shadow={9}>
              <Center><MaterialIcons name="360" style={styles.iconColor} size={30} /></Center>
            <Center><Text style={styles.textDefault}>Track</Text></Center>
          </Box>
          <Box opacity={0.9} w="22%" h={75} p={2} bg="#9dd8eba8" borderRadius={12} shadow={9}>
              <Center><MaterialIcons name="control-point" style={styles.iconColor} size={30} /></Center>
            <Center><Text style={styles.textDefault}>New</Text></Center>
          </Box>
          <Box opacity={0.9} w="22%" h={75} p={2} bg="#9dd8eba8" borderRadius={12} shadow={9}>
              <Center><MaterialIcons name="addchart" style={styles.iconColor} size={30} /></Center>
            <Center><Text style={styles.textDefault}>Approval</Text></Center>
          </Box>
          <Box opacity={0.9} w="22%" h={75} p={2} bg="#9dd8eba8" borderRadius={12} shadow={9}>
              <Center><MaterialIcons name="airplanemode-on" style={styles.iconColor} size={30} /></Center>
            <Center><Text style={styles.textDefault}>Jobs</Text></Center>
          </Box>
        </HStack>
        <HStack p={2} pt={3} space={3} justifyContent="space-between">
          <Box opacity={0.9} w="22%" h={75} p={2} bg="#9dd8eba8" borderRadius={12} shadow={9}>
          <TouchableOpacity activeOpacity={0.4} onPress={()=>getDetailShipment()}>
              <Center><MaterialIcons name="donut-small" style={styles.iconColor} size={30} /></Center>
            <Center><Text style={styles.textDefault}>Info</Text></Center>
          </TouchableOpacity>
          </Box>
          <Button opacity={0.9} w="22%" h={75} p={2} bg="#9dd8eba8" borderRadius={12} shadow={9} onPress={()=>getDetailShipment()}>
            <Center><MaterialIcons name="access-time" style={styles.iconColor} size={30} /></Center>
            <Center><Text style={styles.textDefault}>Notif</Text></Center>
          </Button>
          <Box opacity={0.9} w="22%" h={75} p={2} bg="#9dd8eba8" borderRadius={12} shadow={9}>
              <Center><MaterialIcons name="equalizer" style={styles.iconColor} size={30} /></Center>
            <Center><Text style={styles.textDefault}>Message</Text></Center>
          </Box>
          <Box opacity={0.9} w="22%" h={75} p={2} bg="#9dd8eba8" borderRadius={12} shadow={9}>
              <Center><MaterialIcons name="contactless" style={styles.iconColor} size={30} /></Center>
            <Center><Text style={styles.textDefault}>Status</Text></Center>
          </Box>
        </HStack>

            <HStack mt={4} pl={3} pr={2} justifyContent="space-between">
            <Text color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>Courier</Text>
            <Text color='gray.200'>See All <MaterialIcons name="keyboard-arrow-right" color='#ffff' size={15} /></Text>
          </HStack>
            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
              <HStack p={2} justifyContent="space-between" space={1}>
                {
                  Courier && Courier.map((val:any,i:number)=>{
                    return  <Box key={i}  bg="#9dd8eba8" borderRadius={6} borderWidth={1} borderColor="#cdd0d154" p={2}>
                    <HStack>
                    <Avatar bg="green.500" source={{
                        uri:val.avatar
                      }} size="sm"> AJ
                      </Avatar>
                      <Box pl={2}>
                      <Text>{val.name}</Text>
                      <Text>{val.jobs}</Text>
                      </Box>
                    </HStack>
                  </Box>

                  })
                }
              </HStack>
            </ScrollView>

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
                      : '#c6eefbbf',
                      width:'100%',
                      opacity:pressed?0.6:1
                  }
                ]}>
                  <HStack   pl="3" pb={3} pt={3} justifyContent="space-between" borderBottomColor="gray.200" borderBottomWidth={0}>
                    <Stack w="10%" borderRadius={6}  justifyContent="center" alignItems="center">
                      <Stack justifyContent="center" alignItems="center"  bg="#c6eefbde" h={45} w={45} borderRadius={9}><Text color='#3d3d3d'><MaterialIcons name="av-timer" size={30} /></Text></Stack>
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
            <Text pl="3" color="gray.200" style={{fontSize:17,fontWeight:'bold'}}>Annouchement</Text>
            <Text color='gray.200'>See All <MaterialIcons name="keyboard-arrow-right" color='#ffff' size={15} /></Text>
          </HStack>
          <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} nestedScrollEnabled={true}>
              <HStack p={2} justifyContent="space-between" space={2} >
                {
                  itemData && itemData.map((val:any,i:any)=>{
                    return  <VStack key={i}  bg="#9dd8eba8" w={deviceWidth/3} pt={0} borderRadius={8} borderWidth={1} borderColor="#cdd0d154" >
                      <Stack w="100%" bg="#000">
                        <Image source={{
                              uri: val.avatar
                            }} alt="image" w="100%" h={110}  />
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
                  products && products.map((val:any,i:any)=>{
                    return  <VStack key={i}  bg="#9dd8eba8" w={deviceWidth/3} borderRadius={10} borderWidth={1} borderColor="#cdd0d154" p={2}>
                      <Stack w="100%" bg="#000">
                        <Image source={{
                              uri: val.thumbnail
                            }} alt="image" w="100%" h={130} />
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