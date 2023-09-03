import { Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import LoadingIndicator from '../components/LoadingIndicator';
import HeaderLogoReturn from '../components/HeaderLogoReturn';
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
  StackAccount: undefined;
};
type AgendarCitaProps = NativeStackScreenProps<RootStackParamList, 'AgendarCita'>;

const AgendarCita = ({ navigation }: AgendarCitaProps) => {

  const [user, setUser] = useState<User | null>(null);

  // -----------------------------------------------Indicador de carga "Preload"-----------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);

  // --------------------------------------------Mostrar datos de usuario logueado---------------------------------------------
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
          }
        } else {
          //setRequiredLoginVisible(true); // Mostrar alerta de "Inicio de sesión requerido"
        }

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

    <View style={styles.generalContainer}>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderLogoReturn navigation={navigation} title="Agendar cita" />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">

        <View style={styles.contentMain}>

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
                    <MaterialIcons style={styles.iconDateTime} name="calendar-month" size={24} color="#585858" />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => setShowTimePicker(true)}  >
                    <MaterialIcons style={styles.iconDateTime} name="access-time" size={24} color="#585858" />
                  </TouchableOpacity>
                </View>
              </View>
            </View>

            <Modal visible={ServiceOptionsVisible} animationType="fade" transparent>
              <View style={styles.containerServiceOptions}>
                <View style={styles.contentServiceOptions}>
                  <ScrollView>
                    {ServiceOptions.map((option) => (
                      <TouchableOpacity style={styles.closeServiceOptions} key={option.value} onPress={() => handleCloseServiceOptions(option.value)}>
                        <Text style={styles.serviceOptionText}>{option.label}</Text>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>
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

            <View style={styles.contentselectedProducts}>
              <Text style={styles.titleSelectedProducts}>Servicios seleccionados</Text>
            </View>


            <View style={styles.containerServicesTitle}>
              <View style={styles.containerIdTitle}>
                <Text style={styles.idTitle}>N&#8304;</Text>
              </View>
              <View style={styles.containerServiceTitle}>
                <Text style={styles.serviceTitle}>Servicio</Text>
              </View>
            </View>

            <View style={styles.containerServicesText}>
              <View style={styles.containerIdText}>
                <Text style={styles.idText}>1</Text>
              </View>
              <View style={styles.containerServiceText}>
                <Text style={styles.serviceText}>Corte de cabello</Text>
              </View>
              <TouchableOpacity style={styles.containerServiceIcon} onPress={handleOpenServiceOptions}>
                <Ionicons style={styles.serviceIcon} name="trash-outline" />
              </TouchableOpacity>
            </View>

            <ButtonPrimary
              onPress={() => { }}
              width={'100%'}
              height={48}
              marginTop={15}
              marginBottom={0}
              backgroundColor={'#5B009D'}
              borderRadius={0}
              fontFamily={'Aspira W05 Demi'}
              color={'#ffffff'}
              fontSize={15}
              fontWeight={undefined}
              letterSpacing={0.3}
              title={'AGENDAR'}
            />

            <ButtonSecondary
              onPress={() => navigation.navigate('MisCitas')}
              width={'100%'}
              height={48}
              marginTop={20}
              marginBottom={0}
              backgroundColor={'#00000000'}
              borderColor={'#E00083'}
              borderWidth={2}
              borderRadius={0}
              borderTopLeftRadius={0}
              borderTopRightRadius={0}
              borderBottomRightRadius={0}
              borderBottomLeftRadius={0}
              fontFamily={'Aspira W05 Demi'}
              color={'#29344A'}
              fontSize={15}
              fontWeight={undefined}
              letterSpacing={0.3}
              title={'CITAS AGENDADAS'}
            />

          </SafeAreaView>
        </View>
      </ScrollView>
    </View>
  );
};

export default AgendarCita;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  contentMain: {
    width: '86%',
    marginTop: 30,
    marginHorizontal: '7%',
    backgroundColor: '#ffffff',
  },
  contentLogoAccount: {
    marginVertical: 40,
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
    fontSize: 22,
    color: '#000000',
  },
  label: {
    fontSize: 14,
    color: '#000000',
    letterSpacing: 0.5,
  },
  input: {
    width: '54%',
    height: 48,
    paddingLeft: 10,
    fontSize: 14,
    color: '#000000',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  // Estilos botón "Seleccionar sevicios"
  containeSeletcServices: {
    flexDirection: 'row',
    height: 48,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 30,
    backgroundColor: '#E6E6E6',
  },
  containerIconLabel: {
    flexDirection: 'row',
  },
  iconServiceOptions: {
    marginLeft: 6,
    marginRight: 4,
    fontSize: 22,
    color: '#000000',
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
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  contentServiceOptions: {
    width: '70%',
    height: 300,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    paddingVertical: 15,
  },
  closeServiceOptions: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  serviceOptionText: {
    fontFamily: 'Aspira W05 Medium',
    width: '100%',
    fontSize: 15,
    color: '#000000',
    textAlign: 'center',
    letterSpacing: 0.5,
    fontWeight: '400',
  },
  contentselectedProducts: {

  },
  titleSelectedProducts: {
    fontFamily: 'Aspira W05 Demi',
    marginBottom: 10,
    fontSize: 20,
    color: '#585858',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  containerServicesTitle: {
    flexDirection: 'row',
    backgroundColor: '#E6E6E6',
  },
  containerIdTitle: {
    width: '12%',
    height: 48,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#ffffff',
  },
  idTitle: {
    fontFamily: 'Aspira W05 Demi',
    fontSize: 16,
    color: '#585858',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  containerServiceTitle: {
    width: '88%',
    height: 48,
    justifyContent: 'center',
  },
  serviceTitle: {
    fontFamily: 'Aspira W05 Demi',
    fontSize: 16,
    color: '#585858',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  containerServicesText: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#E6E6E6',
  },
  containerIdText: {
    width: '12%',
    height: 48,
    justifyContent: 'center',
    borderRightWidth: 1,
    borderColor: '#E6E6E6',
  },
  idText: {
    fontFamily: 'Aspira W05 Medium',
    fontSize: 15,
    color: '#585858',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  containerServiceText: {
    width: '76%',
    height: 48,
    justifyContent: 'center',
  },
  serviceText: {
    fontFamily: 'Aspira W05 Medium',
    paddingLeft: 10,
    fontSize: 15,
    color: '#585858',
    letterSpacing: 0.3,
  },
  containerServiceIcon: {
    width: '12%',
    height: 48,
    justifyContent: 'center',
  },
  serviceIcon: {
    fontSize: 23,
    color: '#585858',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
});
