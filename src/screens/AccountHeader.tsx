import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeaderReturn from '../components/CustomHeaderReturn';

type RootStackParamList = {
  AccountHeader: undefined;
  EditAccount: undefined;
  ChangePassword: undefined;
  StackAccount: undefined;
};
type AccountHeaderProps = NativeStackScreenProps<RootStackParamList, 'AccountHeader'>;

const AccountHeader = ({ navigation }: AccountHeaderProps) => {

  // ----------------------Código para cerrar la "Sesión"----------------------
  const handleLogout = async () => {
    try {
      // Eliminar el token y correo almacenados en AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userEmail');

      // Redireccionar al usuario a la pantalla de inicio de sesión
      navigation.navigate('StackAccount');

      // Mostrar mensaje de éxito
      Alert.alert('Éxito', 'Se ha cerrado sesión exitosamente.');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Ha ocurrido un error al cerrar sesión.');
    }
  };
  // --------------------------------------------------------------------------

  return (

    <>

      <CustomHeaderReturn navigation={navigation} title="Mi cuenta" />

      <View style={styles.headerAccountContainer}>

        <View style={styles.headerAccountContent}>

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

          <TouchableOpacity style={styles.contentSetting} onPress={() => navigation.navigate('ChangePassword')}>
            <Ionicons style={styles.settingIcon} name="key-outline" />
            <Text style={styles.settingText}>Cambiar la contraseña</Text>
          </TouchableOpacity>

          <View style={styles.separator}></View>

          <TouchableOpacity style={styles.contentLogout} onPress={handleLogout}>
            <Ionicons style={styles.logoutIcon} name="log-out-outline" />
            <Text style={styles.logoutText}>Cerrar sesión</Text>
          </TouchableOpacity>

          <View style={styles.separator}></View>

        </View>

      </View></>

  );

};

export default AccountHeader;

const styles = StyleSheet.create({
  headerAccountContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  headerAccountContent: {
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