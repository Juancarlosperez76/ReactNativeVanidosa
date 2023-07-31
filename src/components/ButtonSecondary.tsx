import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Solución "El elemento de enlace '' tiene un tipo 'any' implícito."
interface ButtonSecondaryProps {
  onPress: () => void;
  width: string,
  height: number,
  backgroundColor: string;
  borderWidth: number,
  borderRadius: number;
  color: string;
  fontSize: number,
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
  letterSpacing: number,
  title: string;
}

const ButtonSecondary = ({ onPress, width, height, backgroundColor, borderWidth, borderRadius, color, fontSize, fontWeight, letterSpacing, title }: ButtonSecondaryProps) => {

  return (

    <TouchableOpacity style={{
      width: width,
      height: height,
      justifyContent: 'center',
      backgroundColor: backgroundColor,
      borderWidth: borderWidth,
      borderColor: '#E00083',
      borderRadius: borderRadius,
    }} onPress={onPress}
    >
      <Text style={{
        textAlign: 'center',
        color: color,
        fontSize: fontSize,
        fontWeight: fontWeight,
        letterSpacing: letterSpacing,
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