import { SafeAreaView, StyleSheet, TextInput, View, Image, Alert } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingIndicator from '../components/LoadingIndicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertSendEmail from '../components/AlertSendEmail';
import ButtonPrimary from '../components/ButtonPrimary';
import AlertWarning from '../components/AlertWarning';
import HeaderReturn from '../components/HeaderReturn';
import { useEffect, useState } from 'react';
import React from 'react';

type RootStackParamList = {
  Login: undefined;
  RecoverPasswordEmail: undefined;
  RecoverPass: undefined;
};
type RecoverPasswordEmailProps = NativeStackScreenProps<RootStackParamList, 'RecoverPasswordEmail'>;

const RecoverPasswordEmail = ({ navigation }: RecoverPasswordEmailProps) => {

  // -----------------------------------------------Indicador de caega "Preload"-----------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);

  // --------------------------------------------------Estado de los "Inputs"--------------------------------------------------
  const [Correo, setCorreo] = useState('');

  // ---------------------------------------------Función alerta "Campo requerido"---------------------------------------------
  const [emptyInputVisible, setEmptyInputVisible] = useState(false);

  const handleCloseEmptyInput = () => {
    setEmptyInputVisible(false);
  };

  // ---------------------------------------------Función alerta "Correo inválido"---------------------------------------------
  const [emailVisible, setEmailVisible] = useState(false);

  const handleCloseEmail = () => {
    setEmailVisible(false);
  };

  // ------------------------------------------Función alerta "Correo no registrado"-------------------------------------------
  const [unregisteredEmailVisible, setUnregisteredEmailVisible] = useState(false);

  const handleCloseUnregisteredEmail = () => {
    setUnregisteredEmailVisible(false);
    setIsLoading(false); // Desactivar el preload
  };

  // --------------------------------------------Función alerta "Correo enviado"-----------------------------------------------
  const [SuccessSendEmailVisible, setSuccessSendEmailVisible] = useState(false);

  const handleCloseSuccessSendEmail = () => {
    setSuccessSendEmailVisible(false);
    navigation.replace('Login'); // 'replace' en lugar de 'navigate' recarga la "Vista" y actualiza cambios
  };

  // -----------------------------------Funcion para validar si el "Correo" está registrado------------------------------------
  const getUserState = async (Correo: string) => {

    setIsLoading(true); // Activar el preload

    try {
      const response = await fetch('https://api-proyecto-5hms.onrender.com/api/usuario');

      if (!response.ok) {
        throw new Error('Error al obtener los datos del usuario');
      }

      const { Usuarios } = await response.json();
      const user = Usuarios.find((usuario: { Correo: string; }) => usuario.Correo === Correo);

      return user ? user.Estado : null;
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  // --------------------------------Función para enviar "Correo de recuperación de contraseña"--------------------------------
  const handleResetPassword = async () => {

    // Validación de campos vacíos
    if (Correo === '') {
      setEmptyInputVisible(true); // Muestra alerta de "Campos vacíos"
      return
    }

    // Validar formato de "Correo electrónico"
    if (!/^[a-zA-Z0-9._-]+@(yahoo|outlook|hotmail|gmail|mailbox)\.(com|es|net|co)$/.test(Correo)) {
      setEmailVisible(true); // Muestra alerta "Correo inválido"
      return;
    }

    // Validar si el correo está registrado
    const userState = await getUserState(Correo); // Obtener el correo 
    if (userState !== true) {
      setUnregisteredEmailVisible(true); // Muestra alerta "Correo no registrado"
      return;
    }

    try {
      const response = await fetch('https://api-proyecto-5hms.onrender.com/api/olvidocontrasena', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          Correo: Correo,
        }),
      });

      if (response.status === 200) {
        setSuccessSendEmailVisible(true);
      } else {
        Alert.alert('Hubo un error al enviar el correo');
      }
    } catch (error) {
      console.error('Error al enviar la solicitud:', error);
      Alert.alert('Hubo un error al enviar la solicitud');
    }
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <View style={styles.generalContainer}>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderReturn navigation={navigation} title="Restablecer contraseña" />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <View style={styles.scrollView}>

        <View style={styles.contentMain}>

          <View style={styles.contentLogoAccount}>
            <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
          </View>

          <SafeAreaView>

            <View>
              <Ionicons style={styles.iconForm} name='at-outline' />
              <TextInput
                style={styles.input}
                placeholder='Ingrese E-mail para continuar'
                placeholderTextColor='#000000'
                onChangeText={setCorreo}
                value={Correo}
                autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
                keyboardType='email-address' />
            </View>

            <View style={styles.separator}></View>

            <ButtonPrimary
              onPress={handleResetPassword}
              width={'100%'}
              height={48}
              marginTop={0}
              marginBottom={30}
              backgroundColor={'#5B009D'}
              borderRadius={0}
              fontFamily={'Aspira W05 Demi'}
              color={'#ffffff'}
              fontSize={15}
              fontWeight={undefined}
              letterSpacing={0.3}
              title={'ENVIAR'}
            />

            {/* ------------------------------------------Alerta "Campo requerido"------------------------------------------- */}
            <AlertWarning
              visible={emptyInputVisible}
              onCloseWarning={handleCloseEmptyInput}
              title='Campo requerido.'
              message='Por favor, ingrese el correo electrónico para continuar.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* ------------------------------------------Alerta "Correo inválido"------------------------------------------- */}
            <AlertWarning
              visible={emailVisible}
              onCloseWarning={handleCloseEmail}
              title='Correo inválido.'
              message='El correo ingresado tiene un formato invalido.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* ----------------------------------------Alerta "Correo no registrado"---------------------------------------- */}
            <AlertWarning
              visible={unregisteredEmailVisible}
              onCloseWarning={handleCloseUnregisteredEmail}
              title='Correo no registrado.'
              message='El correo electrónico ingresesado no se encuentra registrado.'
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* ------------------------------------------Alerta "Correo enviado"-------------------------------------------- */}
            <AlertSendEmail
              visible={SuccessSendEmailVisible}
              onCloseSuccess={handleCloseSuccessSendEmail}
              title='Correo enviado.'
              message={'Se ha enviado un enlace de recuperación de contraseña a:'}
              email={`${Correo}`}
              buttonStyle={{ width: 70 }}
              buttonText='OK'
            />
            {/* ------------------------------------------------------------------------------------------------------------- */}

          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

export default RecoverPasswordEmail;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  contentMain: {
    width: '86%',
    marginHorizontal: '7%',
    backgroundColor: '#ffffff',
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
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginTop: 12,
    marginBottom: 20,
  },
});
