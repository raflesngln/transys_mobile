import React, {useEffect, useRef, useState} from 'react';
import {View, ScrollView, Animated, StyleSheet, StatusBar} from 'react-native';
import { Box, Button, Image,Heading, Text, VStack } from 'native-base';

import {
  useSafeArea,
  SafeAreaView,
  SafeAreaProvider,
  SafeAreaInsetsContext,
  useSafeAreaInsets,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import { useRoute } from '@react-navigation/native';
import CardSkeleton from '@components/CardSkeleton';
import { fetchDogSingle } from '@services/sample_api/fetchSampleData';
import { useQuery } from '@tanstack/react-query';

export const BANNER_H = 360;
export const TOPNAVI_H = 50;


export default function MessageDetail(){
  const route = useRoute();
  const { title }:any = route.params;
  const[img,setImg]=useState('https://cdn2.thedogapi.com/images/hMyT4CDXR.jpg')


  const scrollA = useRef(new Animated.Value(0)).current;

  const setImageHeader=(src:any)=>{
    setImg(src)
  }

  useEffect(() => {
      console.log('kosong')
  }, []);

  const {status,isLoading,isFetching,data,error,refetch} = useQuery(['single_dogs',title], ()=>fetchDogSingle({id:title}));
  
  if (isLoading) return <VStack mt={9} p={2}><CardSkeleton/><CardSkeleton/><CardSkeleton/><CardSkeleton/></VStack>
  if (error) return <Box><Text>{error.message}</Text></Box> 
  if (isFetching) return <VStack mt={9} p={2}><CardSkeleton/><CardSkeleton/><CardSkeleton/><CardSkeleton/></VStack>


    return (
      <View>
        <TopNavigation title={data && data.name} scrollA={scrollA} />
        <Animated.ScrollView
          // onScroll={e => console.log(e.nativeEvent.contentOffset.y)}
          onScroll={Animated.event(
            [{nativeEvent: {contentOffset: {y: scrollA}}}],
            {useNativeDriver: true},
          )}
          scrollEventThrottle={16}
        >
          <View style={styles.bannerContainer}>
            <Animated.Image
              style={styles.banner(scrollA)}
              // source={require('../../../assets/images/banner.jpg')}
              source={{
                uri:data && `https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`
              }}
              // w="90%"
            />
          </View>
          <ContentBodyDetail title={title} imageFetch={(e:any)=>setImageHeader(e)} />
        </Animated.ScrollView>
      </View>
    );
};

const ContentBodyDetail = (props:any) => {

const {status,isLoading,isFetching,data,error,refetch} = useQuery(['single_dogs',props], ()=>fetchDogSingle({id:props.title}));  
  
if (isLoading) return <VStack mt={9} p={2}><CardSkeleton/><CardSkeleton/><CardSkeleton/></VStack>
if (error) return <Box><Text>{error.message}</Text></Box> 
if (isFetching) return <VStack mt={9} p={2}><CardSkeleton/><CardSkeleton/><CardSkeleton/></VStack>

  return (
    <Box>
      {
        data && 
        <VStack p={2}>
          <VStack>
            <Heading>
              <Text style={styles.textContent}>{data.name}</Text>
            </Heading>
            <Box>
              <VStack p={1}  borderBottomColor="gray.300" borderBottomWidth={1}>
                  <Text style={styles.textContent}> ID : </Text>
                  <Text style={styles.textContent}>{data.id}</Text>
              </VStack>
              <VStack p={1}  borderBottomColor="gray.300" borderBottomWidth={1}>
                  <Text style={styles.textContent}> bred_for : </Text>
                  <Text style={styles.textContent}> {data.bred_for}</Text>
              </VStack>
              <VStack p={1}  borderBottomColor="gray.300" borderBottomWidth={1}>
                  <Text style={styles.textContent}> group : </Text>
                  <Text style={styles.textContent}> {data.breed_group}</Text>
              </VStack>
              <VStack p={1}  borderBottomColor="gray.300" borderBottomWidth={1}>
                  <Text style={styles.textContent}> life_span : </Text>
                  <Text style={styles.textContent}> {data.life_span}</Text>
              </VStack>
              <VStack p={1}  borderBottomColor="gray.300" borderBottomWidth={1}>
                  <Text style={styles.textContent}> temperament : </Text>
                  <Text style={styles.textContent}> {data.temperament}</Text>
              </VStack>
              <VStack p={1}  borderBottomColor="gray.300" borderBottomWidth={1}>
                  <Text style={styles.textContent}> life_span : </Text>
                  <Text style={styles.textContent}> {data.life_span}</Text>
              </VStack>
              <VStack p={1}  borderBottomColor="gray.300" borderBottomWidth={1}>
                  <Text style={styles.textContent}> origin : </Text>
                  <Text style={styles.textContent}> {data.origin}</Text>
              </VStack>
              <VStack p={1}  borderBottomColor="gray.300" borderBottomWidth={1}>
                  <Text style={styles.textContent}> Image : </Text>
                  <Text style={styles.textContent}> {`https://cdn2.thedogapi.com/images/${data.reference_image_id}.jpg`}</Text>
              </VStack>
              <VStack p={1}  borderBottomColor="gray.300" borderBottomWidth={1}>
                  <Text style={styles.textContent}> weight : </Text>
                  <Text style={styles.textContent}> {`${data.weight.imperial}`}</Text>
                  <Text style={styles.textContent}> {`${data.weight.metric}`}</Text>
              </VStack>
              <VStack p={1}  borderBottomColor="gray.300" borderBottomWidth={1}>
                  <Text style={styles.textContent}> height : </Text>
                  <Text style={styles.textContent}> {`${data.height.imperial}`}</Text>
                  <Text style={styles.textContent}> {`${data.height.metric}`}</Text>
              </VStack>
            </Box>
          </VStack>
           
        </VStack>
      }
    <Text style={{color:'#000',fontSize:16,margin:10}}>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus nec
      semper turpis. Ut in fringilla nisl, sit amet aliquet urna. Donec
      sollicitudin libero sapien, ut accumsan justo venenatis et. Proin iaculis
      ac dolor eget malesuada. Cras commodo, diam id semper sodales, tortor leo
      suscipit leo, vitae dignissim velit turpis et diam. Proin tincidunt
      euismod elit, at porttitor justo maximus vel. Proin viverra, nibh non
      accumsan sollicitudin, arcu metus sagittis nunc, et tempor tellus ligula
      et justo. Pellentesque ultrices fermentum efficitur. Lorem ipsum dolor sit
      amet, consectetur adipiscing elit. Praesent nec convallis nisl, et rhoncus
      mauris. Morbi consequat sem tellus, in scelerisque lorem vehicula ut.
      {'\n\n'}Nam vel imperdiet massa. Donec aliquet turpis quis orci fermentum,
      eget egestas tellus suscipit. Sed commodo lectus ac augue mattis, a
      pulvinar metus venenatis. Vestibulum cursus rhoncus mauris, fringilla
      luctus risus eleifend ut. Vestibulum efficitur imperdiet scelerisque.
      Pellentesque sit amet lorem bibendum, congue dolor suscipit, bibendum est.
      Aenean leo nibh, varius vel felis nec, sagittis posuere nunc. Vestibulum
      ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia
      curae; Duis ullamcorper laoreet orci, ac tempus dui aliquet et. Morbi
      porta nisi sed augue vestibulum tristique. Donec nisi ligula, efficitur at
      arcu et, sagittis imperdiet urna. Sed sollicitudin nisi eget pulvinar
      ultricies. Ut sit amet dolor luctus massa dapibus tincidunt non posuere
      odio. Aliquam sit amet vehicula nisi.
    </Text>
    
    </Box>
  );
};

const TopNavigation = (props:any) => {
  const safeArea = useSafeAreaInsets();

  const {title, scrollA} = props;
  const isFloating = !!scrollA;
  const [isTransparent, setTransparent] = useState(isFloating);

  useEffect(() => {
    if (!scrollA) {
      return;
    }
    const listenerId = scrollA.addListener((a:any) => {
      const topNaviOffset = BANNER_H - TOPNAVI_H - safeArea.top;
      isTransparent !== a.value < topNaviOffset &&
        setTransparent(!isTransparent);
    });
    return () => scrollA.removeListener(listenerId);
  });

  return (
    <>
      <StatusBar
        barStyle={isTransparent ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
        translucent
      />
      <View style={styles.container(safeArea, isFloating, isTransparent)}>
        <Text style={styles.title(isTransparent)}>{title}</Text>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
// const styles = {
  bannerContainer: {
    marginTop: -1000,
    paddingTop: 1000,
    alignItems: 'center',
    overflow: 'hidden',
  },
  banner: (scrollA:any) => ({
    height: BANNER_H,
    width: '150%',
    transform: [
      {
        translateY: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [-BANNER_H / 2, 0, BANNER_H * 0.75, BANNER_H * 0.75],
        }),
      },
      {
        scale: scrollA.interpolate({
          inputRange: [-BANNER_H, 0, BANNER_H, BANNER_H + 1],
          outputRange: [2, 1, 0.5, 0.5],
        }),
      },
    ],
  }),
  container: (safeArea:any, isFloating:any, isTransparent:any) => ({
    paddingTop: safeArea.top,
    marginBottom: isFloating ? -TOPNAVI_H - safeArea.top : 0,
    height: TOPNAVI_H + safeArea.top,
    justifyContent: 'center',
    shadowOffset: {y: 0},
    backgroundColor: isTransparent ? '#0001' : '#FFF',
    shadowOpacity: isTransparent ? 0 : 0.5,
    elevation: isTransparent ? 0.01 : 5,
    zIndex: 100,
  }),
  title: (isTransparent:any) => ({
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
    color: isTransparent ? '#FFF' : '#000',
  }),
  textContent:{
    color:'#000'
  }
});

// export default MessageDetail;