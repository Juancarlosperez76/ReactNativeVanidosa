import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AccountHeader from '../screens/AccountHeader';
import EditAccount from '../screens/EditAccount';
import ChangePassword from '../screens/ChangePassword';

const Stack = createNativeStackNavigator();

const StackAccountHeader = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="AccountHeader"
        component={AccountHeader as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="EditAccount"
        component={EditAccount as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

      <Stack.Screen
        name="ChangePassword"
        component={ChangePassword as React.ComponentType<any>}
        options={{ headerShown: false, }}
      />

    </Stack.Navigator>

  );

};

export default StackAccountHeader;

