import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const AccountHeader = () => {

  return (

    // <Modal visible={visible} onRequestClose={onIconPress}>

    <View style={styles.containerModalAccount}>

      <View style={styles.contentModalAccount}>

        <View style={styles.contentProfileImage}>
          <Image style={styles.profileImage} source={require('../../android/assets/img/perfil-1.png')} />
        </View>

        <Text style={styles.nameText}>JUAN CARLOS PÉREZ MOLINA</Text>

        <Text style={styles.emailText}>sebasydan@gmail.com</Text>

        <View style={styles.separator}></View>

        <View style={styles.contentSetting}>
          <Ionicons style={styles.settingIcon} name="settings-outline" />
          <Text style={styles.settingText}>Configurar mi cuenta</Text>
        </View>

        <View style={styles.separator}></View>

        <View style={styles.contentLogout}>
          <Ionicons style={styles.logoutIcon} name="log-out-outline" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </View>

      </View>

    </View>

    // </Modal>

  );

};

export default AccountHeader;

const styles = StyleSheet.create({
  containerModalAccount: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  contentModalAccount: {
    width: '68%',
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
  contentProfileImage: {
    alignItems: 'center',
    marginBottom: 15,
  },
  profileImage: {

  },
  nameText: {
    textAlign: 'center',
    color: '#333333',
    fontSize: 16,
    fontWeight: '500',
  },
  emailText: {
    textAlign: 'center',
    color: '#7e7e7e',
    fontSize: 14,
    fontWeight: '400',
  },
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginVertical: 30,
  },
  contentSetting: {
    flexDirection: 'row',
  },
  settingIcon: {
    marginHorizontal: 10,
    color: '#333333',
    fontSize: 20,
  },
  settingText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '400',
  },
  contentLogout: {
    flexDirection: 'row',
  },
  logoutIcon: {
    marginHorizontal: 10,
    color: '#333333',
    fontSize: 22,
  },
  logoutText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '400',
  },
});