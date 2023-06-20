import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { Image, SafeAreaView, ScrollView, StyleSheet, TextInput, View } from 'react-native';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import ButtonPrimary from '../components/ButtonPrimary';

type RootStackParamList = {
  Login: undefined;
  EditAccount: undefined;
  AccountHeader: undefined;
};
type EditAccountProps = NativeStackScreenProps<RootStackParamList, 'EditAccount'>;

const EditAccount = ({ navigation }: EditAccountProps) => {

  // ----------------------Estado de los "Inputs"----------------------
  const [nombre, setNombre] = useState('');
  const [apellidos, setApellidos] = useState('');
  const [tipoDocumento, setTipoDocumento] = useState('');
  const [documento, setDocumento] = useState('');
  const [direccion, setDireccion] = useState('');
  const [telefono, setTelefono] = useState('');
  const [email, setEmail] = useState('');
  // ------------------------------------------------------------------

  return (

    <>

      <CustomHeaderReturn title="Administrar cuenta" />

      <ScrollView style={styles.contentForm}>

        <View style={styles.contentLogoAccount}>
          <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
        </View>

        <SafeAreaView>

          <View>
            <Ionicons style={styles.iconForm} name='person-outline' />
            <TextInput
              style={styles.input}
              placeholder='Nombre'
              placeholderTextColor='#000000'
              onChangeText={setNombre}
              value={nombre}
              editable={false} // Bloquear el campo de texto
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='people-outline' />
            <TextInput
              style={styles.input}
              placeholder='Apellidos'
              placeholderTextColor='#000000'
              onChangeText={setApellidos}
              value={apellidos}
              editable={false} // Bloquear el campo de texto
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='card-outline' />
            <TextInput
              style={styles.input}
              placeholder='Tipo de documento'
              placeholderTextColor='#000000'
              onChangeText={setTipoDocumento}
              value={tipoDocumento}
              editable={false} // Bloquear el campo de texto
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='card-outline' />
            <TextInput
              style={styles.input}
              placeholder='Documento'
              placeholderTextColor='#000000'
              onChangeText={setDocumento}
              value={documento}
              keyboardType='numeric'
              editable={false} // Bloquear el campo de texto
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='home-outline' />
            <TextInput
              style={styles.input}
              placeholder='Dirección'
              placeholderTextColor='#000000'
              onChangeText={setDireccion}
              value={direccion}

            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='call-outline' />
            <TextInput
              style={styles.input}
              placeholder='Teléfono'
              placeholderTextColor='#000000'
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
              placeholderTextColor='#000000'
              onChangeText={setEmail}
              value={email}
              autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
              keyboardType='email-address'
              editable={false} // Bloquear el campo de texto
            />
          </View>

          <View style={{ marginTop: 30 }}>
            <ButtonSecondary
              onPress={() => navigation.navigate('AccountHeader')}
              title={'REGRESAR'}
              backgroundColor={'#00000000'}
              color={'#E00083'}
              borderRadius={0}
            />
          </View>

          <View style={styles.separator}></View>

          <View>
            <ButtonPrimary
              onPress={() => { }} // onPress vacío, sin funcionalidad
              title={'ELIMINAR CUENTA'}
              backgroundColor={'#5B009D'}
              color={'#ffffff'}
              borderRadius={0}
            />
          </View>

        </SafeAreaView>

      </ScrollView>

    </>

  );

};

export default EditAccount;

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
    color: '#000000',
    zIndex: 1,
  },
  contentIconFormRight: {
    position: 'absolute',
    top: 21,
    right: 8,
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