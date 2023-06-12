import React from 'react';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import Header from '../components/Header';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Main: undefined;
  Maquillaje: undefined;
  Cabello: undefined;
  Unas: undefined;
  Pestanas: undefined;
};
type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Main = ({ navigation }: MainProps) => {

  return (

    <>

      <Header />

      <ScrollView style={{ backgroundColor: '#ffffffff' }}>

        <View style={styles.contentImageMain}>
          <Image style={styles.immageMain} source={require('../../android/assets/img/img-main-1.png')} />
        </View>

        <View style={styles.containerMain}>

          <View style={styles.contentMain}>

            <TouchableOpacity style={styles.containerImage} onPress={() => navigation.navigate('Maquillaje')}>
              <View style={styles.contentImage}>
                <Ionicons style={styles.secondaryImage} name="hand-left-outline" />
              </View>
              <Text style={styles.textImage}>Maquillaje</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerImage} onPress={() => navigation.navigate('Cabello')}>
              <View style={styles.contentImage}>
                <Ionicons style={styles.secondaryImage} name="planet-outline" />
              </View>
              <Text style={styles.textImage}>Cabello</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerImage} onPress={() => navigation.navigate('Unas')}>
              <View style={styles.contentImage}>
                <Ionicons style={styles.secondaryImage} name="gift-outline" />
              </View>
              <Text style={styles.textImage}>Uñas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.containerImage} onPress={() => navigation.navigate('Pestanas')}>
              <View style={styles.contentImage}>
                <Ionicons style={styles.secondaryImage} name="beer-outline" />
              </View>
              <Text style={styles.textImage}>Pestañas</Text>
            </TouchableOpacity>

          </View>

        </View>

      </ScrollView>

    </>

  );
  
};

export default Main;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentImageMain: {
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
  containerMain: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#00000000',
  },
  contentMain: {
    flexDirection: 'row', // Posisiona elementos en fila
    flexWrap: 'wrap', // Posiciona elementos horixontalmente en varias filas
    justifyContent: 'center',
    backgroundColor: '#00000000',
  },
  containerImage: {
    width: 150,
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 40,
    borderColor: '#d3d3d3',
    borderWidth: 1,
  },
  contentImage: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#d7c6f7',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 15,
  },
  secondaryImage: {
    fontSize: 35,
    color: '#5e5e5e',
  },
  textImage: {
    color: '#7e7e7e',
    fontSize: 14,
    marginTop: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
});
