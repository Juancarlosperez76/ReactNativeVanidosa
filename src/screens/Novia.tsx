import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import { StyleSheet, View } from 'react-native';
import React from 'react';

type RootStackParamList = {
  Novia: undefined;
};
type NoviaProps = NativeStackScreenProps<RootStackParamList, 'Novia'>;

const Novia = ({ navigation }: NoviaProps) => {

  return (

    <>
      <HeaderSettingsReturn navigation={navigation} title="Novia" />
      <View style={styles.contentBrides}></View>
    </>

  );

};

export default Novia;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentBrides: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});