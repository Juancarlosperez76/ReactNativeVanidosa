import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle, TextInput } from 'react-native';

interface AlertEnterCodeProps {
  visible: boolean;
  onCloseEnterCode: () => void;
  title: string;
  message: string;
  buttonStyle?: StyleProp<ViewStyle>;
  buttonText: string;
}

const AlertEnterCode = ({ visible, onCloseEnterCode, title, message, buttonStyle, buttonText }: AlertEnterCodeProps) => {

  const [InputOne, setInputOne] = React.useState('');

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.containerInput}>
              <TextInput
                style={styles.input}
                placeholderTextColor='#4E4E4E'
                onChangeText={setInputOne}
                value={InputOne}
                keyboardType='numeric'
              />
          </View>

          <View style={styles.containerButton}>
            <TouchableOpacity style={[styles.button, buttonStyle]} onPress={onCloseEnterCode}>
              <Text style={styles.buttonText}>{buttonText}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
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
    fontFamily: 'Montserrat SemiBold',
    fontSize: 20,
    marginBottom: 16,
    color: '#545454',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  message: {
    fontSize: 15,
    marginBottom: 18,
    color: '#545454',
    letterSpacing: 0.2,
    textAlign: 'center',
  },
  containerInput: {
    alignItems: 'center',
    marginBottom: 18,
  },
  input: {
    width: 120,
    height: 50,
    borderWidth: 2,
    borderColor: '#d3d3d3',
    borderRadius: 5,
    color: '#505050',
    textAlign: 'center',
    fontSize: 18,
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