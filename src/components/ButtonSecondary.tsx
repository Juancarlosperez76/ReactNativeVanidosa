import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Solución "El elemento de enlace '' tiene un tipo 'any' implícito."
interface ButtonSecondaryProps {
  onPress: () => void;
  title: string;
  backgroundColor: string;
  color: string;
  borderRadius: number;
}

const ButtonSecondary = ({ onPress, title, backgroundColor, color, borderRadius }: ButtonSecondaryProps) => {

  return (

    <TouchableOpacity style={{
      width: '100%',
      height: 48,
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      borderColor: '#E00083',
      borderWidth: 1,
      borderRadius: borderRadius,
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