import React from 'react';
import { View, Image, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Linking } from 'react-native';

const Header = () => {

  // Código para redirigir a número de Whatsapp con mensaje personalizado
  const phoneNumber = '3127712964';
  const message = 'Bienvenido a Vanidosa SPA, ¿cómo podemos ayudarte?';

  const handleWhatsAppPress = () => {
    const encodedMessage = encodeURIComponent(message);
    const url = `whatsapp://send?phone=${phoneNumber}&text=${encodedMessage}`;
    Linking.openURL(url);
  };
  // ---------------------------------------------------------------------

  return (
    <View style={styles.contentLogo}>
      <Image style={styles.logo} source={require('../../android/assets/logo-full-136-84.png')} />
      <TouchableOpacity style={styles.contentIconWhatsapp} onPress={handleWhatsAppPress}>
        <Ionicons style={styles.iconWhatsapp} name="logo-whatsapp" />
      </TouchableOpacity>
    </View>
  );
};

export default Header;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentLogo: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 72,
  },
  contentIconWhatsapp: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  iconWhatsapp: {
    color: '#7e7e7e',
    fontSize: 28,
  },
});

