import React from 'react'
import { ActivityIndicator, Dimensions, StyleSheet, View,TouchableOpacity,TouchableHighlight  } from 'react-native';
import { AspectRatio,Card,Text, Pressable, Image, Box, Container, Heading, Center, NativeBaseProvider, VStack, ZStack, HStack, Flex, Spacer, Stack, ScrollView, Divider, FlatList, SectionList, Avatar, Badge, Button } from 'native-base';


var deviceHeight = Dimensions.get('window').height;
var deviceWidth = Dimensions.get('window').width;


function CardHorizontal(props:any){
    return(
    <Box bg="#ffff" ml="2" p="3" pb="5" pt="5" rounded={6} shadow={5} mb="5">
      <HStack>
        <Box pr="2">
        {
        props.avatar ? <Image size={70} alt="fallback text" borderRadius={props.borderImage?props.borderImage:20} source={{
            uri:props.avatar
          }} fallbackSource={{
            uri: "https://www.w3schools.com/css/img_lights.jpg"
          }} />:''
        }
        </Box>
        <Box >
            {props.children}
        </Box>
      </HStack>
    </Box>
    );
}

const styles = StyleSheet.create({
    container: {
        height: deviceHeight/1+10,
    },
});
  
  export default CardHorizontal