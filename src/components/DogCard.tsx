import { Image, AspectRatio, Box, Text, Center, View,Heading, HStack, Stack, VStack, Button, Divider, useDisclose, Actionsheet, Icon } from 'native-base';
import React from "react";
import { Pressable, StyleSheet, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import COLORS from '@config/colors';

const DogCard = ({ ListItems }) => {
  const navigation = useNavigation<any>();

  return(
    <VStack w="100%" alignItems="center" space={2} mb={3} borderRadius={10}>
      <Box maxW="100%" w="100%" rounded="lg"  borderColor="coolGray.200" borderWidth="1" _dark={{
            borderColor: "coolGray.600",
            backgroundColor: "gray.700"
          }} _web={{
            shadow: 9,
            borderWidth: 2
          }} _light={{
            // backgroundColor: "#c6eefbde"
            backgroundColor:COLORS.contentBg600
          }}>
        
        <Stack p="4" space={3}>
          <Stack space={2}>
            
            <HStack justifyContent="space-between">
              <Heading size="md" ml="-1">
                {ListItems.name}
              </Heading>
              <Heading size="md" ml="-1">
                  <MenuActionLists pid= {ListItems.id}/>
              </Heading>
            </HStack>

            <Text fontSize="xs" _light={{
            color: "violet.500"
          }} _dark={{
            color: "violet.400"
          }} fontWeight="500" ml="-0.5" mt="-1">
              {ListItems.country_code}
            </Text>
          </Stack>
          <Stack>
            <Text fontWeight="700">{ListItems.life_span}</Text>
          </Stack>
          <HStack justifyContent="space-between">
            <Text fontWeight="400">
              {ListItems.country_code}
            </Text>
            <Text fontWeight="400">
              {ListItems.breed_group}
            </Text>
          </HStack>
          <Stack>
            <Text>{ListItems.bred_for}</Text>
          </Stack>
          <Stack><Text  >Attachment :</Text></Stack>
          <HStack space="2" justifyContent="flex-start">
              <Box>
                <Text>LOREM IPSUM</Text>
              </Box>
          </HStack>

          <TouchableOpacity activeOpacity={0.4} onPress={() => navigation.navigate('JobsStack' as never,
            { screen: 'DetailJobs', params: { id: ListItems.id } })}>
          <VStack pr="3" space={3} >
              <Divider orientation="horizontal" w="100%" _light={{
                bg: "gray.400"
              }} _dark={{
                bg: "muted.50"
              }} />
              <HStack justifyContent="space-between">
                <Text>&nbsp;</Text>
                <Center>
                  <Text>DETAIL</Text>
                </Center>
                  <MaterialCommunityIcons name="arrow-right" color='#000' size={22} />
              </HStack>
              <Divider orientation="horizontal" w="100%" _light={{
                bg: "gray.400"
              }} _dark={{
                bg: "muted.50"
              }} />
          </VStack>
          </TouchableOpacity>

        </Stack>

      </Box>
    </VStack>
  )
}


function MenuActionLists(props:any):JSX.Element {
  const navigation = useNavigation<any>();
  const {
    isOpen,
    onOpen,
    onClose
  } = useDisclose();


  const editShipment=(aksi:any,pid:any)=>{
    console.warn(aksi+ " ListItems "+pid)
    onClose
  }
  const GetDetail=(pid:any)=>{
    onClose
   navigation.navigate('JobsStack' as never,{ screen: 'DetailJobs', params: { id: props.pid } })

  }



  return <Center >
    <TouchableOpacity activeOpacity={0.3} onPress={onOpen}>
      <View  bg="#c6eefbde" pl="2" pr="2" p="1" borderRadius={10} >
        <Text ><MaterialIcons name="keyboard-control" color='#000' size={25} /></Text>
      </View>
    </TouchableOpacity>
      
      <Actionsheet isOpen={isOpen} onClose={onClose} hideDragIndicator={false} >
        <Actionsheet.Content mb="-8%" pb="10"  >
          <Box>
            <Text style={{color:"#000",fontSize:16,fontWeight:'bold'}}>{props.pid}</Text>
          </Box>
          <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name="delete" size="6" />} onPress={()=>editShipment('Delete',props.pid)}>Delete </Actionsheet.Item>
          <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name="remove-red-eye" size="6" />} onPress={()=>{onClose(); GetDetail(props.pid)}} >Detail </Actionsheet.Item>
          <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name="edit" size="6" />} onPress={()=>editShipment('edit',props.pid)}>Edit</Actionsheet.Item>
          <Actionsheet.Item startIcon={<Icon as={MaterialIcons} name="close" size="6" />} onPress={onClose}>Cancel</Actionsheet.Item>
        </Actionsheet.Content>
      </Actionsheet>
    </Center>;
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    borderColor: "#DCDCDC",
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    padding: 10,
  },
  pic: {
    borderRadius: 30,
    width: 60,
    height: 60,
  },
  nameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  nameTxt: {
    marginLeft: 15,
    fontWeight: "600",
    color: "#222",
    fontSize: 18,
  },
});
export default DogCard;