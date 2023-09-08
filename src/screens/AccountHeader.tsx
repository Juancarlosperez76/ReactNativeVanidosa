import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, Pressable, Modal, TextInput } from 'react-native';
import { launchCamera, CameraOptions, launchImageLibrary, ImageLibraryOptions } from 'react-native-image-picker';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import LoadingIndicator from '../components/LoadingIndicator';
import HeaderLogoReturn from '../components/HeaderLogoReturn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertFailure from '../components/AlertFailure';
import AlertSuccess from '../components/AlertSuccess';
import AlertWarning from '../components/AlertWarning';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  Apellido: string;
  Nombre: string;
  Correo: string;
};

type RootStackParamList = {
  AccountHeader: undefined;
  EditAccount: undefined;
  ChangePassword: undefined;
  StackAccount: undefined;
  Login: undefined;
  Main: undefined;
};
type AccountHeaderProps = NativeStackScreenProps<RootStackParamList, 'AccountHeader'>;

const AccountHeader = ({ navigation }: AccountHeaderProps) => {

  const [user, setUser] = useState<User | null>(null);

  // -----------------------------------------------Indicador de carga "Preload"-----------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
  //   }, 800); // Tiempo de carga simulado (en milisegundos)
  // }, []);

  // --------------------------------------------------Estado de los input"----------------------------------------------------
  const [ContrasenaActual, setContrasenaActual] = useState(''); // Estado contraseña de alerta "Confirma tu identidad"
  // --------------------------------------------------------------------------------------------------------------------------

  // ----------------------------------Estado para almacenar la URI de la imagen seleccionada----------------------------------
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // --------------------------------------Estado para controlar la visibilidad del modal--------------------------------------
  const [modalVisible, setModalVisible] = useState<boolean>(false);

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

  // ----------------------------------------Función para obtener el Correo del usuario----------------------------------------
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

          // Valida si la cuenta ha sido eliminada o el correo ha sido modificado.
          if (currentUser) {
            setUser(currentUser);
            console.log('Datos del usuario obtenidos:', currentUser);
            setIsLoading(false); // Desactivar el preload
          } else {
            setDeletedAccountVisible(true);
            // Destruye la sesión y redirige al login
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userEmail');
          }
        }

      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  // ------------------------------------------Función modal "Confirmar identidad"---------------------------------------------
  const [validatePassVisible, setValidatePassVisible] = useState(false); // Estado contraseña de alerta "Confirma tu identidad"

  const handleValidatePassVisible = () => {
    setValidatePassVisible(true);
  }

  const handleCloseValidatePassVisible = () => {
    setValidatePassVisible(false);
    setContrasenaActual(''); // Limpia el campo "Ingrese contraseña" antes de redirigir a "ChangePassword"
    navigation.navigate('ChangePassword');
  }

  // Función para cerrar "Modal" al hacer clic fuera de él
  const onCloseConfirmPassOutside = () => {
    setValidatePassVisible(false);
  };

  // --------------------------------Mostrar y ocultar "Contraseña" modal "Confirmar identidad"--------------------------------
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const togglePasswordModalVisibility = () => {
    setShowPasswordModal(!showPasswordModal);
  };

  // --------------------------------------Función para validar la contraseña del usuario--------------------------------------
  const validatePassword = async () => {

    // Validar campos vacíos
    if (!ContrasenaActual) {
      setEmptyFieldsVisible(true); // Muestra alerta "Se requiere contraseña"
      return;
    }

    // Validar cantidad mínima de carácteres de la "Contraseña"
    if (ContrasenaActual.length < 8) {
      setMinPasswordVisible(true); // Muestra alerta "Contraseña inválida"
      return
    }

    setIsLoading(true); // Activar el preload

    try {

      const token = await AsyncStorage.getItem('userToken');
      const userEmail = await AsyncStorage.getItem('userEmail');

      if (!token || !userEmail) {
        Alert.alert('Error', 'Por favor inicie sesión para continuar.');
        return;
      }

      const response = await fetch('https://api-proyecto-5hms.onrender.com/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Correo: userEmail,
          Contrasena: ContrasenaActual, // Contraseña actual ingresada en el campo
        }),
      });

      if (response.status === 200) {
        handleCloseValidatePassVisible();
      } else {
        setInvalidPassVisible(true); // Muestra alerta "Contraseña incorrecta"
        setContrasenaActual(''); // Limpia el campo "Ingrese contraseña"
      }
    } catch (error) {
      console.error(error);
      // Manejo de otros errores si es necesario
    }
  };

  // ---------------------------------------------Función para cerrar la "Sesión"----------------------------------------------
  const handleLogout = async () => {
    try {

      // Eliminar el token y correo almacenados en AsyncStorage
      await AsyncStorage.removeItem('userToken');
      await AsyncStorage.removeItem('userEmail');

      setSuccessVisible(true); // Mostrar mensaje de éxito

    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('Error', 'Ha ocurrido un error al cerrar sesión.');
    }
  };

  // -----------------------------------------Función alerta "Se requiere contraseña"------------------------------------------
  const [emptyFieldsVisible, setEmptyFieldsVisible] = useState(false);

  const handleCloseEmptyFields = () => {
    setEmptyFieldsVisible(false);
  };

  // -------------------------------------------Función alerta "Contraseña inválida"-------------------------------------------
  const [minPasswordVisible, setMinPasswordVisible] = useState(false);

  const handleCloseMinPassword = () => {
    setMinPasswordVisible(false);
  };

  // ------------------------------------------Función alerta "Contraseña incorrecta"------------------------------------------
  const [invalidPassVisible, setInvalidPassVisible] = useState(false);

  const handleCloseInvalidPass = () => {
    setInvalidPassVisible(false);
    setIsLoading(false); // Desactivar el preload
  };

  // --------------------------------------------Función alerta "Cierre de sesión"---------------------------------------------
  const [SuccessVisible, setSuccessVisible] = useState(false);

  const handleCloseSuccess = () => {
    setSuccessVisible(false); // Ocultar la alerta de éxito
    navigation.navigate('StackAccount'); // Usar "StackAccount" evita volver a "AccountHeader" al hacer clic en flecha "Ir atrás"
  };

  // --------------------------------------------Función alerta "Cuenta eliminada"---------------------------------------------
  const [deletedAccountVisible, setDeletedAccountVisible] = useState(false); // Estado de modal "AlertFailure"

  const handleCloseDeletedAccount = () => {
    setDeletedAccountVisible(false);
    navigation.navigate('StackAccount'); // Redireccionar a "StackAccount"
  };

  // --------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <LoadingIndicator isLoading={isLoading} />

      <HeaderLogoReturn navigation={navigation} title="Mi cuenta" />

      <View style={styles.headerAccountContainer}>

        <View style={styles.headerAccountContent}>

          {/* -----------------Mostrar imagen seleccionada si hay una, si nó, mostrar imagen predeterminada---------------- */}
          <TouchableOpacity style={styles.containerProfileImage} onPress={openModalOptionImageLoad}>
            <Image style={styles.profileImage} source={selectedImage ? { uri: selectedImage } : require('../../android/assets/img/profileIcon.png')} />
            <FontAwesome5 style={styles.iconEditImage} name="pencil-alt" solid />
          </TouchableOpacity>

          {/* -----------------------------------Modal para opciones de carga de imagen------------------------------------ */}
          <Modal animationType="fade" transparent={true} visible={modalVisible} onRequestClose={closeModalOptionImageLoad}>
            <Pressable style={styles.modalContainer} onPress={handlePressOutsideModal}>
              <View style={styles.modalContent}>

                <TouchableOpacity style={styles.modalItem} onPress={() => { openCamera(); closeModalOptionImageLoad(); }}>
                  <FontAwesome style={styles.modalIcon} name="camera" size={24} />
                  <Text style={styles.modalItemText}>Tomar una foto</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.modalItem} onPress={() => { openImageLibrary(); closeModalOptionImageLoad(); }}>
                  <Ionicons style={styles.modalIcon} name="images-sharp" size={24} />
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

          <TouchableOpacity style={styles.contentItemSetting} onPress={handleValidatePassVisible}>
            <Ionicons style={styles.itemSettingIcon} name="key-outline" />
            <Text style={styles.settingItemText}>Cambiar la contraseña</Text>
          </TouchableOpacity>

          <View style={styles.separator}></View>

          <TouchableOpacity style={styles.contentItemSetting} onPress={handleLogout}>
            <Ionicons style={styles.logoutIcon} name="log-out-outline" />
            <Text style={styles.settingItemText}>Cerrar sesión</Text>
          </TouchableOpacity>

          <View style={styles.separator}></View>

          {/* ---------------------------------------Alerta "Se requiere contraseña"--------------------------------------- */}
          <AlertWarning
            visible={emptyFieldsVisible}
            onCloseWarning={handleCloseEmptyFields}
            title='Se requiere contraseña.'
            message='Por favor, ingrese la contraseña para continuar.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ----------------------------------------Alerta "Contraseña inválida"----------------------------------------- */}
          <AlertWarning
            visible={minPasswordVisible}
            onCloseWarning={handleCloseMinPassword}
            title='Contraseña inválida.'
            message='La contraseña debe contener al menos 8 caractéres.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ---------------------------------------Alerta "Contraseña incorrecta"---------------------------------------- */}
          <AlertWarning
            visible={invalidPassVisible}
            onCloseWarning={handleCloseInvalidPass}
            title='Contraseña incorrecta.'
            message='La contraseña ingresada es incorrecta.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------Alerta "Cierre de sesión"------------------------------------------ */}
          <AlertSuccess
            visible={SuccessVisible}
            onCloseSuccess={handleCloseSuccess}
            title='Cierre de sesión.'
            message='La sesión se ha cerrado con éxito.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* -----------------------------------------Alerta "Cuenta eliminada"------------------------------------------- */}
          <AlertFailure
            visible={deletedAccountVisible}
            onCloseFailure={handleCloseDeletedAccount}
            title='Usuario no encontrado.'
            message={`No pudimos encontrar la cuenta.\nContacte al administrador.`}
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />

          {/* -----------------------------------------Modal "Confirmar identidad"----------------------------------------- */}
          <Modal
            visible={validatePassVisible}
            transparent
            animationType="fade"
          >

            <Pressable
              style={styles.modalBackground}
              onPress={onCloseConfirmPassOutside} // Cerrar "Modal" al hacer clic fuera de él 
            >

              <View style={styles.modalContentAlert}>

                <Text style={styles.title}>Confirma tu identidad</Text>

                <View>

                  <TextInput
                    style={styles.inputAlert}
                    placeholder='Ingrese contraseña'
                    placeholderTextColor='#4E4E4E'
                    onChangeText={setContrasenaActual}
                    value={ContrasenaActual}
                    autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
                    secureTextEntry={!showPasswordModal} // Oculta y muestra carácteres de contraseña
                  />
                  {ContrasenaActual !== '' && ( // Código cambio de icono de la contraseña
                    <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordModalVisibility}>
                      <Ionicons style={styles.iconFormRight} name={showPasswordModal ? 'eye-off-sharp' : 'eye-sharp'} />
                    </TouchableOpacity>
                  )}
                </View>

                <View style={styles.containerButton}>
                  <TouchableOpacity style={styles.button} onPress={validatePassword}>
                    <Text style={styles.buttonText}>ENVIAR</Text>
                  </TouchableOpacity>
                </View>

              </View>
            </Pressable>
          </Modal>
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
    backgroundColor: '#ffffff',
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
  // Estilos modal de opciones carga de imagen
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    padding: 25,
    borderRadius: 10,
    backgroundColor: '#3F3F3F',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
  },
  modalIcon: {
    color: "#e4e4e4",
  },
  modalItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: "#ffffff",
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
  // Fin estilos modal de opciones carga de imagen
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
    color: '#4e4e4e',
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
  // Estilos Modal "Confirmar identidad"
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalContentAlert: {
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
  inputAlert: {
    height: 48,
    marginVertical: 18,
    marginHorizontal: 10,
    marginBottom: 18,
    paddingLeft: 8,
    borderRadius: 3,
    borderColor: '#d9d9d9',
    borderWidth: 2,
    fontWeight: '400',
    color: '#4E4E4E',
    letterSpacing: 0.5,
  },
  contentIconFormRight: {
    position: 'absolute',
    top: 22,
    right: 12,
    padding: 10,
  },
  iconFormRight: {
    fontSize: 20,
    color: '#4e4e4e',
  },
  containerButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7066e0',
    padding: 10,
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
  // Fin estilos Modal "Confirmar identidad"
});