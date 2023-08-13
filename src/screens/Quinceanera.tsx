import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import { StyleSheet, View } from 'react-native';
import React from 'react';

type RootStackParamList = {
  Quinceanera: undefined;
};
type QuinceaneraProps = NativeStackScreenProps<RootStackParamList, 'Quinceanera'>;

const Quinceanera = ({ navigation }: QuinceaneraProps) => {

  return (

    <>
      <HeaderSettingsReturn navigation={navigation} title="Quinceañera" />
      <View style={styles.contentTeenage}></View>
    </>

  );

};

export default Quinceanera;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentTeenage: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});