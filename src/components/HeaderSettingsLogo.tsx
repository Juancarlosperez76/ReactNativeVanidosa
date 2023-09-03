import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

interface HeaderSettingsLogoProps {
  title: string;
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

const HeaderSettingsLogo = ({ navigation }: HeaderSettingsLogoProps) => {

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

    <View style={styles.contentCustomHeader}>

      <View style={styles.contentLogo}>
        <Image style={styles.logo} source={require('../../android/assets/img/logo.png')} />
      </View>

      <TouchableOpacity style={styles.contentAccountIcon} onPress={handleIconPress}>
        <Ionicons style={styles.accountIcon} name='settings-outline' />
      </TouchableOpacity>

    </View>

  );

};

export default HeaderSettingsLogo;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentCustomHeader: {
    height: 70,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  contentLogo: {
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 60,
  },
  contentAccountIcon: {
    position: 'absolute',
    right: 16,
    padding: 10,
    zIndex: 1,
  },
  accountIcon: {
    color: '#5B009D',
    fontSize: 24,
  },
});
