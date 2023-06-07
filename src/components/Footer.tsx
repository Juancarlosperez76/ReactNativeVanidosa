import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

const Footer = () => {

  return (

    <View style={styles.footer}>
      <Text style={styles.textFooter}>Copyright © 2023 Vanidosa SPA.</Text>
      <Text style={styles.textFooter}>All rights reserved</Text>
    </View>

  );
};

export default Footer;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  footer: {
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFF',
  },
  textFooter: {
    fontSize: 14,
    fontWeight: '400',
    color: '#222',
  },
});
