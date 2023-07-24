import React from 'react';
import { StyleSheet, View } from 'react-native';
import CustomHeaderSettings from '../components/CustomHeaderSettings';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  Cabello: undefined;
};
type CabelloProps = NativeStackScreenProps<RootStackParamList, 'Cabello'>;

const Cabello = ({ navigation }: CabelloProps) => {

  return (

    <>
      <CustomHeaderSettings navigation={navigation} title="Cabello" />
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
