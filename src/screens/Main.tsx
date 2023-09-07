import { StyleSheet, View, Image, ScrollView, Text, TouchableOpacity } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HeaderSettingsLogo from '../components/HeaderSettingsLogo';
import LoadingIndicator from '../components/LoadingIndicator';
import AlertWarning from '../components/AlertWarning';
import React, { useEffect, useState } from 'react';
import Swiper from 'react-native-swiper';

type RootStackParamList = {
  Main: undefined;
  Maquillaje: undefined;
  Cabello: undefined;
  Unas: undefined;
  Pestanas: undefined;
  AgendarCita: undefined;
  StackAccount: undefined;
};
type MainProps = NativeStackScreenProps<RootStackParamList, 'Main'>;

const Main = ({ navigation }: MainProps) => {

  // -----------------------------------------------Indicador de carga "Preload"-----------------------------------------------
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);

  // ------------------------Función para validar si usuario está logueado y redirigir a "Agendar cita"------------------------
  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken'); // Obtener el token del AsyncStorage
      if (token) {
        navigation.navigate('AgendarCita'); // Si hay token, el usuario está logueado
      } else {
        setRequiredLoginVisible(true); // Muestra alerta "Inicio de sesión requerido"
      }
    } catch (error) {
      console.error(error);
    }
  }
  // ----------------------------------------Función alerta "Inicio de sesión requerido"---------------------------------------
  const [requiredLoginVisible, setRequiredLoginVisible] = useState(false);

  const handleCloseRequiredLogin = () => {
    setRequiredLoginVisible(false);
    navigation.navigate('StackAccount')
  };
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
    'Uñas',
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

          <TouchableOpacity
            style={styles.buttonSchedule}
            onPress={checkLogin}
          >
            <Text style={styles.buttonScheduleText}>RESERVA TU CITA</Text>
          </TouchableOpacity>

        </View>

        <View style={styles.containerMain}>

          <View style={styles.contentMain}>

            <View style={styles.separator}></View>

            <View style={styles.containerText}>
              <Text style={styles.mainTitle}>PASIÓN POR LA BELLEZA</Text>
              <Text style={[styles.mainText, { marginBottom: 20 }]}>
                En Vanidosa SPA y Belleza, somos profesionales apasiondos por el arte de la belleza y el cuidado personal, explora nuestra amplia gama de servicios diseñados para ti, estamos compromrtidos y dispuestos a brindarte la mejor atención.
              </Text>
            </View>

            <View style={styles.containerServices}>
              <Text style={[styles.mainTitle, { marginTop: 0, marginBottom: 30 }]}>NUESTROS SERVICIOS</Text>

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

            <TouchableOpacity
              style={styles.buttonScheduleServices}
              onPress={checkLogin}
            >
              <Text style={styles.buttonScheduleServicesText}>AGENDA TU CITA</Text>
            </TouchableOpacity>

            <View style={styles.separator}></View>

            <View style={styles.containerText}>
              <Text style={styles.mainTitle}>PERFECCIÓN EN BELLEZA Y CUIDADO PERSONAL</Text>
              <Text style={styles.mainText}>
                Descubre la excelencia en cuidado personal en Vnidosa SPA y belleza. Fusionamos la innovación estética con técnicas vanguardistas. Nuestro equipo de estilistas altamente calificados te brindará una experiencia inolvidable.
              </Text>
            </View>

            <View style={{ width: '80%', marginTop: 40, marginHorizontal: '10%', borderBottomWidth: 1, borderColor: '#9e9e9e', }}></View>

            <View style={styles.containerImageSpa}>
              <Image style={styles.imageSpa} source={require('../../android/assets/img/main/spa.png')} />
            </View>


            <View style={styles.containerText}>
              <Text style={styles.mainTitle}>ACERCA DE VANIDOSA SPA Y BELLEZA</Text>
              <Text style={[styles.mainText]}>
                Vanidosa SPA y Belleza es un salón especializado en ofrecer servicios de alte calidad en el área de la belleza y cuidado personal. Cuenta con un equipo de profesionales altamente calificados, dedicados a resaltar la belleza en su máxima expresión. Nuestro enfoque abarca mucho más que un salón de belleza.
              </Text>
            </View>

          </View>

        </View>

        {/* -----------------------------------Mostrar alerta "Inicio de sesión requerido"------------------------------------- */}
        <AlertWarning
          visible={requiredLoginVisible}
          onCloseWarning={handleCloseRequiredLogin}
          title='Inicio de sesión.'
          message='Es necesario iniciar sesión para agendar una cita.'
          buttonStyle={{ width: 70 }}
          buttonText='OK'
        />
        {/* ------------------------------------------------------------------------------------------------------------------- */}

      </ScrollView>

    </>

  );

};

export default Main;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentImageMain: {
    width: '100%',
    marginBottom: 8,
    aspectRatio: 1 * 1, // Convertir pixeles de imágen a "Relación Aspecto" 
  },
  imageMain: {
    width: '100%',
    height: '100%',
  },
  buttonSchedule: {
    position: 'absolute',
    justifyContent: 'center',
    width: '60%',
    height: 45,
    bottom: 25,
    marginHorizontal: '20%',
    backgroundColor: '#e00083aa',
  },
  buttonScheduleText: {
    fontFamily: 'Aspira W05 Demi',
    color: '#ffffff',
    textAlign: 'center',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  containerMain: {
    width: '100%',
    marginBottom: 30,
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
    borderColor: '#5B009D',
    borderBottomWidth: 2,
  },
  containerText: {
    paddingHorizontal: 25,
  },
  mainTitle: {
    marginTop: 25,
    marginBottom: 20,
    fontFamily: 'Futura PT Demi',
    textAlign: 'center',
    color: '#585858',
    fontSize: 18,
    letterSpacing: 0.3
  },
  mainText: {
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
    bottom: -2,
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
    color: '#5e5e5e',
    fontSize: 18,
    letterSpacing: 0.3,
    marginTop: 8,
  },
  buttonScheduleServices: {
    justifyContent: 'center',
    width: '60%',
    height: 50,
    marginTop: 30,
    marginBottom: 5,
    marginHorizontal: '20%',
    backgroundColor: '#ffffff00',
    borderWidth: 2,
    borderColor: '#E00083'
  },
  buttonScheduleServicesText: {
    fontFamily: 'Aspira W05 Demi',
    color: '#29344A',
    textAlign: 'center',
    fontSize: 15,
    letterSpacing: 0.3,
  },
  containerImageSpa: {
    alignItems: 'center',
    marginTop: 30,
    marginBottom: -10,
  },
  imageSpa: {
    width: 80,
    height: 51,
  },
});
