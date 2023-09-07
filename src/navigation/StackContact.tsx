import { createNativeStackNavigator } from '@react-navigation/native-stack';
import StackAccountHeader from './StackAccountHeader';
import React, { ComponentType } from 'react';
import Contacto from '../screens/Contacto';

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