import React from 'react';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import { StyleSheet, View } from 'react-native';

const Quinceanera = () => {

  return (

    <>
      <CustomHeaderReturn title="Quinceañera" />
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