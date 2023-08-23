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
    require('../../android/assets/img/main/main1.png'),
    require('../../android/assets/img/main/main2.png'),
    require('../../android/assets/img/main/main3.png'),
    require('../../android/assets/img/main/main4.png'),
    require('../../android/assets/img/main/main5.png'),
    require('../../android/assets/img/main/main6.png'),
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

            <Text style={styles.mainTitle}>NUEVO EXCELLENCE SIN AMONÍACO</Text>

            <Text style={styles.mainText}>
              Nuestra primera coloración permanente sin amoniaco. Con el triple cuidado que ya conoces de Excellence Creme y el 100% cobertura de canas, ¡ahora sin Amoníaco y adicionado con ceramidas para un 98% menos quiebre..
            </Text>

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
    width: '100%',
    aspectRatio: 1 * 1, // Convertir pixeles de imágen a "Relación Aspecto" 
    marginBottom: 20,
    //borderWidth: 1,
  },
  imageMain: {
    width: '100%',
    height: '100%',
  },
  containerMain: {
    width: '90%',
    marginHorizontal: '5%',
    backgroundColor: '#00000000',
    //borderWidth: 1,
  },
  contentMain: {
    backgroundColor: '#00000000',
  },
  mainTitle: {
    marginVertical: 20,
    fontFamily: 'Aspira W05 Bold',
    color: '#000000',
    fontSize: 20,
    //letterSpacing: 0.3
    //borderWidth: 1,
  },
  mainText: {
    marginBottom: 30,
    fontFamily: 'Futura PT Book',
    color: '#000000',
    fontSize: 17,
    letterSpacing: 0.3,
  },
});
