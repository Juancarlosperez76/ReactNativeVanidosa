import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import ButtonSecondary from '../components/ButtonSecondary';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LoadingIndicator from '../components/LoadingIndicator';
import AlertWarning from '../components/AlertWarning';

type RootStackParamList = {
  Pestanas: undefined;
  AgendarCita: undefined;
  StackAccount: undefined;
};
type PestanasProps = NativeStackScreenProps<RootStackParamList, 'Pestanas'>;

const Pestanas = ({ navigation }: PestanasProps) => {

  // -----------------------------------------------Indicador de caega "Preload"-----------------------------------------------
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

  return (
    <View style={styles.generalContainer}>

      <HeaderSettingsReturn navigation={navigation} title="Cejas y Pestañas" />

      <LoadingIndicator isLoading={isLoading} />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">

        <View style={styles.containerMainImage}>
          <Image style={styles.mainImage} source={require('../../android/assets/img/categorias/pestanas.png')} />
        </View>

        <View style={styles.contentMain}>

          <Text style={styles.descriptionTitle}>Cejas y Pestañas</Text>

          <Text style={styles.descriptionText}>
            Resalta tu belleza con cejas y pestañas impactantes. Acentuamos tu expresión, realzando tus rasgos con precisión. Desde cejas impecables hasta pestañas que atraen todas las miradas, brindamos la clave para una apariencia cautivadora. Permítenos realzar tu belleza con destreza y un toque innovador. Tus cejas y pestañas son atributos que merecen atención detallada.
          </Text>

          <View style={styles.separator}></View>

          <View style={styles.containerServices}>

            <View style={styles.contentService}>
              <Text style={styles.nameService}>CORTES DE CABELLO</Text>
              <View style={styles.containerBottomLine}>
                <Text style={styles.bottomLine}></Text>
              </View>
              <View style={styles.containerImgService}>
                <Image style={styles.imgService} source={require('../../android/assets/img/servicios/corte.png')} />
              </View>
              <Text style={styles.textService}>DESCUBRE EL PODER DE UN CABELLO DESLUMBRANTE.</Text>

              <ButtonSecondary
                onPress={checkLogin}
                width={'100%'}
                height={40}
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
                color={'#E00083'}
                fontSize={15}
                fontWeight={undefined}
                letterSpacing={0.3}
                title={'AGENDAR CITA'}
              />
            </View>

            <View style={styles.contentService}>
              <Text style={styles.nameService}>PEINADOS</Text>
              <View style={styles.containerBottomLine}>
                <Text style={styles.bottomLine}></Text>
              </View>
              <View style={styles.containerImgService}>
                <Image style={styles.imgService} source={require('../../android/assets/img/servicios/peinado.png')} />
              </View>
              <Text style={styles.textService}>EXPRESA TU ESTILO CON UN LOOK INIGUALABLE</Text>

              <ButtonSecondary
                onPress={checkLogin}
                width={'100%'}
                height={40}
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
                color={'#E00083'}
                fontSize={15}
                fontWeight={undefined}
                letterSpacing={0.3}
                title={'AGENDAR CITA'}
              />
            </View>

            <View style={styles.contentService}>
              <Text style={styles.nameService}>ALISADO</Text>
              <View style={styles.containerBottomLine}>
                <Text style={styles.bottomLine}></Text>
              </View>
              <View style={styles.containerImgService}>
                <Image style={styles.imgService} source={require('../../android/assets/img/servicios/alisado.png')} />
              </View>
              <Text style={styles.textService}>TRANSFORMA TU CABELLO CON UN ALISADO PERFECTO.</Text>

              <ButtonSecondary
                onPress={checkLogin}
                width={'100%'}
                height={40}
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
                color={'#E00083'}
                fontSize={15}
                fontWeight={undefined}
                letterSpacing={0.3}
                title={'AGENDAR CITA'}
              />
            </View>

            <View style={styles.contentService}>
              <Text style={styles.nameService}>COLORACIÓN</Text>
              <View style={styles.containerBottomLine}>
                <Text style={styles.bottomLine}></Text>
              </View>
              <View style={styles.containerImgService}>
                <Image style={styles.imgService} source={require('../../android/assets/img/servicios/tinturado.png')} />
              </View>
              <Text style={styles.textService}>EXPRESA TU ESTILO CON UN CAMBIO DE COLOR ÚNICO</Text>

              <ButtonSecondary
                onPress={checkLogin}
                width={'100%'}
                height={40}
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
                color={'#E00083'}
                fontSize={15}
                fontWeight={undefined}
                letterSpacing={0.3}
                title={'AGENDAR CITA'}
              />
            </View>

          </View>
        </View>
      </ScrollView>

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

    </View>
  );
};

export default Pestanas;

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
  containerMainImage: {
    width: '100%',
    aspectRatio: 1 * 1, // Convertir pixeles de imágen a "Relación Aspecto" 
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  contentMain: {
    width: '86%',
    marginHorizontal: '7%',
    backgroundColor: '#ffffff',
  },
  descriptionTitle: {
    fontFamily: 'Futura PT Medium',
    marginVertical: 20,
    color: '#000000',
    fontSize: 24,
    letterSpacing: 0.3,
  },
  descriptionText: {
    fontFamily: 'Futura PT Book',
    marginBottom: 30,
    color: '#000000',
    fontSize: 17,
    letterSpacing: 0.3,
  },
  separator: {
    width: '86%',
    marginHorizontal: '7%',
    borderColor: '#5e5e5e',
    borderBottomWidth: 1,
  },
  containerServices: {
    flexDirection: 'row', // Posisiona elementos en fila
    flexWrap: 'wrap', // Posiciona elementos horixontalmente en varias filas
    width: '100%',
    marginVertical: 25,
  },
  contentService: {
    marginVertical: 12,
    padding: 15,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000000',
    elevation: 6,
  },
  nameService: {
    fontFamily: 'Aspira W05 Demi',
    textAlign: 'center',
    color: '#000000',
    fontSize: 18,
    letterSpacing: 0.3,
  },
  containerBottomLine: {
    width: '100%',
    alignItems: 'center',
  },
  bottomLine: {
    width: 80,
    height: 5,
    marginBottom: 15,
    borderBottomColor: '#E00083',
    borderBottomWidth: 1,
  },
  containerImgService: {
    width: '100%',
    aspectRatio: 1 * 1.71, // Convertir pixeles de imágen a "Relación Aspecto" 
  },
  imgService: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
  },
  textService: {
    marginTop: 8,
    marginBottom: 15,
    fontFamily: 'Futura PT Book',
    color: '#333333',
    fontSize: 18,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});
