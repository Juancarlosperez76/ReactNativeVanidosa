import React from 'react';
import { StyleSheet, View, Image, ScrollView } from 'react-native';
import Header from '../components/Header';

const Main = () => {
  return (
    <>
      <Header />
      <ScrollView>
        <View style={styles.main}>
          <Image style={styles.immageMain} source={require('../../android/assets/img/img-main.jpg')} />
        </View>
        <View style={styles.main}>
          <Image style={styles.immageMain} source={require('../../android/assets/img/img-main-2.jpg')} />
        </View>
      </ScrollView>
    </>
  );
};

export default Main;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  main: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    paddingVertical: 5,
    backgroundColor: '#ffffff',
  },
  immageMain: {
    width: '98%',
  },
});
