import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Main from '../screens/Main'
import StackChedule from './StackChedule';
import StackCatalogue from '../navigation/StackCatalogue';
import StackAccount from '../navigation/StackAccount';
import Contacto from '../screens/Contacto';
import { Text } from 'react-native';

function MainScreen() { return (<Main />); }
function StackCheduleScreen() { return (<StackChedule />); }
function ContactoScreen() { return (<Contacto />); }
function StackCatalogueScreen() { return (<StackCatalogue />); }
function StackAccountScreen() { return (<StackAccount />); }

const Tab = createBottomTabNavigator();

const StackTabButtom = () => {

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Inicio" // Establece la vista que se muestra al ejecutar la aplicación

        screenOptions={({ route }) => ({

          headerShown: false, // Oculta el Header y el título por defecto

          tabBarStyle: { // Estilos de la barra de navegación
            height: 52,
            backgroundColor: '#ffffff',
          },
          
          tabBarActiveTintColor: '#005c99',
          tabBarInactiveTintColor: '#7e7e7e',
          //tabBarActiveBackgroundColor: '#0B8ADE',

          tabBarItemStyle: { // Estilos Items de la barra de navegación
            paddingVertical: 4, // Soluciona posisionamiento de iconos al girar la pantalla
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
              size = 24;
            }
            else if (route.name === 'Catálogo') {
              iconName = focused ? 'book' : 'book-outline';
              size = 24;
            }
            else if (route.name === 'Agendar') {
              iconName = focused ? 'calendar' : 'calendar-outline';
              size = 24;
            }
            else if (route.name === 'Contacto') {
              iconName = focused ? 'call' : 'call-outline';
              size = 24;
            }
            else if (route.name === 'Cuenta') {
              iconName = focused ? 'person' : 'md-person-outline';
              size = 24;
            }
            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen
          name="Inicio"
          component={MainScreen}
          options={{
            tabBarLabel: ({ focused }) => (
              <Text style={{
                fontWeight: focused ? '500' : 'normal',
                color: focused ? '#005c99' : '#7e7e7e',
                fontSize: 11,
                letterSpacing: 0.4,
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
                fontWeight: focused ? '500' : 'normal',
                color: focused ? '#005c99' : '#7e7e7e',
                fontSize: 11,
                letterSpacing: 0.4,
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
                fontWeight: focused ? '500' : 'normal',
                color: focused ? '#005c99' : '#7e7e7e',
                fontSize: 11,
                letterSpacing: 0.4,
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
                fontWeight: focused ? '500' : 'normal',
                color: focused ? '#005c99' : '#7e7e7e',
                fontSize: 11,
                letterSpacing: 0.4,
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
                fontWeight: focused ? '500' : 'normal',
                color: focused ? '#005c99' : '#7e7e7e',
                fontSize: 11,
                letterSpacing: 0.4,
              }}>Cuenta
              </Text>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer >
  );
}

export default StackTabButtom;