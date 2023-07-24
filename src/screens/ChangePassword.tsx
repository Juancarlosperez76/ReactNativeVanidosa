import React from 'react';
import CustomHeaderSettings from '../components/CustomHeaderSettings';
import { StyleSheet, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

type RootStackParamList = {
  ChangePassword: undefined;
};
type ChangePasswordProps = NativeStackScreenProps<RootStackParamList, 'ChangePassword'>;

const ChangePassword = ({ navigation }: ChangePasswordProps) => {

  return (

    <>
      <CustomHeaderSettings navigation={navigation} title="Cambiar contraseña" />
      <View style={styles.contentnails}></View>
    </>

  );

};

export default ChangePassword;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentnails: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
});