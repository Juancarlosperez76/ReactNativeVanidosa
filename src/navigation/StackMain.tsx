import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Main from '../screens/Main';
import Maquillaje from '../screens/Maquillaje';
import Cabello from '../screens/Cabello';
import Unas from '../screens/Unas';
import Pestanas from '../screens/Pestanas';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();

const StackMain = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="Main"
        component={Main as React.ComponentType<any>}
        options={{
          headerShown: false, // Oculta o muestra el "header"
        }}
      />

      <Stack.Screen
        name="Maquillaje"
        component={Maquillaje as React.ComponentType<any>}
        options={{
          headerShown: false,
          title: 'Maquillaje',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/img/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Cabello"
        component={Cabello as React.ComponentType<any>}
        options={{
          headerShown: false,
          title: 'Cabello',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/img/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Unas"
        component={Unas as React.ComponentType<any>}
        options={{
          headerShown: false,
          title: 'Uñas',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/img/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />

      <Stack.Screen
        name="Pestanas"
        component={Pestanas as React.ComponentType<any>}
        options={{
          headerShown: false,
          title: 'Pestañas',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/img/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />

    </Stack.Navigator>

  );
  
}

export default StackMain;