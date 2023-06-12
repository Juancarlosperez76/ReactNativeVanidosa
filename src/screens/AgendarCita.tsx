import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import CustomHeaderReturn from '../components/CustomHeaderReturn';

type RootStackParamList = {
  AgendarCita: undefined;
  MisCitas: undefined;
};
type AgendarCitaProps = NativeStackScreenProps<RootStackParamList, 'AgendarCita'>;

const AgendarCita = ({ navigation }: AgendarCitaProps) => {

  return (

    <>

<CustomHeaderReturn title="Agendar cita" />

      <View style={styles.contentChedule}>

        <Text style={{ fontSize: 30, fontWeight: '500', color: '#7e7e7e' }}>Agendar cita</Text>

        <TouchableOpacity onPress={() => navigation.navigate('MisCitas')}>
          <Text
            style={{ color: '#0582C1' }}>Mis citas
          </Text>
        </TouchableOpacity>

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
  }
});
