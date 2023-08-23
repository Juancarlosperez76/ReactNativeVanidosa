import { Alert, Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import LoadingIndicator from '../components/LoadingIndicator';
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

  // ------------------------------------------Función modal "Seleccionar servicios"-------------------------------------------
  const ServiceOptions = [
    { label: 'Peluqueria', value: 'Peluqueria' },
    { label: 'Uñas', value: 'Uñas' },
    { label: 'Alisados', value: 'Alisados' },
    { label: 'Cejas / Pestañas', value: 'Cejas / Pestañas' },
    { label: 'Limpieza facial', value: 'Limpieza facial' },
    { label: 'Depilación', value: 'Depilación' },
    { label: 'Novia', value: 'Novia' },
    { label: 'Quinceañera', value: 'Quinceañera' },
  ];

  const [ServiceOptionsVisible, setServiceOptionsVisible] = useState(false);

  const handleOpenServiceOptions = () => {
    setServiceOptionsVisible(true);
  };

  const handleCloseServiceOptions = (_value: string) => {
    setServiceOptionsVisible(false);
  };

  // -------------------------------------Función selectores fecha y hora "DateTimePicker"-------------------------------------
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const [time, setTime] = useState(new Date());
  const [showTimePicker, setShowTimePicker] = useState(false);
  const onChangeTime = (event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || time;
    setShowTimePicker(false);
    setTime(currentTime);
  };
  // --------------------------------------------------------------------------------------------------------------------------

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
            </>
          ) : (<Text>No se encontró ningún usuario</Text>)}

          {/* ----------------------------------------Modal "Seleccionar servicios"---------------------------------------- */}
          <View style={styles.containeSeletcServices}>

            <TouchableOpacity onPress={handleOpenServiceOptions}>
              <View style={styles.containerIconLabel}>
                <Ionicons style={styles.iconServiceOptions} name="cut-sharp" />
                <Text style={styles.labelServiceOptions}>Seleccionar servicios</Text>
              </View>
            </TouchableOpacity>

            <View>
              <View style={styles.containerButtonsOpen}>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} >
                  <MaterialIcons style={styles.iconDateTime} name="calendar-month" size={28} color="#0054ad" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => setShowTimePicker(true)}  >
                  <MaterialIcons style={styles.iconDateTime} name="access-time" size={28} color="#0054ad" />
                </TouchableOpacity>
              </View>
            </View>

          </View>

          <Modal visible={ServiceOptionsVisible} animationType="fade" transparent>
            <View style={styles.containerServiceOptions}>
              <ScrollView>
                {ServiceOptions.map((option) => (
                  <TouchableOpacity style={styles.closeServiceOptions} key={option.value} onPress={() => handleCloseServiceOptions(option.value)}>
                    <Text style={styles.serviceOptionText}>{option.label}</Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>
          </Modal>

          {/* ----------------------------------Selectores fecha y hora "DateTimePicker"----------------------------------- */}
          {showDatePicker && (
            <DateTimePicker style={{ width: 400 }}
              testID="dateTimePicker"
              value={date}
              mode="date"
              display="calendar"
              onChange={onChangeDate}
            />
          )}

          {showTimePicker && (
            <DateTimePicker
              testID="dateTimePicker"
              value={time}
              mode="time"
              is24Hour={false}
              display="spinner"
              onChange={onChangeTime}
            />
          )}
          {/* ------------------------------------------------------------------------------------------------------------- */}

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
            title={'AGENDAR'}
          />

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
    flexDirection: 'row',
    alignItems: 'center',
    width: '46%',
    height: 48,
    backgroundColor: '#E6E6E6',
  },
  iconForm: {
    marginLeft: 6,
    marginRight: 4,
    color: '#000000',
    fontSize: 22,
  },
  label: {
    color: '#000000',
    fontSize: 14,
    letterSpacing: 0.5,
  },
  input: {
    width: '54%',
    height: 48,
    paddingLeft: 10,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 0.5,
    fontSize: 14,
  },
  // Estilos botón "Seleccionar sevicios"
  containeSeletcServices: {
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 16,
    backgroundColor: '#E6E6E6',
  },
  containerIconLabel: {
    flexDirection: 'row',
  },
  iconServiceOptions: {
    marginLeft: 6,
    marginRight: 4,
    color: '#000000',
    fontSize: 22,
  },
  labelServiceOptions: {
    fontSize: 14,
    color: '#000000',
    letterSpacing: 0.5,
  },
  // Estilos selectores fecha y hora "DateTimePicker"
  containerButtonsOpen: {
    flexDirection: 'row',
    marginRight: 8,
  },
  iconDateTime: {
    marginLeft: 6,
    padding: 4,
  },
  // Estilos modal "Seleccionar sevicios"
  containerServiceOptions: {
    backgroundColor: '#3F3F3F',
    marginHorizontal: 20,
    top: 439,
    height: 178,
  },
  closeServiceOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 15,
  },
  serviceOptionText: {
    width: '100%',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 0.5,
    fontWeight: '400',
  },
});
