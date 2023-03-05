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
      console.log('Old token',fcmToken)
    
    if (!fcmToken) {
      try {
        let fcmTokenGet:any=await messaging().getToken()
        if(fcmTokenGet){
            console.log('New token IS : ',JSON.stringify(fcmTokenGet))
            await AsyncStorage.setItem('fcmToken',fcmTokenGet)
            // Save OR Update Fresh Token to database for use sending notifications from get id token from database
            // await postToApi('/users/1234/tokens', { fcmTokenGet });

        }
        
       } catch (error) {
          console.log('Error get token fcm')
       }
    }

}

export const NotificationListener=()=>{
  // console.log("MESSAGE fROM FCMSS ")
var message=''
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification open from background state:',
      remoteMessage.notification,
    );
    message='Notification open from background state:'+remoteMessage.notification
  });

  messaging()
  .getInitialNotification()
  .then(remoteMessage => {
    if (remoteMessage) {
      console.log(
        'Notification  from quit state:',
        remoteMessage.notification,
      );
      message='Notification from quit state:'+remoteMessage.notification
    }
  });

  messaging().onMessage(async remoteMessage=>{
    console.log('Notification on foreground',remoteMessage)
    message='Notification open from onMessage:'+remoteMessage.notification
  })
  console.log("MESSAGE fROM FCMSS ")

  // return [message]
  return (
    [
      {id: 1, title: message,menu:'message',status:"complete"},
    ]
   )
}