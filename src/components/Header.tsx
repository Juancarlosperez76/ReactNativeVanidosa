import React from 'react';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

const Header = ({ navigation }: HeaderProps) => {

  // ------------Código redireccion dependiendo del estado de login-------------
  const handleIconPress = () => {
    AsyncStorage.getItem('userToken') // Obtener el token del AsyncStorage
      .then(token => {
        if (token) {
          navigation.navigate('StackAccountHeader'); // Si hay token, el usuario está logueado
        } else {
          navigation.navigate('StackAccount'); // Si no hay token, el usuario no está logueado
        }
      })
      .catch(error => {
        console.error(error);
        // Manejar el error si es necesario
      });
  };
  // --------------------------------------------------------------------------

  return (

    <View>

      <View style={styles.contentLogo}>
        <Image style={styles.logo} source={require('../../android/assets/img/logo.png')} />
      </View>

      <TouchableOpacity style={styles.contentAccountIcon} onPress={handleIconPress}>
        <Ionicons style={styles.accountIcon} name='settings-outline' />
      </TouchableOpacity>

    </View>

  );

};

export default Header;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentLogo: {
    flexDirection: 'row',
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#ffffff', // Superpone color "#ffffff" sobre el color por defecto
    elevation: 5, // Crea efecto boxshadow"
    marginBottom: 3, // Permite ver el efecto "boxshadow" de la propiedad "elevation:"
  },
  logo: {
    width: 100,
    height: 60,
  },
  contentAccountIcon: {
    position: 'absolute',
    top: 14,
    right: 16,
    padding: 10,
    zIndex: 1,
  },
  accountIcon: {
    color: '#5B009D',
    fontSize: 24,
  },
});