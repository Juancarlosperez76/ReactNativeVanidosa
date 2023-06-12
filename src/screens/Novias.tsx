import React from 'react';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import { StyleSheet, View } from 'react-native';

const Novias = () => {

  return (

    <>
    <CustomHeaderReturn title="Novias" />
    <View style={styles.contentBrides}></View>
    </>
    
  );
  
};

export default Novias;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentBrides: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});