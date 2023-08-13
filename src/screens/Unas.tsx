import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import { StyleSheet, View } from 'react-native';
import React from 'react';

type RootStackParamList = {
  Unas: undefined;
};
type UnasProps = NativeStackScreenProps<RootStackParamList, 'Unas'>;

const Unas = ({ navigation }: UnasProps) => {

  return (

    <>
      <HeaderSettingsReturn navigation={navigation} title="Uñas" />
      <View style={styles.contentnails}></View>
    </>

  );

};

export default Unas;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentnails: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
