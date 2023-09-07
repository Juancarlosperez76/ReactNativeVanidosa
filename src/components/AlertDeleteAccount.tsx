import { Modal, View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React from 'react';

interface AlertDeleteAccountProps {
  visible: boolean;
  onCloseAlertDeleteAccount: () => void;
  onAlertDeleteAccount: () => void;
  title: string;
  message: string;
  buttonConfirmStyle?: StyleProp<ViewStyle>;
  buttonConfirmText: string;
}

const AlertDeleteAccount = ({ visible, onCloseAlertDeleteAccount, onAlertDeleteAccount, title, message, buttonConfirmStyle, buttonConfirmText }: AlertDeleteAccountProps) => {

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>

          <View style={styles.containerButtonClose}>
            <TouchableOpacity onPress={onCloseAlertDeleteAccount}>
              <Ionicons style={styles.buttonClose} name="close-outline" />
            </TouchableOpacity>
          </View>

          <View style={styles.containerAlertIcon}>
            <Ionicons style={styles.alertIcon} name="trash-outline" />
          </View>

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <View style={styles.containerButton}>
            <TouchableOpacity style={[styles.buttonConfirm, buttonConfirmStyle]} onPress={onAlertDeleteAccount}>
              <Text style={styles.buttonConfirmText}>{buttonConfirmText}</Text>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </Modal>
  );
};

export default AlertDeleteAccount;

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
  containerAlertIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },
  alertIcon: {
    fontSize: 48,
    color: '#f27474',
  },
  title: {
    fontFamily: 'Aspira W05 Demi',
    marginBottom: 6,
    fontSize: 20,
    color: '#545454',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  message: {
    marginBottom: 14,
    fontSize: 16,
    color: '#545454',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  containerButton: {
    alignItems: 'center',
  },
  containerButtonClose: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 1,
  },
  buttonClose: {
    padding: 10,
    color: '#555555',
    fontSize: 36,
  },
  buttonConfirm: {
    paddingVertical: 10,
    backgroundColor: '#7066e0',
    borderWidth: 3,
    borderColor: '#b2abff',
    borderRadius: 4,
  },
  buttonConfirmText: {
    fontFamily: 'Montserrat Medium',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});
