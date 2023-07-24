import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Alert, Image, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import CustomHeaderSettings from '../components/CustomHeaderSettings';

type RootStackParamList = {
  StackAccount: undefined;
  EditAccount: undefined;
  AccountHeader: undefined;
};

type User = {
  Nombre: string;
  Apellido: string;
  Tipo_Documento: string;
  Documento: string;
  Direccion: string;
  Telefono: string;
  Correo: string;
  Contrasena: string;
};

type EditAccountProps = NativeStackScreenProps<RootStackParamList, 'EditAccount'>;

const EditAccount = ({ navigation }: EditAccountProps) => {
  const [user, setUser] = useState<User | null>(null);

  // Estados para campos editables
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [Tipo_Documento, setTipo_Documento] = useState('');
  const [Documento, setDocumento] = useState('');
  const [Direccion, setDireccion] = useState('');
  const [Telefono, setTelefono] = useState('');
  const [Correo, setCorreo] = useState('');
  const [Contrasena, setContrasena] = useState('');

  // -------------Lógica para mostrar los datos de usuario logueado-------------
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
            console.log('Datos del usuario obtenidos:', currentUser);
          } else {
            console.error('Usuario actual no encontrado en la lista de usuarios');
            // Aquí redirigimos al usuario a la pantalla de inicio de sesión
            navigation.navigate('StackAccount');
          }
        } else {
          Alert.alert('Error', 'Por favor inicie sesión para continuar.');
          // Aquí redirigimos al usuario a la pantalla de inicio de sesión
          navigation.navigate('StackAccount');
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };

    fetchUserData();
  }, []);

  // ---------------------------------------------------------------------------

  return (

    <>

      <CustomHeaderSettings navigation={navigation} title="Administrar cuenta" />

      <ScrollView style={styles.contentForm}>

        <View style={styles.contentLogoAccount}>
          <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
        </View>

        <SafeAreaView>

          {user ? (
            <>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='person-outline' />
                  <Text style={styles.label}>Nombre:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Nombre}
                  onChangeText={setNombre}
                  placeholder={user.Nombre}
                  placeholderTextColor={'#000000'}
                  editable={false}
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='people-outline' />
                  <Text style={styles.label}>Apellidos:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Apellido}
                  onChangeText={setApellido}
                  placeholder={user.Apellido}
                  placeholderTextColor={'#000000'}
                  editable={false}
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='card-outline' />
                  <Text style={styles.label}>Tipo documento:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Tipo_Documento}
                  onChangeText={setTipo_Documento}
                  placeholder={user.Tipo_Documento}
                  placeholderTextColor={'#000000'}
                  editable
                />
              </View>


              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='id-card-outline' />
                  <Text style={styles.label}>Documento:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Documento}
                  onChangeText={setDocumento}
                  placeholder={user.Documento.toString()}
                  placeholderTextColor={'#000000'}
                  editable={false}
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='home-outline' />
                  <Text style={styles.label}>Dirección:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Direccion}
                  onChangeText={setDireccion}
                  placeholder={user.Direccion}
                  placeholderTextColor={'#000000'}
                  editable
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='call-outline' />
                  <Text style={styles.label}>Teléfono:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Telefono}
                  onChangeText={setTelefono}
                  placeholder={user.Telefono.toString()}
                  placeholderTextColor={'#000000'}
                  editable
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='at-sharp' />
                  <Text style={styles.label}>Correo:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  value={Correo}
                  onChangeText={setCorreo}
                  placeholder={user.Correo}
                  placeholderTextColor={'#000000'}
                  editable
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='key-outline' />
                  <Text style={styles.label}>Contraseña:</Text>
                </View>
                <TextInput
                  style={{ ...styles.input, fontSize: 18, letterSpacing: 1 }}
                  value={Contrasena}
                  onChangeText={setContrasena}
                  placeholder='••••••••••'
                  placeholderTextColor={'#000000'}
                  secureTextEntry
                  editable={false}
                />
              </View>

            </>
          ) : (
            <Text>No se encontró ningún usuario</Text>
          )}

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

          <View style={{ marginBottom: 30 }}>
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
    paddingHorizontal: 20,

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
  fieldContainer: {
    display: 'flex',
    flexDirection: 'row',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  iconLabelContainer: {
    width: '46%',
    height: 48,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
  },
  iconForm: {
    fontSize: 20,
    paddingLeft: 6,
    paddingRight: 4,
    color: '#000000',
    zIndex: 1,
  },
  label: {
    color: '#000000',
    fontSize: 13,
    letterSpacing: 0.5,
  },
  input: {
    width: '54%',
    height: 48,
    paddingLeft: 10,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 0.5,
    fontSize: 13,
  },
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
});