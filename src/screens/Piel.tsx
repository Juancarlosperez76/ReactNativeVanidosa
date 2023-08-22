import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import { StyleSheet, View } from 'react-native';
import React from 'react';

type RootStackParamList = {
  Piel: undefined;
};
type PielProps = NativeStackScreenProps<RootStackParamList, 'Piel'>;

const Piel = ({ navigation }: PielProps) => {

  return (

    <>
      <HeaderSettingsReturn navigation={navigation} title="Cuidado de la piel" />
      <View style={styles.contentBrides}></View>
    </>

  );

};

export default Piel;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentBrides: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});