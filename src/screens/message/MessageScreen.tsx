import { useRoute } from '@react-navigation/native';
import React,{useEffect,useState}  from 'react';
import { useNavigation } from '@react-navigation/native';
import { color } from 'native-base/lib/typescript/theme/styled-system';
import {
  SafeAreaView,
  Dimensions,
  StatusBar,
  StyleSheet,
  Animated,
  useWindowDimensions ,
  TouchableOpacity,
  useColorScheme,
  RefreshControl
} from 'react-native';
import { View,Text,AspectRatio, Pressable, Image, Box, Container, Heading, Center, NativeBaseProvider, VStack, ZStack, HStack, Flex, Spacer, Stack, ScrollView, Divider, FlatList, SectionList, Avatar, Badge, Button } from 'native-base';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient'
import moment from 'moment';
import { useQuery,useInfiniteQuery } from '@tanstack/react-query';
import COLORS from '@config/colors'

import { TabView,TabBar, SceneMap } from 'react-native-tab-view';
import { useAppSelector, useAppDispatch } from '@redux/hooks'

// import HomeScreenNavigation that check fro routes in homescreen
import { HomeScreenNavigation } from '@navigation/types';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { FlashList } from '@shopify/flash-list';

import {fetchDogs, fetchPokemon,fetchDogsInfinity} from '@services/sample_api/fetchSampleData';
import { fetchDogsKEY,fetchPokemonKEY } from '@services/variableKEY';
import DogCard from '@components/DogCard';
import CardSkeleton from '@components/CardSkeleton';


const DetailScreen = (props:any) => {
  const route = useRoute();
  // const { title } = route.params;

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
    let screenHeight = Dimensions.get('window').height;
    const navigation = useNavigation<any>();

  const[jam,setJam]=React.useState(null);
  const [refreshing, setRefreshing] = React.useState(false);
  const datalogin = useAppSelector((state) => state.login)
  const dispatch = useAppDispatch()


  
        return (
          <NativeBaseProvider>
            <SafeAreaView style={styles.container}>
            <VStack space={2}  w='100%'>
                <LinearGradient
                  colors={[COLORS.gradient1,COLORS.gradient2,COLORS.gradient3]}
                  style={styles.headerBox}
                  start={{ x: 0, y: 0 }}
                  end={{ x: 1, y: 1 }}
                >

                    <HStack p="2" pt="3" display="flex" flexDirection="row" justifyContent="space-between">
                        <Box mt="2">
                        <Text style={{color:'#ffff',fontWeight:'600',fontSize:22}}><MaterialCommunityIcons name="chat-processing-outline" color='#bfe0ce' size={20} /> Message's</Text>
                      </Box>
                      <HStack space={2}>
                        <Box pl="1"><Button onPress={() => navigation.navigate('MessageStack' as never,{ screen: 'MessageSearch', params: {title:'Message Search' } })} bg="#545b83"  h="42" w="42" variant="subtle" size="sm" rounded='full'><MaterialIcons name="search" color='#ffff' size={20} /></Button></Box>
                        <Box pl="1"><Button onPress={() => navigation.navigate('MessageStack' as never,{ screen: 'MessageNotif', params: {title:'Message Notif' } })} bg="#545b83"  h="42" w="42" variant="subtle" size="sm" rounded='full'><MaterialIcons name="notifications-none" color='#ffff' size={20} /></Button></Box>
                        <Box pl="2">
                        <Avatar bg="green.500" alignSelf="center" size="50px" source={{
                              uri: "https://hris.att-group.co.id/assets/images/karyawan/F01A-150885933/tmp/F01A-150885933-26102021134633.jpeg"
                            }}>
                            AJ
                        </Avatar>
                        </Box>
                      </HStack>
                    </HStack>
              </LinearGradient>
              <Box mt="-10%">
                <TabMenu/>
              </Box>
            </VStack>
        </SafeAreaView>
      </NativeBaseProvider>
        );
    };

