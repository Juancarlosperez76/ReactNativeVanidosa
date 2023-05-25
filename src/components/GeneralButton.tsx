import React from 'react';
import { TouchableOpacity, Text } from 'react-native';

// Solución "El elemento de enlace '' tiene un tipo 'any' implícito."
interface GeneralButtonProps {
  onPress: () => void;
  width: string;
  height: number;
  backgroundColor: string;
  borderRadius: number;
  title: string;
  color: string;
  fontSize: number;
}

const GeneralButton = ({ onPress, width, height, backgroundColor, borderRadius, title, color, fontSize }: GeneralButtonProps) => (

  <TouchableOpacity style={{
    width: width,
    height: height,
    justifyContent: 'center',
    backgroundColor: backgroundColor,
    borderRadius: borderRadius,
  }} onPress={onPress}
  >
    <Text style={{
      color: color,
      fontSize: fontSize,
      textAlign: 'center'
    }}
    >{title}
    </Text>
  </TouchableOpacity>
);

export default GeneralButton;

// ********** Estilos CSS **********
// const styles = StyleSheet.create({

// });
