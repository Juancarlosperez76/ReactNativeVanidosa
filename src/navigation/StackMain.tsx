import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/Main';
import Maquillaje from '../screens/Maquillaje';
import Cabello from '../screens/Cabello';
import Unas from '../screens/Unas';
import Pestanas from '../screens/Pestanas';
import StackAccountHeader from './StackAccountHeader';
import AgendarCita from '../screens/AgendarCita';

const Stack = createNativeStackNavigator();

const StackMain = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="Main"
        component={Main as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="StackAccountHeader"
        component={StackAccountHeader as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Maquillaje"
        component={Maquillaje as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Cabello"
        component={Cabello as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Unas"
        component={Unas as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Pestanas"
        component={Pestanas as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="AgendarCita"
        component={AgendarCita as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

}

export default StackMain;