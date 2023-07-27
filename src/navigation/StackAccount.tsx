import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import StackAccountHeader from '../navigation/StackAccountHeader';
import Registro from '../screens/Registro';
import RecoverPass from '../screens/RecoverPass';
import StackMain from './StackMain';

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
        name="RecoverPass"
        component={RecoverPass as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Registro"
        component={Registro as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="StackMain"
        component={StackMain as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

};

export default StackAccount;
