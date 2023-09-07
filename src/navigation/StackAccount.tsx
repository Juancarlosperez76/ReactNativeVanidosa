import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecoverPasswordEmail from '../screens/RecoverPasswordEmail';
import StackAccountHeader from '../navigation/StackAccountHeader';
import RecoverPassword from '../screens/RecoverPassword';
import React, { ComponentType } from 'react';
import Registro from '../screens/Registro';
import Login from '../screens/Login';
import Main from '../screens/Main';

const Stack = createNativeStackNavigator();

const StackAccount = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="Login"
        component={Login as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="StackAccountHeader"
        component={StackAccountHeader as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPassword as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="RecoverPasswordEmail"
        component={RecoverPasswordEmail as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Registro"
        component={Registro as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Main"
        component={Main as ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

};

export default StackAccount;
