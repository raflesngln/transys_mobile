import { useRoute } from '@react-navigation/native';
import React,{useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  SafeAreaView,
  Dimensions,
  View,
  Text,
  Pressable,
  StatusBar,
  StyleSheet,
  useColorScheme,
  Animated,
  TouchableOpacity,
  RefreshControl
} from 'react-native';
import { AspectRatio, Image, Box, Container, Heading, Center, NativeBaseProvider, VStack, HStack, Flex, Spacer, Stack, ScrollView, Divider, FlatList, SectionList, Avatar, Badge, Button, Input, Icon } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';
import {TextCustom} from '@components/TextCustom';
import { useAppSelector, useAppDispatch } from '@redux/hooks'

import Header from '@components/Header'
// import HomeScreenNavigation that check fro routes in homescreen
import { HomeScreenNavigation } from '@navigation/types';
import COLORS from '@config/colors';
import CardSkeleton from 'components/CardSkeleton';
import LayoutBackground from '@components/LayoutBackground';

var deviceHeight:any = Dimensions.get('window').height.toFixed();
const scrollOffset = new Animated.Value(0);

const wait = (t:any, v:any) => {
  // return new Promise(resolve => setTimeout(resolve, timeout));
  return new Promise(resolve => setTimeout(resolve, t, v));
}

const DetailProduct = ({ route, navigation }:any) => {
  // const route = useRoute();
  const[detail,setDetail]=useState<undefined|any>({})
  // const{id, name} = route.params;


  const SearchData=()=>{
    console.log('DATASSS')
  }

  
  useEffect(() => {
    async function getdata(){
      let response=await fetch(`https://dummyjson.com/products/1}`)
      const respon=await response.json();
      setDetail(respon)
    }
    getdata()
  }, []);


  return (
    <LayoutBackground>
    <View style={{ flex: 1 }}>
      <NativeBaseProvider>
        <SafeAreaView style={styles.container}>
        <Header bg={COLORS.transparant100} isBack={false}
            rightmenu={
              <Box>
                <HStack space={3}>
                <Box pl="1"><Button bg={COLORS.teal300}  h="42" w="42" variant="subtle" size="sm" rounded='full'><MaterialCommunityIcons name="file-image" color='#ffff' size={20} /></Button></Box>
                <Box pl="1"><Button bg={COLORS.teal300}  h="42" w="42" variant="subtle" size="sm" rounded='full'><MaterialCommunityIcons name="car-light-high" color='#ffff' size={20} /></Button></Box>
                </ HStack>
              </Box>
            }
          />
          <VStack w="94%" ml="3%" justifyContent="center">
            <Box pl="35%" mt="12%">
              <Heading>
                <Text style={{color:COLORS.white200}}>BARCODE</Text>
              </Heading>
            </Box>
            <Box bg={COLORS.black400} h={deviceHeight/1.8} borderRadius="10" mt="12%">
              <Text style={{color:'#4d85ff'}}>.</Text>
            </Box>
            {/* <VStack mt={9}>
              <CardSkeleton/>
              <CardSkeleton/>
            </VStack> */}
          </VStack>
            </SafeAreaView>
          </NativeBaseProvider>
    </View>
    </LayoutBackground>
  );
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
        // height: deviceHeight/2,
        height: 60,
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
        fontSize:18,
        marginBottom:5
      },
      cardTitle: {
        color:'#094deb',
        fontWeight: '500',
        fontSize:14,
        marginBottom:3
      },
      titlePrice:{
        fontSize:18,
        marginBottom:5,
        fontWeight:'bold',
        color:'#eb8509'
      },
    });

export default DetailProduct;