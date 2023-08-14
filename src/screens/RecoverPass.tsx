
import { TouchableOpacity, SafeAreaView, StyleSheet, TextInput, View, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ButtonPrimary';
import AlertSuccess from '../components/AlertSuccess';
import React, { useEffect, useState } from 'react';
import LoadingIndicator from '../components/LoadingIndicator';

type RootStackParamList = {
  Login: undefined;
  RecoverPass: undefined;
  // otras rutas de tu aplicación
};
type RecoverPassProps = NativeStackScreenProps<RootStackParamList, 'RecoverPass'>;

const RecoverPass = ({ navigation }: RecoverPassProps) => {

  // -----------------------------------------------Indicador de caega "Preload"-----------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);

  // --------------------------------------------------Estado de los "Inputs"--------------------------------------------------
  const [password, setPassword] = useState('');
  const [recoverPassword, setRecoverPasword] = useState('');

  // ----------------------------------------------Mostrar y ocultar "Contraseña"----------------------------------------------
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  // ---------------------------------------Función para mostrar el modal "AlertSuccess"---------------------------------------
  const [SuccessVisible, setSuccessVisible] = useState(false);

  const handleShowSuccess = () => {
    setSuccessVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
    navigation.navigate('Login');
  };
  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <>
      <LoadingIndicator isLoading={isLoading} />
      <HeaderSettingsReturn navigation={navigation} title="Restablecer contraseña" />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always" >

        <SafeAreaView style={{ flex: 1 }}>

          <View style={styles.containerForm}>

            <View style={styles.contentForm}>

              <View style={styles.contentLogoAccount}>
                <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
              </View>

              <View>
                <Ionicons style={styles.iconForm} name='key-outline' />
                <TextInput
                  style={styles.input}
                  placeholder='Ingrese la nueva contraseña'
                  placeholderTextColor='#000000'
                  // textAlignVertical='bottom'
                  onChangeText={setPassword}
                  value={password}
                  autoCapitalize='none'
                  secureTextEntry={!showPassword1} />
                {password !== '' && ( // Código cambio de icono de la contraseña
                  <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibility1}>
                    <Ionicons style={styles.iconFormRight} name={showPassword1 ? 'eye-off-sharp' : 'eye-sharp'} />
                  </TouchableOpacity>
                )}
              </View>

              <View>
                <Ionicons style={styles.iconForm} name='key-outline' />
                <TextInput
                  style={styles.input}
                  placeholder='Confirme la nueva contraseña'
                  placeholderTextColor='#000000'
                  // textAlignVertical='bottom'
                  onChangeText={setRecoverPasword}
                  value={recoverPassword}
                  autoCapitalize='none'
                  secureTextEntry={!showPassword2} />
                {recoverPassword !== '' && ( // Código cambio de icono de la contraseña
                  <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibility2}>
                    <Ionicons style={styles.iconFormRight} name={showPassword2 ? 'eye-off-sharp' : 'eye-sharp'} />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.separator}></View>

              <View style={{ marginBottom: 30 }}>
                <ButtonPrimary
                  onPress={handleShowSuccess}
                  width={'100%'}
                  height={48}
                  backgroundColor={'#5B009D'}
                  borderRadius={0}
                  color={'#ffffff'}
                  fontSize={14}
                  fontWeight={'500'}
                  letterSpacing={0.8}
                  title={'RESTABLECER'}
                />
              </View>

              {/* ---------------------------Código para ejecutar y mostrar el modal "AlertSuccess"---------------------------- */}
              {/* Renderizar componente "AlertSuccess" */}
              <AlertSuccess
                visible={SuccessVisible}
                onCloseSuccess={handleCloseSuccess}
                title='Contraseña actualizada.'
                message='La cuontraseña ha sido actualizada con éxito.'
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

export default RecoverPass;

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
