import { Modal, View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextInput, Pressable } from 'react-native';
import { useState } from 'react';
import React from 'react';

interface AlertEnterCodeProps {
  visible: boolean;
  onCloseEnterCodeOutside: () => void; // Función para cerrar "Modal" al hacer clic fuera de él
  onCloseEnterCode: () => void;
  title: string;
  message: string;
  email: string;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonText: string;
}

const AlertEnterCode = ({ visible, onCloseEnterCodeOutside, onCloseEnterCode, title, message, buttonStyle, buttonText, email }: AlertEnterCodeProps) => {

  const [InputOne, setInputOne] = useState('');

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
    >

      <Pressable
        style={styles.modalBackground}
        onPress={onCloseEnterCodeOutside} // Cerrar "Modal" al hacer clic fuera de él 
      >

        <View style={styles.modalContent}>

          <Text style={styles.title}>{title}</Text>

          <Text style={styles.message}>{message}</Text>
          <Text style={styles.email}>{email}</Text>

          <View style={styles.containerInput}>
            <TextInput
              style={styles.input}
              placeholderTextColor='#4E4E4E'
              onChangeText={setInputOne}
              value={InputOne}
              keyboardType='numeric'
              maxLength={4} // Limita a 4 los números ingrsados
            />
          </View>

          <View style={styles.containerButton}>
            <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onCloseEnterCode}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>

        </View>

      </Pressable>

    </Modal>
  );
};

export default AlertEnterCode;

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
    fontFamily: 'Aspira W05 Demi',
    fontSize: 20,
    marginBottom: 12,
    color: '#545454',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  message: {
    fontFamily: 'Montserrat Medium',
    fontSize: 15,
    color: '#545454',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  email: {
    marginBottom: 15,
    fontSize: 14,
    color: '#545454',
    fontWeight: '700',
    letterSpacing: 0.4,
    textAlign: 'center',
  },
  containerInput: {
    alignItems: 'center',
    marginBottom: 18,
  },
  input: {
    fontFamily: 'Montserrat Medium',
    width: 180,
    height: 50,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    borderRadius: 5,
    color: '#545454',
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '500',
    letterSpacing: 10,
  },
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