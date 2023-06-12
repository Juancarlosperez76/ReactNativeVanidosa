import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AgendarCita from '../screens/AgendarCita';
import MisCitas from '../screens/MisCitas';
import { Image } from 'react-native';

const Stack = createNativeStackNavigator();

const StackChedule = () => {

  return (

    <Stack.Navigator>

      <Stack.Screen
        name="AgendarCita"
        component={AgendarCita as React.ComponentType<any>}
        options={{
          headerShown: false, // Oculta o muestra el "header"
        }}
      />

      <Stack.Screen
        name="MisCitas"
        component={MisCitas as React.ComponentType<any>}
        options={{
          title: 'Mis citas', //Cambia título por defecto de "header"
          headerShown: false, // Oculta o muestra el "header"
          headerShadowVisible: true, // Oculta o muestra box shadow de header
          headerStyle: { backgroundColor: '#ffffff' }, // Cambia color de fondo de "header"
          headerTitleAlign: 'left', // Alinea título de "header"
          headerTintColor: '#7e7e7e', // Cambia color de flecha y título  de "header"
          headerTitleStyle: { fontWeight: '500', fontSize: 20 }, // Cambia peso de tipografía de título de "header"
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
  
};

export default StackChedule;
