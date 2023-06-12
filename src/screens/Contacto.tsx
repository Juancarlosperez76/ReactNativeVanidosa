import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import CustomHeaderReturnLogo from '../components/CustomHeaderReturnLogo';

const Contacto = () => {

  return (

    <>
      <CustomHeaderReturnLogo />

      <ScrollView style={styles.containerContact}>

        <View style={styles.contentContact}>
          <View style={styles.contact}>
            <Text style={{ textAlign: 'center' }}>Contacto</Text>
          </View>
        </View>

      </ScrollView>

    </>

  );

};

export default Contacto;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  containerContact: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 30,
  },
  contentContact: {
    height: 700,
    justifyContent: 'center',
    alignItems:'center',
  },
  contact: {
    
  },
});
