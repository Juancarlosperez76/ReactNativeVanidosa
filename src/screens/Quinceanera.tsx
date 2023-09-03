import HeaderSettingsReturnShadow from '../components/HeaderSettingsReturnShadow';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

type RootStackParamList = {
  Quinceanera: undefined;
};
type QuinceaneraProps = NativeStackScreenProps<RootStackParamList, 'Quinceanera'>;

const Quinceanera = ({ navigation }: QuinceaneraProps) => {

  return (

    <View style={styles.generalContainer}>

      <HeaderSettingsReturnShadow navigation={navigation} title="Quinceañera" />

      <View style={styles.scrollView}>

        <View style={styles.contentMain}>

          <View style={styles.contentTitle}>
            <Text style={styles.title}>Quinceañera</Text>
          </View>

        </View>

      </View>

    </View>

  );

};

export default Quinceanera;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
  },
  scrollView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  contentMain: {
    width: '86%',
    marginHorizontal: '7%',
    backgroundColor: '#ffffff',
  },
  contentTitle: {
    backgroundColor: '#ffffff',
  },
  title: {
    fontFamily: 'Aspira W05 Demi',
    color: '#000000',
    textAlign: 'center',
    fontSize: 20,
  },
});