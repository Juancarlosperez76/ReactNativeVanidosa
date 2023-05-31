import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import GeneralButton from '../components/GeneralButton';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
  // otras rutas de tu aplicación
};
type RegistroProps = NativeStackScreenProps<RootStackParamList, 'Registro'>;

const Registro = ({ navigation }: RegistroProps) => {

  // Estado de los "Inputs"
  const [nombre, setNombre] = React.useState('');
  const [apellidos, setApellidos] = React.useState('');
  const [tipoDocumento, setTipoDocumento] = React.useState('');
  const [documento, setDocumento] = React.useState('');
  const [direccion, setDireccion] = React.useState('');
  const [telefono, setTelefono] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setContrasena] = React.useState('');
  const [confirmarPassword, setConfirmarContrasena] = React.useState('');

  function alert(_arg0: string) {
    throw new Error('Function not implemented.');
  }

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
      <SafeAreaView>
        <View style={styles.contentLogoAccount}>
          <Image style={styles.logoAccount} source={require('../../android/assets/img/logo-full-136-84.png')} />
        </View>
        <View>
          <Ionicons style={styles.iconForm} name='person-outline' />
          <TextInput
            style={styles.input}
            placeholder='Nombre'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setNombre}
            value={nombre}
          />
        </View>
        <View>
          <Ionicons style={styles.iconForm} name='people-outline' />
          <TextInput
            style={styles.input}
            placeholder='Apellidos'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setApellidos}
            value={apellidos}
          />
        </View>
        <View>
          <Ionicons style={styles.iconForm} name='card-outline' />
          <TextInput
            style={styles.input}
            placeholder='Tipo de documento'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setTipoDocumento}
            value={tipoDocumento}
          />
        </View>
        <View>
          <Ionicons style={styles.iconForm} name='card-outline' />
          <TextInput
            style={styles.input}
            placeholder='Documento'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setDocumento}
            value={documento}
            keyboardType='numeric'
          />
        </View>
        <View>
          <Ionicons style={styles.iconForm} name='home-outline' />
          <TextInput
            style={styles.input}
            placeholder='Dirección'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setDireccion}
            value={direccion}
          />
        </View>
        <View>
          <Ionicons style={styles.iconForm} name='call-outline' />
          <TextInput
            style={styles.input}
            placeholder='Teléfono'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setTelefono}
            value={telefono}
            keyboardType='numeric'
          />
        </View>
        <View>
          <Ionicons style={styles.iconForm} name='at-sharp' />
          <TextInput
            style={styles.input}
            placeholder='E-mail'
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
            placeholder='Contraseña'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setContrasena}
            value={password}
            autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
            secureTextEntry={!showPassword1} // Oculta y muestra carácteres de contraseña
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
            placeholder='Confirmar contraseña'
            placeholderTextColor='#7e7e7e'
            // textAlignVertical='bottom'
            onChangeText={setConfirmarContrasena}
            value={confirmarPassword}
            autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
            secureTextEntry={!showPassword2} // Oculta y muestra carácteres de contraseña
          />
          {confirmarPassword !== '' && ( // Código cambio de icono de la contraseña
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
            backgroundColor='#005c99'
            borderRadius={24}
            title='CREAR CUENTA'
            color='#ffffff'
            fontSize={14}
          />
        </View>

        <View style={{ flexDirection: 'row', marginTop: 10, marginBottom: 25, justifyContent: 'center' }}>
          <Text
            style={{ color: '#494949' }}>¿Ya tienes cuenta?
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Login')}>
            <Text
              style={{ color: '#005c99' }}> Inicia sesión
            </Text>
          </TouchableOpacity>
        </View>

      </SafeAreaView>
    </ScrollView>
  );
};

export default Registro;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentForm: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
  },
  contentLogoAccount: {
    marginVertical: 20,
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
    fontSize: 22,
    color: '#4e4e4e',
  },
  input: {
    height: 48,
    marginVertical: 8,
    paddingLeft: 32,
    borderWidth: 1,
    borderColor: '#d3d3d3',
    color: '#7e7e7e',
  }
});
