import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ButtonPrimary';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  _id: User | null;
  Nombre: string;
  Apellido: string;
  Documento: number;
};

type RootStackParamList = {
  AgendarCita: undefined;
  MisCitas: undefined;
};
type AgendarCitaProps = NativeStackScreenProps<RootStackParamList, 'AgendarCita'>;

const AgendarCita = ({ navigation }: AgendarCitaProps) => {

  const [user, setUser] = useState<User | null>(null);

  // -----------------------------------------------Indicador de carga "Preload"-----------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  // --------------------------------------------Mostrar datos de usuario logueado---------------------------------------------
  useEffect(() => {
    const fetchUserData = async () => {

      setIsLoading(true); // Activar el preload

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
            //navigation.navigate('StackAccount');
          }
        } else {
          Alert.alert('Error', 'Por favor inicie sesión para continuar.');
          // Aquí redirigimos al usuario a la pantalla de inicio de sesión
          //navigation.navigate('StackAccount');
        }

        setTimeout(() => { // Agregar tiempo de espera adicional después de cargar la pagina
          setIsLoading(false); // Cambiar isLoading a false después de obtener los datos
        }, 1000);

      } catch (error) {
        //console.error('Error al obtener los datos del usuario:', error);
      }
    };
    fetchUserData();
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------Lógica "Imput Select Modal" "Tipo de documento"--------------------------------------
  const tipoDocumentoOptions = [
    { label: 'Cédula de extranjería', value: 'Cédula de extranjería' },
    { label: 'Cédula de ciudadanía', value: 'Cédula de ciudadanía' },
    { label: 'Tarjeta de identidad', value: 'Tarjeta de identidad' },
    { label: 'édula de extranjería', value: 'édula de extranjería' },
    { label: 'édula de ciudadanía', value: 'édula de ciudadanía' },
    { label: 'arjeta de identidad', value: 'arjeta de identidad' },
  ];

  const [selectModalVisible, setSelectModalVisible] = useState(false);

  const handleOpenSelectModal = () => {
    setSelectModalVisible(true);
  };

  const handleSelectTipoDocumento = (_value: string) => {
    setSelectModalVisible(false);
  };

  return (

    <>
      <LoadingIndicator isLoading={isLoading} />
      <HeaderSettingsReturn navigation={navigation} title="Agendar cita" />
      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView style={styles.contentForm} keyboardShouldPersistTaps="always">

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
                  defaultValue={user.Nombre}
                  autoCapitalize="words" // Activa mayúscula inicial para cada palabra
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
                  defaultValue={user.Apellido}
                  autoCapitalize="words" // Activa mayúscula inicial para cada palabra
                  editable={false}
                />
              </View>

              <View style={styles.fieldContainer}>
                <View style={styles.iconLabelContainer}>
                  <Ionicons style={styles.iconForm} name='id-card-outline' />
                  <Text style={styles.label}>Documento:</Text>
                </View>
                <TextInput
                  style={styles.input}
                  defaultValue={user.Documento.toString()}
                  keyboardType='numeric'
                  editable={false}
                />
              </View>

              <TouchableOpacity style={styles.selectInputContainer} onPress={handleOpenSelectModal}>
                <Ionicons style={styles.selectIconForm} name="cut-outline" />
                <Text style={styles.selectInput}>Seleccionar servicios</Text>
              </TouchableOpacity>

              <Modal visible={selectModalVisible} animationType="fade" transparent>
                <View style={styles.selectModalContent}>
                  <ScrollView>
                    {tipoDocumentoOptions.map((option) => (
                      <TouchableOpacity key={option.value} style={styles.selectOption} onPress={() => handleSelectTipoDocumento(option.value)}>
                        <Text style={styles.selectOptionText}>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
              </Modal>

            </>
          ) : (
            <Text>No se encontró ningún usuario</Text>
          )}

          <View style={{ marginTop: 30 }}>
            <ButtonPrimary
              onPress={() => { }}
              width={'100%'}
              height={48}
              backgroundColor={'#5B009D'}
              borderRadius={0}
              color={'#ffffff'}
              fontSize={14}
              fontWeight={'500'}
              letterSpacing={0.8}
              title={'GUARDAR'}
            />
          </View>

          <View style={styles.separator}></View>

          <View style={{ marginBottom: 30 }}>
            <ButtonSecondary
              onPress={() => { }}
              width={'100%'}
              height={48}
              backgroundColor={'#00000000'}
              borderWidth={1}
              borderRadius={0}
              color={'#E00083'}
              fontSize={14}
              fontWeight={'600'}
              letterSpacing={0.8}
              title={'ELIMINAR CUENTA'}
            />
          </View>

        </SafeAreaView>
      </ScrollView>
    </>
  );
};

export default AgendarCita;

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
  // Estilos "Input Select" "Tipo de documento"
  selectInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    height: 48,
    backgroundColor: '#E6E6E6',
  },
  selectIconForm: {
    position: 'absolute',
    top: 13,
    left: 6,
    color: '#000000',
    fontSize: 22,
  },
  selectInput: {
    paddingLeft: 32,
    color: '#000000',
    letterSpacing: 0.5,
  },
  // Estilos "Modal" "Seleccione Tipo de documento"
  selectModalContent: {
    backgroundColor: '#ffffff',
    marginHorizontal: 20,
    top: 439,
    height: 178,
    shadowColor: '#3d3d3d',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    elevation: 4,
  },
  selectOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  selectOptionText: {
    color: '#000000',
    fontSize: 14,
    letterSpacing: 0.5,
    fontWeight: '400',
  },
  // ----------------------------------------------
  separator: {
    borderColor: '#d3d3d3',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
});
