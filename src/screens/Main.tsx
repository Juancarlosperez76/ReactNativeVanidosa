import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsLogo from '../components/HeaderSettingsLogo';
import LoadingIndicator from '../components/LoadingIndicator';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';

type RootStackParamList = {
  Main: undefined;
  Maquillaje: undefined;
  Cabello: undefined;
  Unas: undefined;
  Pestanas: undefined;
  AgendarCita: undefined;
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

  const serviceImages = [
    require('../../android/assets/img/main/belleza.png'),
    require('../../android/assets/img/main/depilacion.png'),
    require('../../android/assets/img/main/unas.png'),
    require('../../android/assets/img/main/cabello.png'),
    require('../../android/assets/img/main/cejas-pestanas.png'),
    require('../../android/assets/img/main/cuidado-piel.png'),
  ];

  const serviceTexts = [
    'Maquillaje profesional',
    'Depilación',
    'Manicure y Pedicure',
    'Cabello',
    'Cejas y Pestañas',
    'Cuidado de la piel',
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
          <TouchableOpacity style={styles.buttonSchedule} onPress={() => navigation.navigate('AgendarCita')}>
            <Text style={styles.buttonScheduleText}>RESERVA TU CITA</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.containerMain}>

          <View style={styles.contentMain}>

            <View style={styles.separator}></View>

            <View style={styles.containerTextOne}>
              <Text style={styles.mainTitleOne}>PASIÓN POR LA BELLEZA</Text>
              <Text style={styles.mainTextOne}>
                Descubra nuestra amplia gama de servicios, en Vanidosa Salon y SPA, Somos profesionales apasiondos por el cuidado personal y la belleza, dispuestos a brindarle la mejor atención.
              </Text>
            </View>

            <View style={styles.containerServices}>
              <Text style={styles.titleServices}>NUESTROS SERVICIOS</Text>

              <Swiper
                style={styles.containerSwiper}
                showsPagination={true}
                autoplay={false}
                autoplayTimeout={4}
                removeClippedSubviews={false}
                paginationStyle={styles.paginationStyle}
                dot={<View style={styles.dotStyle} />}
                activeDot={<View style={styles.ActiveDotStyle} />}
              >
                {serviceImages.map((image, index) => (
                  <View key={index} style={styles.contentServices} >
                    <View style={styles.containerImageServices}>
                      <Image source={image} style={styles.imageService} />
                    </View>
                    <Text style={styles.serviceText}>{serviceTexts[index]}</Text>
                  </View>
                ))}
              </Swiper>

            </View>

            <TouchableOpacity style={styles.buttonScheduleServices} onPress={() => navigation.navigate('AgendarCita')}>
              <Text style={styles.buttonScheduleServicesText}>AGENDA TU CITA</Text>
            </TouchableOpacity>

            <View style={styles.separator}></View>

            <View style={styles.containerTextThree}>
              <Text style={styles.mainTitleThree}>PERFECCIÓN EN BELLEZA Y CUIDADO PERSONAL</Text>
              <Text style={styles.mainTextThree}>
                Descubre la excelencia en cuidado personal en Vnidosa SPA y belleza, donde fusionamos la innovación estética con técnicas vanguardistas. Nuestro equipo de estilistas altamente calificados te brindará una experiencia inolvidable.
              </Text>
            </View>


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
  },
  imageMain: {
    width: '100%',
    height: '100%',
  },
  buttonSchedule: {
    position: 'absolute',
    justifyContent: 'center',
    width: '50%',
    height: 45,
    bottom: 25,
    marginHorizontal: '25%',
    backgroundColor: '#e00083aa',
  },
  buttonScheduleText: {
    fontFamily: 'Aspira W05 Demi',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 17,
    letterSpacing: 0.3,
  },
  containerMain: {
    width: '100%',
    backgroundColor: '#00000000',
  },
  contentMain: {
    width: '100%',
    backgroundColor: '#00000000',
  },
  separator: {
    width: '24%',
    marginTop: 40,
    marginHorizontal: '38%',
    marginBottom: 20,
    borderColor: '#7c7c7c',
    borderBottomWidth: 2,
  },
  containerTextOne: {
    marginTop: 10,
    paddingBottom: 10,
    paddingHorizontal: 25,
  },
  mainTitleOne: {
    marginBottom: 20,
    fontFamily: 'Aspira W05 Demi',
    textAlign: 'center',
    color: '#585858',
    fontSize: 20,
    letterSpacing: 0.3
  },
  mainTextOne: {
    fontFamily: 'Futura PT Book',
    textAlign: 'center',
    color: '#000000',
    fontSize: 17,
    letterSpacing: 0.4,
  },
  containerServices: {
    marginTop: 20,
    paddingVertical: 20,
    backgroundColor: '#F3ECE6',
  },
  titleServices: {
    marginBottom: 25,
    fontFamily: 'Futura PT Demi',
    textAlign: 'center',
    color: '#000000',
    fontSize: 20,
    letterSpacing: 0.3,
  },
  containerSwiper: {
    height: 260,
  },
  // Estilos personalizados "Librería Swiper"
  paginationStyle: {
    bottom: -5,
  },
  dotStyle: {
    backgroundColor: '#a0a0a0',
    width: 8,
    height: 8,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 4,
  },
  ActiveDotStyle: {
    backgroundColor: '#5B009D',
    width: 8,
    height: 8,
    marginLeft: 4,
    marginRight: 4,
    borderRadius: 4,
  },
  // Estilos personalizados "Librería Swiper" End
  contentServices: {
    width: '100%',
  },
  containerImageServices: {
    width: '50%',
    marginHorizontal: '25%',
    aspectRatio: 1 * 1, // Convertir pixeles de imágen a "Relación Aspecto" 
  },
  imageService: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 200,
    backgroundColor: '#ffffff',
  },
  serviceText: {
    fontFamily: 'Aspira W05 Demi',
    width: '100%',
    textAlign: 'center',
    color: '#000000',
    fontSize: 22,
    letterSpacing: 0.3,
    marginTop: 6,
  },
  buttonScheduleServices: {
    justifyContent: 'center',
    width: '56%',
    height: 55,
    marginTop: 40,
    marginHorizontal: '22%',
    backgroundColor: '#ffffff00',
    borderWidth: 2,
    borderColor: '#29344A'
  },
  buttonScheduleServicesText: {
    fontFamily: 'Aspira W05 Demi',
    color: '#29344A',
    textAlign: 'center',
    fontSize: 17,
    letterSpacing: 0.3,
  },
  containerTextThree: {
    marginTop: 0,
    paddingVertical: 10,
    paddingHorizontal: 25,
  },
  mainTitleThree: {
    marginBottom: 15,
    fontFamily: 'Aspira W05 Demi',
    textAlign: 'center',
    color: '#585858',
    fontSize: 20,
    letterSpacing: 0.3,
  },
  mainTextThree: {
    fontFamily: 'Futura PT Book',
    textAlign: 'center',
    color: '#000000',
    fontSize: 17,
    letterSpacing: 0.3,
  },
});
