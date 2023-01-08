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
  RefreshControl
} from 'react-native';
import { AspectRatio,Text, Pressable, Image, Box,IconButton,Icon, Container, Heading, Center, NativeBaseProvider, VStack, ZStack, HStack, Flex, Spacer, Stack, ScrollView, Divider, FlatList, SectionList, Avatar, Badge, Button, Card, FormControl, Input } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';
import Animated, {
  LightSpeedInLeft, 
  LightSpeedOutRight,
  Layout
} from 'react-native-reanimated';

import { useAppSelector, useAppDispatch } from '@redux/hooks'

// import HomeScreenNavigation that check fro routes in homescreen
import { HomeScreenNavigation } from '@navigation/types';

const wait = (t:any, v:any) => {
  // return new Promise(resolve => setTimeout(resolve, timeout));
  return new Promise(resolve => setTimeout(resolve, t, v));
}

interface KategoriProps {
  numCategory: number,
  title: any
}

const MyCourseScreen = (props:any) => {
  const route = useRoute();
  // const { title } = route.params;

  return (
    <View style={{ flex: 1 }}>
      <Content/>
    </View>
  );
};


  function Content(){
  var Today=moment().format('ddd, MMMM Do YYYY')
  const navigation = useNavigation<HomeScreenNavigation>(); // check which routes is navigates
  const[jam,setJam]=React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const [tab, setTab] = React.useState(0);

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
  
        return (
          <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
              <VStack>
                <Box h="300px" bg="#385bc7">
                  <Text>
                    LOREM IPSUM
                  </Text>
                </Box>
                <Box h="70%" mt="-10%" bg="#ffff" borderTopLeftRadius={55} borderTopRightRadius={55} pt={10} p="5">
                  <Text>
                    LOREM IPSUM
                  </Text>
                </Box>
                <Box>
                  <Text>
                    LOREM IPSUM
                  </Text>
                </Box>
              </VStack>
        </SafeAreaView>
      </NativeBaseProvider>
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
        minHeight: 200,
        width:'100%',
      },
    });

export default MyCourseScreen;