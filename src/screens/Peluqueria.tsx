import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import { StyleSheet, View } from 'react-native';
import React from 'react';

type RootStackParamList = {
  AgendarCita: undefined;
  Peluqueria: undefined;
};
type PeluqueriaProps = NativeStackScreenProps<RootStackParamList, 'Peluqueria'>;

const Peluqueria = ({ navigation }: PeluqueriaProps) => {

  return (

    <>
      <HeaderSettingsReturn navigation={navigation} title="Peluquería" />
      <View style={styles.contentMakeup}></View>
    </>

  );

};

export default Peluqueria;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentMakeup: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
