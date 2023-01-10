import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status Is :', authStatus);
  }
}

export async function GetTokenFIrebase(){
    let fcmToken=await AsyncStorage.getItem('fcmToken')
      console.log('Old token')
    
    if (!fcmToken) {
      try {
        let fcmTokenGet:any=await messaging().getToken()
          console.log('New token')
        if(fcmTokenGet){
          console.log('New token IS : ',JSON.stringify(fcmTokenGet))
            // await AsyncStorage.setItem('fcmToken',getToken)
        }
        
       } catch (error) {
          console.log('Error get token fcm')
       }
        
        
    }

}

export const NotificationListener=()=>{
var message=''
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification open from background state:',
      remoteMessage.notification,
    );
    message+='Notification open from background state:'+remoteMessage.notification
  });

  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification  from quit state:',
        remoteMessage.notification,
      );
      message+='Notification from quit state:'+remoteMessage.notification
    }
  });

  messaging().onMessage(async remoteMessage=>{
    console.log('Notification on foreground',remoteMessage)
    message+='Notification open from quit state:'+remoteMessage.notification
  })

  // return [message]
  return (
    [
      {id: 1, title: message,menu:'message',status:"complete"},
    ]
   )
}