
import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity, SafeAreaView, StyleSheet, Text, TextInput, View, ScrollView, Image } from 'react-native';
import GeneralButton from '../components/GeneralButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Login: undefined;
  RecoverPass: undefined;
  // otras rutas de tu aplicación
};
type RecoverPassProps = NativeStackScreenProps<RootStackParamList, 'RecoverPass'>;

const RecoverPass = ({ navigation }: RecoverPassProps) => {

  function alert(_arg0: string) {
    throw new Error('Function not implemented.');
  }

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
    <ScrollView style={styles.contentForm}>
      <View style={styles.contentLogoAccount}>
        <Image style={styles.logoAccount} source={require('../../android/assets/img/logo-full-136-84.png')} />
      </View>
      <SafeAreaView>
        <View>
          <Ionicons style={styles.iconForm} name='at-outline' />
          <TextInput
            style={styles.input}
            placeholder='Ingrese E-mail'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setEmail}
            value={email}
            autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
            keyboardType='email-address'
          />
        </View>
        <View>
          <Ionicons style={styles.iconForm} name='lock-closed-outline' />
          <TextInput
            style={styles.input}
            placeholder='Ingrese contraseña actual'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setPassword}
            value={password}
            autoCapitalize='none'
            secureTextEntry={!showPassword1}
          />
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
            placeholder='Ingrese contraseña nueva'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setRecoverPasword}
            value={recoverPassword}
            autoCapitalize='none'
            secureTextEntry={!showPassword2}
          />
          {recoverPassword !== '' && ( // Código cambio de icono de la contraseña
            <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibility2}>
              <Ionicons style={styles.iconFormRight} name={showPassword2 ? 'eye-off-sharp' : 'eye-sharp'} />
            </TouchableOpacity>
          )}
        </View>

        <View style={{ marginTop: 30 }}>
          <GeneralButton
            onPress={() => alert('Botón personalizado presionado')}
            width='100%'
            height={48}
            backgroundColor='#2C4D9E'
            borderRadius={24}
            title='RESTABLECER'
            color='#ffffff'
            fontSize={14}
          />
        </View>

        <View style={styles.separator}></View>

        <View style={styles.contentButtonReturn}>
          <TouchableOpacity style={styles.buttonReturn} onPress={() => navigation.navigate('Login')}>
            <Text style={styles.buttonReturnText}> REGRESAR</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    </ScrollView>
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
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginVertical: 35
  },
  contentButtonReturn: {
    alignItems: 'center',
    marginBottom: 25,
  },
  buttonReturn: {
    width: '100%',
    height: 48,
    justifyContent: 'center',
    borderColor: '#2C4D9E',
    borderWidth: 1,
    borderRadius: 24,
  },
  buttonReturnText: {
    color: '#4d4d4d',
    textAlign: 'center'
  },
});
