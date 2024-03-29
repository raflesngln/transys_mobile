import { useRoute } from '@react-navigation/native';
import React,{FC, useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
  RefreshControl,
  Platform,
  AppState,
  AppStateStatus
} from 'react-native';
import {View, AspectRatio,Text, Pressable, Image, Box, Container, Heading, Center, NativeBaseProvider, VStack, ZStack, HStack, Flex, Spacer, Stack, ScrollView, 
  Divider, FlatList, SectionList, Avatar, Badge, Button, Card,useToast, Actionsheet, useDisclose, Input, Icon, Radio } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';
import DateTimePicker from '@react-native-community/datetimepicker';
import COLORS from '@config/colors'

import Animated, {
  LightSpeedInLeft, 
  LightSpeedOutRight,
  Layout
} from 'react-native-reanimated';
import { FlashList } from '@shopify/flash-list';

import CardSkeleton from '@components/CardSkeleton'
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import NetInfo,{useNetInfo} from "@react-native-community/netinfo";
// import HomeScreenNavigation that check fro routes in homescreen

import useConnection from '@services/useConnection'
import { useQuery } from '@tanstack/react-query';

import JobCard from "@components/JobCard";
import { fetchJobListKEY } from "@services/variableKEY";
import {getAll,create} from '@services/shipment/shipmentService'
import { focusManager } from '@tanstack/react-query';
import LayoutBackground from '@components/LayoutBackground';

var deviceHeight:any = Dimensions.get('window').height;
var deviceWidth:any = Dimensions.get('window').width;

interface KategoriProps {
  numCategory: number,
  title: any
}

const NotificationsLists = (props:any) => {
  const route = useRoute();
  // const { title } = route.params;

  return (
    <LayoutBackground>
      <Content/>
      <Text>Lore</Text>
    </LayoutBackground>
  );
};


  function Content(){
  const toast = useToast();
  var Today=moment().format('ddd, MMMM Do YYYY')
  const navigation = useNavigation<any>();
  const[jam,setJam]=React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tab, setTab] = React.useState(0);

  const [checkInternet] = useConnection({title:'cek'});
  
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
  
    const SearchData=()=>{
      console.log('sadasds')
    }
    const refrehData=()=>{
      console.log('sadasds')
    }

    useEffect(()=>{
      setTimeout(()=>{
        const cek=checkInternet.isConnected
        if(cek==false){
          console.log('No Internet')
        }
      },300)
    },[checkInternet])

        return (
          <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
              
            <Flex direction="row" mb="2">
              <VStack space={2}  w='100%'  bg="#00bcd44a" pt={3}>
              <Box style={{height:180}}>
                <VStack mt="-3%">
                  <Box mb="2">
                    <Box p="2" display="flex" flexDirection="row" justifyContent="space-between">
                      <Box pt="2">
                        <Text style={{color:'#ffff',fontWeight:'600',fontSize:22}}><MaterialCommunityIcons name="sticker-text" color='#bfe0ce' size={20} /> Nofitifactions</Text>
                      </Box>
                      <HStack space={2}>
                        <Box pl="1">
                            <Button onPress={() => navigation.navigate('JobsStack' as never,{ screen: 'InputJobs', params: {title:'inpuyt jobs' } })} bg={COLORS.mint400} borderColor={COLORS.mint400} borderWidth={1}  h="42" w="42" variant="subtle" size="sm"  rounded='full'><MaterialIcons name="add" color={COLORS.black300} size={18} /></Button>
                        </Box>
                        <Box>
                            <MenuActionSearchShipment/>
                        </Box>
                      </HStack>
                    </Box>
                  </Box>
                  <Box>
                    <ButtonTabsMenu numCategory={0} title={(e:any)=>changeCategory(e)}/>
                  </Box>
                </VStack>
              </Box>
              </VStack>
            </Flex>
            <VStack p="2" mt="-15%" roundedTopRight="22" roundedTopLeft="22" roundedBottomRight="8" roundedBottomLeft="8" >
              <Box h="70%" w="100%" mb="50">
                <ShipmentList refresh={()=>refrehData()}/>
              </Box>
              <Box h="18%" mt="15%" >
              </Box>
            </VStack>


        </SafeAreaView>
      </NativeBaseProvider>
        );
    };
    
function onAppStateChange(status: AppStateStatus) {
  if (Platform.OS !== 'web') {
    focusManager.setFocused(status === 'active')
  }
}


