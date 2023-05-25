import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Header from '../components/Header';
import { Text, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  AgendarCita: undefined;
  MisCitas: undefined;
  // otras rutas de tu aplicación
};
type MisCitasProps = NativeStackScreenProps<RootStackParamList, 'MisCitas'>;

const MisCitas = ({ navigation }: MisCitasProps) => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text style={{ fontSize: 30, fontWeight: '500', color: '#7e7e7e' }}>Mis citas</Text>
      <TouchableOpacity onPress={() => navigation.navigate('AgendarCita')}>
        <Text
          style={{ color: '#0582C1' }}>Agendar cita
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default MisCitas;

// ********** Estilos CSS **********
// const styles = StyleSheet.create({

// });
