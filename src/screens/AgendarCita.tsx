/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import Header from '../components/Header';

type RootStackParamList = {
  AgendarCita: undefined;
  MisCitas: undefined;
};
type AgendarCitaProps = NativeStackScreenProps<RootStackParamList, 'AgendarCita'>;

const AgendarCita = ({ navigation }: AgendarCitaProps) => {

  return (

    <>
      <Header />

      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

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
// const styles = StyleSheet.create({

// });
