import { Modal, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderLogoReturn from '../components/HeaderLogoReturn';
import LoadingIndicator from '../components/LoadingIndicator';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import axios from 'axios';

type User = {
  _id: User | null;
  Nombre: string;
  Apellido: string;
  Documento: number;
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

  // useEffect(() => {
  //   setTimeout(() => {
  //     setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
  //   }, 800); // Tiempo de carga simulado (en milisegundos)
  // }, []);


  // --------------------------------------------------Estado de los "Inputs"--------------------------------------------------
  const [user, setUser] = useState<User | null>(null);
  const [cita, setCita] = useState<Cita[]>([]);

  // --------------------------------------Función para formatear la Fecha "30-SEP-2023"---------------------------------------
  function formatDate(dateString: string | number | Date) {
    const months = ['ENE', 'FEB', 'MAR', 'ABR', 'MAY', 'JUN', 'JUL', 'AGO', 'SEP', 'OCT', 'NOV', 'DIC'];
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, '0');
    const month = months[date.getMonth()];
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  }

  // ----------------------------------------Función para formatear la Hora "10:30 AM"-----------------------------------------
  const formatHour = (hora: string | number | Date) => {
    const date = new Date(hora);
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    const formattedHours = hours % 12 || 12; // Convierte las 00:00 a 12:00 AM
    const formattedMinutes = minutes.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes} ${ampm}`;
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

            // Obténemos las citas del usuario actual
            const citasResponse = await axios.get('https://api-proyecto-5hms.onrender.com/api/cita', {
              params: {
                Documento: currentUser.Documento, // Usar el Documento del usuario
              },
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            setCita(citasResponse.data.cita);
            console.log('Citas del usuario obtenidas:', citasResponse.data);
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

  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <View style={styles.generalContainer}>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderLogoReturn navigation={navigation} title="Mis citas" />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">

        <View style={styles.contentMain}>

          <View style={styles.containerInfo}>
            <Text style={styles.nameText}> {user?.Nombre} {user?.Apellido}</Text>
            <Text style={styles.documentText}>{user?.Documento}</Text>
          </View>

          {cita.length > 0 ? (cita.map((cita: Cita, _index: number) => (

            <View style={styles.containerCita} key={_index}>

              <View style={styles.containerTitleDate}>
                <Text style={styles.titleDateMain}>Información de la cita</Text>
                <TouchableOpacity style={styles.containerIconDelete}>
                  <Ionicons name="trash-outline" size={26} color={'#5B009D'} />
                </TouchableOpacity>
              </View>

              <View style={styles.containerInput}>
                <View style={styles.containerLabel}>
                  <MaterialIcons style={{ marginLeft: 6 }} name="calendar-month" size={22} color={'#000000'} />
                  <Text style={styles.label}> Fecha cita</Text>
                </View>
                <Text style={styles.input}>
                  <Text style={styles.input}>{formatDate(cita.FechaCita)}</Text>
                </Text>
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
                <TouchableOpacity
                  style={{ flexDirection: 'row', width: '54%', justifyContent: 'center', alignItems: 'center' }}
                  onPress={() => showInfoServices(cita.Servicios)}
                >
                  <Text style={{ paddingRight: 10, color: '#000000', verticalAlign: 'middle' }}>Ver servicios</Text>
                  <Ionicons style={{ marginTop: 2, marginRight: 10 }} name="eye" size={22} color={'#5B009D'} />
                </TouchableOpacity>
              </View>

              {/* ----------------------------------------Modal "Servicios de Cita"---------------------------------------- */}
              <Modal visible={infoServices} transparent animationType="fade">
                <View style={styles.modalBackground}>
                  <View style={styles.modalContent}>
                    <Text style={styles.title}>Servicios de la cita</Text>
                    {selectedCitaServices.map((service, index) => (
                      <Text key={index} style={styles.serviceItem}>• {service.Nombre}</Text>
                    ))}
                    <View style={styles.containerButton}>
                      <TouchableOpacity style={styles.button} onPress={closeInfoServices}>
                        <Text style={styles.buttonText}>SALIR</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              </Modal>
              {/* --------------------------------------------------------------------------------------------------------- */}

              <Text style={[styles.titleDate, { marginTop: 5 }]}>Descripción</Text>

              <Text style={styles.inputDescription}>{cita.Descripcion}</Text>

            </View>

          ))
          ) : (
            <Text style={{ color: '#000000' }}>No se encontraron citas</Text>
          )}

          <ButtonSecondary
            onPress={() => navigation.navigate('AgendarCita')}
            width={'100%'}
            height={48}
            marginTop={0}
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
            title={'REGRESAR'}
          />

        </View>

      </ScrollView>
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
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  contentMain: {
    width: '86%',
    marginHorizontal: '7%',
    backgroundColor: '#ffffff',
  },
  containerInfo: {
    marginVertical: 30,
    paddingVertical: 18,
    borderWidth: 1,
    borderColor: '#cccccc',
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
    marginBottom: 30,
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
    right: 2,
    padding: 6,
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
  // Estilos del modal "Servicios"
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#00000080',
  },
  modalContent: {
    width: '75%',
    paddingTop: 20,
    padding: 15,
    backgroundColor: '#3F3F3F',
    borderRadius: 8,
  },
  title: {
    fontFamily: 'Aspira W05 Demi',
    marginBottom: 6,
    fontSize: 20,
    color: '#f0f0f0',
    textAlign: 'center',
    letterSpacing: 0.2,
  },
  serviceItem: {
    fontSize: 16,
    marginVertical: 8,
    color: '#f0f0f0', // Puedes personalizar el color según tus preferencias
  },
  containerButton: {
    alignItems: 'center',
  },
  button: {
    backgroundColor: '#7066e0',
    borderColor: '#b2abff',
    borderWidth: 3,
  },
  buttonText: {
    fontFamily: 'Montserrat Medium',
    height: 36,
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
    paddingLeft: 10,
    fontSize: 15,
    color: '#000000',
    verticalAlign: 'middle',
    fontWeight: '400',
    letterSpacing: 0.3,
  },
  inputDescription: {
    fontFamily: 'Aspira W05 Medium',
    minHeight: 45,
    paddingVertical: 6,
    paddingHorizontal: 10,
    fontSize: 15,
    color: '#000000',
    verticalAlign: 'middle',
    borderTopWidth: 0,
    borderWidth: 1,
    borderColor: '#5f5f5f',
    letterSpacing: 0.3,
  },
});


