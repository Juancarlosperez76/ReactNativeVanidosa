import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import AlertCancelAppointment from '../components/AlertCancelAppointment';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderLogoReturn from '../components/HeaderLogoReturn';
import LoadingIndicator from '../components/LoadingIndicator';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AlertWarning from '../components/AlertWarning';
import AlertSuccess from '../components/AlertSuccess';
import React, { useEffect, useState } from 'react';
import PagerView from 'react-native-pager-view';
import axios from 'axios';

type User = {
  _id: User | null;
  Nombre: string;
  Apellido: string;
  Documento: number;
  Correo: string;
};

type Servicio = {
  Nombre: string;
};

type Cita = {
  _id: Cita | null;
  Nombre: string;
  Apellidos: string;
  Servicios: Servicio[];
  Documento: number;
  FechaCita: string;
  HoraCita: string;
  Descripcion: string;
};

type RootStackParamList = {
  AgendarCita: undefined;
  MisCitas: undefined;
};
type MisCitasProps = NativeStackScreenProps<RootStackParamList, 'MisCitas'>;

const MisCitas = ({ navigation }: MisCitasProps) => {

  // -----------------------------------------------Indicador de carga "Preload"-----------------------------------------------
  const [isLoading, setIsLoading] = useState(true);
  // --------------------------------------------------------------------------------------------------------------------------

  // --------------------------------------------------Estado de los "Inputs"--------------------------------------------------
  const [user, setUser] = useState<User | null>(null);
  const [cita, setCita] = useState<Cita[]>([]);
  const [currentPage, setCurrentPage] = useState(0); // Estado de la página activa

  // --------------------------------------Función para formatear la Fecha "30-SEP-2023"---------------------------------------
  function formatDate(dateString: string | number | Date) {
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // --------------------------------------------Función para formatear "HoraCita"---------------------------------------------
  const formatHour = (time: string) => {
    try {
      const timeParts = time.split(':');
      const hours = parseInt(timeParts[0]);
      const minutes = parseInt(timeParts[1]);

      const AmPm = hours >= 12 ? 'PM' : 'AM';
      const twelveHours = hours % 12 || 12; // Convertir a formato de 12 horas

      const formattedHours = twelveHours.toString();
      const formattedMinutes = minutes.toString().padStart(2, '0');

      return `${formattedHours}:${formattedMinutes} ${AmPm}`;
    } catch (error) {
      console.error('Error al formatear la hora:', error);
      return "Hora inválida";
    }
  };

  // -------------------------------------------Mostrar "Citas" de usuario logueado--------------------------------------------
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

            // Obtiene todas las citas 
            const citasResponse = await axios.get('https://api-proyecto-5hms.onrender.com/api/cita', {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });

            // Filtra las citas de usuario logueado por "Documento" y "Estado"
            const filterAppointments = citasResponse.data.cita.filter((cita:
              { Documento: string; Estado: boolean }) => cita.Documento === currentUser.Documento && cita.Estado === true
            );

            setCita(filterAppointments);
            console.log('Citas del usuario obtenidas:', filterAppointments);
            setIsLoading(false); // Desactivar el preload
          } else {
            // Destruye la sesión y redirige al login
            await AsyncStorage.removeItem('userToken');
            await AsyncStorage.removeItem('userEmail');
          }
        } else {
          //setRequiredLoginVisible(true); // Mostrar alerta de "Inicio de sesión requerido"
        }
      } catch (error) {
        console.error('Error al obtener los datos del usuario:', error);
      }
    };
    fetchUserData();
  }, []);

  // -----------------------------------------------Función cancelar una "Cita"------------------------------------------------
  const disableAppointment = async (index: number) => {
    try {

      setIsLoading(true); // Activar el preload

      const apiUrl = `https://api-proyecto-5hms.onrender.com/api/cita`;

      // Obtiene la cita utilizando el índice
      const getAppointmentToCancel = cita[index];

      // Obtiene la Fecha y la Hora actuales
      const currentDate = new Date(); // Obtiene Fecha y Hora actuales
      const FechaActual = currentDate.toISOString().split('T')[0]; // Formatea Fecha actual
      const HoraActual = currentDate.toLocaleTimeString(); // Formatea Hora actual

      // Obtiene la Fecha y la Hora de la Cita
      const FechaCita = getAppointmentToCancel.FechaCita.split('T')[0]; // Formatea Fecha de la cita
      const HoraCita = getAppointmentToCancel.HoraCita; // Formatea Hora de la cita

      // Función para convertir una hora en formato HH:MM en minutos
      function timeToMinutes(timeString: string) {
        const [hours, minutes] = timeString.split(':');
        return parseInt(hours) * 60 + parseInt(minutes);
      }

      // Convertir la hora actual y la hora de la cita en minutos
      const minutosHoraActual = timeToMinutes(HoraActual);
      const minutosHoraCita = timeToMinutes(HoraCita);

      console.log('Fecha actual:', FechaActual);
      console.log('Hora actual:', HoraActual);
      console.log('Fecha de la cita:', FechaCita);
      console.log('Hora de la cita:', HoraCita);
      console.log('Hora actual en minutos:', minutosHoraActual);
      console.log('Hora de la cita en minutos:', minutosHoraCita);

      if ((FechaActual === FechaCita) && (minutosHoraCita - minutosHoraActual < 300)) {
        setCancellationDenied(true);
        return
      } else {
        console.log('Cita eliminada con exito');
      }

      const response = await fetch(apiUrl, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ _id: getAppointmentToCancel._id, Estado: false }), // Cambiar el estado a "false" para cancelar la cita
      });

      if (response.status === 200) {
        setCancelledAppointment(true); // Muestra alerta "Cita cancelada con éxito"
      } else {
        console.error('Error al cancelar la cita');
      }
    } catch (error) {
      console.error('Error al cancelar la cita:', error);
    }
  };

  // --------------------------------------------Función modal "Servicios de Cita"---------------------------------------------
  const [selectedCitaServices, setSelectedCitaServices] = useState<Servicio[]>([]);
  const [infoServices, setInfoServices] = useState(false);

  const showInfoServices = (services: Servicio[]) => {
    setSelectedCitaServices(services);
    setInfoServices(true);
  };

  const closeInfoServices = () => {
    setInfoServices(false);
  };

  // ------------------------------------------Función alerta "Cancelación denegada"-------------------------------------------
  const [cancellationDenied, setCancellationDenied] = useState(false);

  const closeCancellationDenied = () => {
    setCancellationDenied(false);
    navigation.navigate('MisCitas');
    setIsLoading(false); // Desctivar el preload
  };

  // --------------------------------------------Función alerta "Cancelar cita"------------------------------------------------
  const [cancelAppointment, setCancelAppointment] = useState(false);
  const [cancellationCitaIndex, setCancellationCitaIndex] = useState(-1);

  const showCancelAppointment = (index: number) => {
    setCancellationCitaIndex(index);
    setCancelAppointment(true);
  };

  const closeCancelAppointment = () => {
    setCancelAppointment(false);
  };

  const confirmCancelAppointment = () => {
    setCancelAppointment(false);
    if (cancellationCitaIndex >= 0) {
      disableAppointment(cancellationCitaIndex); // Llama a la función "disableAppointment" con el índice de la cita
    }
  };

  // ----------------------------------------Función alerta "Cita cancelada con éxito"-----------------------------------------
  const [cancelledAppointment, setCancelledAppointment] = useState(false);

  const closeCancelledAppointment = () => {
    setCancelledAppointment(false);
    navigation.replace('MisCitas'); // Refresca la vista "MisCitas" para actualizar las citas activas
  };

  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <View style={styles.generalContainer}>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderLogoReturn navigation={navigation} title="Mis citas" />

      <View style={styles.containerMain}>

        <View style={styles.contentMain}>

          <View style={styles.containerInfo}>
            <Text style={styles.nameText}> {user?.Nombre} {user?.Apellido}</Text>
            <Text style={styles.documentText}>{user?.Correo}</Text>
            <Text style={styles.documentText}>{user?.Documento}</Text>
          </View>

          <PagerView
            style={{ flex: 1 }}
            initialPage={0}
            onPageSelected={
              (event) => setCurrentPage(event.nativeEvent.position)
            }
          >

            {cita.length > 0 ? (cita.map((cita: Cita, index: number) => (

              <View style={styles.containerCita} key={index}>

                <View style={styles.containerTitleDate}>
                  <Text style={styles.titleDateMain}>Información de la cita</Text>
                  <TouchableOpacity style={styles.containerIconDelete} onPress={() => showCancelAppointment(index)}>
                    <MaterialCommunityIcons name="close-box" size={30} color={'#5B009D'} />
                  </TouchableOpacity>
                </View>

                <View style={styles.containerInput}>
                  <View style={styles.containerLabel}>
                    <MaterialIcons style={{ marginLeft: 6 }} name="calendar-month" size={22} color={'#000000'} />
                    <Text style={styles.label}> Fecha cita</Text>
                  </View>
                  <Text style={styles.input}>{formatDate(cita.FechaCita)}</Text>
                </View>

                <View style={styles.containerInput}>
                  <View style={styles.containerLabel}>
                    <MaterialIcons style={{ marginLeft: 6 }} name="access-time" size={22} color={'#000000'} />
                    <Text style={styles.label}> Hora cita</Text>
                  </View>
                  <Text style={styles.input}>{formatHour(cita.HoraCita)}</Text>
                </View>

                <View style={styles.containerInput}>
                  <View style={styles.containerLabel}>
                    <Ionicons style={{ marginLeft: 6, transform: [{ rotate: '300deg' }] }} name="cut-sharp" size={22} color={'#000000'} />
                    <Text style={styles.label}> Servicios</Text>
                  </View>
                  <TouchableOpacity style={styles.showServicesButton} onPress={() => showInfoServices(cita.Servicios)}>
                    <Text style={styles.showServicesText}>Ver servicios</Text>
                    <Ionicons style={styles.showServicesIcon} name="eye" size={22} color={'#5B009D'} />
                  </TouchableOpacity>
                </View>

                <Text style={[styles.titleDate, { marginTop: 5 }]}>Descripción</Text>

                <Text style={styles.inputDescription}>{cita.Descripcion}</Text>

              </View>

            ))
            ) : (
              <View style={styles.withoutAppointments}>
                <Text style={styles.withoutAppointmentsText}>NO TIENES CITAS{'\n'}AGENDADAS</Text>
              </View>
            )}

          </PagerView>

          {/* --------------------------------------Indicadores de páginación "Dots"--------------------------------------- */}
          <View style={styles.containerDots}>
            {cita.length > 0 && cita.map((_cita: Cita, index: number) => ( // Actualiza cantidad de "Dots" en función de cantidad de "Citas"
              <View key={index}
                style={[styles.dots, { backgroundColor: index === currentPage ? '#5B009D' : '#8f8f8f' }]}
              />
            ))}
          </View>

          {/* ------------------------------------------------------------------------------------------------------------- */}

          <View style={{ paddingHorizontal: '1%', }}>
            <ButtonSecondary
              onPress={() => navigation.navigate('AgendarCita')}
              width={'100%'}
              height={48}
              marginTop={0}
              marginBottom={10}
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
              title={'REGRESAR'}
            />
          </View>

        </View>

      </View>

      {/* --------------------------------------------Modal "Servicios de Cita"-------------------------------------------- */}
      <Modal visible={infoServices} transparent animationType="fade">
        <View style={styles.modalBackground}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Servicios de la cita</Text>
            {selectedCitaServices.map((service, index) => (
              <Text key={index} style={styles.serviceItem}>•  {service.Nombre}</Text>
            ))}
            <View style={styles.containerButton}>
              <TouchableOpacity style={styles.button} onPress={closeInfoServices}>
                <Text style={styles.buttonText}>SALIR</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* ----------------------------------------Alerta "Cancelación denegada"-------------------------------------------- */}
      <AlertWarning
        visible={cancellationDenied}
        onCloseWarning={closeCancellationDenied}
        title='Cancelación denegada'
        message='Sólo se permite cancelar una cita con 3 horas de anticipación.'
        buttonStyle={{ width: 70 }}
        buttonText='OK'
      />

      {/* --------------------------------------------Alerta "Cancelar cita"----------------------------------------------- */}
      <AlertCancelAppointment
        visible={cancelAppointment}
        onAlertCancelAppointment={confirmCancelAppointment}
        closeAlertCancelAppointment={closeCancelAppointment}
        title='¡Cancelar cita!'
        message='¿Esta segueo que desea cancelar la cita?'
        buttonConfirmStyle={{ width: 160 }}
        buttonConfirmText='Cancelar cita'
      />

      {/* ----------------------------------------Alerta "Cita cancelada con éxito"---------------------------------------- */}
      <AlertSuccess
        visible={cancelledAppointment}
        onCloseSuccess={closeCancelledAppointment}
        title='Cita cancelada'
        message='La cita se ha cancelado exitosamente.'
        buttonStyle={{ width: 70 }}
        buttonText='OK'
      />

      {/* ----------------------------------------------------------------------------------------------------------------- */}

    </View>
  );
};

