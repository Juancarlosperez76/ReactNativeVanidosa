import React from 'react';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import { StyleSheet, View } from 'react-native';

const Cabello = () => {

  return (

    <>
      <CustomHeaderReturn title="Cabello" />
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
