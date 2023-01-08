import React from 'react'
import { useNavigation } from "@react-navigation/native";
import { Box, HStack, Text } from "native-base"
import { TouchableOpacity } from "react-native"
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Mycolor from '../config/colors'

export default function Header(props:any){
  const navigation = useNavigation();

    return(
        <HStack bg={props.bg? props.bg:Mycolor.headerBg} p={3} pl="1" justifyContent="space-between" zIndex={999} borderTopRadius={props.topRadius?props.topRadius:0} borderBottomRadius={props.bottomRadius?props.bottomRadius:0}>
            {
                props.isBack==false ?
                <Box></Box>:
                <Box>
                    <TouchableOpacity style={{padding:6,borderRadius:100}} activeOpacity={0.2} onPress={() => {navigation.goBack()}}>
                    <Text style={{color:'#f0eded'}}>
                        <MaterialCommunityIcons name="arrow-left" color="#ffff" size={25} />
                    </Text>
                    </TouchableOpacity>
                </Box>
            }

            {props.midmenu && props.midmenu}
            {props.rightmenu && props.rightmenu}
        </HStack>
    )
}