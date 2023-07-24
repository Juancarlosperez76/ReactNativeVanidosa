import React from 'react';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import CustomHeaderSettings from '../components/CustomHeaderSettings';

type RootStackParamList = {
  Pestanas: undefined;
};
type PestanasProps = NativeStackScreenProps<RootStackParamList, 'Pestanas'>;

const Pestanas = ({ navigation }: PestanasProps) => {

  return (

    <>
      <CustomHeaderSettings navigation={navigation} title="Pestañas" />
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
