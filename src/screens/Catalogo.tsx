import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import LoadingIndicator from '../components/LoadingIndicator';
import React, { useEffect, useState } from 'react';

type RootStackParamList = {
  Catalogo: undefined;
  Cabello: undefined;
  Maquillaje: undefined;
  Unas: undefined;
  Depilacion: undefined;
  Pestanas: undefined;
  Piel: undefined;
  Novia: undefined;
  Quinceanera: undefined;
};
type CatalogoProps = NativeStackScreenProps<RootStackParamList, 'Catalogo'>;

const Catalogo = ({ navigation }: CatalogoProps) => {
  const [isLoading, setIsLoading] = useState(true); // Controla la carga del "Preload"

  // -----------------------------------------controla el tiempo que dura el "Preload"-----------------------------------------
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------

  return (

    // "contentContainerStyle" en contenedor "ScrollView" con "flexGrow: 1" solucionan errores de Scroll
    <>
      <LoadingIndicator isLoading={isLoading} />
      <HeaderSettingsReturn navigation={navigation} title="Catálogo" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentImgCatalogo}>
          <Image style={styles.imgCatalogo} source={require('../../android/assets/img/img-catalogo-2.png')} />
        </View>
        <View style={styles.contentCatalog}>

          <View style={styles.catalog}>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Cabello')}>
              <View style={[styles.contentIconCatalogo, { backgroundColor: '#efe7fd' }]}>
                {/* <View style={styles.contentIconCatalogo}> */}
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/cabello.png')} />
              </View>
              <Text style={styles.textCategory}>Cabello</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Maquillaje')}>
              <View style={[styles.contentIconCatalogo, { backgroundColor: '#d0fcea' }]}>
                {/* <View style={styles.contentIconCatalogo}> */}
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/maquillaje.png')} />
              </View>
              <Text style={styles.textCategory}>Maquillaje</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Unas')}>
              <View style={[styles.contentIconCatalogo, { backgroundColor: '#ffe8f2' }]}>
                {/* <View style={styles.contentIconCatalogo}> */}
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/unas.png')} />
              </View>
              <Text style={styles.textCategory}>Uñas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Depilacion')}>
              <View style={[styles.contentIconCatalogo, { backgroundColor: '#d6efff' }]}>
                {/* <View style={styles.contentIconCatalogo}> */}
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/depilacion.png')} />
              </View>
              <Text style={styles.textCategory}>Depilación</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Pestanas')}>
              <View style={[styles.contentIconCatalogo, { backgroundColor: '#fdfdd6' }]}>
                {/* <View style={styles.contentIconCatalogo}> */}
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/cejas-pestanas.png')} />
              </View>
              <Text style={styles.textCategory}>Cejas y{'\n'}Pestañas</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Piel')}>
              <View style={[styles.contentIconCatalogo, { backgroundColor: '#fcdfd9' }]}>
                {/* <View style={styles.contentIconCatalogo}> */}
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/skin-care.png')} />
              </View>
              <Text style={styles.textCategory}>Cuidado de{'\n'}la piel</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Quinceanera')}>
              <View style={[styles.contentIconCatalogo, { backgroundColor: '#efe7fd' }]}>
                {/* <View style={styles.contentIconCatalogo}> */}
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/quiceanera.png')} />
              </View>
              <Text style={styles.textCategory}>Quinceañera</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Novia')}>
              <View style={[styles.contentIconCatalogo, { backgroundColor: '#d6efff' }]}>
                {/* <View style={styles.contentIconCatalogo}> */}
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/novia.png')} />
              </View>
              <Text style={styles.textCategory}>Novia</Text>
            </TouchableOpacity>

          </View>

        </View>
      </ScrollView>
    </>
  );
};

export default Catalogo;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  contentImgCatalogo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop: 10,
    aspectRatio: 1 * 1.67, // Convertir pixeles de imágen a "Relación Aspecto" 
    backgroundColor: '#00000000',
  },
  imgCatalogo: {
    width: '90%',
    height: '90%',
    resizeMode: 'cover',
    borderRadius: 15,
  },
  contentCatalog: {
    width: '86%',
    marginHorizontal: '7%',
    backgroundColor: '#00000000',
  },
  catalog: {
    flexDirection: 'row', // Posisiona elementos en fila
    flexWrap: 'wrap', // Posiciona elementos horixontalmente en varias filas
    justifyContent: 'space-between',
    marginTop: 15,
    backgroundColor: '#00000000',
  },
  contentCategory: {
    alignItems: 'center',
    marginVertical: 20,
  },
  contentIconCatalogo: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 50,
  },
  iconCatalogo: {
    width: 60,
    height: 60,
  },
  textCategory: {
    fontFamily: 'Futura PT Medium',
    height: 44,
    color: '#3d3d3d',
    fontSize: 14,
    marginTop: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
});
