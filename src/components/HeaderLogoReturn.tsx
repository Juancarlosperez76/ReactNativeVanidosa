import { View, StyleSheet, Image, TouchableOpacity, Text } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

interface HeaderLogoReturnProps {
  title: string;
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

const HeaderLogoReturn = ({ navigation, title }: HeaderLogoReturnProps) => {

  const handleGoBack = () => {
    navigation.goBack();
  };

  return (

    <View style={styles.contentCustomHeader}>

      <TouchableOpacity style={styles.contentBackIcon} onPress={handleGoBack}>
        <Ionicons style={styles.backIcon} name="arrow-back-outline" />
      </TouchableOpacity>

      <Text style={styles.customHeaderText}>{title}</Text>

      <TouchableOpacity style={styles.contentLogo} onPress={() => navigation.navigate('StackMain')}>
        <Image style={styles.logo} source={require('../../android/assets/img//form/spa.png')} />
      </TouchableOpacity>

    </View>

  );

};

export default HeaderLogoReturn;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentCustomHeader: {
    height: 70,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
    shadowColor: '#6e6e6e', // Superpone color "#ffffff" sobre el color por defecto
    elevation: 6, // Crea efecto boxshadow"
    marginBottom: 3, // Permite ver el efecto "boxshadow" de la propiedad "elevation:"
  },
  contentBackIcon: {
    position: 'absolute',
    left: 16,
    padding: 10,
    zIndex: 1,
  },
  backIcon: {
    color: '#4e4e4e',
    fontSize: 24,
  },
  customHeaderText: {
    fontFamily: 'Aspira W05 Demi',
    textAlign: 'center',
    color: '#4e4e4e',
    fontSize: 22,
    letterSpacing: 0.3,
  },
  contentLogo: {
    position: 'absolute',
    right: 26,
  },
  logo: {
    width: 52,
    height: 33,
  },
});