
import { SafeAreaView, StyleSheet, TextInput, View, Image, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertEnterCode from '../components/AlertEnterCode';
import ButtonPrimary from '../components/ButtonPrimary';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';

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

    <>
      <LoadingIndicator isLoading={isLoading} />
      <HeaderSettingsReturn navigation={navigation} title="Validar correo" />

      <ScrollView contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="always" // Evita que el teclado se oculte al hacer clic fuera del campo
      >

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
                  placeholder='Ingrese E-mail para continuar'
                  placeholderTextColor='#000000'
                  // textAlignVertical='bottom'
                  onChangeText={setEmail}
                  value={email}
                  autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
                  keyboardType='email-address' />
              </View>

              <View style={styles.separator}></View>

              <View style={{ marginBottom: 30 }}>
                <ButtonPrimary
                  onPress={handleShowEnterCode}
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

              {/* -------------------------Código para ejecutar y mostrar el modal "AlertEnterCode"-------------------------- */}
              {/* Renderizar componente "AlertEnterCode" */}
              <AlertEnterCode
                visible={EnterCodeVisible}
                onCloseEnterCode={handleCloseEnterCode}
                title='Restablecer contraseña'
                message={'Introduce el código que acabamos de enviar a'}
                buttonText='ENVIAR'
                buttonStyle={{ width: 120 }}
              />
              {/* ------------------------------------------------------------------------------------------------------------- */}

            </View>

          </View>

        </SafeAreaView>

      </ScrollView>

    </>

  );

};

export default HomeRecoverPass;

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
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginTop: 12,
    marginBottom: 20,
  },
});