const FirstRoute = () => (
    <VStack style={{flex:1}} mt={5} p="2"  bg="coolGray.200" roundedTopRight="22" roundedTopLeft="22" roundedBottomRight="8" roundedBottomLeft="8" shadow={5}>
      <Box h="80%" w="100%" mb="50">
        <DogListsItems />
      </Box>
      <Box h="20%" mt="15%" >
      </Box>
    </VStack>
);
const SecondRoute = () => (
    <VStack   style={{flex:1}} p="2" pt="2">
    <Box h="80%" w="100%" mb="50">
      <PokemonData />
    </Box>
    <Box h="20%" mt="10%" bg="#000" >
    </Box>
  </VStack>
);
const ThirdRoute = () => (
    <VStack   style={{flex:1}} p="2" pt="2">
    <Box h="80%" w="100%" mb="50">
      <GetDogsInfinity />
    </Box>
    <Box h="20%" mt="10%" bg="#000" >
    </Box>
  </VStack>
);



// type AppProps = {}
const renderScene = SceneMap({
  first: FirstRoute,
  second: SecondRoute,
  third: ThirdRoute,
});


function TabMenu() {
  const layout = useWindowDimensions();

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Private' },
    { key: 'third', title: 'Group' },
  ]);

  return (
    <View style={{height: layout.height,paddingLeft:5,paddingRight:5}}>
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={props => <TabBar {...props} 
                    indicatorStyle={{ backgroundColor: '#00fff5',height:3,bottom:1,width:'25%',marginLeft:'2%' }}
                    style={{backgroundColor:'#3e8eab',borderRadius:10,borderColor:'#3e8eab',borderWidth:1}}
                    renderLabel={({ route, focused, colora }:any) => (
                          <Text style={{color:colora,margin: 5}}>
                              {route.title}
                          </Text>
                      )}
                    />
                  }
      />
      </View>
  );
}

