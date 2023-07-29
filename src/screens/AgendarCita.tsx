import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeaderSettings from '../components/CustomHeaderSettings';
import ModalAlertSuccess from '../components/ModalAlertSuccess';
import ModalAlertFailure from '../components/ModalAlertFailure';

type RootStackParamList = {
  AgendarCita: undefined;
  MisCitas: undefined;
};
type AgendarCitaProps = NativeStackScreenProps<RootStackParamList, 'AgendarCita'>;

const AgendarCita = ({ navigation }: AgendarCitaProps) => {

  // --------------------------Función para mostrar el modal "ModalAlertSuccess"--------------------------
  const [alertSuccessVisible, setAlertSuccessVisible] = useState(false);

  const handleShowAlertSuccess = () => {
    setAlertSuccessVisible(true);
  };

  const handleCloseAlertSuccess = () => {
    setAlertSuccessVisible(false);
  };
  // -----------------------------------------------------------------------------------------------------

  // --------------------------Función para mostrar el modal "ModalAlertFailure"--------------------------
  const [alertFailureVisible, setAlertFailureVisible] = useState(false);

  const handleShowAlertFailure = () => {
    setAlertFailureVisible(true);
  };

  const handleCloseAlertFailure = () => {
    setAlertFailureVisible(false);
  };
  // -----------------------------------------------------------------------------------------------------

  return (

    <>

      <CustomHeaderSettings navigation={navigation} title="Agendar cita" />

      <View style={styles.contentChedule}>

        <Text style={{ fontSize: 30, fontWeight: '500', color: '#7e7e7e' }}>Agendar cita</Text>

        <TouchableOpacity onPress={() => navigation.navigate('MisCitas')}>
          <Text
            style={{ color: '#0582C1' }}>Mis citas
          </Text>
        </TouchableOpacity>

        {/* ---------------Código para ejecutar y mostrar el modal "ModalAlertSuccess"--------------- */}
        {/* Botón para ejecutar "ModalAlert" */}
        <TouchableOpacity style={styles.buttonOpenAlertSuccess} onPress={handleShowAlertSuccess}>
          <Text style={styles.buttonOpenAlertSuccessText}>Success</Text>
        </TouchableOpacity>

        {/* Renderizar componente "ModalAlertSuccess" */}
        <ModalAlertSuccess
          visible={alertSuccessVisible}
          onClose={handleCloseAlertSuccess}
          title='Registro exitoso'
          message='Cuenta creada con éxito.'
          buttonStyle={{ width: 70 }}
          buttonText='OK'
        />
        {/* ----------------------------------------------------------------------------------------- */}

        {/* ---------------Código para ejecutar y mostrar el modal "ModalAlertFailure"--------------- */}
        {/* Botón para ejecutar "ModalAlert" */}
        <TouchableOpacity style={styles.buttonOpenAlertFailure} onPress={handleShowAlertFailure}>
          <Text style={styles.buttonOpenAlertFailureText}>Failure</Text>
        </TouchableOpacity>

        {/* Renderizar componente "ModalAlertSuccess" */}
        <ModalAlertFailure
          visible={alertFailureVisible}
          onClose={handleCloseAlertFailure}
          title='Registro falló'
          message='Error al crear la cuenta.'
          buttonStyle={{ width: 70 }}
          buttonText='OK'
        />
        {/* ----------------------------------------------------------------------------------------- */}

      </View>

    </>

  );

};

export default AgendarCita;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentChedule: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  buttonOpenAlertSuccess: {
    marginTop: 30,
    backgroundColor: '#28a745',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonOpenAlertSuccessText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonOpenAlertFailure: {
    marginTop: 30,
    backgroundColor: '#dc3545',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonOpenAlertFailureText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
