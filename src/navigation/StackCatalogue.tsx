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
        component={Catalogo as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Cabello"
        component={Cabello as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Maquillaje"
        component={Maquillaje as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Unas"
        component={Unas as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Depilacion"
        component={Depilacion as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Pestanas"
        component={Pestanas as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Piel"
        component={Piel as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Peluqueria"
        component={Peluqueria as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Novia"
        component={Novia as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Quinceanera"
        component={Quinceanera as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="StackAccountHeader"
        component={StackAccountHeader as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="AgendarCita"
        component={AgendarCita as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

};

export default StackCatalogue;
