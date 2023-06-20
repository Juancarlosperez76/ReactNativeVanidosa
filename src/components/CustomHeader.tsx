import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface CustomHeaderProps {
  title: string;
}

const CustomHeader = ({ title }: CustomHeaderProps) => {

  return (

    <View style={styles.contentCustomHeader}>

      <Text style={styles.customHeaderText}>{title}</Text>

    </View>

  );

};

export default CustomHeader;

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
    color: '#7e7e7e',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 0.4,
  },
});