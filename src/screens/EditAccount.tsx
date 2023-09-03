import { Alert, Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertDeleteAccount from '../components/AlertDeleteAccount';
import LoadingIndicator from '../components/LoadingIndicator';
import HeaderLogoReturn from '../components/HeaderLogoReturn';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ButtonPrimary';
import AlertSuccess from '../components/AlertSuccess';
import AlertWarning from '../components/AlertWarning';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  _id: User | null;
  Nombre: string;
  Apellido: string;
  Tipo_Documento: string;
  Documento: number;
  Direccion: string;
  Telefono: number;
  Correo: string;
  Contrasena: string;
};

type RootStackParamList = {
  StackAccount: undefined;
  EditAccount: undefined;
  AccountHeader: undefined;
  Login: undefined;
};
type EditAccountProps = NativeStackScreenProps<RootStackParamList, 'EditAccount'>;

const EditAccount = ({ navigation }: EditAccountProps) => {

  const [user, setUser] = useState<User | null>(null);

  // -----------------------------------------------Indicador de caega "Preload"-----------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  // ----------------------------------------------Estados para campos editables-----------------------------------------------
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Correo, setCorreo] = useState('');

  // --------------------------------------------Mostrar datos de usuario logueado---------------------------------------------
  useEffect(() => {
    const fetchUserData = async () => {

      setIsLoading(true); // Activar el preload

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
            console.log('Datos del usuario obtenidos:', currentUser);

            // Inicializa estado de campos editables, con valores del usuario logueado, "Cambia estado de vacío a lleno"
            setNombre(currentUser.Nombre);
            setApellido(currentUser.Apellido);
            setDireccion(currentUser.Direccion);
            setTelefono(currentUser.Telefono.toString());
            setCorreo(currentUser.Correo);

          } else {
            console.error('Usuario actual no encontrado en la lista de usuarios');
            // Aquí redirigimos al usuario a la pantalla de inicio de sesión
            navigation.navigate('StackAccount');
          }
        }

        setTimeout(() => { // Agregar tiempo de espera adicional después de cargar la pagina
          setIsLoading(false); // Cambiar isLoading a false después de obtener los datos
        }, 1000);

      } catch (error) {
        //console.error('Error al obtener los datos del usuario:', error);
      }
    };
    fetchUserData();
  }, []);

  // ------------------------------------------------Editar cuenta de usuario--------------------------------------------------
  const handleEdit = async () => {

    if (!user || typeof user !== 'object') { // Verificar si el objeto user es null o undefined
      console.error('No se puede editar el usuario. El usuario no está definido o no es un objeto válido.');
      return;
    }

    // Validación de campos vacíos
    if (Nombre === '' || Apellido === '' || Direccion === '' || Telefono === '' || Correo === '') {
      setEmptyInputVisible(true); // Muestra alerta de "Campos vacíos"
      return
    }

    // Validar si se realizaron cambios en la información
    if (Nombre !== user.Nombre || Apellido !== user.Apellido || Direccion !== user.Direccion || Telefono.toString() !== user.Telefono.toString() || Correo !== user.Correo) {
      console.log('Se realizaron cambios en la información')
    } else {
      setWarningEditVisible(true);
      return;
    }

    // Validar cantidad mínima de digitos del "Teléfono"
    if (!/^\d{10,}$/.test(Telefono)) {
      setPhoneVisible(true);
      return
    }

    // Validar formato de "Correo electrónico"
    if (!/^[a-zA-Z0-9._-]+@(yahoo|outlook|hotmail|gmail|mailbox)\.(com|es|net|co)$/.test(Correo)) {
      setEmailVisible(true);
      return;
    }

    const updatedUserData = { // Crear un objeto con los datos del formulario que serán actualizados
      _id: user._id,
      Nombre: Nombre !== '' ? Nombre : user.Nombre,
      Apellido: Apellido !== '' ? Apellido : user.Apellido,
      Direccion: Direccion !== '' ? Direccion : user.Direccion,
      Telefono: Telefono !== '' ? parseInt(Telefono, 10) : user.Telefono, // Convierte la cadena en tipo numérico "number"
      Correo: Correo !== '' ? Correo : user.Correo,
    };

    const token = await AsyncStorage.getItem('userToken');

    if (!token) {
      console.error('No se puede editar el usuario. El token no está definido.');
      return;
    }

    // Realizar la solicitud de actualización al servidor
    const response = await axios.put(`https://api-proyecto-5hms.onrender.com/api/usuario`, updatedUserData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    );

    if (response.status === 200) { // Verificar que la respuesta del servidor sea exitosa
      setUser({ ...user, ...updatedUserData }); // Actualizar el estado del usuario con los datos editados
      setSuccessEditVisible(true); // Muestra alerta "La información se ha actualizado correctamente."
    } else {
      //console.error('Error al editar el usuario:', response.data);
    }
  }

  // -------------------------------------------Función modal "Confirmar identidad"--------------------------------------------
  const [ContrasenaActual, setContrasenaActual] = React.useState(''); // Estado contraseña de la alerta "Confirma tu identidad"
  const [validatePassVisible, setValidatePassVisible] = useState(false);

  const handleShowValidatePassVisible = () => {
    setValidatePassVisible(true);
  }

  const handleCloseValidatePassVisible = () => {
    setValidatePassVisible(false);
  }

  // Mostrar y ocultar "Contraseña"
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const togglePasswordModalVisibility = () => {
    setShowPasswordModal(!showPasswordModal);
  };

  // Función para cerrar "Modal" al hacer clic fuera de él
  const onCloseConfirmPassOutside = () => {
    setValidatePassVisible(false);
  };
  // -------------------------------------------Función validar contraseña de usuario------------------------------------------
  const validatePassword = async () => {
    try {

      setIsLoading(true);

      const token = await AsyncStorage.getItem('userToken');
      const userEmail = await AsyncStorage.getItem('userEmail');

      if (!token || !userEmail) {
        Alert.alert('Error', 'Por favor inicie sesión para continuar.');
        return;
      }

      // Validar campos vacíos
      if (!ContrasenaActual) {
        setEmptyPasswordInputVisible(true); // Mostrar alerta "Campos vacíos"
        setIsLoading(false); // Desactivar el preload
        return
      }

      const response = await axios.post('https://api-proyecto-5hms.onrender.com/api/auth/login', {
        Correo: userEmail,
        Contrasena: ContrasenaActual, // Contraseña actual ingresada en el campo
      });

      if (response.data.token) {
        handleCloseValidatePassVisible();
        deactivateAccount(); // Ejecuta la función para desactivar la cuenta
      } else {
        setInvalidPassVisible(true);
      }
    } catch (error) {
      setInvalidPassVisible(true);
      setContrasenaActual(''); // Limpia el campo "Ingrese contraseña", después de cerrar alerta "Contraseña inválida"
      setIsLoading(false); // Desactivar el preload
    }
  };

  // ----------------------------------------------Desactivar cuenta de usuario------------------------------------------------
  const deactivateAccount = async () => {
    try {

      setIsLoading(true); // Activar el preload

      const token = await AsyncStorage.getItem('userToken');
      const userEmail = await AsyncStorage.getItem('userEmail');

      if (!token || !userEmail) {
        Alert.alert('Error', 'Por favor inicie sesión para continuar.');
        navigation.navigate('StackAccount');
        return;
      }

      if (!user || !user._id) {
        console.error('No se puede desactivar el usuario. El usuario no está definido o no tiene un _id.');
        return;
      }

      // Realiza la solicitud de desactivación al servidor
      const response = await axios.patch(`https://api-proyecto-5hms.onrender.com/api/usuario`, {
        _id: user._id,
        Estado: 'false'
      },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Verifica que la respuesta del servidor sea exitosa
      if (response.status === 200) {
        await AsyncStorage.removeItem('userToken'); // Elimina el "token" de AsyncStorage
        await AsyncStorage.removeItem('userEmail'); // Elimina el "Correo" de AsyncStorage
        handleShowSuccess(); // Muestra mensaje "El usuario ha eliminado la cuenta."
      } else {
        Alert.alert('Error al eliminar la cuenta')
      }
    } catch (error) {
      setContrasenaActual(''); // Limpia el campo "Ingrese contraseña", después de cerrar alerta "Contraseña inválida"
      setIsLoading(false); // Desactivar el preload
    }
  };

  // ----------------------------------------------Función alerta "Campos vacíos"----------------------------------------------
  const [emptyInputVisible, setEmptyInputVisible] = useState(false);

  const handleCloseEmptyInput = () => {
    setEmptyInputVisible(false);
  };

  // ------------------------------------------Función alerta "Campo Contraseña vacío"-----------------------------------------
  const [emptyPasswordInputVisible, setEmptyPasswordInputVisible] = useState(false);

  const handleCloseEmptyPasswordInput = () => {
    setEmptyPasswordInputVisible(false);
  };

  // --------------------------------------------Función alerta "Teléfono inválido"--------------------------------------------
  const [phoneVisible, setPhoneVisible] = useState(false);

  const handleClosePhone = () => {
    setPhoneVisible(false);
  };

  // ---------------------------------------------Función alerta "Correo inválido"---------------------------------------------
  const [emailVisible, setEmailVisible] = useState(false);

  const handleCloseEmail = () => {
    setEmailVisible(false);
  };


  // -------------------------------------------Función alerta "Contraseña inválida"-------------------------------------------
  const [invalidPassVisible, setInvalidPassVisible] = useState(false);

  const handleCloseInvalidPass = () => {
    setInvalidPassVisible(false);
  };

  // -------------------------------Función alerta "¿Está seguro que quiere eliminar su cuenta?"-------------------------------
  const [alertDeleteAccountVisible, setAlertDeleteAccountVisible] = useState(false);

  const handleRunDeleteAccount = () => {
    handleCloseAlertDeleteAccount(); // Cierra alerta al hacer clic en "Eliminar" 
    handleShowValidatePassVisible(); // Ejecuta alerta "Confirmar identidad" al hacer clic en "Eliminar"
  };

  const handleShowAlertDeleteAccount = () => {
    setAlertDeleteAccountVisible(true); // Ejecuta alerta cuando se invoca la función "handleShowAlertDeleteAccount"
  };

  const handleCloseAlertDeleteAccount = () => {
    setAlertDeleteAccountVisible(false); // Cierra alerta desde botón "X" o invocando la función "handleCloseAlertDeleteAccount"
  };

  // -------------------------------------------Función alerta "Cuenta eliminada"----------------------------------------------
  const [SuccessVisible, setSuccessVisible] = useState(false);

  const handleShowSuccess = () => {
    setSuccessVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
    navigation.replace('Login'); // 'replace' en lugar de 'navigate' recarga la "Vista" y actualiza cambios
  };

  // ----------------------------------------Función alerta "Información actualizada"------------------------------------------
  const [SuccessEditVisible, setSuccessEditVisible] = useState(false);

  const handleCloseSuccessEdit = () => {
    setSuccessEditVisible(false);
    navigation.replace('AccountHeader'); // 'replace' en lugar de 'navigate' recarga la "Vista" y actualiza cambios
  };

  // ----------------------------------------Función alerta "Información no actualizada"---------------------------------------
  const [WarningEditVisible, setWarningEditVisible] = useState(false);

  const handleCloseWarningEdit = () => {
    setWarningEditVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (
    <View style={styles.generalContainer}>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderLogoReturn navigation={navigation} title="Administrar cuenta" />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">

        <View style={styles.contentMain}>

          <SafeAreaView>

            {user ? (
              <>

                <View style={styles.fieldContainer}>
                  <View style={styles.iconLabelContainer}>
                    <Ionicons style={styles.iconForm} name='person-outline' />
                    <Text style={styles.label}>Nombre:</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    defaultValue={user.Nombre}
                    onChangeText={setNombre}
                    autoCapitalize="words" // Activa mayúscula inicial para cada palabra
                    editable={true}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <View style={styles.iconLabelContainer}>
                    <Ionicons style={styles.iconForm} name='people-outline' />
                    <Text style={styles.label}>Apellidos:</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    defaultValue={user.Apellido}
                    onChangeText={setApellido}
                    autoCapitalize="words" // Activa mayúscula inicial para cada palabra
                    editable={true}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <View style={styles.iconLabelContainer}>
                    <Ionicons style={styles.iconForm} name='card-outline' />
                    <Text style={styles.label}>Tipo documento:</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    defaultValue={user.Tipo_Documento}
                    editable={false}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <View style={styles.iconLabelContainer}>
                    <Ionicons style={styles.iconForm} name='id-card-outline' />
                    <Text style={styles.label}>Documento:</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    defaultValue={user.Documento.toString()}
                    keyboardType='numeric'
                    editable={false}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <View style={styles.iconLabelContainer}>
                    <Ionicons style={styles.iconForm} name='home-outline' />
                    <Text style={styles.label}>Dirección:</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    defaultValue={user.Direccion}
                    onChangeText={setDireccion}
                    keyboardType='default'
                    editable={true}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <View style={styles.iconLabelContainer}>
                    <Ionicons style={styles.iconForm} name='call-outline' />
                    <Text style={styles.label}>Teléfono:</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    defaultValue={user.Telefono.toString()}
                    onChangeText={setTelefono}
                    keyboardType='numeric'
                    editable={true}
                  />
                </View>

                <View style={styles.fieldContainer}>
                  <View style={styles.iconLabelContainer}>
                    <Ionicons style={styles.iconForm} name='at-sharp' />
                    <Text style={styles.label}>Correo:</Text>
                  </View>
                  <TextInput
                    style={styles.input}
                    defaultValue={user.Correo}
                    onChangeText={setCorreo}
                    autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
                    keyboardType='email-address'
                    editable={true}
                  />
                </View>

              </>
            ) : (
              <Text>No se encontró ningún usuario</Text>
            )}

            <ButtonPrimary
              onPress={handleEdit}
              width={'100%'}
              height={48}
              marginTop={30}
              marginBottom={0}
              backgroundColor={'#5B009D'}
              borderRadius={0}
              fontFamily={'Aspira W05 Demi'}
              color={'#ffffff'}
              fontSize={15}
              fontWeight={undefined}
              letterSpacing={0.3}
              title={'GUARDAR'}
            />

            <View style={styles.separator}></View>

            <ButtonSecondary
              onPress={handleShowAlertDeleteAccount} // onPress ejecuta alerta "¿Está seguro que quiere eliminar su cuenta?"
              width={'100%'}
              height={48}
              marginTop={0}
              marginBottom={30}
              backgroundColor={'#00000000'}
              borderColor={'#E00083'}
              borderWidth={2}
              borderRadius={0}
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomRightRadius={0}
              borderBottomLeftRadius={0}
              fontFamily={'Aspira W05 Demi'}
              color={'#29344A'}
              fontSize={15}
              fontWeight={undefined}
              letterSpacing={0.3}
              title={'ELIMINAR CUENTA'}

            />

            {/* ---------------------------Alerta "¿Está seguro que quiere eliminar su cuenta?"------------------------------ */}
            <AlertDeleteAccount
              visible={alertDeleteAccountVisible}
              onCloseAlertDeleteAccount={handleCloseAlertDeleteAccount} // Se ejecuta con botón "Cancelar"
              onAlertDeleteAccount={handleRunDeleteAccount} // Ejecuta alerta "Confirmar identidad" al hacer clic en "ELIMINAR"
              title='¿Está seguro que quiere eliminar su cuenta?'
              message='¡Ya no podrá recuperarla!'
              buttonConfirmStyle={{ width: 110 }}
              buttonConfirmText='Eliminar'
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

            {/* -------------------------------------------Alerta "Campos vacíos"-------------------------------------------- */}
            <AlertWarning
              visible={emptyInputVisible}
              onCloseWarning={handleCloseEmptyInput}
              title='Campos vacíos.'
              message='Por favor, complete los campos vacíos.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />

            {/* ---------------------------------------Alerta "Campo Contraseña vacío"--------------------------------------- */}
            <AlertWarning
              visible={emptyPasswordInputVisible}
              onCloseWarning={handleCloseEmptyPasswordInput}
              title='Campos vacíos.'
              message='Por favor, ingrese la contraseña para continuar.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* -------------------------------------Mostrar alerta "Teléfono inválido"-------------------------------------- */}
            <AlertWarning
              visible={phoneVisible}
              onCloseWarning={handleClosePhone}
              title='Número inválido.'
              message='El número de teléfono debe contener al menos 10 dígitos.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* --------------------------------------Mostrar alerta "Correo inválido"--------------------------------------- */}
            <AlertWarning
              visible={emailVisible}
              onCloseWarning={handleCloseEmail}
              title='Correo inválido.'
              message='Formato de correo incorrecto.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* ----------------------------------------Alerta "Contraseña inválida"----------------------------------------- */}
            <AlertWarning
              visible={invalidPassVisible}
              onCloseWarning={handleCloseInvalidPass}
              title='Contraseña inválida.'
              message='La contraseña ingresada es incorrecta.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* ------------------------------------------Alerta "Cuenta eliminada"------------------------------------------ */}
            <AlertSuccess
              visible={SuccessVisible}
              onCloseSuccess={handleCloseSuccess}
              title='Cuenta eliminada.'
              message='La cuenta ha sido eliminada con éxito.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* --------------------------------------Alerta "Información actualizada"--------------------------------------- */}
            <AlertSuccess
              visible={SuccessEditVisible}
              onCloseSuccess={handleCloseSuccessEdit}
              title='Información actualizada.'
              message='La información se ha actualizado correctamente.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* ------------------------------------Alerta "Información no actualizada"-------------------------------------- */}
            <AlertWarning
              visible={WarningEditVisible}
              onCloseWarning={handleCloseWarningEdit}
              title='Información no actualizada.'
              message='El usuario no ha modificado la información.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* ------------------------------------------------------------------------------------------------------------- */}

          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
};

export default EditAccount;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  contentMain: {
    width: '86%',
    marginTop: 30,
    marginHorizontal: '7%',
    backgroundColor: '#ffffff',
  },
  contentLogoAccount: {
    marginVertical: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoAccount: {
    width: 120,
    height: 72,
  },
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  iconLabelContainer: {
    width: '46%',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
  },
  iconForm: {
    fontSize: 20,
    paddingLeft: 6,
    paddingRight: 4,
    color: '#000000',
    zIndex: 1,
  },
  label: {
    color: '#000000',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  input: {
    width: '54%',
    height: 48,
    paddingLeft: 10,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 0.5,
    fontSize: 13,
  },
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  // Estilos "Input Select" "Tipo de documento"
  selectInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
  },
  selectInput: {
    paddingLeft: 10,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 0.5,
    fontSize: 13,
  },
  // Estilos "Modal" "Seleccione Tipo de documento"
  selectModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  selectModalContent: {
    backgroundColor: '#3F3F3F',
    borderRadius: 5,
  },
  modalTitle: {
    paddingVertical: 16,
    paddingRight: 30,
    paddingLeft: 15,
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 0.6,
    fontWeight: 'bold',
  },
  selectOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#7A7A7A'
  },
  selectOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 0.6,
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