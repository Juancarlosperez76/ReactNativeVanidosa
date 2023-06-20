import React from 'react';
import { View, StyleSheet, Image } from 'react-native';

const Header = () => {

  return (

    <View style={styles.contentLogo}>
      <Image style={styles.logo} source={require('../../android/assets/img/logo.png')} />
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
});