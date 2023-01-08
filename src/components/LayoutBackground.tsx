import { Text } from "native-base";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

function LayoutBackground(props:any){
    return(
        <>
        <ImageBackground source={require('@assets/images/bg3.png')} resizeMode="cover" style={styles.image}>
            {
                props.children
            }
        </ImageBackground>
        </>
    )
}


const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    image: {
      flex: 1,
      justifyContent: "flex-start"
    },
  });
  
export default LayoutBackground