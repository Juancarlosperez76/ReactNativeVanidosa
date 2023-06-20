import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const CustomHeaderReturnLogo = () => {

  const navigation = useNavigation();

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (

    <View style={styles.contentCustomHeader}>

      <TouchableOpacity style={styles.contentBackIcon} onPress={handleGoBack}>
        <Ionicons style={styles.backIcon} name="arrow-back-outline" />
      </TouchableOpacity>

      <View style={styles.contentLogo}>
        <Image style={styles.logo} source={require('../../android/assets/img/logo.png')} />
      </View>

    </View>

  );

};

export default CustomHeaderReturnLogo;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentCustomHeader: {
    flexDirection: 'row',
    height: 70,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#ffffff', // Superpone color "#ffffff" sobre el color por defecto
    elevation: 5, // Crea efecto boxshadow"
    marginBottom: 3, // Permite ver el efecto "boxshadow" de la propiedad "elevation:"
  },
  contentBackIcon: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    left: 16,
    width: 30,
    height: 30,
    zIndex: 1,
  },
  backIcon: {
    color: '#4e4e4e',
    fontSize: 24,
  },
  contentLogo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 100,
    height: 60,
  },
});