import React from 'react';
import { Modal, View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface ModalAccountProps {
  visible: boolean;
  onClose: () => void;
}

const ModalAccount = ({ visible, onClose }: ModalAccountProps) => {

  return (

    <Modal visible={visible} onRequestClose={onClose}>

      <TouchableOpacity style={styles.contentCloseIcon} onPress={onClose}>
        <Ionicons style={styles.closeIcon} name="close-outline" />
      </TouchableOpacity>

      <View style={styles.contentModalAccount}>
        <Text>Contenido del archivo.tsx</Text>
      </View>

    </Modal>

  );
};

export default ModalAccount;

const styles = StyleSheet.create({
  contentModalAccount: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentCloseIcon: {
    position: 'absolute',
    top: 21,
    right: 25,
    zIndex: 1,
  },
  closeIcon: {
    color: '#7e7e7e',
    fontSize: 38,
  },
});