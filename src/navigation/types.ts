import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ROUTES } from './routes';

//type checks for Stack Root
export type RootNavigatorList = {
  Auth:undefined;
  BottomMenu:undefined;
  HomeMenu:undefined;
  HomeStack:any;
  StartUpScreen:undefined;
  SplashScreen:undefined;
  ScannerStack:undefined;
  MessageStack:undefined;
  JobsStack:undefined;
  };


export type HomeStackNavigatorParamList = {
    HomeScreenPage: undefined;
    Details: {
      title: string;
    };
    CategoryCourse:{
        title:string
    };
    HomeMenu:{
        title:string
    };
    DetailProduct:{
        title:string,
        id:any
    };
    DetailUser:{
        title:string,
        id:any
    };
    NotificationsScreen:{
        title:string,
    };
    RecomendationProduct:{
        title:string
    };
  };


//   type checks for screens Bottom Navigations
export type BottomTabNavigatorParamList = {
    // Home: HomeStackNavigatorParamList;
    Home: undefined;
    Jobs: undefined;
    Message: undefined;
    Profile: undefined;
    Scanner: undefined;
  };

//type checks for Stack My Course
export type JobsNavigatorParamList = {
  ListJobs: {
    title:string
  };
    DetailJobs: {
      title:string
    };
    cameraJobs: {
      title:string
    };
    InputJobs: {
      title:string
    };
    cariJobs: {
      title:string
    };
  };

  
//type checks for Stack My Course
export type MessageNavigatorParamList = {
  MessagePage:{
      title:string
    };
    DetailMessage:{
      title:string
  };
  MessageSearch:{
      title:string
  };
  MessageNotif:{
      title:string
  };
  };

  
  //type checks for Stack BProfile Setttings
  export type MyProfileNavigatorParamList = {
    MyProfile:{
      title:string
    };
    DetailUser: {
      title:string
    };
    NotificationsScreen: {
      title:string
    };
    LogoutApp: {
      title:string
    };
  };
    //type checks for Stack My Course
  export type AuthNavigatorParamList = {
      LoginUser:undefined;
      RegisterUser:undefined;
      ForgotPassword:{
        title:string
    };
  };
    //type checks for Stack My Course
  export type ScannerStackNavigatorParamList = {
      ScannerPage:undefined;
      ScannerResult:{
        title:string
    };
  };


  //   type checks for screens
  export type RootNavigation = NativeStackNavigationProp<RootNavigatorList,'BottomMenu'>;
  export type HomeScreenNavigation = NativeStackNavigationProp<HomeStackNavigatorParamList,'HomeScreenPage'>;
  export type AuthNavigation = NativeStackNavigationProp<AuthNavigatorParamList,'LoginUser'>;
  export type ProfileNavigation = NativeStackNavigationProp<MyProfileNavigatorParamList,'MyProfile'>;
  export type JobsNavigation = NativeStackNavigationProp<JobsNavigatorParamList,'ListJobs'>;
  export type MessageStack = NativeStackNavigationProp<MessageNavigatorParamList,'MessagePage'>;