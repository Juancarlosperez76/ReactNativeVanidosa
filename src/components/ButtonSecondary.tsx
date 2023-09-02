import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Solución "El elemento de enlace '' tiene un tipo 'any' implícito."
interface ButtonSecondaryProps {
  onPress: () => void;
  width: number | string,
  height: number | string,
  marginTop: number,
  marginBottom: number,
  backgroundColor: string;
  borderWidth: number,
  borderColor: string,
  borderRadius: number;
  borderTopLeftRadius: number;
  borderTopRightRadius: number;
  borderBottomLeftRadius: number;
  borderBottomRightRadius: number;
  fontFamily: string;
  color: string;
  fontSize: number,
  fontWeight: 'normal' | 'bold' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900' | undefined;
  letterSpacing: number,
  title: string;
}

const ButtonSecondary = ({
  onPress,
  width,
  height,
  marginTop,
  marginBottom,
  backgroundColor,
  borderWidth,
  borderColor,
  borderRadius,
  borderTopLeftRadius,
  borderTopRightRadius,
  borderBottomRightRadius,
  borderBottomLeftRadius,
  fontFamily,
  color,
  fontSize,
  fontWeight,
  letterSpacing,
  title }:
  ButtonSecondaryProps) => {

  return (

    <TouchableOpacity style={{
      justifyContent: 'center',
      width: width,
      height: height,
      marginTop: marginTop,
      marginBottom: marginBottom,
      backgroundColor: backgroundColor,
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderRadius: borderRadius,
      borderTopLeftRadius,
      borderTopRightRadius,
      borderBottomLeftRadius,
      borderBottomRightRadius,
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

}

export default ButtonSecondary;

// ********** Estilos CSS **********
// const styles = StyleSheet.create({

// });