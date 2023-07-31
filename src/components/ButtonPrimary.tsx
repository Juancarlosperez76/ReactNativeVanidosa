import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Solución "El elemento de enlace '' tiene un tipo 'any' implícito."
interface ButtonPrimaryProps {
  onPress: () => void;
  width: string,
  height: number,
  backgroundColor: string;
  borderRadius: number;
  color: string;
  fontSize: number,
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
  letterSpacing: number,
  title: string;
}

const ButtonPrimary = ({ onPress, width, height, backgroundColor, borderRadius, color, fontSize, fontWeight, letterSpacing, title }: ButtonPrimaryProps) => {

  return (

    <TouchableOpacity style={{
      width: width,
      height: height,
      justifyContent: 'center',
      backgroundColor: backgroundColor,
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

};

export default ButtonPrimary;

// ********** Estilos CSS **********
// const styles = StyleSheet.create({

// });
