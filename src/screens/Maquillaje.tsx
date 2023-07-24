import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomHeaderSettings from '../components/CustomHeaderSettings';

type RootStackParamList = {
  AgendarCita: undefined;
  Maquillaje: undefined;
};
type MaquillajeProps = NativeStackScreenProps<RootStackParamList, 'Maquillaje'>;

const Maquillaje = ({ navigation }: MaquillajeProps) => {

  return (

    <>
      <CustomHeaderSettings navigation={navigation} title="Maquillaje" />
      <View style={styles.contentMakeup}></View>
    </>

  );

};

export default Maquillaje;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentMakeup: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});
