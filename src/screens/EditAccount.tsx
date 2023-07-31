import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeaderSettings from '../components/CustomHeaderSettings';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import AlertConfirmPass from '../components/AlertConfirmPass';
import AlertSuccess from '../components/AlertSuccess';
import AlertWarningConfirm from '../components/AlertWarningConfirm';

type User = {
  Nombre: string;
  Apellido: string;
  Tipo_Documento: string;
  Documento: string;
  Direccion: string;
  Telefono: string;
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

  // ----------------------------------------------Estados para campos editables-----------------------------------------------
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Documento, setDocumento] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Contrasena, setContrasena] = useState('');
  // --------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------Lógica "Imput Select Modal" "Tipo de documento"--------------------------------------
  const tipoDocumentoOptions = [
    { label: 'Cédula de extranjería', value: 'Cédula de extranjería' },
    { label: 'Cédula de ciudadanía', value: 'Cédula de ciudadanía' },
    { label: 'Tarjeta de identidad', value: 'Tarjeta de identidad' },
  ];

  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState('');

  const handleOpenSelectModal = () => {
    setSelectModalVisible(true);
  };

  const handleSelectTipoDocumento = (value: string) => {
    setSelectedTipoDocumento(value);
    setTimeout(() => {
      setSelectModalVisible(false);
    }, 300); // Cambia el valor 2000 a la cantidad de milisegundos que deseas esperar antes de ocultar el modal
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------Lógica para mostrar los datos de usuario logueado-------------------------------------
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
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);
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

  const handleCloseConfirmPass = () => {
    setConfirmPassVisible(false);
    handleShowSuccess(); // Ejecuta el modal "AlertSuccess"
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------Función para mostrar el modal "AlertSuccess"----------------------------------------
  const [SuccessVisible, setSuccessVisible] = useState(false);

  const handleShowSuccess = () => {
    setSuccessVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <>

      <CustomHeaderSettings navigation={navigation} title="Administrar cuenta" />

      <ScrollView style={styles.contentForm}>

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
                  value={Nombre}
                  onChangeText={setNombre}
                  placeholder={user.Nombre}
                  placeholderTextColor={'#000000'}
                  editable={false}
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='people-outline' />
                  <Text style={styles.label}>Apellidos:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Apellido}
                  onChangeText={setApellido}
                  placeholder={user.Apellido}
                  placeholderTextColor={'#000000'}
                  editable={false}
                />
              </View>

              {/* ----------------------------------------Campo "Tipo de documento"---------------------------------------- */}
              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='card-outline' />
                  <Text style={styles.label}>Tipo documento:</Text>
                </View>
                <TouchableOpacity style={styles.selectInputContainer} onPress={handleOpenSelectModal}>
                  <Text style={styles.selectInput}>{selectedTipoDocumento ? selectedTipoDocumento : user.Tipo_Documento}</Text>
                </TouchableOpacity>
              </View>

              {/* -----------------------------------"Modal" opciones "Tipo de documento"---------------------------------- */}
              <Modal visible={selectModalVisible} animationType="slide" transparent={true}>
                <View style={styles.selectModalContainer}>
                  <View style={styles.selectModalContent}>
                    <Text style={styles.modalTitle}>Seleccione tipo de documento</Text>
                    {tipoDocumentoOptions.map((option) => (
                      <TouchableOpacity
                        key={option.value}
                        style={styles.selectOption}
                        onPress={() => handleSelectTipoDocumento(option.value)}
                      >
                        <Text style={styles.selectOptionText}>{option.label}</Text>
                        <RadioButton
                          value={option.value}
                          status={selectedTipoDocumento === option.value ? 'checked' : 'unchecked'}
                          onPress={() => handleSelectTipoDocumento(option.value)}
                          uncheckedColor='#FFFFFF'
                          color='#E00083'
                        />
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              </Modal>
              {/* --------------------------------------------------------------------------------------------------------- */}

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='id-card-outline' />
                  <Text style={styles.label}>Documento:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Documento}
                  onChangeText={setDocumento}
                  placeholder={user.Documento.toString()}
                  placeholderTextColor={'#000000'}
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
                  value={Direccion}
                  onChangeText={setDireccion}
                  placeholder={user.Direccion}
                  placeholderTextColor={'#000000'}
                  editable
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='call-outline' />
                  <Text style={styles.label}>Teléfono:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Telefono}
                  onChangeText={setTelefono}
                  placeholder={user.Telefono.toString()}
                  placeholderTextColor={'#000000'}
                  editable
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='at-sharp' />
                  <Text style={styles.label}>Correo:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Correo}
                  onChangeText={setCorreo}
                  placeholder={user.Correo}
                  placeholderTextColor={'#000000'}
                  editable
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='key-outline' />
                  <Text style={styles.label}>Contraseña:</Text>
                </View>
                <TextInput
                  style={{ ...styles.input, fontSize: 18, letterSpacing: 1 }}
                  value={Contrasena}
                  onChangeText={setContrasena}
                  placeholder='••••••••••'
                  placeholderTextColor={'#000000'}
                  secureTextEntry
                  editable={false}
                />
              </View>

            </>
          ) : (
            <Text>No se encontró ningún usuario</Text>
          )}

          <View style={{ marginTop: 30 }}>
            <ButtonPrimary
              onPress={() => navigation.navigate('AccountHeader')}
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

          {/* -----------------------Código para ejecutar y mostrar el modal "AlertWarningConfirm"------------------------- */}
          {/* Renderizar componente "AlertWarningConfirm" */}
          <AlertWarningConfirm
            visible={WarningConfirmVisible}
            onCloseWarningConfirm={handleCloseWarningConfirm} // Se ejecuta con botón "Cancelar"
            onConfirmWarning={handleDeleteAccount} // Se ejecuta con botón "Eliminar"
            title='¿Está seguro que quiere eliminar la cuenta?'
            message='¡Ya no podrá recuperarla!'
            buttonConfirmStyle={{ width: 110 }}
            buttonCancelStyle={{ width: 110 }}
            buttonConfirmText='Eliminar'
            buttonCancelText='Cancelar'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------Código para ejecutar y mostrar el modal "AlertConfirmPass"-------------------------- */}
          {/* Renderizar componente "AlertConfirmPass" */}
          <AlertConfirmPass
            visible={ConfirmPassVisible}
            onCloseConfirmPass={handleCloseConfirmPass}
            title='Ingrese su contraseña'
            buttonStyle={{ width: 120 }}
            buttonText='Aceptar'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ---------------------------Código para ejecutar y mostrar el modal "AlertSuccess"---------------------------- */}
          {/* Renderizar componente "AlertSuccess" */}
          <AlertSuccess
            visible={SuccessVisible}
            onCloseSuccess={handleCloseSuccess}
            title='Cuenta eliminada.'
            message='La cuenta ha sido eliminada con éxito.'
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