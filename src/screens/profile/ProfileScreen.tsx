import { useRoute } from '@react-navigation/native';
import React,{useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  Platform,
  SafeAreaView,
  Dimensions,
  View,
  Pressable,
  StatusBar,
  StyleSheet,
  useColorScheme,
  RefreshControl,
  TouchableHighlight,
  TouchableOpacity,
  TouchableNativeFeedback
} from 'react-native';

import { AspectRatio ,Text,Image,Box,Container, Heading, Center, NativeBaseProvider,VStack ,ZStack,HStack ,Flex, Spacer,Stack,ScrollView,Divider,FlatList,SectionList,Avatar,Badge, Button } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient'
import COLORS from '@config/colors'

import {TextCustom} from '@components/TextCustom';
import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { setDataLogin, logout } from '@redux/apps/LoginSlice'

// import Navigator Stack
import { HomeScreenNavigation } from '@navigation/types';
import { RootNavigation } from '@navigation/types';



const ProfileScreen = (props:any) => {
  const route = useRoute();
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
  const navigationRoot = useNavigation<RootNavigation>(); // check which routes is navigates

  const[jam,setJam]=React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const redux_profile = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch()

  const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      // wait(2000).then(() => setRefreshing(false));
      setTimeout(()=>{
        setRefreshing(false)
      },2000)
    }, []);
  
    const ChangeRedux=()=>{
      console.log('ChangeRedux Datas')
      dispatch(setDataLogin({isLogin:true,name:'raflesngln',username:'raflesngln@gmail.com',profilePicture:'no photos'}))
      
      setTimeout(()=>{
        console.log(redux_profile)
      },600)
    }

  const LogoutUser=()=>{
      dispatch(setDataLogin({isLogin:false,username:'',profilePicture:'',value:0}))
      console.log('logout user')
      navigationRoot.replace('Auth')
    }
        return (
          <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
          
            <Flex direction="row" mb="2.5" mt="-3">
              <VStack space={4}  w='100%'>
                <LinearGradient
                  // colors={['#0960d9','#438cf0','#0960d9']}
                  colors={[COLORS.gradient1,COLORS.gradient2,COLORS.gradient3]}
                  style={styles.headerBoxSettings}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <HStack space={2} ml="2%" mt="-18%" flexDirection="row" justifyContent="center" justifyItems="center" >
                    <Center h="95px" w="95px" bg="primary.300" rounded="full" shadow={3}>
                      <Avatar bg="purple.600" alignSelf="center" size="xl" source={{
                          uri: "https://hris.att-group.co.id/assets/images/karyawan/F01A-150885933/tmp/F01A-150885933-26102021134633.jpeg"
                        }}>
                            EM
                      </Avatar>
                    </Center>
                    <Box minHeight="110px" p="2" pl="3%" maxWidth="75%" bg="transparent" rounded="md" >
                      <Text style={{fontSize:22,color:'#ffffff',fontWeight:'bold'}}>{redux_profile.dataLogin.name}</Text>
                      <Text style={{fontSize:14,color:'#e3e6e8',fontWeight:'bold'}}>{redux_profile.dataLogin.username}</Text>
                      <Text style={{fontSize:14,color:'#e3e6e8',fontWeight:'bold'}}>Programmer</Text>
                    </Box>
                  </HStack>
              </LinearGradient>

                <Box w="100%" pt="5" h="auto" p="2" pl="3" minHeight="85%" mt="-25%" bg="#ffffff" roundedTopRight="30" roundedTopLeft="30" roundedBottomRight="8" roundedBottomLeft="8" shadow={5}>
                    <Box p="1" ml="2%" mb="3" maxWidth="75%" bg="transparent" >
                      <Text pt="5" style={{fontSize:26,color:'#4b5157'}}>My Profile's</Text>
                    </Box>

                    <Box p="1" mt="1" ml="2%" maxWidth="75%" bg="transparent" >
                      <Text style={{fontSize:16,color:'#b6bab8'}} bold>Basic Settings</Text>
                    </Box>
                    <ListSettings/>
                    
                    <Box p="1" mt="6" ml="2%" maxWidth="75%" bg="transparent" >
                      <Text style={{fontSize:16,color:'#b6bab8'}} bold>Other Settings</Text>
                    </Box>

                    <Pressable
                            onPress={() =>
                              navigation.navigate('DetailProduct', {
                                title: 'Detail Course',
                                id:''
                              })
                            }
                      >
                    <Box borderBottomWidth="1" _dark={{
                          borderColor: "#d7dbd9"
                        }} borderColor="#d7dbd9" pl={["0", "4"]} pr={["0", "5"]} py="2">
                      <HStack space={[2, 3]} justifyContent="space-between">
                          <MaterialCommunityIcons name="account-key" color={'#4b5157'} size={25} />
                        <VStack>
                          <Text _dark={{
                                color: "warmGray.50"
                              }} color="coolGray.800">
                             Change Password
                          </Text>
                        </VStack>
                        <Spacer />
                        <Text fontSize="xs" _dark={{
                              color: "warmGray.50"
                            }} color="coolGray.800" alignSelf="flex-start">
                            <MaterialCommunityIcons name="chevron-right" color={'#888b8f'} size={25} />
                        </Text>
                      </HStack>
                    </Box>
                    </Pressable>
                    
                      <TouchableOpacity onPress={()=>LogoutUser()}>
                      <Box borderBottomWidth="1" _dark={{
                            borderColor: "#d7dbd9"
                          }} borderColor="#d7dbd9" pl={["0", "4"]} pr={["0", "5"]} py="2">
                        <HStack space={[2, 3]} justifyContent="flex-start">
                          <MaterialCommunityIcons name="exit-to-app" color={'#4b5157'} size={25} />
                          <VStack>
                            <Text _dark={{
                                  color: "warmGray.50"
                                }} color="coolGray.800" bold>
                                Log-Out
                            </Text>
                          </VStack>
                        </HStack>
                      </Box>
                    </TouchableOpacity>

                    {/* <Button onPress={()=>ChangeRedux()}>Change Redux</Button>
                    <Text style={{color:'#f00a47'}}>
                      Redux : {JSON.stringify(redux_profile.dataLogin)}
                    </Text> */}

                </Box>
              </VStack>
            </Flex>
            </SafeAreaView>
          </NativeBaseProvider>
        );
    };

    const ListSettings = () => {
      const data = [{
        id: "bd7acbea-c1b1-46c2-aed5-3ad53abb28ba",
        fullName: "Personal Info",
        icon: "account-wrench"
      }, {
        id: "3ac68afc-c605-48d3-a4f8-fbd91aa97f63",
        fullName: "My Files",
        icon: "folder-account-outline"
      }, {
        id: "58694a0f-3da1-471f-bd96-145571e29d72",
        fullName: "Job Settings",
        icon: "application-cog-outline"
      }, {
        id: "68694a0f-3da1-431f-bd56-142371e29d72",
        fullName: "Task Settings",
        icon: "folder-search"
      }];
      return <Box>
          <FlatList data={data} renderItem={({
              item
            }) => <Box h="50px" borderBottomWidth="1" _dark={{
              borderColor: "#d7dbd9"
            }} borderColor="#d7dbd9" pl={["0", "4"]} pr={["0", "5"]} py="2">
            <HStack space={[2, 3]} justifyContent="space-between">
                <MaterialCommunityIcons name={`${item.icon}`} color={'#4b5157'} size={25} />
              <VStack>
              <Text _dark={{
                    color: "warmGray.50"
                  }} color="coolGray.900">
                {item.fullName}
              </Text>
              </VStack>
              <Spacer />
              <Text fontSize="xs" _dark={{
                    color: "warmGray.50"
                  }} color="coolGray.800" alignSelf="flex-start">
                  <MaterialCommunityIcons name="chevron-right" color={'#888b8f'} size={25} />
              </Text>
            </HStack>
          </Box>} keyExtractor={item => item.id} />
        </Box>;
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
      headerBoxSettings: {
        alignItems: 'flex-start',
        justifyContent: 'center',
        height: 250,
        width:'100%',
      },
    });

export default ProfileScreen;