import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AlertWarningConfirm from '../components/AlertWarningConfirm';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import AlertConfirmPass from '../components/AlertConfirmPass';
import LoadingIndicator from '../components/LoadingIndicator';
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
};

type EditAccountProps = NativeStackScreenProps<RootStackParamList, 'EditAccount'>;

const EditAccount = ({ navigation }: EditAccountProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Controla la carga del "Preload"

  // ----------------------------------------------Estados para campos editables-----------------------------------------------
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Tipo_Documento, setTipo_Documento] = useState('');
  const [Documento, setDocumento] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Correo, setCorreo] = useState('');
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------Mostrar datos de usuario logueado---------------------------------------------
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
            console.log('Datos del usuario obtenidos:', currentUser);
          } else {
            console.error('Usuario actual no encontrado en la lista de usuarios');
            // Aquí redirigimos al usuario a la pantalla de inicio de sesión
            navigation.navigate('StackAccount');
          }
        } else {
          Alert.alert('Error', 'Por favor inicie sesión para continuar.');
          // Aquí redirigimos al usuario a la pantalla de inicio de sesión
          navigation.navigate('StackAccount');
        }

        setTimeout(() => { // Agregar tiempo de espera adicional después de cargar la pagina
          setIsLoading(false); // Cambiar isLoading a false después de obtener los datos
        }, 500);

      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    fetchUserData();
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------------------Editar cuenta de usuario--------------------------------------------------
  const handleEdit = async () => {

    if (!user || typeof user !== 'object') { // Verificar si el objeto user es null o undefined
      console.error('No se puede editar el usuario. El usuario no está definido o no es un objeto válido.');
      return;
    }

    let hasChanges = false;

    // Verificar si algún campo del formulario ha sido editado
    if (Nombre !== '' && Nombre !== user.Nombre) {
      hasChanges = true;
    }

    if (Apellido !== '' && Apellido !== user.Apellido) {
      hasChanges = true;
    }

    if (Direccion !== '' && Direccion !== user.Direccion) {
      hasChanges = true;
    }

    if (Telefono !== '' && Telefono.toString() !== user.Telefono.toString()) {
      hasChanges = true;
    }

    if (Correo !== '' && Correo !== user.Correo) {
      hasChanges = true;
    }

    if (!hasChanges) {
      setWarningEditVisible(true);
      return;
    }

    const updatedUserData = { // Crear un objeto con los datos del formulario que serán actualizados
      _id: user._id,
      Nombre: Nombre !== '' ? Nombre : user.Nombre,
      Apellido: Apellido !== '' ? Apellido : user.Apellido,
      Documento: Documento !== '' ? parseInt(Documento, 10) : user.Documento, // Convierte la cadena en tipo numérico "number"
      Tipo_Documento: Tipo_Documento !== '' ? Tipo_Documento : user.Tipo_Documento,
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
      setSuccessEditVisible(true); // Muestra mensaje "El usuario ha sido actualizado correctamente."
    } else {
      console.error('Error al editar el usuario:', response.data);
    }
  }
  // --------------------------------------------------------------------------------------------------------------------------

  // ----------------------------------------------Desactivar cuenta de usuario------------------------------------------------
  const deactivateAccount = async () => {

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
      setUser(null); // Actualiza el estado de la aplicación para que refleje que el usuario ha sido desactivado
      setSuccessVisible(true); // Muestra mensaje "El usuario ha eliminado la cuenta."
    } else {
      console.error('Error al desactivar el usuario:', response.data);
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------Función para botones modal "AlertWarningConfirm"-------------------------------------
  const handleDeleteAccount = () => {
    handleCloseWarningConfirm(); // Cierra "AlertWarning" con botón "Cancelar"
    handleShowConfirmPass(); // Ejecuta "AlertConfirmPass" con botón "Eliminar"
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------Función para mostrar el modal "AlertWarningConfirm"-----------------------------------
  const [WarningConfirmVisible, setWarningConfirmVisible] = useState(false);

  const handleShowWarningConfirm = () => {
    setWarningConfirmVisible(true);
  };

  const handleCloseWarningConfirm = () => {
    setWarningConfirmVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------Función para mostrar el modal "AlertConfirmPass"--------------------------------------
  const [ConfirmPassVisible, setConfirmPassVisible] = useState(false);

  const handleShowConfirmPass = () => {
    setConfirmPassVisible(true);
  };

  const handleCloseConfirmPass = async () => {
    setConfirmPassVisible(false);
    try {
      await deactivateAccount(); // Espera a que la cuenta se elimine correctamente
      handleShowSuccess(); // Ejecuta el modal "AlertSuccess" si la cuenta se eliminó correctamente
    } catch (error) {
      console.error('Error al eliminar la cuenta:', error);
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------Función para mostrar el modal "AlertSuccess"----------------------------------------
  const [SuccessVisible, setSuccessVisible] = useState(false);

  const handleShowSuccess = () => {
    setSuccessVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
    navigation.navigate('StackAccount');
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------Función para mostrar el modal "AlertSuccess"----------------------------------------
  const [SuccessEditVisible, setSuccessEditVisible] = useState(false);

  const handleCloseSuccessEdit = () => {
    setSuccessEditVisible(false);
    navigation.navigate('AccountHeader');
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------Función para mostrar el modal "AlertWarning"---------------------------------------
  const [WarningEditVisible, setWarningEditVisible] = useState(false);

  const handleCloseWarningEdit = () => {
    setWarningEditVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <>

      <LoadingIndicator isLoading={isLoading} />

      <CustomHeaderReturn navigation={navigation} title="Administrar cuenta" />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView style={styles.contentForm} keyboardShouldPersistTaps="always">

        <View style={styles.contentLogoAccount}>
          <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
        </View>

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
                  autoCapitalize="words"
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
                  autoCapitalize="words"
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
                  onChangeText={setTipo_Documento}
                  autoCapitalize="words"
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
                  onChangeText={setDocumento}
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

          <View style={{ marginTop: 30 }}>
            <ButtonPrimary
              onPress={handleEdit}
              width={'100%'}
              height={48}
              backgroundColor={'#5B009D'}
              borderRadius={0}
              color={'#ffffff'}
              fontSize={14}
              fontWeight={'500'}
              letterSpacing={0.8}
              title={'GUARDAR'}
            />
          </View>

          <View style={styles.separator}></View>

          <View style={{ marginBottom: 30 }}>
            <ButtonSecondary
              onPress={handleShowWarningConfirm} // onPress ejecuta el modal "AlertWarningConfirm"
              width={'100%'}
              height={48}
              backgroundColor={'#00000000'}
              borderWidth={1}
              borderRadius={0}
              color={'#E00083'}
              fontSize={14}
              fontWeight={'600'}
              letterSpacing={0.8}
              title={'ELIMINAR CUENTA'}
            />
          </View>

          {/* ---------------------------------Alerta "Ya no podrá recuperar su cuenta"------------------------------------ */}
          <AlertWarningConfirm
            visible={WarningConfirmVisible}
            onCloseWarningConfirm={handleCloseWarningConfirm} // Se ejecuta con botón "Cancelar"
            onConfirmWarning={handleDeleteAccount} // Se ejecuta con botón "Eliminar"
            title='¿Está seguro?'
            message='¡Ya no podrá recuperar su cuenta!'
            buttonConfirmStyle={{ width: 110 }}
            buttonCancelStyle={{ width: 110 }}
            buttonConfirmText='Eliminar'
            buttonCancelText='Cancelar'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ----------------------------------------Alerta "Verifica tu identidad"--------------------------------------- */}
          <AlertConfirmPass
            visible={ConfirmPassVisible}
            onCloseConfirmPass={handleCloseConfirmPass}
            title='Verifica tu identidad'
            buttonStyle={{ width: 120 }}
            buttonText='Aceptar'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ------------------------------------------Alerta "Cuenta eliminada"------------------------------------------ */}
          <AlertSuccess
            visible={SuccessVisible}
            onCloseSuccess={handleCloseSuccess}
            title='Cuenta eliminada.'
            message='La cuenta ha sido eliminada con éxito.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* --------------------------------------Alerta "Información actualizada"--------------------------------------- */}
          <AlertSuccess
            visible={SuccessEditVisible}
            onCloseSuccess={handleCloseSuccessEdit}
            title='Información actualizada.'
            message='La información se ha actualizado correctamente.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

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

      </ScrollView>

    </>

  );

};

export default EditAccount;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentForm: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  contentLogoAccount: {
    marginVertical: 20,
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
});