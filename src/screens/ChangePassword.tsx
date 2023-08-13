import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ButtonPrimary';
import HeaderReturn from '../components/HeaderReturnut';
import AlertSuccess from '../components/AlertSuccess';
import AlertWarning from '../components/AlertWarning';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  _id: User | null;
  Nombre: string;
  Apellido: string;
  Correo: string;
};

type RootStackParamList = {
  ChangePassword: undefined;
  AccountHeader: undefined;
  StackAccount: undefined;
  Login: undefined;
};
type ChangePasswordProps = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>;

const ChangePassword = ({ navigation }: ChangePasswordProps) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Controla la carga del "Preload"

  

  // Estado de los "Inputs"
  const [Contrasena, setContrasena] = React.useState('');
  const [ConfirmarContrasena, setConfirmarContrasena] = React.useState('');

  // Mostrar y ocultar "Contraseña"
  const [showPasswordUno, setShowPasswordUno] = useState(false);
  const [showPasswordDos, setShowPasswordDos] = useState(false);

  const togglePasswordVisibilityUno = () => {
    setShowPasswordUno(!showPasswordUno);
  };

  const togglePasswordVisibilityDos = () => {
    setShowPasswordDos(!showPasswordDos);
  };

  // -----------------------------------------controla el tiempo que dura el "Preload"-----------------------------------------
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------

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

          if (currentUser) {
            setUser(currentUser);
          } else {

          }

        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------Función para cambiar la contraseña del usuario--------------------------------------
  const changePass = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      const userEmail = await AsyncStorage.getItem('userEmail');

      if (!token || !userEmail) {
        Alert.alert('Error', 'Por favor inicie sesión para continuar.');
        navigation.navigate('StackAccount');
        return;
      }

      if (!user || !user._id) {
        console.error('No se puede cambiar la contraseña. El usuario no está definido o no tiene un _id.');
        return;
      }

      // Validar campos vacíos
      if (!Contrasena || !ConfirmarContrasena) {
        setEmptyFieldsVisible(true); // Mostrar alerta "Campos vacíos"
        return
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

      // Realiza la solicitud para cambiar la contraseña al servidor utilizando axios.patch
      const response = await axios.patch('https://api-proyecto-5hms.onrender.com/api/usuario', {
        _id: user._id,
        Contrasena: ConfirmarContrasena, // Nueva contraseña ingresada en el campo "confirmPassword"
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
        handleShowSuccess(); // Muestra el mensaje de éxito
      } else {
        console.error('Error al cambiar la contraseña:', response.data);
      }
    } catch (error) {
      console.error('Error al cambiar la contraseña:', error);
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------------Función alerta "Contraseña inválida"-------------------------------------------
  const [invalidPassVisible, setInvalidPassVisible] = useState(false);

  const handleCloseInvalidPass = () => {
    setInvalidPassVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ----------------------------------------------Función alerta "Campos vacíos"----------------------------------------------
  const [emptyFieldsVisible, setEmptyFieldsVisible] = useState(false);

  const handleCloseEmptyFields = () => {
    setEmptyFieldsVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------Función alerta "Contraseña inválida, mínimo de caracteres"--------------------------------
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

  // ------------------------------------------Función alerta "Actualización exitosa"------------------------------------------
  const [SuccessVisible, setSuccessVisible] = useState(false);

  const handleShowSuccess = () => {
    setSuccessVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
    navigation.navigate('Login');
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // -----------------------------------Función para navegar a vista desde "HeaderReturnut"------------------------------------
  const navigateToView = () => {
    navigation.replace('AccountHeader'); 
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (
    <>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderReturn handleNavigation={navigateToView} title="Actualizar contraseña" />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always" >

        <SafeAreaView style={{ flex: 1 }}>

          <View style={styles.containerForm}>

            <View style={styles.contentForm}>

              <View style={styles.contentLogoAccount}>
                <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
              </View>

              <View style={styles.containerInfoAccount}>
                <View style={styles.containerNameText}>
                  <Text style={styles.nameText}>{user?.Nombre} </Text>
                  <Text style={styles.nameText}>{user?.Apellido}</Text>
                </View>

                <Text style={styles.emailText}>{user?.Correo}</Text>
              </View>

              <View>
                <Ionicons style={styles.iconForm} name='key-outline' />
                <TextInput
                  style={styles.input}
                  placeholder='Contraseña nueva'
                  placeholderTextColor='#000000'
                  onChangeText={setContrasena}
                  value={Contrasena}
                  autoCapitalize='none'
                  secureTextEntry={!showPasswordUno} />
                {Contrasena !== '' && ( // Código cambio de icono de la contraseña
                  <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibilityUno}>
                    <Ionicons style={styles.iconFormRight} name={showPasswordUno ? 'eye-off-sharp' : 'eye-sharp'} />
                  </TouchableOpacity>
                )}
              </View>

              <View>
                <Ionicons style={styles.iconForm} name='key-outline' />
                <TextInput
                  style={styles.input}
                  placeholder='Confirmar contraseña nueva'
                  placeholderTextColor='#000000'
                  onChangeText={setConfirmarContrasena}
                  value={ConfirmarContrasena}
                  autoCapitalize='none'
                  secureTextEntry={!showPasswordDos} />
                {ConfirmarContrasena !== '' && ( // Código cambio de icono de la contraseña
                  <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibilityDos}>
                    <Ionicons style={styles.iconFormRight} name={showPasswordDos ? 'eye-off-sharp' : 'eye-sharp'} />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.separator}></View>

              <View style={{ marginBottom: 30 }}>
                <ButtonPrimary
                  onPress={changePass}
                  width={'100%'}
                  height={48}
                  backgroundColor={'#5B009D'}
                  borderRadius={0}
                  color={'#ffffff'}
                  fontSize={14}
                  fontWeight={'500'}
                  letterSpacing={0.8}
                  title={'ENVIAR'}
                />
              </View>

              {/* --------------------------------------Alerta "Contraseña inválida"--------------------------------------- */}
              <AlertWarning
                visible={invalidPassVisible}
                onCloseWarning={handleCloseInvalidPass}
                title='Contraseña inválida.'
                message='La contraseña ingresada es incorrecta.'
                buttonStyle={{ width: 70 }}
                buttonText='OK'
              />
              {/* --------------------------------------------------------------------------------------------------------- */}

              {/* -----------------------------------------Alerta "Campos vacíos"------------------------------------------ */}
              <AlertWarning
                visible={emptyFieldsVisible}
                onCloseWarning={handleCloseEmptyFields}
                title='Campos vacíos.'
                message='Por favor, complete todos los campos.'
                buttonStyle={{ width: 70 }}
                buttonText='OK'
              />
              {/* --------------------------------------------------------------------------------------------------------- */}

              {/* ---------------------------Alerta "Contraseña inválida, mínimo de caracteres"---------------------------- */}
              <AlertWarning
                visible={minPasswordVisible}
                onCloseWarning={handleCloseMinPassword}
                title='Contraseña inválida.'
                message='La contraseña debe tener al menos 8 caractéres.'
                buttonStyle={{ width: 70 }}
                buttonText='OK'
              />
              {/* --------------------------------------------------------------------------------------------------------- */}

              {/* ----------------------------------Alerta "Las contraseñas no coinciden"---------------------------------- */}
              <AlertWarning
                visible={notMatchVisible}
                onCloseWarning={handleCloseNotMatch}
                title='Las contraseñas no coinciden.'
                message='Las contraseñas ingresadas deben coincidir.'
                buttonStyle={{ width: 70 }}
                buttonText='OK'
              />
              {/* --------------------------------------------------------------------------------------------------------- */}

              {/* -------------------------------------Alerta "Actualización exitosa"-------------------------------------- */}
              {/* Renderizar componente "AlertSuccess" */}
              <AlertSuccess
                visible={SuccessVisible}
                onCloseSuccess={handleCloseSuccess}
                title='Actualización exitosa.'
                message='La contraseña se ha actualizado correctamente.'
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

export default ChangePassword;

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
  containerInfoAccount: {
    marginBottom: 30,
    paddingVertical: 15,
    borderWidth: 2,
    borderColor: '#E6E6E6',
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
  iconForm: {
    fontSize: 20,
    position: 'absolute',
    top: 21,
    left: 6,
    color: '#000000',
    zIndex: 1,
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
  input: {
    height: 48,
    marginVertical: 8,
    paddingLeft: 32,
    backgroundColor: '#e6e6e6',
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginTop: 12,
    marginBottom: 20,
  },
});