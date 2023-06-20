import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  AccountHeader: undefined;
  EditAccount: undefined;
};
type AccountHeaderProps = NativeStackScreenProps<RootStackParamList, 'AccountHeader'>;

const AccountHeader = ({ navigation }: AccountHeaderProps) => {

  return (

    <View style={styles.containerModalAccount}>

      <View style={styles.contentModalAccount}>

        <View style={styles.contentProfileImage}>
          <Image style={styles.profileImage} source={require('../../android/assets/img/perfil-1.png')} />
        </View>

        <Text style={styles.nameText}>JUAN CARLOS PÉREZ MOLINA</Text>

        <Text style={styles.emailText}>sebasydan@gmail.com</Text>

        <View style={styles.separator}></View>

        <TouchableOpacity style={styles.contentSetting} onPress={() => navigation.navigate('EditAccount')}>
          <Ionicons style={styles.settingIcon} name="settings-outline" />
          <Text style={styles.settingText}>Configuración de la cuenta</Text>
        </TouchableOpacity>

        <View style={styles.separator}></View>

        <View style={styles.contentLogout}>
          <Ionicons style={styles.logoutIcon} name="log-out-outline" />
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </View>

      </View>

    </View>

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
    marginBottom: 30,
  },
  profileImage: {
    width: 80,
    height: 80,
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
    marginHorizontal: 5,
    color: '#333333',
    fontSize: 22,
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
    marginHorizontal: 5,
    color: '#333333',
    fontSize: 25,
  },
  logoutText: {
    color: '#333333',
    fontSize: 16,
    fontWeight: '400',
  },
});