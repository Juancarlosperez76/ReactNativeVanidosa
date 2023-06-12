import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Text, TouchableOpacity, View } from 'react-native';
import CustomHeaderReturn from '../components/CustomHeaderReturn';

type RootStackParamList = {
  AgendarCita: undefined;
  MisCitas: undefined;
};
type MisCitasProps = NativeStackScreenProps<RootStackParamList, 'MisCitas'>;

const MisCitas = ({ navigation }: MisCitasProps) => {

  return (

    <>
    
    <CustomHeaderReturn title="Mis citas" />
    
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>

      <Text style={{ fontSize: 30, fontWeight: '500', color: '#7e7e7e' }}>Mis citas</Text>

      <TouchableOpacity onPress={() => navigation.navigate('AgendarCita')}>
        <Text
          style={{ color: '#0582C1' }}>Agendar cita
        </Text>
      </TouchableOpacity>

    </View>
    
    </>

  );

};

export default MisCitas;

// ********** Estilos CSS **********
// const styles = StyleSheet.create({

// });
