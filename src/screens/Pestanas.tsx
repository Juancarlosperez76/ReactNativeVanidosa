import React from 'react';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import { StyleSheet, View } from 'react-native';

const Pestanas = () => {

  return (

    <>
      <CustomHeaderReturn title="Pestañas" />
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
