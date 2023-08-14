import { TouchableOpacity, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AlertInactiveAccount from '../components/AlertInactiveAccount';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ButtonPrimary';
import AlertSuccess from '../components/AlertSuccess';
import AlertFailure from '../components/AlertFailure';
import AlertWarning from '../components/AlertWarning';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
  HomeRecoverPass: undefined;
  Main: undefined;
};
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {

  // -----------------------------------------------Indicador de caega "Preload"-----------------------------------------------
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);

  // --------------------------------------------------Estado de los input"----------------------------------------------------
  const [Contrasena, setContrasena] = React.useState('');
  const [Correo, setCorreo] = React.useState('');

  // ---------------------------------------------Mostrar y ocultar la contraseña----------------------------------------------
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar y ocultar "Contraseña"

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // ---------------------------------------Función alerta "¡Inicio de sesión exitoso!"----------------------------------------
  const [SuccessVisible, setSuccessVisible] = useState(false); // Estado de modal "AlertSuccess" 

  const handleCloseSuccess = () => {
    setSuccessVisible(false); // Ocultar la alerta de éxito
    setIsLoading(false); // Mostrar preload mientras se inicia sesión
    navigation.navigate('Main'); // Redireccionar a "StackMain" después de hacer clic en "OK"
  }

  // ----------------------------------------------Función alerta "Campos vacíos"----------------------------------------------
  const [WarningVisible, setWarningVisible] = useState(false); // Estado de modal "AlertWarning"

  const handleCloseWarning = () => {
    setWarningVisible(false);
    navigation.navigate('Login'); // Redireccionar a "Login"
  };

  // ----------------------------------------Función alerta "Credenciales incorrectas"-----------------------------------------
  const [FailureVisible, setFailureVisible] = useState(false); // Estado de modal "AlertFailure"

  const handleCloseFailure = () => {
    setFailureVisible(false);
    navigation.navigate('Login'); // Redireccionar a "Login"
  };

  // ---------------------------------------------Función alerta "Cuenta inactiva"---------------------------------------------
  const [InactiveAccountVisible, setInactiveAccountVisible] = useState(false); // Estado de modal "AlertFailure"

  const handleCloseInactiveAccount = () => {
    setInactiveAccountVisible(false);
    navigation.navigate('Login'); // Redireccionar a "Login"
  };

  // ------------------------------------------------Lógica de Inicio de sesión------------------------------------------------
  const getUserState = async (Correo: string) => {

    setIsLoading(true); // Activar el preload

    const response = await axios.get('https://api-proyecto-5hms.onrender.com/api/usuario');
    const { Usuarios } = response.data;

    // Encuentra el usuario con el correo proporcionado
    const user = Usuarios.find((usuario: { Correo: string; }) => usuario.Correo === Correo);

    if (user) {
      return user.Estado;
    } else {
      return null; // El usuario no existe
    }
  };

  const handleLogin = async () => {
    if (!Correo || !Contrasena) {
      setWarningVisible(true); // Mostrar alerta "Por favor, complete todos los campos." 
      return;
    }

    try {
      // Obtener el estado del usuario antes de iniciar sesión
      const userState = await getUserState(Correo);

      if (userState === false) {
        setInactiveAccountVisible(true); // Mostrar alerta "El usuario ha eliminado la cuenta." 
        setCorreo(''); // Limpiar los campos después de cerrar la alerta
        setContrasena(''); // Limpiar los campos después de cerrar la alerta
        setIsLoading(false); // Desactivar el preload
        return;
      }

      // Si el estado es "true", procedemos con el inicio de sesión
      const userData = {
        Correo,
        Contrasena,
      };

      const response = await axios.post('https://api-proyecto-5hms.onrender.com/api/auth/login', userData);
      const { token } = response.data;
      console.log("Token:", token);

      if (token) {
        await AsyncStorage.setItem('userToken', token); // Guardar "token" localmente con "AsyncStorage"
        await AsyncStorage.setItem('userEmail', Correo); // Guardar "Correo" localmente con "AsyncStorage"
        setSuccessVisible(true); // Mostrar alerta "Ha iniciado sesión con éxito." 
        setCorreo(''); // Limpiar los campos después de cerrar la alerta
        setContrasena(''); // Limpiar los campos después de cerrar la alerta
      } else {
        setFailureVisible(true);
      }
    } catch {
      setFailureVisible(true);
      setIsLoading(false); // Desactivar el preload
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (
    <>
      <LoadingIndicator isLoading={isLoading} />
      <HeaderSettingsReturn navigation={navigation} title="Iniciar sesión" />
      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always" >
        <SafeAreaView style={{ flex: 1 }}>
          <View style={styles.containerForm}>
            <View style={styles.contentForm}>

              <View style={styles.contentLogoAccount}>
                <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
              </View>

              <View>
                <Ionicons style={styles.iconForm} name='at-outline' />
                <TextInput
                  style={styles.input}
                  placeholder="E-mail"
                  placeholderTextColor="#000000"
                  onChangeText={setCorreo}
                  value={Correo}
                  autoCapitalize="none" // Evita que la primera letra ingresada sea mayúscula
                  keyboardType="email-address"
                />
              </View>

              <View>
                <Ionicons style={styles.iconForm} name='key-outline' />
                <TextInput
                  style={styles.input}
                  placeholder="Contraseña"
                  placeholderTextColor="#000000"
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

              <TouchableOpacity onPress={() => navigation.navigate('HomeRecoverPass')}>
                <Text style={styles.recoverPassword}>Restablecer la contraseña</Text>
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

              {/* ----------------------------------Alerta "¡Inicio de sesión exitoso!"------------------------------------ */}
              <AlertSuccess
                visible={SuccessVisible}
                onCloseSuccess={handleCloseSuccess}
                title='Inicio de sesión.'
                message='¡Inicio de sesión exitoso!'
                buttonStyle={{ width: 70 }}
                buttonText='OK'
              />
              {/* -----------------------------------------Alerta "Campos vacíos"------------------------------------------ */}
              <AlertWarning
                visible={WarningVisible}
                onCloseWarning={handleCloseWarning}
                title='Campos vacíos.'
                message='Por favor, complete todos los campos.'
                buttonStyle={{ width: 70 }}
                buttonText='OK'
              />
              {/* -----------------------------------Alerta "Credenciales incorrectas"------------------------------------- */}
              <AlertFailure
                visible={FailureVisible}
                onCloseFailure={handleCloseFailure}
                title='Error al iniciar sesión.'
                message='Credenciales incorrectas.'
                buttonStyle={{ width: 70 }}
                buttonText='OK'
              />
              {/* ----------------------------------------Alerta "Cuenta inactiva"----------------------------------------- */}
              <AlertInactiveAccount visible={InactiveAccountVisible}
                onCloseInactiveAccount={handleCloseInactiveAccount}
                title='Cuenta inactiva.'
                message='El usuario ha eliminado la cuenta.'
                buttonStyle={{ width: 70 }}
                buttonText='OK'
              />
              {/* --------------------------------------------------------------------------------------------------------- */}

            </View>
          </View>
        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default Login;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  containerForm: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
  },
  contentForm: {
    // borderWidth: 1
  },
  contentLogoAccount: {
    alignItems: 'center',
    marginBottom: 40,
    backgroundColor: '#ffffff',
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
});
