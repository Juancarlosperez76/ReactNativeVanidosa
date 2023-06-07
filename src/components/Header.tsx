import React, { useState } from 'react';
import { View, Image, StyleSheet, Button, TouchableOpacity, } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ModalAccount from './ModalAccount';

const Header = () => {

  const [modalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (

    <View style={styles.contentLogo}>

      <Image style={styles.logo} source={require('../../android/assets/img/logo-full-136-84.png')} />

      <TouchableOpacity style={styles.contentUserIcon} onPress={handleOpenModal}>
        <Ionicons style={styles.userIcon} name="person-circle-outline" />
        <ModalAccount visible={modalVisible} onClose={handleCloseModal} />
      </TouchableOpacity>

    </View>
    
  );
};

export default Header;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentLogo: {
    flexDirection: 'row',
    height: 80,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 120,
    height: 72,
  },
  contentUserIcon: {
    position: 'absolute',
    top: 24,
    right: 28,
  },
  userIcon: {
    color: '#7e7e7e',
    fontSize: 32,
  },
});

