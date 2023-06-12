import React from 'react';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import { StyleSheet, View } from 'react-native';

const Unas = () => {

  return (

    <>
      <CustomHeaderReturn title="Uñas" />
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
