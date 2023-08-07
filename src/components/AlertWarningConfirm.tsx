import React from 'react';
import { Modal, View, Text, TouchableOpacity, StyleSheet, StyleProp, ViewStyle } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface AlertWarningConfirmProps {
  visible: boolean;
  onCloseWarningConfirm: () => void;
  onConfirmWarning: () => void;
  title: string;
  message: string;
  buttonConfirmStyle?: StyleProp<ViewStyle>;
  buttonCancelStyle?: StyleProp<ViewStyle>;
  buttonConfirmText: string;
  buttonCancelText: string;
}

const AlertWarningConfirm = ({ visible, onCloseWarningConfirm, onConfirmWarning, title, message, buttonConfirmStyle, buttonCancelStyle, buttonConfirmText, buttonCancelText }: AlertWarningConfirmProps) => {

  return (
    <Modal visible={visible} transparent animationType="fade">
      <View style={styles.modalBackground}>
        <View style={styles.modalContent}>
          <View style={styles.containerAlertIcon}>
            <Ionicons style={styles.alertIcon} name="alert-circle-outline" />
          </View>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>
          <View style={styles.containerButton}>
            <View style={styles.contentButton}>
            <TouchableOpacity style={[styles.buttonCancel, buttonCancelStyle]} onPress={onCloseWarningConfirm}>
                <Text style={styles.buttonCancelText}>{buttonCancelText}</Text>
              </TouchableOpacity>
              <TouchableOpacity style={[styles.buttonConfirm, buttonConfirmStyle]} onPress={onConfirmWarning}>
                <Text style={styles.buttonConfirmText}>{buttonConfirmText}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AlertWarningConfirm;

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
    color: '#f8bb86',
  },
  title: {
    fontFamily: 'Montserrat SemiBold',
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
  contentButton: {
    flexDirection: 'row',
  },
  buttonCancel: {
    marginRight: 8,
    paddingVertical: 10,
    backgroundColor: '#dc3545',
    borderWidth: 3,
    borderColor: '#f36262',
    borderRadius: 4,
  },
  buttonCancelText: {
    fontFamily: 'Montserrat Medium',
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    letterSpacing: 0.3,
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
