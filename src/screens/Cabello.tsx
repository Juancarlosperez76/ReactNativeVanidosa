import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import { StyleSheet, View } from 'react-native';
import React from 'react';

type RootStackParamList = {
  Cabello: undefined;
};
type CabelloProps = NativeStackScreenProps<RootStackParamList, 'Cabello'>;

const Cabello = ({ navigation }: CabelloProps) => {

  return (

    <>
      <HeaderSettingsReturn navigation={navigation} title="Cabello" />
      <View style={styles.contentHair}></View>
    </>

  );

};

export default Cabello;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentHair: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
