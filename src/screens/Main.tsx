import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import Header from '../components/Header';

const Main = () => {
  return (
    <>
      <Header />
      <ScrollView style={{backgroundColor: 'transparent'}}>
        <View style={styles.contentImage}>
          <Image style={styles.immageMain} source={require('../../android/assets/img/img-main-4.jpg')} />
        </View>
        <View>
          <Image source={require('../../android/assets/img/img-main-2.png')} />
        </View>
      </ScrollView>
    </>
  );
};

export default Main;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentImage: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    aspectRatio: 1 * 1.43, // Convertir pixeles de imágen a "Relación Aspecto" 
  },
  immageMain: {
    width: '96%',
    height: '96%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  contentImage2: {
  },
  immageMain2: {
  },
});
