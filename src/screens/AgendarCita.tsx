import React, { useState } from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeaderSettings from '../components/CustomHeaderSettings';
import AlertSuccess from '../components/AlertSuccess';
import AlertFailure from '../components/AlertFailure';
import AlertConfirmPass from '../components/AlertConfirmPass';
import AlertWarning from '../components/AlertWarning';
import AlertWarningConfirm from '../components/AlertWarningConfirm';

type RootStackParamList = {
  AgendarCita: undefined;
  MisCitas: undefined;
};
type AgendarCitaProps = NativeStackScreenProps<RootStackParamList, 'AgendarCita'>;

const AgendarCita = ({ navigation }: AgendarCitaProps) => {

  // ---------------------------------------Función para mostrar el modal "AlertSuccess"---------------------------------------
  const [SuccessVisible, setSuccessVisible] = useState(false);

  const handleShowSuccess = () => {
    setSuccessVisible(true);
  };

  const handleCloseSuccess = () => {
    setSuccessVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------Función para mostrar el modal "AlertFailure"---------------------------------------
  const [FailureVisible, setFailureVisible] = useState(false);

  const handleShowFailure = () => {
    setFailureVisible(true);
  };

  const handleCloseFailure = () => {
    setFailureVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // -------------------------------------Función para mostrar el modal "AlertConfirmPass"-------------------------------------
  const [ConfirmVisible, setConfirmPassVisible] = useState(false);

  const handleShowConfirmPass = () => {
    setConfirmPassVisible(true);
  };

  const handleCloseConfirmPass = () => {
    setConfirmPassVisible(false);
    handleShowSuccess(); // Ejecuta el modal "AlertSuccess"
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ---------------------------------------Función para mostrar el modal "AlertWarning"---------------------------------------
  const [WarningVisible, setWarningVisible] = useState(false);

  const handleShowWarning = () => {
    setWarningVisible(true);
  };

  const handleCloseWarning = () => {
    setWarningVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------Función para botones modal "AlertWarningConfirm---------------------------------------
  const handleDeleteAccount = () => {
    handleCloseWarningConfirm(); // Cierra "AlertWarningConfirm" con botón "Cancelar"
    handleShowConfirmPass(); // Ejecuta "AlertConfirmPass" con botón "Eliminar"
  };
  // --------------------------------------------------------------------------------------------------------------------------

  // ------------------------------------Función para mostrar el modal "AlertWarningConfirm"-----------------------------------
  const [WarningConfirmVisible, setWarningConfirmVisible] = useState(false);

  const handleShowWarningConfirm = () => {
    setWarningConfirmVisible(true);
  };

  const handleCloseWarningConfirm = () => {
    setWarningConfirmVisible(false);
  };
  // --------------------------------------------------------------------------------------------------------------------------

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

        <View style={styles.ContainerAlertButtons}>

          {/* ---------------------------Código para ejecutar y mostrar el modal "AlertSuccess"---------------------------- */}
          {/* Botón para ejecutar el modal "AlertSuccess" */}
          <TouchableOpacity style={styles.openAlertSuccess} onPress={handleShowSuccess}>
            <Text style={styles.openAlertSuccessText}>Success</Text>
          </TouchableOpacity>

          {/* Renderizar componente "AlertSuccess" */}
          <AlertSuccess
            visible={SuccessVisible}
            onCloseSuccess={handleCloseSuccess}
            title='Cuenta eliminada.'
            message='La cuenta ha sido eliminada con éxito.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ---------------------------Código para ejecutar y mostrar el modal "AlertFailure"---------------------------- */}
          {/* Botón para ejecutar el modal "AlertFailure" */}
          <TouchableOpacity style={styles.openAlertFailure} onPress={handleShowFailure}>
            <Text style={styles.openAlertFailureText}>Failure</Text>
          </TouchableOpacity>

          {/* Renderizar componente "AlertFailure" */}
          <AlertFailure
            visible={FailureVisible}
            onCloseFailure={handleCloseFailure}
            title='Registro falló.'
            message='Error al crear la cuenta.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* -------------------------Código para ejecutar y mostrar el modal "AlertConfirmPass"-------------------------- */}
          {/* Botón para ejecutar el modal "AlertConfirmPass" */}
          <TouchableOpacity style={styles.openAlertConfirmPass} onPress={handleShowConfirmPass}>
            <Text style={styles.openAlertConfirmPassText}>Confirm</Text>
          </TouchableOpacity>

          {/* Renderizar componente "AlertConfirmPass" */}
          <AlertConfirmPass
            visible={ConfirmVisible}
            onCloseConfirmPass={handleCloseConfirmPass}
            title='Ingrese su contraseña'
            buttonStyle={{ width: 120 }}
            buttonText='Aceptar'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ---------------------------Código para ejecutar y mostrar el modal "AlertWarning"---------------------------- */}
          {/* Botón para ejecutar el modal "AlertWarning" */}
          <TouchableOpacity style={styles.openAlertWarning} onPress={handleShowWarning}>
            <Text style={styles.openAlertWarningText}>Warning</Text>
          </TouchableOpacity>

          {/* Renderizar componente "AlertWarning" */}
          <AlertWarning
            visible={WarningVisible}
            onCloseWarning={handleCloseWarning}
            title='Registro falló.'
            message='Error al crear la cuenta.'
            buttonStyle={{ width: 70 }}
            buttonText='OK'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

          {/* ------------------------Código para ejecutar y mostrar el modal "AlertWarningConfirm"------------------------ */}
          {/* Botón para ejecutar el modal "AlertWarningConfirm" */}
          <TouchableOpacity style={styles.openAlertWarningConfirm} onPress={handleShowWarningConfirm}>
            <Text style={styles.openAlertWarningConfirmText}>Warning Confirm</Text>
          </TouchableOpacity>

          {/* Renderizar componente "AlertWarningConfirm" */}
          <AlertWarningConfirm
            visible={WarningConfirmVisible}
            onCloseWarningConfirm={handleCloseWarningConfirm} // Se ejecuta con botón "Cancelar"
            onConfirmWarning={handleDeleteAccount} // Se ejecuta con botón "Eliminar"
            title='¿Está seguro que quiere eliminar cuenta?'
            message='¡Ya no podrá recuperarla!'
            buttonConfirmStyle={{ width: 110 }}
            buttonCancelStyle={{ width: 110 }}
            buttonConfirmText='Eliminar'
            buttonCancelText='Cancelar'
          />
          {/* ------------------------------------------------------------------------------------------------------------- */}

        </View>

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
    paddingHorizontal: 30,
    backgroundColor: '#ffffff',
  },
  ContainerAlertButtons: {
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 30,
  },
  openAlertSuccess: {
    width: 100,
    alignItems: 'center',
    margin: 10,
    paddingVertical: 10,
    backgroundColor: '#28a745',
    borderRadius: 8,
  },
  openAlertSuccessText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  openAlertFailure: {
    width: 100,
    alignItems: 'center',
    margin: 10,
    paddingVertical: 10,
    backgroundColor: '#dd3333',
    borderRadius: 8,
  },
  openAlertFailureText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  openAlertWarningConfirm: {
    width: 160,
    alignItems: 'center',
    margin: 10,
    paddingVertical: 10,
    backgroundColor: '#ffc107',
    borderRadius: 8,
  },
  openAlertWarningConfirmText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  openAlertWarning: {
    width: 100,
    alignItems: 'center',
    margin: 10,
    paddingVertical: 10,
    backgroundColor: '#dd3333',
    borderRadius: 8,
  },
  openAlertWarningText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  openAlertConfirmPass: {
    width: 100,
    alignItems: 'center',
    margin: 10,
    paddingVertical: 10,
    backgroundColor: '#3085d6',
    borderRadius: 8,
  },
  openAlertConfirmPassText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