function DogListsItems(props:any): JSX.Element {
  const redux_profile = useAppSelector((state:any) => state.login)
  const[dogs,setDogs]=useState<any>('')
  const [onrefreshing, setOnRefreshing] = React.useState(false);

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

    const {status,isLoading,data,error,refetch} = useQuery([fetchDogsKEY,dogs], ()=>fetchDogs({limit:10,page:1}
      ));
    
  if (isLoading) return <VStack mt={9}><CardSkeleton/><CardSkeleton/><CardSkeleton/></VStack>
  if (error) return <Box><Text>{error.message}</Text></Box> 

    return (
      <SafeAreaView style={{ flex: 1 }}>
          <FlashList
            keyExtractor={(item:any) => item.id}
            data={data}
            renderItem={({ item }) => <DogCard ListItems={item} />}
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

function PokemonData(props:any): JSX.Element {
  const redux_profile = useAppSelector((state:any) => state.login)
  const[dogs,setDogs]=useState<any>('')
  const [onrefreshing, setOnRefreshing] = React.useState(false);

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

    // const {error,refetch, data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage} = useQuery([fetchDogsKEY2,dogs], ()=>fetchPokemon({pageParam:''}),{getNextPageParam: (lastPage:any) => lastPage.nextPage});

    const {
      error,
      refetch,
      data,
      isLoading,
      fetchNextPage,
      hasNextPage,
      isFetchingNextPage
    } = useInfiniteQuery([fetchPokemonKEY], fetchPokemon, {
      getNextPageParam: (lastPage:any) => lastPage.nextPage
    });

    
  if (isLoading) return <VStack mt={9}><CardSkeleton/><CardSkeleton/><CardSkeleton/></VStack>
  if (error) return <Box><Text>{error.message}</Text></Box> 

    return (
      <SafeAreaView style={{ flex: 1,marginBottom:10 }}>
        <ScrollView h="98%" w="100%" style={{flex:1}}>
            {isLoading ? (
              <Box><Text>loading...</Text></Box>
            ) : (
              <Box>
                <Stack space={2} borderRadius={6}>
                  {data.pages.map((group:any, i:number) =>
                    group.response.map((pokemon:any) =>{
                      return <Box bg="#ffff" p={2} borderRadius={6}>
                        <VStack>
                          <Text>{pokemon.name}</Text>
                          <Text>{pokemon.url}</Text>
                        </VStack>
                      </Box>
                    })
                  )}
                </Stack>
                <Stack mt={5}>
                    <Button borderRadius={50}
                      onPress={() => fetchNextPage()}
                      // disabled={!hasNextPage || isFetchingNextPage}
                    >
                      {isFetchingNextPage
                        ? "Loading more..."
                        : hasNextPage
                        ? "Load More"
                        : "Nothing more to load"}
                    </Button>
                </Stack>
              </Box>
            )}
        
        </ScrollView>
        
          {/* <FlashList
            keyExtractor={(item:any) => item.id}
            data={data}
            renderItem={({ item }) => <DogCard ListItems={item} />}
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
            /> */}
        <Box h="3%" bg="transparent">
          <Text>...</Text>
        </Box>
      </SafeAreaView>
    )
}

function GetDogsInfinity(props:any): JSX.Element {
  const [onrefreshing, setOnRefreshing] = React.useState(false);

  const onRefreshData = React.useCallback(() => {
    refetch();
    console.log('Get Refresh datas')
    setOnRefreshing(true);
    setTimeout(() => {
      setOnRefreshing(false)
    }, 2000)
  }, []);



  const {refetch, data, isLoading, isError, hasNextPage, fetchNextPage } =fetchDogsInfinity();
  
  if (isLoading) return <Text>Loading...</Text>;
  if (isError) return <Text>An error occurred while fetching data</Text>;

  const flattenData = data.pages.flatMap((page:any) => page.data);

  const loadNext = () => {
    setOnRefreshing(true);
    console.log('GET More Data DOGS')
    if (hasNextPage) {
      fetchNextPage();
    }
    setTimeout(() => {
      setOnRefreshing(false)
    }, 3000)
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <FlashList
        keyExtractor={(item:any) => item.id}
        data={flattenData}
        renderItem={({ item }) => <DogsCard dog={item} />}
        onEndReached={loadNext}
        estimatedItemSize={100}
        onEndReachedThreshold={0.3}
        // onEndReached={()=>loadNextPageData()}
        refreshControl={
            <RefreshControl
              refreshing={onrefreshing}
              onRefresh={()=>onRefreshData()}
              tintColor="#f7054e" // for IOS
              titleColor='#f7054e'
              colors={["#f7054e","#ff4a80"]} // for android
            />
          }
      />
    </SafeAreaView>
  );

}

const DogsCard = ({ dog }) => {
  const navigation = useNavigation<any>();

  return (
    <TouchableOpacity onPress={() => navigation.navigate('MessageStack' as never,{ screen: 'DetailMessage', params: {title:dog.id } })}>

    <Box>
      <VStack borderColor="#DCDCDC" bg="#ffff" borderBottomWidth={1} p={1} pl={2} pb={3} mt={5}>
        <HStack space={3}>
          <Box w="18%">
            <Image source={{ uri: dog.image.url }} style={styles.pic} alt="anjing"/>
          </Box>
          <VStack w="82%">
            <Text style={{fontSize:16,fontWeight:'bold'}}>{dog.name}</Text>
            <Text >{dog.life_span}</Text>
          </VStack>
        </HStack>
      </VStack>
    </Box>
    </TouchableOpacity>
  );
};


    const styles = StyleSheet.create({
      container: {
        flex: 1,
      },
      scene: {
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
        minHeight: 120,
        width:'100%',
      },

      pic: {
        borderRadius: 60,
        width: 60,
        height: 60,
      },
    });

export default DetailScreen;