function ShipmentList(props:any): JSX.Element {
  const toast = useToast();
  const navigation = useNavigation<any>();
  const[dogs,setDogs]=useState<any>('')
  const [onrefreshing, setOnRefreshing] = React.useState(false);
  const redux_profile = useAppSelector((state:any) => state.login)

  const onRefreshData = React.useCallback(() => {
    refetch();
    console.log('Get Refresh datas')
    setOnRefreshing(true);
    setTimeout(() => {
      setOnRefreshing(false)
    }, 3000)
  }, []);


  const loadNextPageData=()=>{
    setOnRefreshing(true);
    setTimeout(() => {
      setOnRefreshing(false)
    }, 3000)
    console.log("Data Terakhir data Lists")
  }


useEffect(() => {
  const subscription = AppState.addEventListener('change', onAppStateChange)
  console.log('validasi refetch')
  onRefreshData()
  return () => subscription.remove()
}, [])


  const {status,isFetching,isLoading,data,error,refetch} = useQuery([fetchJobListKEY,props], ()=>getAll({token:redux_profile.dataLogin.token,halaman:1}));

  if (isLoading) return <VStack mt={1}><CardSkeleton/><CardSkeleton/><CardSkeleton/></VStack>
  if (isFetching) return <VStack mt={1}><CardSkeleton/><CardSkeleton/><CardSkeleton/></VStack>
  if (error) return <Box><Text>{error.message}</Text><Text>Error Get Data, Please Retry Again in a Moment</Text></Box> 

    return (
    <SafeAreaView style={{ flex: 1 }}>
          <FlashList
            keyExtractor={(item:any) => item.pid}
            data={data.data}
            renderItem={({ item }) => <JobCard shipment={item} />}
            estimatedItemSize={80}
            refreshControl={
                <RefreshControl
                  refreshing={onrefreshing}
                  onRefresh={()=>onRefreshData()}
                  tintColor="#f7054e" // for IOS
                  titleColor='#f7054e'
                  colors={["#f7054e","#ff4a80"]} // for android
                />
              }
              onEndReachedThreshold={0.5}
              onEndReached={()=>loadNextPageData()}
          />
    </SafeAreaView>
    )
}


const ButtonTabsMenu: FC<KategoriProps> = (props): JSX.Element => {
  const[aktif,setAktif]=useState(0)
  const changeTab=(e:any)=>{
    props.numCategory=e
    props.title=()=>e
    setAktif(e)
  }

  return <HStack p="2" direction={{
    base: "row",
    md: "row"
  }} space={4}>
      <Button onPress={()=>changeTab(0)} leftIcon={<MaterialIcons name="clear-all" color={aktif==0?'#0cb33e':'#f2f2f2'} size={17}/>} variant="outline" rounded="30" bg={aktif==0?'#ffff':'transparent'}  h="40px" >
        <Text style={{color:aktif==0?'#0fa855':'#f2f2f2',fontWeight:'bold'}}>All </Text>
      </Button>
      <Button onPress={()=>changeTab(1)} leftIcon={<MaterialCommunityIcons name="table-clock" color={aktif==1?'#0cb33e':'#f2f2f2'} size={17}/>} variant="outline" rounded="30" bg={aktif==1?'#ffff':'transparent'} h="40px" >
        <Text style={{color:aktif==1?'#0fa855':'#f2f2f2',fontWeight:'600'}}>Progress </Text>
      </Button>
      <Button onPress={()=>changeTab(2)} leftIcon={<MaterialCommunityIcons name="clock-edit-outline" color={aktif==2?'#0cb33e':'#f2f2f2'} size={17}/>} variant="outline" rounded="30" bg={aktif==2?'#ffff':'transparent'} h="40px" >
        <Text style={{color:aktif==2?'#0fa855':'#f2f2f2',fontWeight:'600'}}>Pending </Text>
      </Button>
    </HStack>;
};


