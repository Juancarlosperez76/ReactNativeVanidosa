import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ChangePassword from '../screens/ChangePassword';
import AccountHeader from '../screens/AccountHeader';
import EditAccount from '../screens/EditAccount';
import React, { ComponentType } from 'react';
import Login from '../screens/Login';

const Stack = createNativeStackNavigator();

const StackAccountHeader = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="AccountHeader"
        component={AccountHeader as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="EditAccount"
        component={EditAccount as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword as ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="Login"
        component={Login as ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

};

export default StackAccountHeader;

