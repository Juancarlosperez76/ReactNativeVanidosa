import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeaderReturn from '../components/CustomHeaderReturn';

type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
  RecoverPass: undefined;
};
type LoginProps = NativeStackScreenProps<RootStackParamList, 'Login'>;

const Login = ({ navigation }: LoginProps) => {

  // Estado de los "Inputs"
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  // // Mostrar y ocultar "Contraseña"
  const [showPassword, setShowPassword] = useState(false);
  const [savePassword, setsavePassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (

    <>

      <CustomHeaderReturn title="Iniciar sesión" />

      <ScrollView style={styles.contentForm}>

        <View style={styles.contentLogoAccount}>
          <Image style={styles.logoAccount} source={require('../../android/assets/img/logo-full-136-84.png')} />
        </View>

        <SafeAreaView>

          <View>
            <Ionicons style={styles.iconForm} name='at-outline' />
            <TextInput
              style={styles.input}
              placeholder="E-mail"
              placeholderTextColor="#7e7e7e"
              //textAlignVertical="bottom"
              onChangeText={setEmail}
              value={email}
              autoCapitalize="none" // Evita que la primera letra ingresada sea mayúscula
              keyboardType="email-address" />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='lock-closed-outline' />
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              placeholderTextColor="#7e7e7e"
              //textAlignVertical="bottom"
              onChangeText={setPassword}
              value={password}
              autoCapitalize="none" // Evita que la primera letra ingresada sea mayúscula
              secureTextEntry={!showPassword} // Oculta y muestra carácteres de contraseña
            />
            {password !== '' && ( // Código cambio de icono de la contraseña
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
              tintColors={{ true: '#2C4D9E', false: '#7e7e7e' }} />
            <Text style={{ color: '#7e7e7e' }}>Guardar contraseña</Text>
          </View>

          <View style={{ marginTop: 30 }}>
            <ButtonPrimary
              onPress={() => { }}
              title={'INICIAR SESIÓN'}
              backgroundColor={'#2C4D9E'}
              color={'#ffffff'} />
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('RecoverPass')}>
            <Text style={styles.recoverPassword}> ¿Olvidaste tu contraseña?</Text>
          </TouchableOpacity>

          <View style={styles.separator}></View>

          <View>
            <ButtonSecondary
              onPress={() => navigation.navigate('Registro')}
              title={'CREAR CUENTA'}
              backgroundColor={'#00000000'}
              color={'#000000'} />
          </View>

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
    color: '#7e7e7e',
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
    borderWidth: 1,
    borderColor: '#d3d3d3',
    color: '#7e7e7e',
  },
  recoverPassword: {
    color: '#2C4D9E',
    textAlign: 'center',
    marginTop: 15,
  },
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginTop: 32,
    marginBottom: 35,
  },
  savePassword: {
    flexDirection: 'row',
    alignItems: 'center',
  }
});
