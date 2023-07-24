import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomHeaderSettings from '../components/CustomHeaderSettings';

type RootStackParamList = {
  Novias: undefined;
};
type NoviasProps = NativeStackScreenProps<RootStackParamList, 'Novias'>;

const Novias = ({ navigation }: NoviasProps) => {

  return (

    <>
      <CustomHeaderSettings navigation={navigation} title="Novias" />
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