import { useRoute } from '@react-navigation/native';
import React,{FC, useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  SafeAreaView,
  Dimensions,
  View,
  StatusBar,
  StyleSheet,
  useColorScheme,
  TouchableOpacity,
  RefreshControl,
  PermissionsAndroid,
  PixelRatio,
  Platform
} from 'react-native';
import { AspectRatio,Text, Pressable, Image, Box,IconButton,Icon, Container, Heading, Center, NativeBaseProvider, VStack, ZStack, HStack, Flex, Spacer, Stack, ScrollView, Divider, FlatList, SectionList, Avatar, Badge, Button, Card, FormControl, Input, useDisclose, Actionsheet, Select, CheckIcon, TextArea, useToast } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';
import Animated, {
  LightSpeedInLeft, 
  LightSpeedOutRight,
  Layout
} from 'react-native-reanimated';
import COLORS from '@config/colors'
import { getAll,create as createData } from 'services/shipment/shipmentService'

var deviceHeight:any = Dimensions.get('window').height;
var deviceWidth:any = Dimensions.get('window').width;

import DateTimePicker, { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';

import {
  launchCamera,
  launchImageLibrary
} from 'react-native-image-picker';
import { useAppSelector, useAppDispatch } from '@redux/hooks'

// import HomeScreenNavigation that check fro routes in homescreen
import { HomeScreenNavigation } from '@navigation/types';
import Header from '@components/Header';
import SpinnerLoad from '@components/SpinnerLoad';
import { useQuery,useMutation } from '@tanstack/react-query';
import { fetchJobListKEY } from '@services/variableKEY';
import IndicatorLoading from '@components/indicatorLoading';
import Progressing from '@components/Progressing';
import LayoutBackground from '@components/LayoutBackground';

const wait = (t:any, v:any) => {
  // return new Promise(resolve => setTimeout(resolve, timeout));
  return new Promise(resolve => setTimeout(resolve, t, v));
}

interface KategoriProps {
  numCategory: number,
  title: any
}

const InputJobs = (props:any) => {
  const route = useRoute();
  // const { title } = route.params;

  return (
    <LayoutBackground>
      <Content/>
    </LayoutBackground>
  );
};


  function Content(){
  var Today=moment().format('ddd, MMMM Do YYYY')
  const navigation = useNavigation<HomeScreenNavigation>(); // check which routes is navigates
  const[jam,setJam]=React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tab, setTab] = React.useState(0);
  const [saveForm, setSaveForm] = React.useState(false);
  

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
  
    const saveDataFromComplete=(e: any)=>{
      setTimeout(() => {
        setSaveForm(false)
      }, 400);
      console.log('complete')
    }
    
    const saveDataFrom=(): void => {
      setSaveForm(true)
      console.log('running save')
    }

        return (
          <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
            <Header bg={COLORS.transparant100}
                  midmenu={
                    <Box w="70%">
                      <Center>
                      <Text style={{color:'#ffff'}}>Input New Shipment</Text>
                      </Center>
                    </Box>
                  }
                  rightmenu={
                    <TouchableOpacity disabled={saveForm} onPress={saveDataFrom}>
                    <HStack bg={saveForm?COLORS.ButtonDisable:COLORS.mint200}  p={3} borderRadius={18}>
                      <Text color="#fff">SAVE </Text>
                      {/* <Text><MaterialIcons name="check-circle-outline" color='#fff' size={20} /></Text> */}
                      <Text><MaterialIcons name="save-alt" color='#fff' size={18} /></Text>
                    </HStack>
                    </TouchableOpacity>
                  }
                />

              {/* <Flex w='100%' justifyContent="space-between" minH="98%"> */}
              <Flex w='100%' bg="#ffff" pt="-5%">
                <ScrollView contentContainerStyle={{ flexGrow: 1 }}  p="2" pt="-5" pb="30" maxH="95%" minH="95%">
                  <VStack w="100%">
                    <Box>
                      <Inputan save_data_complete={(e:any)=>saveDataFromComplete(e)} is_save_data={saveForm}/>
                    </Box>

                  </VStack>
                </ScrollView>
                {/* <Box h="10%" mt="-1" minH="10%" pb={2} pt={2} pl={3} pr={3} bg="#ffff" borderColor="gray.300" borderWidth={1}>
                    <HStack space={2} justifyContent="flex-end">
                      <TouchableOpacity onPress={()=>saveDataFrom()}>
                      <HStack bg="#0ec98e" p={3} pl={5} pr={5} borderRadius={10}>
                        <Text color="#fff">Simpan Data </Text>
                        <Text><MaterialIcons name="save" color='#fff' size={20} /></Text>
                      </HStack>
                      </TouchableOpacity>

                      <TouchableOpacity>
                      <HStack bg="#0ec98e" p={3} pl={5} pr={5} borderRadius={10}>
                        <Text color="#fff">Next Input </Text>
                        <Text><MaterialIcons name="arrow-right-alt" color='#fff' size={20} /></Text>
                      </HStack>
                      </TouchableOpacity>
                    </HStack>
                </Box> */}

                <SafeAreaView style={{height:'5%',marginTop:20}}>
                  

                </SafeAreaView>
              </Flex>
        </SafeAreaView>
      </NativeBaseProvider>
        );
    };

  function Inputan(props:any): JSX.Element {
    const toast = useToast();
    const redux_profile = useAppSelector((state:any) => state.login)
    const [loading, setLoading] = useState(false);
    const [loadingsave, setLoadingSave] = useState(false);
    const [datePicker, setDatePicker] = useState(false);
    const [date, setDate] = useState(new Date());
    const tanggal=moment(date).format('YYYY-MM-DD')
    const [cameracrop, setCameraCrop] = useState<any>([]);
    const [camerabase64, setCamerabase64] = useState<any>([]);
    const [airlines, setAirlines] = React.useState("");
    const [postResult, setPostResult] = useState<any | null>(null);
    // const [inputData, setInputData] = useState<any | null>(
    const [inputData, setInputData] = useState<any | null>({
      pid:'',
      date:'',
      mawb:'',
      airlines:'',
      shipper:'',
      consignee:'',
      remark:'',
      image_1:'',
      image_2:'',
      image_3:'',
      bulk:[{
        pid:'',
        pid_header:'pid001',
        item_code:'12345678',
        colly:6,
        weight:77,
        commodity:'fruits'
      }],
    });

  function showDatePicker() {
    setDatePicker(!datePicker);
  };
 
  function onDateSelected(event:any, value:any) {
    setDatePicker(!datePicker);
    setDate(value);
  };

    
    const selectFiles=(title:any)=> {
      if(title=='file'){
        selectFromGallery()
      }else{
        selectFromCamera()
      }
      
  }


    const selectFromGallery=()=> {
      setLoading(true)
      // throw new Error('Function not implemented.');
      ImagePicker.openPicker({
        // width: 300,
        // height: 400,
        // cropping: false,
        sortOrder: 'desc',
        includeBase64: true,
        // includeExif: true,
        multiple: true,
      }).then(image => {
          setCameraCrop([]);
          // console.log(image);
          image.forEach(function (itm:any, idx:any) {
            setCameraCrop((prev:any) => [...prev, itm.path]);
          });
          image.forEach(function (itm:any, idx:any) {
            setCamerabase64((prev:any) => [...prev, itm.data]);
          });
          setTimeout(() => {setLoading(false)},300);
      })
      .catch(error => {
        console.log('Canceled')
      });
    }

    const selectFromCamera=()=>{
      setLoading(true)
      ImagePicker.openCamera({
        // includeBase64:true,
        includeBase64:true,
        width: 300,
        height: 400,
        mediaType: 'photo',
        // cropping: true,
      }).then(image => {
        // console.log(image);
        setTimeout(() => {setLoading(false)},300);
        setCameraCrop((prev:any) => [...prev, image.path]);
        setCamerabase64((prev:any) => [...prev, image.data]);
      })
      .catch(error => {
        console.log('Canceled')
      });
    }


const fortmatResponse = (res: any) => {
  return JSON.stringify(res, null, 2);
};

const { isLoading: isPostLoading,mutate:postDataForm  } = useMutation(
  async () => {
    return await createData(
      {
        token: redux_profile.dataLogin.token,
        data: inputData,
        image_1:(camerabase64[0]?camerabase64[0]:''),
        image_2: (camerabase64[1]?camerabase64[1]:''),
        image_3: (camerabase64[2]?camerabase64[2]:'')
      });
  },
  {
    onSuccess: (res:any) => {
      setPostResult(fortmatResponse(res));
      console.log('Success save data2')
      setLoadingSave(false)
      toast.show({title: "Berhasil SImpan data",placement: "bottom"})
      completeSaveData()
      // clearPostData()
    },
    onError: (err: any) => {
      setPostResult(fortmatResponse(err.response?.data || err));
      console.log('err save dataZ')
      toast.show({title: "Gagal Simpan data",placement: "bottom"})
      setLoadingSave(false)
    },
  }
);

const savePostData=()=> {
  try {
    setInputData((prev:any)=>({...prev,airlines:airlines,date:tanggal}))
    setTimeout(() => {
      postDataForm();
    }, 300);
    setLoadingSave(true)
  } catch (err) {
    setPostResult(fortmatResponse(err));
    console.log('err save datass')
    setLoadingSave(false)
  }
}

const changeStateInput = (nama:any,e:any) => {
  setInputData((prev:any)=>({
    ...prev,
    [nama]:e
  }))
};

const clearPostData = () => {
  setPostResult(null);
};
const completeSaveData = () => {
  props.save_data_complete(false);
};

const deleteImageCrop=(i:any)=>{
  let filterImage=cameracrop.filter((_:any,index:any)=>index!=i)
  console.log('delete index '+filterImage)  
  setCameraCrop(filterImage)
}

useEffect(() => {
  if (isPostLoading){
    setPostResult("Loading Save Data...");
    setLoadingSave(true)
  }
  if(props.is_save_data==true){
    console.log('sedang simpan')
    savePostData() //trigger aksi simpan dari luar dari component ini, then if complete update props with function completeSaveData()
  }
}, [isPostLoading,props.is_save_data]);

      return <>
            {
              loadingsave && <IndicatorLoading bgcolor="#03a9f457" color="#03a9f4" secondary='#dff3fb'/>
            }
          <Center w="100%" mt="-5">
          <Box safeArea p="2" w="100%" maxW="100%" py="8">
            <VStack space={3} mt="5">
              <Center>
                <Text>INPUT DATA</Text>
                {/* <Text>{JSON.stringify(inputData)}</Text> */}
              </Center>
              <FormControl>
                <FormControl.Label>NO</FormControl.Label>
                <Input onChangeText={(e)=>changeStateInput('pid',e)} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Date </FormControl.Label>
                <TouchableOpacity onPress={()=>showDatePicker()}>
                 <Input type="text" onFocus={()=>showDatePicker()} isReadOnly={true} value={tanggal}/>
                </TouchableOpacity>
              </FormControl>
              <FormControl>
                <FormControl.Label> MAWB</FormControl.Label>
                <Input type="text" onChangeText={(e)=>changeStateInput('mawb',e)} />
              </FormControl>
              <FormControl>
                <FormControl.Label> Airlines</FormControl.Label>
                {/* <Input type="text" /> */}
                <Box maxW="100%">
                  <Select selectedValue={airlines} minWidth="200"  accessibilityLabel="Choose Service" placeholder="Choose Service" _selectedItem={{
                  bg: "teal.600",
                  endIcon: <CheckIcon size="5" />
                }} mt={1} onValueChange={itemValue => setAirlines(itemValue)}>
                    <Select.Item label="Garuda" value="garuda" />
                    <Select.Item label="Lion Air" value="Lion Air" />
                    <Select.Item label="Batik Air" value="Batik Air" />
                  </Select>
                </Box>
              </FormControl>
              <FormControl>
                <FormControl.Label> Shipper</FormControl.Label>
                <Input type="text" onChangeText={(e)=>changeStateInput('shipper',e)} />
              </FormControl>
              <FormControl>
                <FormControl.Label> Consignee</FormControl.Label>
                <Input type="text" onChangeText={(e)=>changeStateInput('consignee',e)} />
              </FormControl>
              <FormControl>
                <FormControl.Label>Remark</FormControl.Label>
                <TextArea h={20} placeholder="remark" w="100%"  autoCompleteType={undefined} onChangeText={(e)=>changeStateInput('remark',e)} />
              </FormControl>
              <FormControl>
                <FormControl.Label> Attachment</FormControl.Label>
                <VStack space={2}>
                  <HStack space={2}>
                  <Box>
                    <ActionSheetAttachment action={(e:any)=>selectFiles(e)}/>
                  </Box>
                  </HStack>

                  <VStack space={3}>
                    {/* <Text>{JSON.stringify(cameracrop)} </Text> */}
                      {/* <Image source={require('../../../assets/images/banner.jpg')} alt="my files" h="150" w="150"/> */}
                      {
                        loading && <SpinnerLoad size="lg"/>
                      }
                      <ScrollView horizontal={true} w="100%">
                    <HStack>
                      {
                        cameracrop?
                        cameracrop.map((val:any,i:any)=>{
                          return <HStack key={i} ><Image source={{uri: val}} alt="my files" h="90" w="90" borderColor="#000" borderWidth={1} m="2" borderRadius={4} />
                          <TouchableOpacity onPress={()=>deleteImageCrop(i)}><Text h={28 / PixelRatio.getFontScale()} w={28 / PixelRatio.getFontScale()} ml="-6" p="1" bg={COLORS.danger500} borderRadius={40}><MaterialIcons name="close" color='#fff' size={20} /></Text></TouchableOpacity></HStack>
                        })
                        :''
                      }
                    </HStack>
                    </ScrollView>
                  </VStack>

                  {/* <Box>
                    <Text>{JSON.stringify(postResult)}</Text>
                    <Button onPress={()=>savePostData()}>SIMPAN DATA ReactQuery</Button>
                  </Box> */}
                  <Box>
                      <Text>{JSON.stringify(postResult)}</Text>
                  </Box>
                  
                </VStack>
              </FormControl>
            </VStack>
          </Box>
          
          <View>
            {datePicker && (
                <DateTimePicker
                  value={date}
                  mode={'date'}
                  display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                  is24Hour={true}
                  onChange={onDateSelected}
                  style={styles.datePicker}
                />
              )}
        </View>
      </Center>
      </>
    };



    function ActionSheetAttachment(props:any):JSX.Element {
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
      
      const aksi=(arg: string): void=>{
        props.action(arg)
      }

      return <Center >
    <Button variant="subtle" onPress={onOpen} h="42" w="150" size="sm">
      <HStack justifyContent="space-between">
        <Text><MaterialIcons name="image" color='#000' size={15} /></Text>
        <Text> Select Picture</Text>
      </HStack>
    </Button>

      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator={false} >
        <Actionsheet.Content mb="-8%" pb="10" justifyContent='flex-start'>
          <Box  pt="5" mb="8" borderBottomColor="gray.300" borderBottomWidth={1}>
            <Text style={{color:"#000",fontSize:20,fontWeight:'bold'}}>Insert Image</Text>
          </Box>
          <Actionsheet.Item onPress={()=>{aksi('file');onClose()}} startIcon={<Icon as={MaterialIcons} name="image" size="6" />} style={{borderBottomColor:"#dedad9",borderBottomWidth:1}}>From Gallery</Actionsheet.Item>
          <Actionsheet.Item onPress={()=>{aksi('camera');onClose()}} startIcon={<Icon as={MaterialIcons} name="linked-camera" size="6" />} style={{borderBottomColor:"#dedad9",borderBottomWidth:1,marginBottom:20}}>From Camera</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>;
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
      headerTittle: {
        fontSize:25,
        color:'#ffff',
        fontWeight:'bold'
      },
      titleText: {
        fontSize: 22,
        fontWeight: 'bold',
        textAlign: 'center',
        paddingVertical: 20,
      },
      textStyle: {
        padding: 10,
        color: 'black',
        textAlign: 'center',
      },
      buttonStyle: {
        alignItems: 'center',
        backgroundColor: '#DDDDDD',
        padding: 5,
        marginVertical: 10,
        width: 250,
      },
      imageStyle: {
        width: 200,
        height: 200,
        margin: 5,
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

export default InputJobs;