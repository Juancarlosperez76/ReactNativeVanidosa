import React from 'react';
import CustomHeaderSettings from '../components/CustomHeaderSettings';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Unas: undefined;
};
type UnasProps = NativeStackScreenProps<RootStackParamList, 'Unas'>;

const Unas = ({ navigation }: UnasProps) => {

  return (

    <>
      <CustomHeaderSettings navigation={navigation} title="Uñas" />
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
