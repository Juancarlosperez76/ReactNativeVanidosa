import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import { StyleSheet, View } from 'react-native';
import React from 'react';

type RootStackParamList = {
  Novias: undefined;
};
type NoviasProps = NativeStackScreenProps<RootStackParamList, 'Novias'>;

const Novias = ({ navigation }: NoviasProps) => {

  return (

    <>
      <HeaderSettingsReturn navigation={navigation} title="Novias" />
      <View style={styles.contentBrides}></View>
    </>

  );

};

export default Novias;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentBrides: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});