import { useState, useEffect } from 'react';
import NetInfo,{useNetInfo} from "@react-native-community/netinfo";
import { useToast } from 'native-base';


const useConnection = ({title}:any) => {
  const toast = useToast();
  const NetworkInfo = useNetInfo();
  const[koneksi,setKoneksi]=useState<any>({type:'',isConnected:false})
  const[isInternet,setInternet]=useState<any>()

  useEffect(()=>{
    function getKoneksi(){
      NetInfo.fetch().then(state => {
        console.log("Connection type", state.type);
        console.log("Is connected?", state.isConnected);
        setKoneksi({type:state.type,isConnected:state.isConnected})
        setInternet(NetworkInfo)
        console.log(NetworkInfo);
      });
    }
    getKoneksi()
  },[NetworkInfo])
  
  useEffect(()=>{
    console.log('Koneksi berubah')
    if(isInternet){
      if(isInternet.isConnected==false){
        toast.show({
          title: "No Internet Connection Ya !",
          placement: "bottom"
        })
      }
    }

  },[isInternet])


  // (Object.keys(isInternet).length > 0)?isInternet:{}
  // return [isInternet?isInternet:{}];
  return [
    (isInternet)? Object.keys(isInternet).length > 0? isInternet:{}:{}
  ];
};

export default useConnection;