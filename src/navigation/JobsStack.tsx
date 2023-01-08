import * as React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { JobsNavigatorParamList } from './types';

import Jobslist from '@screens/jobs/JobsList';
import DetailJobs from '@screens/jobs/JobsDetail';
import CameraJobs from '@screens/jobs/CameraJobs';
import InputJobs from '@screens/jobs/InputJobs';
import cariJobs from '@screens/jobs/cariJobs';

const JobsStack = createNativeStackNavigator<JobsNavigatorParamList>(); // checking type for name stack & types params

const HomeStackNavigator = () => {
  return (
    <JobsStack.Navigator
      screenOptions={{
        headerShown: false,
        contentStyle: {
          backgroundColor: '#ebedf0',
          zIndex: 1
        },
      }}
      initialRouteName="ListJobs"
    >
      <JobsStack.Screen name="ListJobs" component={Jobslist} />
      <JobsStack.Screen name="DetailJobs" component={DetailJobs} />
      <JobsStack.Screen name="cameraJobs" component={CameraJobs} />
      <JobsStack.Screen name="InputJobs" component={InputJobs} />
      <JobsStack.Screen name="cariJobs" component={cariJobs} />
    </JobsStack.Navigator>
  );
};

export default HomeStackNavigator;