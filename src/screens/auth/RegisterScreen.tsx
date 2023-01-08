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
  TouchableHighlight,
  ActivityIndicator,
  TouchableOpacity
} from 'react-native';
import { AspectRatio ,Text,Image,Box,Container, Heading, Center, NativeBaseProvider,VStack,HStack ,Flex,Input,Icon,Button,FormControl, 
  Avatar,useToast } from "native-base";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';
import axios from 'axios';
import IndicatorLoading from '@components/indicatorLoading'

import { useAppSelector, useAppDispatch } from '@redux/hooks'
import { setDataLogin, logout } from '@redux/apps/LoginSlice'
// import HomeScreenNavigation that check fro routes in homescreen
import { RootNavigation } from '@navigation/types';
import { AuthNavigation } from '@navigation/types';
// Get device height and width
var deviceHeight:any = Dimensions.get('window').height.toFixed();
var deviceWidth:any = Dimensions.get('window').width;

const LoginScreen = (props:any) => {
  return (
    <View style={{ flex: 1 }}>
      <Content/>
    </View>
  );
};

function Content(props:any){
  const [show, setShow] = React.useState(false);
  const toast = useToast();
  const RootnavigationProp = useNavigation<RootNavigation>(); // check which routes is navigates
  const AuthNavigationProp = useNavigation<AuthNavigation>(); // check which routes is navigates
  
  const [message, setMessage] = React.useState('');
  const [stateLogin, setStateLogin] = React.useState({username:'',password:''});
  const [refreshing, setRefreshing] = React.useState(false);
  const [animating, setAnimating] = useState(false);
  const datalogin = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch()

    const stateChange=(usr:any,ev:any)=>{
      setStateLogin(prev=>({
        ...prev,
        [usr]:ev
      }))
    }

    const GoLogin= async()=>{
      setAnimating(true);
      const dataParams = {
        "username" : stateLogin.username,//"admin@crudbooster.com",
        "password" : stateLogin.password,//"123456"
      };
      const res:any=await axios.post("https://dev2.wakita.id/api/auth", dataParams, {
              headers: {
                token:'asas'
              }
            })
        try {
          const respon=await res.data

          if(respon.success==true){
            console.log(respon.success)
            // console.log(respon.data.user)
            const reduxdata:any={
              isLogin: true,
              token:respon.data.auth.token,
              username: respon.data.user.email,
              name:respon.data.user.name,
              photo:respon.data.user.photo,
              email:respon.data.user.email,
            }
            dispatch(setDataLogin(reduxdata))
            setTimeout(()=>{
              RootnavigationProp.replace(respon.success==true ? 'BottomMenu' : 'Auth')
              setAnimating(false);
              setMessage('')
            },600)

          }else{
            // console.log('Username and Password not match ' + stateLogin.username + ' - '+stateLogin.password )
            toast.show({
              title: "Please Correct Username and Password",
              placement: "bottom"
            })
            setAnimating(false);
            setMessage('Username and Password not match')
          }
        } catch (error) {
          // console.log("ERROR RESPON : "+JSON.stringify(error))
          setMessage('ERROR RESPON')
          setAnimating(false);
        }

    }

    useEffect(()=>{
          console.log('State login Berubah')
    },[animating])

  
        return (
          <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
              {
                animating && <IndicatorLoading animating={animating}/>
              }
            <Flex direction="row" mb="2" mt="-3">
              <VStack space={2}  w='100%'>
                <LinearGradient
                  // colors={['#030e28','#2d3a85','#030e28' ]}
                  colors={['#4594ff52','#4594ff1f','#4594ff52' ]}
                  style={styles.headerBox}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >
                  <VStack space={2} ml="2%" mt="-15%" flexDirection="row" justifyContent="center" justifyItems="center">
                    <Center mt="5%">
                      <Image source={require('../../../assets/images/delivery.png')} ml="23%" width="100%" height="200px" style={{resizeMode: 'contain',aspectRatio: 1}} alt="header image"/>
                    </Center>
                  </VStack>
                  <Center w="100%" mt="-9%">
                    <Text pt="3" style={{fontSize:24,color:'#ffffff',fontWeight:'bold'}}>Online Delivery System</Text>
                  </Center>
                  <Box style={styles.box_circle}>
                  </Box>
                  <Box style={styles.box_circle2}>
                  </Box>
                  <Box style={styles.box_circle3}>
                  </Box>
                  <Box style={styles.box_circle4}>
                  </Box>
              </LinearGradient>
              
              {/* <Box w="100%"  minHeight="600" mt="50%" pt="5"  bg="#ffffff" roundedTopRight="35" roundedTopLeft="35" > */}
              <Box w="100%"  minHeight="600" mt="49%" pt="5" roundedTopRight="35" roundedTopLeft="35" >
                <Center pt="1">
                    <HStack mb="5">
                      <Icon  as={<MaterialIcons name="person-add-alt-1" />} size={7} ml="2" color="muted.100" />
                      <Text pl="1" pt="1" style={{fontSize:20,color:'#ffff',fontWeight:'bold'}}>
                      REGISTER USER</Text>

                    </HStack>
                    {
                      message?<Text style={{color:'#ffd4d4f7',padding:6,borderRadius:10}}>Your Username & Password not Match !</Text>:''
                    }
                    
                </Center>
                    <Box p="3" w="100%">
                      <FormControl isInvalid w="100%" maxW="100%" isRequired>
                        <Input style={styles.inputText} h="50px" variant="rounded" w={{base: "100%",md: "100%"}} InputLeftElement={<Icon as={<MaterialIcons name="how-to-reg" />} size={5} ml="2" color="muted.400" />} placeholder="Enter Email / Username"
                        value={stateLogin.username} onChangeText={(ev)=>stateChange('username',ev)} />

                        <Input style={styles.inputText} h="50px" mt="3" variant="rounded" w={{base: "100%",md: "100%"}} type={show ? "text" : "password"} InputLeftElement={<Icon as={<MaterialIcons name="lock-outline" />} size={5} ml="2" color="muted.400" />} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                        </Pressable>} placeholder="Password" onChangeText={(ev)=>stateChange('password',ev)} value={stateLogin.password}/>
                        
                        <Input style={styles.inputText} h="50px" mt="3" variant="rounded" w={{base: "100%",md: "100%"}} type={show ? "text" : "password"} InputLeftElement={<Icon as={<MaterialIcons name="lock-outline" />} size={5} ml="2" color="muted.400" />} InputRightElement={<Pressable onPress={() => setShow(!show)}>
                          <Icon as={<MaterialIcons name={show ? "visibility" : "visibility-off"} />} size={5} mr="2" color="muted.400" />
                        </Pressable>} placeholder="Re-type New Password" onChangeText={(ev)=>stateChange('password',ev)} value={stateLogin.password}/>

                        {/* <FormControl.Label>   Password</FormControl.Label> */}
                      
                      <Box mt="5">
                            <Button rounded="50"  h="50px" bg="#9dc7ff52" shadow={9} borderColor="#9dc7ff52" borderWidth={2} onPress={GoLogin}> 
                              <HStack space={2} >
                                <Text style={{color:"#ffff"}}>Register New User</Text>
                                <MaterialCommunityIcons name="chevron-right" style={{color:"#ffff"}} size={22} />
                              </HStack>
                            </Button>
                      </Box>
                      </FormControl>
                      <Flex direction="row" justify="center" alignItems="center" mt="5">
                        <View style={{flexDirection: 'row', alignItems: 'center'}}>
                          <View style={{flex: 1, height: 1, backgroundColor: '#8dbdff66'}} />
                            <View>
                              <Text style={{width: 60,color:'#ffff',textAlign: 'center'}}>OR</Text>
                            </View>
                          <View style={{flex: 1, height: 1, backgroundColor: '#8dbdff66'}} />
                        </View>
                      </Flex>
                      <Box mt="3">
                          <Button rounded="55" h="50px" bg="#fc4e2b" borderColor="#fc4e2b" borderWidth={1} shadow={9} onPress={()=>GoLogin()}> 
                            <HStack space={2} >
                              <MaterialCommunityIcons name="google" style={{color:"#ffff"}} size={22} />
                              <Text style={{color:"#ffff"}}>Register With Google</Text>
                            </HStack>
                          </Button>
                      </Box>
                    </Box>

                    <HStack p="3" display="flex" flexDirection="row" justifyContent="space-between">
                      <TouchableOpacity>
                        <Text style={{color:'#c5c5c5'}}>Already have an Acount ? </Text>
                        <Text mt="2" style={styles.bottomText} onPress={() =>AuthNavigationProp.navigate('LoginUser')}>Login here !</Text>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <Text style={{color:'#c5c5c5'}}>Forgot Password ? </Text>
                        <Text style={styles.bottomText} onPress={() =>AuthNavigationProp.navigate('ForgotPassword',{title:'Lupa Password'})}>Click here ! </Text>
                      </TouchableOpacity>
                    </HStack> 
                    
                </Box>
              </VStack>
            </Flex>

            </SafeAreaView>
          </NativeBaseProvider>
        );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        // backgroundColor:'#ffff',
        backgroundColor:'#0960d9'
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
        height:200,
        width:'100%',
        // left:'-15%',
        backgroundColor:'#b2d3ff38',
        position:'absolute',
        borderBottomLeftRadius:90,
        borderBottomRightRadius:90,
        // borderBottomEndRadius:230,
        // borderBottomStartRadius:230,
      },
      bottomText:{
        fontSize:16,
        marginBottom:8,
        color:'#3affed',
        textDecorationLine: "underline",
        textDecorationStyle: "solid",
        textDecorationColor: "#838587"
      },
      contentLists:{
        fontSize:14,
        marginBottom:8,
        color:'#424242'
      },

      box_circle: {
        height:200,width:200,
        // backgroundColor:'#b2d3ff38',
        // backgroundColor:'#0960d9',
        position:'absolute',
        borderRadius:200,
        top:'48%',
        left:'75%',
        zIndex:99
      },
      box_circle2: {
        // backgroundColor:'#4594ff52',
        height:200,width:200,
        position:'absolute',
        borderRadius:300,
        top:'80%',
        left:'26%',
        border:'none',
        shadowColor: "#4594ff52",
        shadowOffset: {
          width: 10,
          height: 10,
        },
        shadowOpacity: 0.51,
        shadowRadius: 13.16,
        elevation: 20,
      },
      box_circle3: {
        height:200,width:200,
        // backgroundColor:'#b2d3ff38',
        backgroundColor:'#4594ff52',
        position:'absolute',
        borderRadius:200,
        top:(deviceHeight/2),
        left:'75%',
        zIndex:99
      },
      box_circle4: {
        height:200,width:200,
        // backgroundColor:'#b2d3ff38',
        backgroundColor:'#4594ff52',
        position:'absolute',
        borderRadius:200,
        // top:'250%',
        top:(deviceHeight/2)+(deviceHeight/3)+10,
        bottom:'0%',
        left:'-35%',
        zIndex:99
      },
      inputText:{
        color:'#dfecff',
        fontSize:16
      }
    });

export default LoginScreen;