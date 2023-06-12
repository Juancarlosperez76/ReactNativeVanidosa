import React from 'react';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import { StyleSheet, View } from 'react-native';

const Maquillaje = () => {

  return (

    <>
      <CustomHeaderReturn title="Maquillaje" />
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
