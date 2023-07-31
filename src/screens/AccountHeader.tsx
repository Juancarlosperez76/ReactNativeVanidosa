import { launchCamera, CameraOptions, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Pressable, Modal } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AlertSuccess from '../components/AlertSuccess';
import AlertWarning from '../components/AlertWarning';

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
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Estado para almacenar la URI de la imagen seleccionada
  const [modalVisible, setModalVisible] = useState<boolean>(false); // Estado para controlar la visibilidad del modal

  // ------------------------------Función para abrir modal al hacer clic en la imagen de perfil-------------------------------
  const openModalOptionImageLoad = () => {
    setModalVisible(true);
  };

  // ------------------------------------------------Función para cerrar modal-------------------------------------------------
  const closeModalOptionImageLoad = () => {
    setModalVisible(false);
  };

  // -----------------------------------Función para cerrar modal al dar click fuera de el-------------------------------------
  const handlePressOutsideModal = () => {
    closeModalOptionImageLoad();
  };

  // ---------------------------------------Función para tomar una imagen con la camara----------------------------------------
  const openCamera = async () => {

    const options: CameraOptions = {
      mediaType: 'photo',
    };

    try {
      const result = await launchCamera(options);

      if (!result?.assets?.[0]?.uri) {
        console.log('Captura de imagen cancelada por el usuario.');
        return;
      }

      setSelectedImage(result.assets[0].uri); // Guardar la URI de la imagen capturada en el estado
    } catch (error) {
      console.error('Error al abrir la cámara:', error);
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------Función para seleccionar una imagen de la galería-------------------------------------
  const openImageLibrary = async () => {

    const options: ImageLibraryOptions = {
      mediaType: 'photo',
    };

    try {
      const result = await launchImageLibrary(options);

      if (!result?.assets?.[0]?.uri) {
        console.log('Selección de imagen cancelada por el usuario.');
        return;
      }

      setSelectedImage(result.assets[0].uri); // Guardar la URI de la imagen seleccionada en el estado
    } catch (error) {
      console.error('Error al abrir la biblioteca de imágenes:', error);
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ----------------------------------------Código para obtener el Correo del usuario-----------------------------------------
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
            setWarningVisible(true);
          }

        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------Código para cerrar la "Sesión"-----------------------------------------------
  const handleLogout = async () => {
    try {

      // Eliminar el token y correo almacenados en AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userEmail');

      // Mostrar mensaje de éxito
      setSuccessVisible(true);

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Ha ocurrido un error al cerrar sesión.');
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------Función para mostrar el modal "AlertSuccess"---------------------------------------
  const [SuccessVisible, setSuccessVisible] = useState(false);

  const handleCloseSuccess = () => {
    setSuccessVisible(false); // Ocultar la alerta de éxito
    navigation.reset({
      index: 0,
      routes: [{ name: 'StackAccount' }],
    }); // Redireccionar a "StackAccount"
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------Función para mostrar el modal "AlertWarning"---------------------------------------
  const [WarningVisible, setWarningVisible] = useState(false);

  const handleCloseWarning = () => {
    setWarningVisible(false);
    navigation.navigate('StackAccount'); // Redireccionar a "StackAccount"
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <>
      <CustomHeaderReturn navigation={navigation} title="Mi cuenta" />

      <View style={styles.headerAccountContainer}>

        <View style={styles.headerAccountContent}>

          {/* ----Mostrar imagen seleccionada si hay una, si nó, mostrar imagen predeterminada---- */}
          <TouchableOpacity style={styles.containerProfileImage} onPress={openModalOptionImageLoad}>
            <Image style={styles.profileImage} source={selectedImage ? { uri: selectedImage } : require('../../android/assets/img/profileIcon.png')} />
            <FontAwesome5 style={styles.iconEditImage} name="pencil-alt" solid />
          </TouchableOpacity>
          {/* ------------------------------------------------------------------------------------ */}

          {/* -----------------------Modal para opciones de carga de imagen----------------------- */}
          <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={closeModalOptionImageLoad}>
            <Pressable style={styles.modalContainer} onPress={handlePressOutsideModal}>
              <View style={styles.modalContent}>

                <TouchableOpacity style={styles.modalItem} onPress={() => { openCamera(); closeModalOptionImageLoad(); }}>
                  <FontAwesome5 style={styles.modalIcon} name="camera" solid />
                  <Text style={styles.modalItemText}>Tomar una foto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalItem} onPress={() => { openImageLibrary(); closeModalOptionImageLoad(); }}>
                  <Ionicons style={styles.modalIcon} name="images-sharp" />
                  <Text style={styles.modalItemText}>Seleccionar de galería</Text>
                </TouchableOpacity>

              </View>
            </Pressable>
          </Modal>
          {/* ------------------------------------------------------------------------------------------------------------- */}

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

          {/* ---------------------------Código para ejecutar y mostrar el modal "AlertSuccess"---------------------------- */}
          {/* Renderizar componente "AlertSuccess" */}
          <AlertSuccess
            visible={SuccessVisible}
            onCloseSuccess={handleCloseSuccess}
            title='Cierre de sesión.'
            message='La sesión se ha cerrado con éxito.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ---------------------------Código para ejecutar y mostrar el modal "AlertWarning"---------------------------- */}
          {/* Renderizar componente "AlertWarning" */}
          <AlertWarning
            visible={WarningVisible}
            onCloseWarning={handleCloseWarning}
            title='Cuenta eliminada.'
            message='La cuenta no exixte o fué eliminada.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

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
  containerProfileImage: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  profileImage: {
    width: 80,
    height: 80,
  },
  iconEditImage: {
    right: -30,
    bottom: 10,
    color: "#4e4e4e",
    fontSize: 16,
  },
  // Estilos del modal 
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#ebebeb',
    padding: 25,
    borderRadius: 10,
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  modalIcon: {
    color: "#6e6e6e",
    fontSize: 24,
  },
  modalItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#4e4e4e",
    letterSpacing: 0.3,
  },
  modalCancel: {
    marginTop: 20,
  },
  modalCancelText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  // Fin estilos del modal 
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