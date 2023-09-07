import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RecoverPasswordEmail from '../screens/RecoverPasswordEmail';
import StackAccountHeader from '../navigation/StackAccountHeader';
import RecoverPassword from '../screens/RecoverPassword';
import Registro from '../screens/Registro';
import Login from '../screens/Login';
import Main from '../screens/Main';
import React from 'react';

const Stack = createNativeStackNavigator();

const StackAccount = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="Login"
        component={Login as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="StackAccountHeader"
        component={StackAccountHeader as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="RecoverPassword"
        component={RecoverPassword as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="RecoverPasswordEmail"
        component={RecoverPasswordEmail as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Registro"
        component={Registro as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Main"
        component={Main as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

};

export default StackAccount;
