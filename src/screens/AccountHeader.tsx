import AsyncStorage from '@react-native-async-storage/async-storage';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import axios from 'axios';
import { CommonActions } from '@react-navigation/native';

type User = {
  Nombre: string;
  Apellido: string;
  Correo: string;
};

type RootStackParamList = {
  AccountHeader: undefined;
  EditAccount: undefined;
  ChangePassword: undefined;
  StackAccount: undefined;
};
type AccountHeaderProps = NativeStackScreenProps<RootStackParamList, 'AccountHeader'>;

const AccountHeader = ({ navigation }: AccountHeaderProps) => {
  const [user, setUser] = useState<User | null>(null);

  // ----------------Código para obtener el Correo del usuario-----------------
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = await AsyncStorage.getItem('userToken');
        const userEmail = await AsyncStorage.getItem('userEmail');

        if (token && userEmail) {
          const userResponse = await axios.get('https://api-proyecto-5hms.onrender.com/api/usuario', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const userData = userResponse.data.Usuarios;
          const currentUser = userData.find((user: { Correo: string; }) => user.Correo === userEmail);

          if (currentUser) {
            setUser(currentUser);
          } else {
            console.error('Usuario actual no encontrado en la lista de usuarios');
          }

        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);
  // --------------------------------------------------------------------------

  // ----------------------Código para cerrar la "Sesión"----------------------
  const handleLogout = async () => {
    try {
      // Eliminar el token y correo almacenados en AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userEmail');

      // Reiniciar la pila de navegación y llevar al usuario a la pantalla de inicio de sesión
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'StackAccount' }],
        })
      );

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
            <Image style={styles.profileImage} source={require('../../android/assets/img/profileIcon.png')} />
          </View>

          <View style={styles.containerNameText}>
            <Text style={styles.nameText}>{user?.Nombre} </Text>
            <Text style={styles.nameText}>{user?.Apellido}</Text>
          </View>

          <Text style={styles.emailText}>{user?.Correo}</Text>

          <View style={styles.separator}></View>

          <TouchableOpacity style={styles.contentItemSetting} onPress={() => navigation.navigate('EditAccount')}>
            <Ionicons style={styles.itemSettingIcon} name="settings-outline" />
            <Text style={styles.settingItemText}>Configuración de la cuenta</Text>
          </TouchableOpacity>

          <View style={styles.separator}></View>

          <TouchableOpacity style={styles.contentItemSetting} onPress={() => navigation.navigate('ChangePassword')}>
            <Ionicons style={styles.itemSettingIcon} name="key-outline" />
            <Text style={styles.settingItemText}>Cambiar la contraseña</Text>
          </TouchableOpacity>

          <View style={styles.separator}></View>

          <TouchableOpacity style={styles.contentItemSetting} onPress={handleLogout}>
            <Ionicons style={styles.logoutIcon} name="log-out-outline" />
            <Text style={styles.settingItemText}>Cerrar sesión</Text>
          </TouchableOpacity>

          <View style={styles.separator}></View>

        </View>

      </View>
    </>
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
  contentProfileImage: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
  },
  containerNameText: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  nameText: {
    color: '#333333',
    fontSize: 18,
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
    marginVertical: 20,
  },
  contentItemSetting: {
    flexDirection: 'row',
  },
  itemSettingIcon: {
    marginHorizontal: 5,
    color: '#333333',
    fontSize: 20,
  },
  logoutIcon: {
    marginHorizontal: 5,
    color: '#333333',
    fontSize: 22,
  },
  settingItemText: {
    color: '#333333',
    fontSize: 14,
    fontWeight: '400',
  },
});