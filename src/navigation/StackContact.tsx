import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackAccountHeader from './StackAccountHeader';
import Contacto from '../screens/Contacto';
import { ComponentType } from 'react';
import React from 'react';

const Stack = createNativeStackNavigator();

const StackContact = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="Contacto"
        component={Contacto as ComponentType<any>}
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

export default StackContact;