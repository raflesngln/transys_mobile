import React from "react";
import { Spinner, HStack, Center, NativeBaseProvider } from "native-base";


export default function SpinnerLoad (props:any){
        return (
          <NativeBaseProvider>
            <Center flex={1} px="3">
                <Spinner size={props.size?props.size:'sm'} color={props.color?props.color:'#ff052b'} />
            </Center>
          </NativeBaseProvider>
        );
    };