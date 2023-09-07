import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackAccountHeader from './StackAccountHeader';
import Quinceanera from '../screens/Quinceanera';
import AgendarCita from '../screens/AgendarCita';
import Maquillaje from '../screens/Maquillaje';
import Peluqueria from '../screens/Peluqueria';
import Depilacion from '../screens/Depilacion';
import Catalogo from '../screens/Catalogo';
import Pestanas from '../screens/Pestanas';
import Cabello from '../screens/Cabello';
import { ComponentType } from 'react';
import Novia from '../screens/Novia';
import Unas from '../screens/Unas';
import Piel from '../screens/Piel';
import React from 'react';

const Stack = createNativeStackNavigator();

const StackCatalogue = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="Catalogo"
        component={Catalogo as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Cabello"
        component={Cabello as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Maquillaje"
        component={Maquillaje as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Unas"
        component={Unas as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Depilacion"
        component={Depilacion as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Pestanas"
        component={Pestanas as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Piel"
        component={Piel as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Peluqueria"
        component={Peluqueria as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Novia"
        component={Novia as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Quinceanera"
        component={Quinceanera as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="StackAccountHeader"
        component={StackAccountHeader as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="AgendarCita"
        component={AgendarCita as ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

};

export default StackCatalogue;
