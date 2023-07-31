import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, Image, Alert, } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomHeaderSettings from '../components/CustomHeaderSettings';
import AlertSuccess from '../components/AlertSuccess';
import AlertFailure from '../components/AlertFailure';
import AlertWarning from '../components/AlertWarning';

type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
  RecoverPass: undefined;
  StackMain: undefined;
};
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {

  // Estado de los "Inputs"
  const [Correo, setCorreo] = React.useState('');
  const [Contrasena, setContrasena] = React.useState('');

  // // Mostrar y ocultar "Contraseña"
  const [showPassword, setShowPassword] = useState(false);
  const [savePassword, setsavePassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ------------------Función mostrar modal "AlertSuccess" y redireccionar a "StackMain" al iniciar "Sesión"------------------
  const [SuccessVisible, setSuccessVisible] = useState(false);

  const handleCloseSuccess = () => {
    setSuccessVisible(false); // Ocultar la alerta de éxito
    navigation.navigate('StackMain'); // Redireccionar a "StackMain"
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------Función para mostrar el modal "AlertWarning"---------------------------------------
  const [WarningVisible, setWarningVisible] = useState(false);

  const handleCloseWarning = () => {
    setWarningVisible(false);
    navigation.navigate('Login'); // Redireccionar a "Login"
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------Función para mostrar el modal "AlertFailure"---------------------------------------
  const [FailureVisible, setFailureVisible] = useState(false);

  const handleCloseFailure = () => {
    setFailureVisible(false);
    navigation.navigate('Login'); // Redireccionar a "Login"
  };
  // --------------------------------------------------------------------------------------------------------------------------



  // ------------------------------------------------Lógica de Inicio de sesión------------------------------------------------
  const handleLogin = async () => {
    if (!Correo || !Contrasena) { // Validar campos antes de enviar los datos
      setWarningVisible(true);
      return;
    }

    const userData = { // Crear un objeto con los datos del formulario
      Correo,
      Contrasena,
    };

    try {
      // Enviar los datos a la API utilizando axios
      const response = await axios.post('https://api-proyecto-5hms.onrender.com/api/auth/login', userData);
      const { token } = response.data;

      if (token) {
        await AsyncStorage.setItem('userToken', token); // Guardar el token en el almacenamiento local
        await AsyncStorage.setItem('userEmail', Correo); // Guardar el correo del usuario en AsyncStorage
        setSuccessVisible(true); // Mostrar mensaje de éxito
      } else {
        setFailureVisible(true);
        // El mensaje de error en el "else" sólo se mostrará si la API está bien configurada,
        // de lo contrario mostrará el mensaje del "catch"
      }
    } catch {
      setFailureVisible(true);
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------



  return (

    <>

      <CustomHeaderSettings navigation={navigation} title="Iniciar sesión" />

      <ScrollView style={styles.contentForm}>

        <View style={styles.contentLogoAccount}>
          <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
        </View>

        <SafeAreaView>

          <View>
            <Ionicons style={styles.iconForm} name='at-outline' />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#000000"
              //textAlignVertical="bottom"
              onChangeText={setCorreo}
              value={Correo}
              autoCapitalize="none" // Evita que la primera letra ingresada sea mayúscula
              keyboardType="email-address"
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='lock-closed-outline' />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#000000"
              //textAlignVertical="bottom"
              onChangeText={setContrasena}
              value={Contrasena}
              autoCapitalize="none" // Evita que la primera letra ingresada sea mayúscula
              secureTextEntry={!showPassword} // Oculta y muestra carácteres de contraseña
            />
            {Contrasena !== '' && ( // Código cambio de icono de la contraseña
              <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibility}>
                <Ionicons style={styles.iconFormRight} name={showPassword ? 'eye-off-sharp' : 'eye-sharp'} />
              </TouchableOpacity>
            )}
          </View>

          <View style={styles.savePassword}>
            <CheckBox
              disabled={false}
              value={savePassword}
              onValueChange={(newValue) => setsavePassword(newValue)}
              tintColors={{ true: '#5B009D', false: '#7e7e7e' }} />
            <Text style={{ color: '#4e4e4e' }}>Guardar contraseña</Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <ButtonPrimary
              onPress={handleLogin} // Llamar a la función handleLogin al presionar el botón
              width={'100%'}
              height={48}
              backgroundColor={'#5B009D'}
              borderRadius={0}
              color={'#ffffff'}
              fontSize={14}
              fontWeight={'500'}
              letterSpacing={0.8}
              title={'INICIAR SESIÓN'}
            />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('RecoverPass')}>
            <Text style={styles.recoverPassword}> ¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <View style={styles.separator}></View>

          <View>
            <ButtonSecondary
              onPress={() => navigation.navigate('Registro')}
              width={'100%'}
              height={48}
              backgroundColor={'#00000000'}
              borderWidth={1}
              borderRadius={0}
              color={'#E00083'}
              fontSize={14}
              fontWeight={'600'}
              letterSpacing={0.8}
              title={'CREAR CUENTA'}
            />
          </View>

          {/* ---------------------------Código para ejecutar y mostrar el modal "AlertSuccess"---------------------------- */}
          {/* Renderizar componente "AlertSuccess" */}
          <AlertSuccess
            visible={SuccessVisible}
            onCloseSuccess={handleCloseSuccess}
            title='Inicio de sesión.'
            message='Ha iniciado sesión con éxito.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ---------------------------Código para ejecutar y mostrar el modal "AlertWarning"---------------------------- */}
          {/* Renderizar componente "AlertWarning" */}
          <AlertWarning
            visible={WarningVisible}
            onCloseWarning={handleCloseWarning}
            title='Campos vacíos.'
            message='Por favor, complete todos los campos.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ---------------------------Código para ejecutar y mostrar el modal "AlertFailure"---------------------------- */}
          {/* Renderizar componente "AlertFailure" */}
          <AlertFailure
            visible={FailureVisible}
            onCloseFailure={handleCloseFailure}
            title='Error al iniciar sesión.'
            message='Credenciales incorrectas.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

        </SafeAreaView>

      </ScrollView>

    </>

  );

};

export default Login;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentForm: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
  },
  contentLogoAccount: {
    marginTop: 20,
    marginBottom: 35,
    backgroundColor: '#ffffff',
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
    backgroundColor: '#e6e6e6',
    fontWeight: '400',
    letterSpacing: 0.5,
    color: '#000000',
  },
  contentIconFormRight: {
    position: 'absolute',
    top: 12,
    right: 2,
    padding: 10,
  },
  iconFormRight: {
    fontSize: 20,
    color: '#4e4e4e',
  },
  recoverPassword: {
    color: '#5B009D',
    textAlign: 'center',
    marginTop: 10,
  },
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  savePassword: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
