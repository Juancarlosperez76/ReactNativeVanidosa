import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackAccountHeader from './StackAccountHeader';
import AgendarCita from '../screens/AgendarCita';
import MisCitas from '../screens/MisCitas';
import React, { ComponentType } from 'react';

const Stack = createNativeStackNavigator();

const StackChedule = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="AgendarCita"
        component={AgendarCita as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="MisCitas"
        component={MisCitas as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="StackAccountHeader"
        component={StackAccountHeader as ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

};

export default StackChedule;
