import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AlertConfirmPassProps {
  visible: boolean;
  onCloseConfirmPass: () => void;
  title: string;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonText: string;
}

const AlertConfirmPass = ({ visible, onCloseConfirmPass, title, buttonStyle, buttonText }: AlertConfirmPassProps) => {

  const [Contrasena, setContrasena] = React.useState('');

  // Mostrar y ocultar "Contraseña"
  const [showPassword, setShowPassword] = useState(false);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>

          <Text style={styles.title}>{title}</Text>

          <View>

            <TextInput
              style={styles.input}
              placeholder='Ingrese contraseña'
              placeholderTextColor='#4E4E4E'
              onChangeText={setContrasena}
              value={Contrasena}
              autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
              secureTextEntry={!showPassword} // Oculta y muestra carácteres de contraseña
            />
            {Contrasena !== '' && ( // Código cambio de icono de la contraseña
              <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibility}>
                <Ionicons style={styles.iconFormRight} name={showPassword ? 'eye-off-sharp' : 'eye-sharp'} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.containerButton}>
            <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onCloseConfirmPass}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default AlertConfirmPass;

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalContent: {
    width: '80%',
    paddingTop: 20,
    padding: 15,
    backgroundColor: 'white',
    borderRadius: 8,
  },
  title: {
    fontFamily: 'Montserrat SemiBold',
    fontSize: 20,
    marginBottom: 16,
    color: '#545454',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  // Estilos Imput "Contraseña"
  input: {
    height: 48,
    marginVertical: 8,
    marginBottom: 18,
    paddingLeft: 8,
    borderRadius: 3,
    borderColor: '#d9d9d9',
    borderWidth: 2,
    fontWeight: '400',
    color: '#4E4E4E',
    letterSpacing: 0.5,
  },
  contentIconFormRight: {
    position: 'absolute',
    top: 12,
    right: 2,
    padding: 10,
  },
  iconFormRight: {
    fontSize: 20,
    color: '#4e4e4e',
  },
  // Fin estilos Imput "Contraseña"
  containerButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7066e0',
    paddingVertical: 10,
    borderRadius: 4,
    borderColor: '#b2abff',
    borderWidth: 3,
  },
  buttonText: {
    fontFamily: 'Montserrat Medium',
    color: 'white',
    fontSize: 16,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});
