import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgendarCita from '../screens/AgendarCita';
import MisCitas from '../screens/MisCitas';
import Header from '../components/Header';

const Stack = createNativeStackNavigator();

const StackChedule = () => {
  return (
    <>
      <Header />
      <Stack.Navigator>
        <Stack.Screen
          name="AgendarCita"
          component={AgendarCita as React.ComponentType<any>}
          options={{
            headerShown: false, // Oculta o muestra el "header"
            headerShadowVisible: false, // quita box shadow de header
            headerStyle: { backgroundColor: '#3a3a3a' }, // Cambia color de fondo de "header"
            title: 'Agendar cita', //Cambia título por defecto de "header"
            headerTitleAlign: 'center', // Alinea título de "header"
            headerTintColor: '#ffffff', // Cambia color de título de "header"
            headerTitleStyle: { fontWeight: 'bold' }, // Cambia peso de tipografía de título de "header"
          }}
        />
        <Stack.Screen
          name="MisCitas"
          component={MisCitas as React.ComponentType<any>}
          options={{
            headerShown: false, // Oculta o muestra el "header"
            headerShadowVisible: false, // quita box shadow de header
            headerStyle: { backgroundColor: '#3a3a3a' }, // Cambia color de fondo de "header"
            title: 'Mis Citas', //Cambia título por defecto de "header"
            headerTitleAlign: 'center', // Alinea título de "header"
            headerTintColor: '#ffffff', // Cambia color de título de "header"
            headerTitleStyle: { fontWeight: 'bold' }, // Cambia peso de tipografía de título de "header"
          }}
        />
      </Stack.Navigator>
    </>
  );
};

export default StackChedule;
