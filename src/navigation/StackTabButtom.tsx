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
            width: '100%',
            height: 64,
            backgroundColor: '#ffffff',
          },

          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#7e7e7e',
          tabBarActiveBackgroundColor: '#2C4D9E',

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
              iconName = 'home-outline';
              size = focused ? 24 : 22;
            }
            else if (route.name === 'Catálogo') {
              iconName = 'book-outline';
              size = focused ? 24 : 22;
            }
            else if (route.name === 'Agendar') {
              iconName = 'calendar-outline';
              size = focused ? 24 : 22;
            }
            else if (route.name === 'Contacto') {
              iconName = 'call-outline';
              size = focused ? 24 : 22;
            }
            else if (route.name === 'Cuenta') {
              iconName = 'md-person-outline';
              size = focused ? 24 : 22;
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
                fontWeight: focused ? '400' : '300',
                color: focused ? '#ffffff' : '#7e7e7e',
                fontSize: 10,
                letterSpacing: 0.5,
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
                fontWeight: focused ? '400' : '300',
                color: focused ? '#ffffff' : '#7e7e7e',
                fontSize: 10,
                letterSpacing: 0.5,
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
                fontWeight: focused ? '400' : '300',
                color: focused ? '#ffffff' : '#7e7e7e',
                fontSize: 10,
                letterSpacing: 0.5,
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
                fontWeight: focused ? '400' : '300',
                color: focused ? '#ffffff' : '#7e7e7e',
                fontSize: 10,
                letterSpacing: 0.5,
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
                fontWeight: focused ? '400' : '300',
                color: focused ? '#ffffff' : '#7e7e7e',
                fontSize: 10,
                letterSpacing: 0.5,
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