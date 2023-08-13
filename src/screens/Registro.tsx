import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import TermsAndConditionsModal from '../components/TermsAndConditionsModal';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import LoadingIndicator from '../components/LoadingIndicator';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ButtonPrimary';
import CheckBox from '@react-native-community/checkbox';
import AlertSuccess from '../components/AlertSuccess';
import AlertWarning from '../components/AlertWarning';
import AlertFailure from '../components/AlertFailure';
import React, { useEffect, useState } from 'react';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';

type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
  AccountHeader: undefined;
};
type RegistroProps = NativeStackScreenProps<RootStackParamList, 'Registro'>;

const Registro = ({ navigation }: RegistroProps) => {
  const [isLoading, setIsLoading] = useState(true); // Controla la carga del "Preload"

  // -----------------------------------------controla el tiempo que dura el "Preload"-----------------------------------------
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------------Estado de los "Inputs"--------------------------------------------------
  const [Nombre, setNombre] = React.useState('');
  const [Apellido, setApellido] = React.useState('');
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState('');
  const [Documento, setDocumento] = React.useState('');
  const [Direccion, setDireccion] = React.useState('');
  const [Telefono, setTelefono] = React.useState('');
  const [Correo, setCorreo] = React.useState('');
  const [Contrasena, setContrasena] = React.useState('');
  const [ConfirmarContrasena, setConfirmarContrasena] = React.useState('');
  // --------------------------------------------------------------------------------------------------------------------------

  // ----------------------------------------------Mostrar y ocultar "Contraseña"----------------------------------------------
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [acceptTerms, setacceptTerms] = useState(false)
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------Lógica "Imput Select Modal" "Tipo de documento"--------------------------------------
  const tipoDocumentoOptions = [
    { label: 'Cédula de extranjería', value: 'Cédula de extranjería' },
    { label: 'Cédula de ciudadanía', value: 'Cédula de ciudadanía' },
    { label: 'Tarjeta de identidad', value: 'Tarjeta de identidad' },
  ];

  const [selectModalVisible, setSelectModalVisible] = useState(false);

  const handleOpenSelectModal = () => {
    setSelectModalVisible(true);
  };

  const handleSelectTipoDocumento = (value: string) => {
    setSelectedTipoDocumento(value);
    setTimeout(() => {
      setSelectModalVisible(false);
    }, 500); // Cambia el valor 2000 a la cantidad de milisegundos que deseas esperar antes de ocultar el modal
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ------------------------Controla la visibilidad del "Modal" en función del valor de "acceptTerms"-------------------------
  const handleAcceptTerms = () => {
    setacceptTerms(!acceptTerms);
  };

  useEffect(() => {
    if (acceptTerms) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [acceptTerms]);
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------------Función de (Registro)---------------------------------------------------
  const handleRegister = async () => {

    // Validar campos vacíos
    if (!Nombre || !Apellido || !Documento || !Direccion || !Telefono || !Correo || !Contrasena || !ConfirmarContrasena) {
      setEmptyFieldsVisible(true); // Mostrar alerta "Campos vacíos"
      return
    }

    // Validar select "Tipo de documento"
    else if (!selectedTipoDocumento) {
      setDocumentTypeVisible(true); // Mostrar alerta "Tipo de documento"
      return
    }

    // Validar cantidad mínima de digitos del "Documento"
    if (!/^\d{8,}$/.test(Documento)) {
      setDocumentVisible(true);
      return
    }

    // Validar cantidad mínima de digitos del "Teléfono"
    if (!/^\d{10,}$/.test(Telefono)) {
      setPhoneVisible(true);
      return
    }

    // Validar formato de "Correo electrónico"
    if (!/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.(com|es|net|co|yahoo|outlook|hotmail)$/.test(Correo)) {
      setEmailVisible(true);
      return;
    }

    // Validar cantidad mínima de carácteres de la "Contraseña"
    if (Contrasena.length < 8) {
      setMinPasswordVisible(true);
      return
    }

    // Validar que las contraseñas coincidan
    if (Contrasena !== ConfirmarContrasena) {
      setNotMatchVisible(true); // Mostrar alerta "Las contraseñas no coinciden"
      return;
    }

    setIsLoading(true); // Activar el preload

    try {
      // Crear un objeto con los datos del formulario
      const userData = {
        Rol: 'Cliente',
        Nombre,
        Apellido,
        Tipo_Documento: selectedTipoDocumento,
        Documento,
        Direccion,
        Telefono,
        Correo,
        Contrasena,
        ConfirmarContrasena,
      };

      // Enviar los datos a la API utilizando axios
      const response = await axios.post('https://api-proyecto-5hms.onrender.com/api/usuario', userData);
      console.log("Respuesta:", response.data);

      setRegisteredVisible(true); // Mostrar alerta "Registro exitoso."

    } catch (error) {
      setFailedRegisterVisible(true); // Mostrar alerta "Error de Registro."
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ----------------------------------------------Función alerta "Campos vacíos"----------------------------------------------
  const [emptyFieldsVisible, setEmptyFieldsVisible] = useState(false);

  const handleCloseEmptyFields = () => {
    setEmptyFieldsVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------Función alerta "Tipo de documento"--------------------------------------------
  const [documentTypeVisible, setDocumentTypeVisible] = useState(false);

  const handleCloseDocumentType = () => {
    setDocumentTypeVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------Función alerta "Documento inválido"-------------------------------------------
  const [documentVisible, setDocumentVisible] = useState(false);

  const handleCloseDocument = () => {
    setDocumentVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------Función alerta "Teléfono inválido"--------------------------------------------
  const [phoneVisible, setPhoneVisible] = useState(false);

  const handleClosePhone = () => {
    setPhoneVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------Función alerta "Correo inválido"---------------------------------------------
  const [emailVisible, setEmailVisible] = useState(false);

  const handleCloseEmail = () => {
    setEmailVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------Función alerta "Contraseña inválida"-------------------------------------------
  const [minPasswordVisible, setMinPasswordVisible] = useState(false);

  const handleCloseMinPassword = () => {
    setMinPasswordVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------Función alerta "Las contraseñas no coinciden"--------------------------------------
  const [notMatchVisible, setNotMatchVisible] = useState(false);

  const handleCloseNotMatch = () => {
    setNotMatchVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------------Función alerta "Correo ya existe"--------------------------------------------
  const [existingEmailVisible, setExistingEmailVisible] = useState(false);

  const handleCloseExistingEmail = () => {
    setExistingEmailVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------Función alerta "Registro exitoso"---------------------------------------------
  const [registeredVisible, setRegisteredVisible] = useState(false);

  const handleCloseRegistered = () => {
    setRegisteredVisible(false);
    navigation.navigate('Login');
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------Función alerta "Error de registro"--------------------------------------------
  const [failedRegisterVisible, setFailedRegisterVisible] = useState(false);

  const handleCloseFailedRegister = () => {
    setFailedRegisterVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderSettingsReturn navigation={navigation} title="Registro" />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView style={styles.contentForm} keyboardShouldPersistTaps="always">

        <SafeAreaView>

          <View style={styles.contentLogoAccount}>
            <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='person-outline' />
            <TextInput
              style={styles.input}
              placeholder='Nombre'
              placeholderTextColor='#000000'
              onChangeText={setNombre}
              value={Nombre}
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='people-outline' />
            <TextInput
              style={styles.input}
              placeholder='Apellidos'
              placeholderTextColor='#000000'
              onChangeText={setApellido}
              value={Apellido}
            />
          </View>

          {/* ------------------------------------------Campo "Tipo de documento"------------------------------------------ */}
          <TouchableOpacity style={styles.selectInputContainer} onPress={handleOpenSelectModal}>
            <Ionicons style={styles.selectIconForm} name="card-outline" />
            <Text style={styles.selectInput}>{selectedTipoDocumento ? selectedTipoDocumento : 'Tipo de documento'}</Text>
          </TouchableOpacity>

          {/* -------------------------------------"Modal" opciones "Tipo de documento"------------------------------------ */}
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
          {/* ------------------------------------------------------------------------------------------------------------- */}

          <View>
            <Ionicons style={styles.iconForm} name='id-card-outline' />
            <TextInput
              style={styles.input}
              placeholder='Documento'
              placeholderTextColor='#000000'
              onChangeText={(text) => {
                // Validación para campo númerico
                const numericValue = text.replace(/[^0-9]/g, '');
                setDocumento(numericValue);
              }}
              value={Documento}
              keyboardType='numeric'
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='home-outline' />
            <TextInput
              style={styles.input}
              placeholder='Dirección'
              placeholderTextColor='#000000'
              onChangeText={setDireccion}
              value={Direccion}
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='call-outline' />
            <TextInput
              style={styles.input}
              placeholder='Teléfono'
              placeholderTextColor='#000000'
              onChangeText={(text) => {
                // Validación para campo númerico
                const numericValue = text.replace(/[^0-9]/g, '');
                setTelefono(numericValue);
              }}
              value={Telefono}
              keyboardType='numeric'
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='at-sharp' />
            <TextInput
              style={styles.input}
              placeholder='E-mail'
              placeholderTextColor='#000000'
              onChangeText={setCorreo}
              value={Correo}
              autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
              keyboardType='email-address'
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='key-outline' />
            <TextInput
              style={styles.input}
              placeholder='Contraseña'
              placeholderTextColor='#000000'
              onChangeText={setContrasena}
              value={Contrasena}
              autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
              secureTextEntry={!showPassword1} // Oculta y muestra carácteres de contraseña
            />
            {Contrasena !== '' && ( // Código cambio de icono de la contraseña
              <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibility1}>
                <Ionicons style={styles.iconFormRight} name={showPassword1 ? 'eye-off-sharp' : 'eye-sharp'} />
              </TouchableOpacity>
            )}
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='key-outline' />
            <TextInput
              style={styles.input}
              placeholder='Confirmar contraseña'
              placeholderTextColor='#000000'
              onChangeText={setConfirmarContrasena}
              value={ConfirmarContrasena}
              autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
              secureTextEntry={!showPassword2} // Oculta y muestra carácteres de contraseña
            />
            {ConfirmarContrasena !== '' && ( // Código cambio de icono de la contraseña
              <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibility2}>
                <Ionicons style={styles.iconFormRight} name={showPassword2 ? 'eye-off-sharp' : 'eye-sharp'} />
              </TouchableOpacity>
            )}
          </View>

          {/* ----------------------------Código "CheckBox" "Política de privacidad y Términos"---------------------------- */}
          <View style={styles.checkboxAcceptTerms}>
            <CheckBox
              disabled={false}
              value={acceptTerms}
              onValueChange={handleAcceptTerms}
              tintColors={{ true: '#5B009D', false: '#7e7e7e' }} />
            <View style={styles.containerAcceptTerms}>

              <View style={styles.contentAcceptTerms}>
                <Text style={styles.acceptTermsText}>He leído y acepto la </Text>
                <Text style={styles.textTermsConditions}>Política de Privacidad</Text>
              </View>

              <View style={styles.contentAcceptTerms}>
                <Text style={styles.acceptTermsText}>y </Text>
                <Text style={styles.textTermsConditions}>Términos y Condiciones</Text>
              </View>

            </View>
          </View>
          {/* ------------------------------------------------------------------------------------------------------------- */}

          <TermsAndConditionsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

          <View style={{ marginTop: 30 }}>
            <ButtonPrimary
              onPress={handleRegister}
              width={'100%'}
              height={48}
              backgroundColor={'#5B009D'}
              borderRadius={0}
              color={'#FFFFFF'}
              fontSize={14}
              fontWeight={'500'}
              letterSpacing={0.8}
              title={'CREAR CUENTA'}
            />
          </View>

          {/* ---------------------------------------Mostrar Alerta "Campos vacíos"---------------------------------------- */}
          <AlertWarning
            visible={emptyFieldsVisible}
            onCloseWarning={handleCloseEmptyFields}
            title='Campos vacíos.'
            message='Por favor, complete todos los campos.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------------------Mostrar alerta "Tipo de documento"-------------------------------------- */}
          <AlertWarning
            visible={documentTypeVisible}
            onCloseWarning={handleCloseDocumentType}
            title='Tipo de documento.'
            message='Seleccione el tipo de documento.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ------------------------------------Mostrar alerta "Documento inválido"-------------------------------------- */}
          <AlertWarning
            visible={documentVisible}
            onCloseWarning={handleCloseDocument}
            title='Documento inválido.'
            message='El documento debe tener al menos 8 números.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------------------Mostrar alerta "Teléfono inválido"-------------------------------------- */}
          <AlertWarning
            visible={phoneVisible}
            onCloseWarning={handleClosePhone}
            title='Teléfono inválido.'
            message='El teléfono debe tener al menos 10 números.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------------------Mostrar alerta "Correo inválido"-------------------------------------- */}
          <AlertWarning
            visible={emailVisible}
            onCloseWarning={handleCloseEmail}
            title='Correo inválido.'
            message='Formato de correo incorrecto.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ------------------------------------Mostrar alerta "Contraseña inválida"------------------------------------- */}
          <AlertWarning
            visible={minPasswordVisible}
            onCloseWarning={handleCloseMinPassword}
            title='Contraseña inválida.'
            message='La contraseña debe tener al menos 8 caractéres.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* --------------------------------Mostrar alerta "Las contraseñas no coinciden"-------------------------------- */}
          <AlertWarning
            visible={notMatchVisible}
            onCloseWarning={handleCloseNotMatch}
            title='Las contraseñas no coinciden.'
            message='Las contraseñas ingresadas deben coincidir.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* --------------------------------------Mostrar alerta "Correo ya exixte"-------------------------------------- */}
          <AlertWarning
            visible={existingEmailVisible}
            onCloseWarning={handleCloseExistingEmail}
            title='Correo ya existe.'
            message='El correo ingresado se encuentra registrado.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* --------------------------------------Mostrar alerta "Registro exitoso"-------------------------------------- */}
          <AlertSuccess
            visible={registeredVisible}
            onCloseSuccess={handleCloseRegistered}
            title='Registro exitoso.'
            message='La cuenta se ha creado exitosamente.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------------------Mostrar alerta "Error de registro"-------------------------------------- */}
          <AlertFailure
            visible={failedRegisterVisible}
            onCloseFailure={handleCloseFailedRegister}
            title='Error de registro.'
            message='El registro no se pudo completar debido a un error.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          <View style={styles.separator}></View>

          <View style={{ marginBottom: 30 }}>
            <ButtonSecondary
              onPress={() => navigation.navigate('Login')}
              width={'100%'}
              height={48}
              backgroundColor={'#00000000'}
              borderWidth={1}
              borderRadius={0}
              color={'#E00083'}
              fontSize={14}
              fontWeight={'600'}
              letterSpacing={0.8}
              title={'INICIAR SESIÓN'}
            />
          </View>

        </SafeAreaView>

      </ScrollView>

    </>

  );

};

export default Registro;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentForm: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
  },
  contentLogoAccount: {
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoAccount: {
    width: 120,
    height: 72,
  },
  iconForm: {
    fontSize: 20,
    position: 'absolute',
    top: 21,
    left: 6,
    color: '#000000',
    zIndex: 1,
  },
  input: {
    height: 48,
    marginVertical: 8,
    paddingLeft: 32,
    backgroundColor: '#E6E6E6',
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  contentIconFormRight: {
    position: 'absolute',
    top: 12,
    right: 2,
    padding: 10,
  },
  iconFormRight: {
    fontSize: 22,
    color: '#4E4E4E',
  },
  separator: {
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  checkboxAcceptTerms: {
    flexDirection: 'row',
    marginTop: 10,
  },
  containerAcceptTerms: {
    marginLeft: 10,
  },
  contentAcceptTerms: {
    flexDirection: 'row',
  },
  acceptTermsText: {
    color: '#4E4E4E',
  },
  textTermsConditions: {
    color: '#5B009D',
  },
  // Estilos "Input Select" "Tipo de documento"
  selectInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    height: 48,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
  },
  selectIconForm: {
    position: 'absolute',
    top: 13,
    left: 6,
    color: '#000000',
    fontSize: 20,
  },
  selectInput: {
    paddingLeft: 32,
    color: '#000000',
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
  // Estilos "openAlertSuccess"
  openAlertSuccess: {
    width: 100,
    alignItems: 'center',
    margin: 10,
    paddingVertical: 10,
    backgroundColor: '#28a745',
    borderRadius: 8,
  },
  openAlertSuccessText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});