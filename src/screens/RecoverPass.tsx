
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity, SafeAreaView, StyleSheet, TextInput, View, ScrollView, Image } from 'react-native';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeaderSettings from '../components/CustomHeaderSettings';

type RootStackParamList = {
  Login: undefined;
  RecoverPass: undefined;
  // otras rutas de tu aplicación
};
type RecoverPassProps = NativeStackScreenProps<RootStackParamList, 'RecoverPass'>;

const RecoverPass = ({ navigation }: RecoverPassProps) => {

  // Estado de los "Inputs"
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [recoverPassword, setRecoverPasword] = useState('');

  // Mostrar y ocultar "Contraseña"
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);

  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };

  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };

  return (

    <>

      <CustomHeaderSettings navigation={navigation} title="Restablecer contraseña" />

      <ScrollView style={styles.contentForm}>

        <View style={styles.contentLogoAccount}>
          <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
        </View>

        <SafeAreaView>

          <View>
            <Ionicons style={styles.iconForm} name='at-outline' />
            <TextInput
              style={styles.input}
              placeholder='Ingrese E-mail'
              placeholderTextColor='#000000'
              // textAlignVertical='bottom'
              onChangeText={setEmail}
              value={email}
              autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
              keyboardType='email-address' />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='lock-closed-outline' />
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
            <Ionicons style={styles.iconForm} name='lock-closed-outline' />
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

          <View style={{ marginTop: 30 }}>
            <ButtonPrimary
              onPress={() => { }} // onPress vacío, sin funcionalidad
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

          <View style={styles.separator}></View>

          <View>
            <ButtonSecondary
              onPress={() => navigation.navigate('Login')}
              width={'100%'}
              height={48}
              backgroundColor={'#00000000'}
              borderRadius={0}
              color={'#E00083'}
              fontSize={14}
              borderWidth={1}
              fontWeight={'500'}
              letterSpacing={0.8}
              title={'REGRESAR'}
            />
          </View>

        </SafeAreaView>

      </ScrollView>

    </>

  );

};

export default RecoverPass;

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
  contentIconFormRight: {
    position: 'absolute',
    top: 21,
    right: 8,
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
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
});
