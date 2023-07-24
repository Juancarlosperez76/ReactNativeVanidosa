import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface CustomHeaderSettingsProps {
  title: string;
  navigation: {
    goBack: () => void;
    navigate: (screen: string) => void;
  };
}

const CustomHeaderSettings = ({ navigation, title }: CustomHeaderSettingsProps) => {

  const handleGoBack = () => {
    navigation.goBack();
  };

  const handleIconPress = () => {
    navigation.navigate('StackAccountHeader');
  };

  return (

    <View style={styles.contentCustomHeader}>

      <TouchableOpacity style={styles.contentBackIcon} onPress={handleGoBack}>
        <Ionicons style={styles.backIcon} name="arrow-back-outline" />
      </TouchableOpacity>

      <Text style={styles.customHeaderText}>{title}</Text>

      <TouchableOpacity style={styles.contentAccountIcon} onPress={handleIconPress}>
        <Ionicons style={styles.accountIcon} name='settings-outline' />
      </TouchableOpacity>


    </View>

  );

};

export default CustomHeaderSettings;

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
  customHeaderText: {
    flex: 1,
    textAlign: 'center',
    color: '#4e4e4e',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.4,
  },
  contentAccountIcon: {
    position: 'absolute',
    top: 24,
    right: 26,
    zIndex: 1,
  },
  accountIcon: {
    color: '#5B009D',
    fontSize: 24,
  },
});