function MenuActionSearchShipment():JSX.Element {
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = React.useState(false);
  const [colorSearch, setColorSearch] = React.useState('#000');
  const [bgSearch, setBgSearch] = React.useState('#fff');
  const [textSearch, setTextSearch] = React.useState('');
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();
  
  const marginLeft=deviceWidth/20

  const editShipment=(aksi:any,pid:any)=>{
    console.warn(" SHIPMENT")
  }
  const CariShipment=(txt:any)=>{
      setTextSearch(txt)
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 200)
  }

  const ChangeColorTextSearch=(textColor:any,bgColor:any)=>{
    setColorSearch(textColor)
    setBgSearch(bgColor)
  }

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false)
    }, 2000)
  }, []);

  useEffect(()=>{
    setTextSearch('')
  },[])
  
  return <Box >
    <Button  onPress={()=>{onOpen();setTextSearch('')}} bg={COLORS.teal300}  h="42" w="42" variant="subtle" size="sm"  rounded='full'><MaterialIcons name="search" color='#fff' size={18} /></Button>
    <LayoutBackground>
      <Actionsheet isOpen={isOpen} onClose={onClose} size="full" justifyContent="flex-start" bg="coolGray.600" pt="10%" top={0}   >
        <VStack w="100%" bg="#ffff" h="100%" space={5}>
          <HStack p={2} justifyContent="space-between" bg={COLORS.headerBg} w="100%">
            <Box w="90%">
                <Input bg="#ffff" placeholder="Search" variant="outline" width="100%" borderRadius="15" py="1" px="2" fontSize={16}
                  InputLeftElement={<Icon ml="2" size="4" color="gray.400" as={<MaterialIcons name="search" color="#000" size={25} />} />} 
                  onFocus={ () => ChangeColorTextSearch('#1644db','#ffff') }
                  onBlur={ () => ChangeColorTextSearch('#000','#fff') }
                  onChangeText={(e)=>CariShipment(e)}
                  value={textSearch}
                  style={{color:colorSearch,backgroundColor:bgSearch}}
                  />
              </Box>
            <Button mt={-2} onPress={onClose} borderColor="transparent" borderRadius={8} size="sm" variant="outline" ><MaterialIcons name="close" color='#ffff' size={25} /></Button>
          </HStack>

          <ScrollView
            showsVerticalScrollIndicator={false}
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={onRefresh}
                />
              }
            >
          <Box p="2" minH="55%">
            <Box  p={2} >
              <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Shipment Number : 12345676543</Text>
              <Text style={{color:'#000'}}>Destination : Hongkong</Text>
              <Text style={{color:'#000'}}>status : Pending</Text>
              <Divider bg="#b8b9ba" size={0.4} w="100%" my={2} />
            </Box>
            <Box  p={2} >
              <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Shipment Number : 12345676543</Text>
              <Text style={{color:'#000'}}>Destination : Hongkong</Text>
              <Text style={{color:'#000'}}>status : Pending</Text>
              <Divider bg="#b8b9ba" size={0.4} w="100%" my={2} />
            </Box>
            <Box  p={2} >
              <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Shipment Number : 12345676543</Text>
              <Text style={{color:'#000'}}>Destination : Hongkong</Text>
              <Text style={{color:'#000'}}>status : Pending</Text>
              <Divider bg="#b8b9ba" size={0.4} w="100%" my={2} />
            </Box>
            <Box  p={2} >
              <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Shipment Number : 12345676543</Text>
              <Text style={{color:'#000'}}>Destination : Hongkong</Text>
              <Text style={{color:'#000'}}>status : Pending</Text>
              <Divider bg="#b8b9ba" size={0.4} w="100%" my={2} />
            </Box>
            <Box  p={2} >
              <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Shipment Number : 12345676543</Text>
              <Text style={{color:'#000'}}>Destination : Hongkong</Text>
              <Text style={{color:'#000'}}>status : Pending</Text>
              <Divider bg="#b8b9ba" size={0.4} w="100%" my={2} />
            </Box>
            <Box  p={2} >
              <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Shipment Number : 12345676543</Text>
              <Text style={{color:'#000'}}>Destination : Hongkong</Text>
              <Text style={{color:'#000'}}>status : Pending</Text>
              <Divider bg="#b8b9ba" size={0.4} w="100%" my={2} />
            </Box>
            <Box  p={2} >
              <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Shipment Number : 12345676543</Text>
              <Text style={{color:'#000'}}>Destination : Hongkong</Text>
              <Text style={{color:'#000'}}>status : Pending</Text>
              <Divider bg="#b8b9ba" size={0.4} w="100%" my={2} />
            </Box>
            <Box  p={2} >
              <Text style={{color:'#000',fontSize:16,fontWeight:'bold'}}>Shipment Number : 12345676543</Text>
              <Text style={{color:'#000'}}>Destination : Hongkong</Text>
              <Text style={{color:'#000'}}>status : Pending</Text>
              <Divider bg="#b8b9ba" size={0.4} w="100%" my={2} />
            </Box>
          </Box>
          </ScrollView>
        </VStack>
      </Actionsheet>
      </LayoutBackground>
    </Box>;
}

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
      // Style for iOS ONLY...
      datePicker: {
        justifyContent: 'center',
        alignItems: 'flex-start',
        width: 320,
        height: 260,
        display: 'flex',
      },
    });

export default NotificationsLists;