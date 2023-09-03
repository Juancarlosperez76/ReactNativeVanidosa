import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import HeaderSettingsReturnShadow from '../components/HeaderSettingsReturnShadow';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React from 'react';
import ButtonSecondary from '../components/ButtonSecondary';

type RootStackParamList = {
  AgendarCita: undefined;
  MisCitas: undefined;
};
type MisCitasProps = NativeStackScreenProps<RootStackParamList, 'MisCitas'>;

const MisCitas = ({ navigation }: MisCitasProps) => {

  return (

    <View style={styles.generalContainer}>

      <HeaderSettingsReturnShadow navigation={navigation} title="Mis citas" />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">

        <View style={styles.contentMain}>

          <View style={styles.contentLogoAccount}>
            <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
          </View>

          <ButtonSecondary
            onPress={() => navigation.navigate('AgendarCita')}
            width={'100%'}
            height={48}
            marginTop={0}
            marginBottom={0}
            backgroundColor={'#00000000'}
            borderColor={'#E00083'}
            borderWidth={2}
            borderRadius={0}
            borderTopLeftRadius={0}
            borderTopRightRadius={0}
            borderBottomRightRadius={0}
            borderBottomLeftRadius={0}
            fontFamily={'Aspira W05 Demi'}
            color={'#29344A'}
            fontSize={15}
            fontWeight={undefined}
            letterSpacing={0.3}
            title={'REGRESAR'}
          />

        </View>
        
      </ScrollView>
    </View>
  );
};

export default MisCitas;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  contentMain: {
    width: '86%',
    marginHorizontal: '7%',
    backgroundColor: '#ffffff',
  },
  contentLogoAccount: {
    marginVertical: 40,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoAccount: {
    width: 120,
    height: 72,
  },
});
