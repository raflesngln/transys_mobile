import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MessageNavigatorParamList } from './types';

import MessageScreen from '../screens/message/MessageScreen';
import DetailMessageScreen from '../screens/message/MessageDetailScreen';
import MessageSearchScreen from '../screens/message/MessageSearchScreen';
import MessageScreenNotif from '../screens/message/MessageScreenNotif';


const MessageStack = createNativeStackNavigator<MessageNavigatorParamList>(); // checking type for name stack & types params
const MessageNavigator = () => {
  return (
    <MessageStack.Navigator 
        screenOptions={{
            headerShown: false,
            contentStyle:{
                backgroundColor:'#ebedf0',
                zIndex:999
              },
        }}
        initialRouteName="MessagePage"
    >
      <MessageStack.Screen name="MessagePage" component={MessageScreen} />
      <MessageStack.Screen name="DetailMessage" component={DetailMessageScreen} />
      <MessageStack.Screen name="MessageSearch" component={MessageSearchScreen} />
      <MessageStack.Screen name="MessageNotif" component={MessageScreenNotif} />

    </MessageStack.Navigator>
  );
};

export default MessageNavigator;