export default MisCitas;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  containerMain: {
    flex: 1,
    justifyContent: 'center',
  },
  contentMain: {
    width: '88%',
    height: 570,
    marginHorizontal: '6%',
    backgroundColor: '#ffffff',
  },
  containerInfo: {
    marginHorizontal: '1%',
    marginBottom: 50,
  },
  nameText: {
    color: '#333333',
    textAlign: 'center',
    fontSize: 18,
    fontWeight: '500',
  },
  documentText: {
    color: '#6d6d6d',
    textAlign: 'center',
    fontSize: 14,
    fontWeight: '400',
  },
  containerCita: {
    paddingHorizontal: '1%',
  },
  containerTitleDate: {
    flexDirection: 'row',
    width: '100%',
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#5f5f5f',
    backgroundColor: '#E6E6E6',
  },
  titleDateMain: {
    fontFamily: 'Aspira W05 Demi',
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
  },
  titleDate: {
    fontFamily: 'Aspira W05 Demi',
    height: 45,
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    verticalAlign: 'middle',
    borderWidth: 1,
    borderColor: '#5f5f5f',
    backgroundColor: '#E6E6E6',
    letterSpacing: 0.3,
  },
  containerIconDelete: {
    position: 'absolute',
    right: 5,
    padding: 4,
  },
  containerInput: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#5f5f5f',
    marginTop: 5,
  },
  containerLabel: {
    flexDirection: 'row',
    width: '46%',
    alignItems: 'center',
    borderRightWidth: 1,
    borderColor: '#5f5f5f',
    backgroundColor: '#E6E6E6',
  },
  label: {
    fontFamily: 'Aspira W05 Medium',
    height: 45,
    fontSize: 15,
    color: '#000000',
    verticalAlign: 'middle',
    letterSpacing: 0.3,
  },
  showServicesButton: {
    flexDirection: 'row',
    width: '54%',
    justifyContent: 'center',
    alignItems: 'center'
  },
  showServicesText: {
    paddingRight: 10,
    color: '#000000',
    verticalAlign: 'middle'
  },
  showServicesIcon: {
    marginTop: 2,
    marginRight: 10
  },
  // Estilos del modal "Servicios"
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#7e7e7e70',
  },
  modalContent: {
    width: '70%',
    paddingHorizontal: 30,
    backgroundColor: '#3F3F3F',
    borderRadius: 8,
  },
  title: {
    fontFamily: 'Aspira W05 Demi',
    marginVertical: 20,
    fontSize: 20,
    color: '#f0f0f0',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  serviceItem: {
    fontSize: 16,
    marginVertical: 8,
    color: '#f0f0f0',
  },
  containerButton: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  button: {
    backgroundColor: '#7066e0',
    borderColor: '#b2abff',
    borderWidth: 3,
  },
  buttonText: {
    fontFamily: 'Montserrat Medium',
    height: 34,
    paddingHorizontal: 18,
    fontSize: 16,
    color: 'white',
    verticalAlign: 'middle',
    letterSpacing: 0.3,
  },
  // Estilos del modal "Servicios" Fin
  input: {
    fontFamily: 'Aspira W05 Medium',
    width: '54%',
    height: 45,
    paddingRight: 15,
    fontSize: 15,
    color: '#000000',
    textAlign: 'right',
    verticalAlign: 'middle',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  inputDescription: {
    fontFamily: 'Aspira W05 Medium',
    height: 94,
    paddingVertical: 5,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#000000',
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: '#5f5f5f',
    letterSpacing: 0.3,
  },
  withoutAppointments: {
    marginBottom: 30
  },
  withoutAppointmentsText: {
    fontFamily: 'Aspira W05 Medium',
    height: 350,
    fontSize: 20,
    color: '#7c7c7c',
    verticalAlign: 'middle',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  // Estilos indicador de paginación "Dots (Puntos)"
  containerDots: {
    flexDirection: 'row',
    marginBottom: 25,
    justifyContent: 'center',
  },
  dots: {
    width: 10,
    height: 10,
    marginHorizontal: 5,
    borderRadius: 5,
  },
});


