import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import StackMain from './StackMain'
import StackCatalogue from './StackCatalogue';
import StackChedule from './StackChedule';
import Contacto from '../screens/Contacto';
import StackAccount from './StackAccount';
import { Text } from 'react-native';

function StackMainScreen() { return (<StackMain />); }
function StackCatalogueScreen() { return (<StackCatalogue />); }
function StackCheduleScreen() { return (<StackChedule />); }
function ContactoScreen() { return (<Contacto />); }
function StackAccountScreen() { return (<StackAccount />); }

const Tab = createBottomTabNavigator();

const StackTabButtom = () => {

  return (

    <Tab.Navigator

      initialRouteName="Inicio" // Establece la vista que se muestra al ejecutar la aplicación

      screenOptions={({ route }) => ({

        headerShown: false, // Oculta el Header y el título por defecto

        tabBarStyle: { // Estilos de la barra de navegación
          width: '100%',
          height: 70,
          backgroundColor: '#ffffff',
          borderTopWidth: 2,
          borderTopColor: '#E00083',
        },

        tabBarActiveTintColor: '#5B009D',
        tabBarInactiveTintColor: '#5B009D',
        //tabBarActiveBackgroundColor: '#2C4D9E',

        tabBarItemStyle: { // Estilos Items de la barra de navegación
          paddingVertical: 10, // Soluciona posisionamiento de iconos al girar la pantalla
          flexDirection: 'column', // Soluciona posisionamiento de iconos al girar la pantalla
        },

        tabBarIconStyle: { // Estilos Iconos de la barra de navegación
          width: 28, // Soluciona posisionamiento de iconos al girar la pantalla
          height: 28, // Soluciona posisionamiento de iconos al girar la pantalla
        },

        tabBarIcon: ({ focused, color, size }) => {

          let iconName = ''; // Las "Comillas simples" vacias en la declaración "let", solucionan error en propiedad "name" del "Icono"

          if (route.name === 'Inicio') {
            iconName = focused ? 'home' : 'home-outline';
            size = 25;
          }
          else if (route.name === 'Catálogo') {
            iconName = focused ? 'book' : 'book-outline';
            size = 25;
          }
          else if (route.name === 'Agendar') {
            iconName = focused ? 'calendar' : 'calendar-outline';
            size = 25;
          }
          else if (route.name === 'Contacto') {
            iconName = focused ? 'call' : 'call-outline';
            size = 25;
          }
          else if (route.name === 'Cuenta') {
            iconName = focused ? 'person' : 'person-outline';
            size = 25;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
    >

      <Tab.Screen
        name="Inicio"
        component={StackMainScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: '#5B009D',
              fontSize: 12,
              letterSpacing: 0.6,
              fontFamily: focused ? 'Futura PT Demi' : 'Futura PT Book',
            }}>Inicio
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Catálogo"
        component={StackCatalogueScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: '#5B009D',
              fontSize: 12,
              letterSpacing: 0.6,
              fontFamily: focused ? 'Futura PT Demi' : 'Futura PT Book',
            }}>Catálogo
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Agendar"
        component={StackCheduleScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: '#5B009D',
              fontSize: 12,
              letterSpacing: 0.6,
              fontFamily: focused ? 'Futura PT Demi' : 'Futura PT Book',
            }}>Agendar
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Contacto"
        component={ContactoScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: '#5B009D',
              fontSize: 12,
              letterSpacing: 0.6,
              fontFamily: focused ? 'Futura PT Demi' : 'Futura PT Book',
            }}>Contacto
            </Text>
          ),
        }}
      />

      <Tab.Screen
        name="Cuenta"
        component={StackAccountScreen}
        options={{
          tabBarLabel: ({ focused }) => (
            <Text style={{
              color: '#5B009D',
              fontSize: 12,
              letterSpacing: 0.6,
              fontFamily: focused ? 'Futura PT Demi' : 'Futura PT Book',
            }}>Cuenta
            </Text>
          ),
        }}
      />

    </Tab.Navigator>

  );

}

export default StackTabButtom;