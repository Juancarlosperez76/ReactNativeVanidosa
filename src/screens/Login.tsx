import { TouchableOpacity, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomHeaderSettings from '../components/CustomHeaderSettings';
import AlertInactiveAccount from '../components/AlertInactiveAccount';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CheckBox from '@react-native-community/checkbox';
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
  const [isLoading, setIsLoading] = useState(true); // Controla la carga del "Preload"

  // -----------------------------------------controla el tiempo que dura el "Preload"-----------------------------------------
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------------Manejo de los "Estados"--------------------------------------------------
  const [Correo, setCorreo] = React.useState(''); // Estado de los "Inputs"
  const [Contrasena, setContrasena] = React.useState(''); // Estado de los "Inputs"
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar y ocultar "Contraseña"
  const [savePassword, setsavePassword] = useState(false) // Estado para guardar la contraseña
  const [SuccessVisible, setSuccessVisible] = useState(false); // Estado de modal "AlertSuccess" 
  const [WarningVisible, setWarningVisible] = useState(false); // Estado de modal "AlertWarning"
  const [FailureVisible, setFailureVisible] = useState(false); // Estado de modal "AlertFailure"
  const [InactiveAccountVisible, setInactiveAccountVisible] = useState(false); // Estado de modal "AlertFailure"

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ------------------Función mostrar modal "AlertSuccess" y redireccionar a "StackMain" al iniciar "Sesión"------------------
  const handleCloseSuccess = () => {
    setSuccessVisible(false); // Ocultar la alerta de éxito
    setIsLoading(false); // Mostrar preload mientras se inicia sesión
    navigation.navigate('Main'); // Redireccionar a "StackMain" después de hacer clic en "OK"
  }
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------Función para mostrar el modal "AlertWarning"---------------------------------------
  const handleCloseWarning = () => {
    setWarningVisible(false);
    navigation.navigate('Login'); // Redireccionar a "Login"
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------Función para mostrar el modal "AlertFailure"---------------------------------------
  const handleCloseFailure = () => {
    setFailureVisible(false);
    navigation.navigate('Login'); // Redireccionar a "Login"
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // -----------------------------------Función para mostrar el modal "AlertInactiveAccount"-----------------------------------
  const handleCloseInactiveAccount = () => {
    setInactiveAccountVisible(false);
    navigation.navigate('Login'); // Redireccionar a "Login"
  };
  // --------------------------------------------------------------------------------------------------------------------------

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
      } else {
        setFailureVisible(true);
      }
    } catch {
      setFailureVisible(true);
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <>

      <LoadingIndicator isLoading={isLoading} />

      <CustomHeaderSettings navigation={navigation} title="Iniciar sesión" />

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

              {/* ---------------------------Código para ejecutar y mostrar el modal "AlertSuccess"---------------------------- */}
              {/* Renderizar componente "AlertSuccess" */}
              <AlertSuccess
                visible={SuccessVisible}
                onCloseSuccess={handleCloseSuccess}
                title='Inicio de sesión.'
                message='¡Inicio de sesión exitoso!'
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

              {/* -----------------------Código para ejecutar y mostrar el modal "AlertInactiveAccount"------------------------ */}
              {/* Renderizar componente "AlertInactiveAccount" */}
              <AlertInactiveAccount visible={InactiveAccountVisible}
                onCloseInactiveAccount={handleCloseInactiveAccount}
                title='Error al iniciar sesión.'
                message='El usuario ha eliminado la cuenta.'
                buttonStyle={{ width: 70 }}
                buttonText='OK'
              />
              {/* ------------------------------------------------------------------------------------------------------------- */}

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
  savePassword: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
