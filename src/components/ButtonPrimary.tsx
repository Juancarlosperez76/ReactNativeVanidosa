import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Solución "El elemento de enlace '' tiene un tipo 'any' implícito."
interface ButtonPrimaryProps {
  onPress: () => void;
  title: string;
  backgroundColor: string;
  color: string;
  borderRadius: number;
}

const ButtonPrimary = ({ onPress, title, backgroundColor, color, borderRadius }: ButtonPrimaryProps) => {

  return (

    <TouchableOpacity style={{
      width: '100%',
      height: 48,
      justifyContent: 'center',
      backgroundColor: backgroundColor,
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

};

export default ButtonPrimary;

// ********** Estilos CSS **********
// const styles = StyleSheet.create({

// });
