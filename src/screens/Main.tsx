import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsLogo from '../components/HeaderSettingsLogo';
import LoadingIndicator from '../components/LoadingIndicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';

type RootStackParamList = {
  Main: undefined;
  Maquillaje: undefined;
  Cabello: undefined;
  Unas: undefined;
  Pestanas: undefined;
};
type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Main = ({ navigation }: MainProps) => {
  const [isLoading, setIsLoading] = useState(true); // Controla la carga del "Preload"

  // -----------------------------------------controla el tiempo que dura el "Preload"-----------------------------------------
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------

  const images = [
    require('../../android/assets/img/img-main-1.png'),
    require('../../android/assets/img/img-main-2.png'),
    require('../../android/assets/img/img-main-3.png'),
  ];

  return (

    <>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderSettingsLogo navigation={navigation} title="" />

      <ScrollView style={{ backgroundColor: '#ffffffff' }}>

        <View style={styles.contentImageMain}>
          <Swiper showsPagination={false} autoplay={true} autoplayTimeout={4} removeClippedSubviews={false}>
            {images.map((image, index) => (
              <Image key={index} source={image} style={styles.imageMain} />
            ))}
          </Swiper>
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
    width: '96%',
    marginHorizontal: '2%',
    marginTop: 10,
    aspectRatio: 1 * 1.43, // Convertir pixeles de imágen a "Relación Aspecto" 
  },
  imageMain: {
    width: '100%',
    height: '100%',
    padding: 10,
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
    fontFamily: 'Futura PT Medium',
    marginTop: 10,
    color: '#4e4e4e',
    textAlign: 'center',
    fontSize: 16,
    fontWeight: '600',
    letterSpacing: 0.5,
  },
});
