import { Modal, Pressable, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import LoadingIndicator from '../components/LoadingIndicator';
import HeaderLogoReturn from '../components/HeaderLogoReturn';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ButtonPrimary from '../components/ButtonPrimary';
import AlertFailure from '../components/AlertFailure';
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
  //   }, 800); // Tiempo de carga simulado (en milisegundos)
  // }, []);

  // --------------------------------------------------Estado de los "Inputs"--------------------------------------------------
  const [Documento, setDocumento] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Apellido, setApellido] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [FechaCita, setFechaCita] = useState(new Date());
  const [HoraCita, setHoraCita] = useState(new Date());
  const [Descripcion, setDescripcion] = useState('');

  // --------------------------------------------Función alerta "Cuenta eliminada"---------------------------------------------
  const [deletedAccountVisible, setDeletedAccountVisible] = useState(false); // Estado de modal "AlertFailure"

  const handleCloseDeletedAccount = () => {
    setDeletedAccountVisible(false);
    navigation.navigate('StackAccount'); // Redireccionar a "StackAccount"
  };

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

            // Inicializa estado de campos editables, con valores del usuario logueado, "Cambia estado de vacío a lleno"
            setNombre(currentUser.Nombre);
            setApellido(currentUser.Apellido);
            setDocumento(currentUser.Documento);

            setIsLoading(false); // Desactivar el preload
          } else {
            setDeletedAccountVisible(true);
            // Destruye la sesión y redirige al login
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userEmail');
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

  const handleCloseServiceOptions = (value: string) => {
    setSelectedServices((prevSelectedServices) => [...prevSelectedServices, value]);
    setServiceOptionsVisible(false);
  };

  // Función para cerrar "Modal" al hacer clic fuera de él
  const handleCloseServiceOptionsOutside = () => {
    setServiceOptionsVisible(false);
  };

  // Función para remover servicios almacenados
  const handleRemoveService = (index: number) => {
    const updatedServices = [...selectedServices];
    updatedServices.splice(index, 1);
    setSelectedServices(updatedServices);
  };

  // -------------------------------------Función selectores fecha y hora "DateTimePicker"-------------------------------------
  const [showDatePicker, setShowDatePicker] = useState(false);

  const onChangeDate = (_event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || FechaCita;
    setShowDatePicker(false);
    setFechaCita(currentDate);
  };

  const [showTimePicker, setShowTimePicker] = useState(false);

  const onChangeTime = (_event: any, selectedTime: Date | undefined) => {
    const currentTime = selectedTime || HoraCita;
    setShowTimePicker(false);
    setHoraCita(currentTime);
  };

  // ---------------------------------Funciones para formatear "Fecha y Hora" "DateTimePicker"---------------------------------

  // Función para formatear la "Fecha"
  const formatDate = (date: Date) => {
    const day = date.getDate().toString().padStart(2, '0');
    const monthNames = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  // Función para formatear la "Hora"
  const formatTimeAmOrPm = (time: Date) => {
    const hours = time.getHours();
    const minutes = time.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convertir a formato de 12 horas
    return `${formattedHours}:${minutes} ${ampm}`;
  };

  // ---------------------------------------------------Función crear "Cita"---------------------------------------------------
  const crearCita = async () => {

    // Función para calcular FinCita
    const duracionServicioIndividual = 30; // Duración de un servicio individual en minutos
    const calcularFinCita = () => {
      const horaCitaDate = new Date(HoraCita);
      const duracionTotalServicios = selectedServices.length * duracionServicioIndividual;
      const horaFin = new Date(horaCitaDate.getTime() + duracionTotalServicios * 60000);
      console.log('Hora de inicio:', horaCitaDate);
      console.log('Duración total en minutos:', duracionTotalServicios);
      console.log('Hora de finalización calculada:', horaFin);
      const horaFinFormateada = `${horaFin.getHours()}:${horaFin.getMinutes()}`;
      return horaFinFormateada;
    };
    const finCita = calcularFinCita();

    // Validar que los campos requeridos no estén vacíos
    if (!Documento || !Nombre || !Apellido || !selectedServices || !FechaCita || !HoraCita || !finCita || !Descripcion) {
      console.error('Todos los campos son obligatorios');
      return;
    } else {
      console.log('Servicios seleccionados:', selectedServices);
    }

    // Crea objeto "Servicios" a partir de "selectedServices"
    const Servicios = selectedServices.map((selectedServices) => ({
      Nombre: selectedServices,
    }));

    const nuevaCita = {
      Documento: Documento,
      Nombre: Nombre,
      Apellidos: Apellido,
      Servicios: Servicios,
      FechaCita: FechaCita,
      HoraCita: HoraCita,
      Fincita: finCita,
      Descripcion: Descripcion,
    }

    try {
      const token = await AsyncStorage.getItem('userToken');

      const response = await axios.post(`https://api-proyecto-5hms.onrender.com/api/cita`, nuevaCita, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) { // Verificar que la respuesta del servidor sea exitosa
        navigation.navigate('MisCitas');
      } else {
        console.log('Error al crear la cita:', response.data)
      }
    } catch (error) {
      console.log('Error al crear la cita:', error);
    }
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
                  <Text style={styles.input}>{user.Nombre}</Text>
                </View>

                <View style={styles.fieldContainer}>
                  <View style={styles.iconLabelContainer}>
                    <Ionicons style={styles.iconForm} name='people-outline' />
                    <Text style={styles.label}>Apellidos:</Text>
                  </View>
                  <Text style={styles.input}>{user.Apellido}</Text>
                </View>

                <View style={styles.fieldContainer}>
                  <View style={styles.iconLabelContainer}>
                    <Ionicons style={styles.iconForm} name='id-card-outline' />
                    <Text style={styles.label}>Documento:</Text>
                  </View>
                  <Text style={styles.input}>{user.Documento}</Text>
                </View>
              </>
            ) : (<Text>No se encontró ningún usuario</Text>)}

            {/* ----------------------------------------Modal "Seleccionar servicios"---------------------------------------- */}
            <Modal
              visible={ServiceOptionsVisible}
              animationType="fade"
              transparent
            >

              <Pressable
                style={styles.containerServiceOptions}
                onPress={handleCloseServiceOptionsOutside} // Cerrar "Modal" al hacer clic fuera de él 
              >

                <View style={styles.contentServiceOptions}>
                  <Text style={styles.titleSelectService}>Seleccione servicio</Text>
                  <ScrollView>
                    {ServiceOptions.map((option) => (
                      <TouchableOpacity
                        style={styles.selectServiceOptions}
                        key={option.value}
                        onPress={() => handleCloseServiceOptions(option.value)}
                      >
                        <View style={styles.containerRadioButton}>
                          <Text style={styles.serviceOptionText}>{option.label}</Text>
                          <MaterialIcons style={styles.radioButton} name="radio-button-unchecked" />
                        </View>
                      </TouchableOpacity>
                    ))}
                  </ScrollView>
                </View>

              </Pressable>

            </Modal>

            {/* ----------------------------------------Modal fecha "DateTimePicker"----------------------------------------- */}
            {showDatePicker && (
              <DateTimePicker style={{ width: 400 }}
                testID="dateTimePicker"
                value={FechaCita}
                mode="date"
                display="calendar"
                onChange={onChangeDate}
              />
            )}

            {/* -----------------------------------------Modal hora "DateTimePicker"----------------------------------------- */}
            {showTimePicker && (
              <DateTimePicker
                testID="dateTimePicker"
                value={HoraCita}
                mode="time"
                is24Hour={false}
                display="clock"
                onChange={onChangeTime}
              />
            )}

            {/* --------------------Selector modal "Seleccionar servicios" y fecha y hora "DateTimePicker"------------------- */}
            <TouchableOpacity style={styles.containeSeletcServices} onPress={handleOpenServiceOptions}>
              <View style={styles.containerIconLabel}>
                <Ionicons style={[styles.iconServiceOptions, { transform: [{ rotate: '300deg' }] }]} name="cut-sharp" />
                <Text style={styles.labelServiceOptions}>Seleccionar servicios</Text>
              </View>
            </TouchableOpacity>

            {/* ------------------------------------------------------------------------------------------------------------- */}

            <View style={styles.containerDateTime}>
              <View style={[styles.containerTitleDateTime, { width: '42%' }]}>
                <Text style={styles.titleDateTime}>Fecha servicio</Text>
              </View>
              <View style={[styles.containerTextDateTime, { width: '58%' }]}>
                <Text style={styles.textDateTime}>{formatDate(FechaCita)}</Text>
                <TouchableOpacity onPress={() => setShowDatePicker(true)} >
                  <MaterialIcons style={styles.iconDateTime} name="calendar-month" size={28} color="#5B009D" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.containerDateTime}>
              <View style={[styles.containerTitleDateTime, { width: '42%' }]}>
                <Text style={styles.titleDateTime}>Hora servicio</Text>
              </View>
              <View style={[styles.containerTextDateTime, { width: '58%' }]}>
                <Text style={styles.textDateTime}>{formatTimeAmOrPm(HoraCita)}</Text>
                <TouchableOpacity onPress={() => setShowTimePicker(true)}  >
                  <MaterialIcons style={styles.iconDateTime} name="access-time" size={28} color="#5B009D" />
                </TouchableOpacity>
              </View>
            </View>

            <View style={styles.containerServicesTitle}>
              <View style={[styles.containerTitle, { width: '13%', borderRightWidth: 1, borderColor: '#5f5f5f', }]}>
                <Text style={styles.title}>Id</Text>
              </View>
              <View style={[styles.containerTitle, { width: '87%', }]}>
                <Text style={styles.title}>Servicio seleccionado</Text>
              </View>
            </View>

            {selectedServices.map((service, index) => (
              <View style={styles.containerServicesText} key={index}>
                <View style={[styles.containerText, { width: '13%', borderRightWidth: 1, borderColor: '#3F3F3F', }]}>
                  <Text style={[styles.itemText, { textAlign: 'center', }]}>{index + 1}</Text>
                </View>
                <View style={[styles.containerText, { width: '75%', }]}>
                  <Text style={[styles.itemText, { paddingLeft: 10, }]}>{service}</Text>
                </View>
                <TouchableOpacity
                  style={styles.containerServiceIcon}
                  onPress={() => handleRemoveService(index)}
                >
                  <Ionicons style={styles.serviceIcon} name="trash-outline" />
                </TouchableOpacity>
              </View>
            ))}

            <View style={styles.containerServicesTitle}>
              <View style={[styles.containerTitle, { width: '100%', }]}>
                <Text style={styles.title}>Descripción</Text>
              </View>
            </View>

            <View style={styles.containerDescription}>
              <TextInput
                style={styles.inputDescription}
                onChangeText={setDescripcion}
                value={Descripcion}
                multiline // Permite múltiples líneas
                keyboardType='default'
              />
            </View>

            <ButtonPrimary
              onPress={crearCita}
              width={'100%'}
              height={45}
              marginTop={24}
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
              height={45}
              marginTop={15}
              marginBottom={30}
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
              title={'MIS CITAS'}
            />

          </SafeAreaView>

          {/* ----------------------------------------Alerta "Cuenta eliminada"---------------------------------------- */}
          <AlertFailure
            visible={deletedAccountVisible}
            onCloseFailure={handleCloseDeletedAccount}
            title='Usuario no encontrado.'
            message={`No pudimos encontrar la cuenta.\nContacte al administrador.`}
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* --------------------------------------------------------------------------------------------------------- */}

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
    marginTop: 24,
    marginHorizontal: '7%',
    backgroundColor: '#ffffff',
  },
  fieldContainer: {
    flexDirection: 'row',
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#5f5f5f',
  },
  iconLabelContainer: {
    flexDirection: 'row',
    width: '46%',
    height: 45,
    alignItems: 'center',
    backgroundColor: '#E6E6E6',
  },
  iconForm: {
    marginLeft: 6,
    marginRight: 4,
    fontSize: 22,
    color: '#000000',
  },
  label: {
    fontFamily: 'Aspira W05 Medium',
    fontSize: 15,
    color: '#000000',
    letterSpacing: 0.3,
  },
  input: {
    fontFamily: 'Aspira W05 Medium',
    width: '54%',
    height: 45,
    paddingLeft: 10,
    fontSize: 15,
    color: '#000000',
    verticalAlign: 'middle',
    fontWeight: '400',
    borderLeftWidth: 1,
    borderColor: '#5f5f5f',
    letterSpacing: 0.3,
  },
  // Estilos botón "Seleccionar sevicios"
  containeSeletcServices: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 45,
    marginTop: 24,
    backgroundColor: '#E6E6E6',
    borderWidth: 1,
    borderColor: '#5f5f5f',
  },
  containerIconLabel: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconServiceOptions: {
    marginLeft: 8,
    marginRight: 3,
    fontSize: 26,
    color: '#5B009D',
  },
  labelServiceOptions: {
    fontFamily: 'Aspira W05 Demi',
    fontSize: 16,
    color: '#000000',
    letterSpacing: 0.3,
  },
  // Estilos modal "Seleccionar sevicios"
  containerServiceOptions: {
    flex: 1,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff80',
  },
  contentServiceOptions: {
    width: '75%',
    height: 296,
    backgroundColor: '#3F3F3F',
    borderRadius: 8,
  },
  titleSelectService: {
    fontFamily: 'Aspira W05 Medium',
    paddingVertical: 18,
    fontSize: 18,
    color: '#f0f0f0',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  selectServiceOptions: {
    paddingVertical: 18,
    borderTopWidth: 1,
    borderColor: '#7A7A7A',
  },
  containerRadioButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 25,
    width: '100%',
  },
  serviceOptionText: {
    fontFamily: 'Aspira W05 Medium',
    fontSize: 16,
    color: '#f0f0f0',
    letterSpacing: 0.3,
  },
  radioButton: {
    color: '#f0f0f0',
    fontSize: 20
  },
  // Estilos modal "Seleccionar sevicios" Fin
  containerDateTime: {
    flexDirection: 'row',
    marginTop: 6,
    borderWidth: 1,
    borderColor: '#5f5f5f',
  },
  containerTitleDateTime: {
    justifyContent: 'center',
    height: 45,
    backgroundColor: '#E6E6E6',
  },
  titleDateTime: {
    fontFamily: 'Aspira W05 Medium',
    fontSize: 15,
    color: '#000000',
    paddingLeft: 10,
    letterSpacing: 0.3,
  },
  containerTextDateTime: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 45,
    borderLeftWidth: 1,
    borderColor: '#5f5f5f',
  },
  textDateTime: {
    fontFamily: 'Aspira W05 Medium',
    paddingLeft: 10,
    fontSize: 15,
    color: '#000000',
    letterSpacing: 0.3,
  },
  // Estilos selectores fecha y hora "DateTimePicker"
  iconDateTime: {
    paddingRight: 10,
  },
  containerServicesTitle: {
    flexDirection: 'row',
    marginTop: 6,
    backgroundColor: '#E6E6E6',
    borderWidth: 1,
    borderColor: '#5f5f5f',
  },
  containerTitle: {
    height: 45,
    justifyContent: 'center',
  },
  title: {
    fontFamily: 'Aspira W05 Demi',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  containerServicesText: {
    flexDirection: 'row',
    borderWidth: 1,
    borderTopWidth: 0,
    borderColor: '#5f5f5f',
  },
  containerText: {
    height: 45,
    justifyContent: 'center',
  },
  itemText: {
    fontFamily: 'Aspira W05 Medium',
    fontSize: 15,
    color: '#000000',
    letterSpacing: 0.3,
  },
  containerServiceIcon: {
    width: '12%',
    height: 45,
    justifyContent: 'center',
  },
  serviceIcon: {
    fontSize: 22,
    color: '#585858',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  containerDescription: {
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: '#5f5f5f',
  },
  inputDescription: {
    fontFamily: 'Aspira W05 Medium',
    minHeight: 45,
    maxHeight: 100,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#000000',
    letterSpacing: 0.3,
  },
});
