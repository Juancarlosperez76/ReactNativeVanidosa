import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import { StyleSheet, View } from 'react-native';
import React from 'react';

type RootStackParamList = {
  AgendarCita: undefined;
  Maquillaje: undefined;
};
type MaquillajeProps = NativeStackScreenProps<RootStackParamList, 'Maquillaje'>;

const Maquillaje = ({ navigation }: MaquillajeProps) => {

  return (

    <>
      <HeaderSettingsReturn navigation={navigation} title="Maquillaje" />
      <View style={styles.contentMakeup}></View>
    </>

  );

};

export default Maquillaje;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentMakeup: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
