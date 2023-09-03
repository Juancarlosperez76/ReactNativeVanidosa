
import { SafeAreaView, StyleSheet, TextInput, View, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingIndicator from '../components/LoadingIndicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertEnterCode from '../components/AlertEnterCode';
import ButtonPrimary from '../components/ButtonPrimary';
import HeaderReturn from '../components/HeaderReturn';
import React, { useEffect, useState } from 'react';

type RootStackParamList = {
  Login: undefined;
  HomeRecoverPass: undefined;
  RecoverPass: undefined;
  // otras rutas de tu aplicación
};
type HomeRecoverPassProps = NativeStackScreenProps<RootStackParamList, 'HomeRecoverPass'>;

const HomeRecoverPass = ({ navigation }: HomeRecoverPassProps) => {

  // -----------------------------------------------Indicador de caega "Preload"-----------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);

  // --------------------------------------------------Estado de los "Inputs"--------------------------------------------------
  const [email, setEmail] = useState('');

  // --------------------------------------Función para mostrar el modal "AlertEnterCode"--------------------------------------
  const [EnterCodeVisible, setEnterCodeVisible] = useState(false);

  const handleShowEnterCode = () => {
    setEnterCodeVisible(true);
  };

  const handleCloseEnterCode = () => {
    setEnterCodeVisible(false);
    navigation.navigate('RecoverPass');
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <View style={styles.generalContainer}>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderReturn navigation={navigation} title="Validar correo" />

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
                // textAlignVertical='bottom'
                onChangeText={setEmail}
                value={email}
                autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
                keyboardType='email-address' />
            </View>

            <View style={styles.separator}></View>

            <ButtonPrimary
              onPress={handleShowEnterCode}
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

            {/* -------------------------Código para ejecutar y mostrar el modal "AlertEnterCode"-------------------------- */}
            {/* Renderizar componente "AlertEnterCode" */}
            <AlertEnterCode
              visible={EnterCodeVisible}
              onCloseEnterCode={handleCloseEnterCode}
              title='Restablecer contraseña'
              message={'Ingresa el código que enviamos a'}
              email={email}
              buttonText='ENVIAR'
              buttonStyle={{ width: 120 }}
            />
            {/* ------------------------------------------------------------------------------------------------------------- */}

          </SafeAreaView>
        </View>
      </View>
    </View>
  );
};

export default HomeRecoverPass;

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
