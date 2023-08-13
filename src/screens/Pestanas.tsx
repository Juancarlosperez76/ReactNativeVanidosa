import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import React from 'react';

type RootStackParamList = {
  Pestanas: undefined;
};
type PestanasProps = NativeStackScreenProps<RootStackParamList, 'Pestanas'>;

const Pestanas = ({ navigation }: PestanasProps) => {

  return (

    <>
      <HeaderSettingsReturn navigation={navigation} title="Pestañas" />
      <View style={styles.contentEyelashes}></View>
    </>

  );

};

export default Pestanas;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentEyelashes: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
