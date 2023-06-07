import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from '../screens/Login';
import Registro from '../screens/Registro';
import RecoverPass from '../screens/RecoverPass';

const Stack = createNativeStackNavigator();

const StackAccount = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="Login"
        component={Login as React.ComponentType<any>}
        options={{
          title: 'Iniciar sesión', //Cambia título por defecto de "header"
          headerShown: true, // Oculta o muestra el "header"
          headerShadowVisible: true, // Oculta o muestra box shadow de header
          headerStyle: { backgroundColor: '#ffffff' }, // Cambia color de fondo de "header"
          headerTitleAlign: 'center', // Alinea título de "header"
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerTitleStyle: { fontWeight: '300' }, // Cambia peso de tipografía de título de "header"
        }}
      />

      <Stack.Screen
        name="RecoverPass"
        component={RecoverPass as React.ComponentType<any>}
        options={{
          title: 'Restablecer contraseña', //Cambia título por defecto de "header"
          headerShown: true, // Oculta o muestra el "header"
          headerShadowVisible: true, // Oculta o muestra box shadow de header
          headerStyle: { backgroundColor: '#ffffff' }, // Cambia color de fondo de "header"
          headerTitleAlign: 'center', // Alinea título de "header"
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerTitleStyle: { fontWeight: '300' }, // Cambia peso de tipografía de título de "header"
        }}
      />

      <Stack.Screen
        name="Registro"
        component={Registro as React.ComponentType<any>}
        options={{
          title: 'Registro', //Cambia título por defecto de "header"
          headerShown: true, // Oculta o muestra el "header"
          headerShadowVisible: true, // Oculta o muestra box shadow de header
          headerStyle: { backgroundColor: '#ffffff' }, // Cambia color de fondo de "header"
          headerTitleAlign: 'center', // Alinea título de "header"
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerTitleStyle: { fontWeight: '300' }, // Cambia peso de tipografía de título de "header"
        }}
      />

    </Stack.Navigator>
    
  );
};

export default StackAccount;
