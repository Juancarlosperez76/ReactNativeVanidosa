import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Catalogo from '../screens/Catalogo';
import Maquillaje from '../screens/Maquillaje';
import Cabello from '../screens/Cabello';
import Unas from '../screens/Unas';
import Pestanas from '../screens/Pestanas';
import Novias from '../screens/Novias';
import Quinceanera from '../screens/Quinceanera';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();

const StackCatalogue = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Catalogo"
        component={Catalogo as React.ComponentType<any>}
        options={{
          title: 'Catálogo',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Maquillaje"
        component={Maquillaje as React.ComponentType<any>}
        options={{
          title: 'Maquillaje',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Cabello"
        component={Cabello as React.ComponentType<any>}
        options={{
          title: 'Cabello',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Unas"
        component={Unas as React.ComponentType<any>}
        options={{
          title: 'Uñas',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Pestanas"
        component={Pestanas as React.ComponentType<any>}
        options={{
          title: 'Pestañas',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Novias"
        component={Novias as React.ComponentType<any>}
        options={{
          title: 'Novias',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />
      <Stack.Screen
        name="Quinceanera"
        component={Quinceanera as React.ComponentType<any>}
        options={{
          title: 'Quinceañera',
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 },
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerStyle: { backgroundColor: '#ffffff' },
          headerRight: () => (
            <Image
              source={require('../../android/assets/logo-168-32.png')}
              style={{ position: 'absolute', right: 10 }}
            />
          ),
        }}
      />
    </Stack.Navigator>
  );
};

export default StackCatalogue;
