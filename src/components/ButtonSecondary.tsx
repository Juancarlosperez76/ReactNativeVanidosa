import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Solución "El elemento de enlace '' tiene un tipo 'any' implícito."
interface ButtonSecondary {
  onPress: () => void;
  backgroundColor: string;
  color: string;
  title: string;
}

const ButtonSecondary = ({ onPress, backgroundColor, color, title }: ButtonSecondary) => {

  return (

    <TouchableOpacity style={{
      width: '100%',
      height: 48,
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      borderColor: '#2C4D9E',
      borderWidth: 1,
      borderRadius: 24,
    }} onPress={onPress}
    >
      <Text style={{
        color: color,
        fontSize: 14,
        textAlign: 'center',
        letterSpacing: 0.8,
        fontWeight: '500',
      }}
      >{title}
      </Text>
    </TouchableOpacity>

  );
  
}

export default ButtonSecondary;

// ********** Estilos CSS **********
// const styles = StyleSheet.create({

// });