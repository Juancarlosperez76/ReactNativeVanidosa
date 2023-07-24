import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomHeaderSettings from '../components/CustomHeaderSettings';

type RootStackParamList = {
  Quinceanera: undefined;
};
type QuinceaneraProps = NativeStackScreenProps<RootStackParamList, 'Quinceanera'>;

const Quinceanera = ({ navigation }: QuinceaneraProps) => {

  return (

    <>
      <CustomHeaderSettings navigation={navigation} title="Quinceañera" />
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