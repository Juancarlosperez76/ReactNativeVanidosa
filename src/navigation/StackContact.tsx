import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Contacto from '../screens/Contacto';
import StackAccountHeader from './StackAccountHeader';

const Stack = createNativeStackNavigator();

const StackContact = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="Contacto"
        component={Contacto as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="StackAccountHeader"
        component={StackAccountHeader as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

};

export default StackContact;