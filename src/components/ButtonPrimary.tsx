import { TouchableOpacity, Text } from 'react-native';
import React from 'react';

// Solución "El elemento de enlace '' tiene un tipo 'any' implícito."
interface ButtonPrimaryProps {
  onPress: () => void;
  width: number | string,
  height: number | string,
  marginTop: number,
  marginBottom: number,
  backgroundColor: string;
  borderRadius: number;
  fontFamily: string;
  color: string;
  fontSize: number,
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
  letterSpacing: number,
  title: string;
}

const ButtonPrimary = ({ 
  onPress, 
  width, 
  height, 
  marginTop,
  marginBottom,
  backgroundColor, 
  borderRadius, 
  fontFamily,
  color, 
  fontSize, 
  fontWeight, 
  letterSpacing, 
  title }: 
  ButtonPrimaryProps) => {

  return (

    <TouchableOpacity style={{
      justifyContent: 'center',
      width: width,
      height: height,
      marginTop: marginTop,
      marginBottom: marginBottom,
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
    }} onPress={onPress}
    >
      <Text style={{
        fontFamily: fontFamily,
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
