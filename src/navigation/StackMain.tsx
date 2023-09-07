import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackAccountHeader from './StackAccountHeader';
import AgendarCita from '../screens/AgendarCita';
import Maquillaje from '../screens/Maquillaje';
import React, { ComponentType } from 'react';
import Pestanas from '../screens/Pestanas';
import Cabello from '../screens/Cabello';
import Main from '../screens/Main';
import Unas from '../screens/Unas';

const Stack = createNativeStackNavigator();

const StackMain = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="Main"
        component={Main as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="StackAccountHeader"
        component={StackAccountHeader as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Maquillaje"
        component={Maquillaje as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Cabello"
        component={Cabello as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Unas"
        component={Unas as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Pestanas"
        component={Pestanas as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="AgendarCita"
        component={AgendarCita as ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

}

export default StackMain;