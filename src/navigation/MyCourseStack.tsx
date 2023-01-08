import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { MyCourseNavigatorParamList } from './types';

import MycourseScreen from '../screens/mycourse/MycourseScreen';
import DetailCourseScreen from '../screens/mycourse/CourseDetailScreen';

const MyCourseStack = createNativeStackNavigator<MyCourseNavigatorParamList>(); // checking type for name stack & types params

const MyCourseStackNavigator = () => {
  return (
    <MyCourseStack.Navigator 
        screenOptions={{
            headerShown: false,
            contentStyle:{
                backgroundColor:'#ebedf0',
                // zIndex:999
              },
        }}
        initialRouteName="Mycourse"
    >
      <MyCourseStack.Screen name="Mycourse" component={MycourseScreen} />
      <MyCourseStack.Screen name="DetailCourse" component={DetailCourseScreen} />

    </MyCourseStack.Navigator>
  );
};

export default MyCourseStackNavigator;