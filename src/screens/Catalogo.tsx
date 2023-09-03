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
    <View style={styles.generalContainer}>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderSettingsReturn navigation={navigation} title="Catálogo" />

      {/* "keyboardShouldPersistTaps="always" evita que el teclado se oculte al hacer clic fuera del campo */}
      <ScrollView style={styles.scrollView} keyboardShouldPersistTaps="always">

        <View style={styles.containerMainImage}>
          <Image style={styles.mainImage} source={require('../../android/assets/img/catalogo/catalogo.png')} />
        </View>

        <View style={styles.contentMain}>
          <View style={styles.catalog}>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Cabello')}>
              <View style={styles.contentIconCatalogo}>
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/cabello.png')} />
              </View>
              <Text style={styles.textCategory}>CABELLO</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Maquillaje')}>
              <View style={styles.contentIconCatalogo}>
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/maquillaje.png')} />
              </View>
              <Text style={styles.textCategory}>MAQUILLAJE</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Unas')}>
              <View style={styles.contentIconCatalogo}>
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/unas.png')} />
              </View>
              <Text style={styles.textCategory}>UÑAS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Depilacion')}>
              <View style={styles.contentIconCatalogo}>
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/depilacion.png')} />
              </View>
              <Text style={styles.textCategory}>DEPILACIÓN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Pestanas')}>
              <View style={styles.contentIconCatalogo}>
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/cejas-pestanas.png')} />
              </View>
              <Text style={styles.textCategory}>CEJAS Y{'\n'}PESTAÑAS</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Piel')}>
              <View style={styles.contentIconCatalogo}>
                <Image style={styles.iconCatalogo} source={require('../../android/assets/img/catalogo/cuidado-piel.png')} />
              </View>
              <Text style={styles.textCategory}>CUIDADO DE PIEL</Text>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default Catalogo;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#ffffff',
  },
  scrollView: {
    flexGrow: 1,
    backgroundColor: '#F3ECE6',
  },
  containerMainImage: {
    display: 'flex',
    width: '100%',
    aspectRatio: 1 * 1.2, // Convertir pixeles de imágen a "Relación Aspecto" 
    backgroundColor: '#00000000',
  },
  mainImage: {
    width: '100%',
    height: '100%',
  },
  contentMain: {
    width: '86%',
    marginHorizontal: '7%',
    backgroundColor: '#F3ECE6',
  },
  catalog: {
    flexDirection: 'row', // Posisiona elementos en fila
    flexWrap: 'wrap', // Posiciona elementos horixontalmente en varias filas
    width: '100%',
    backgroundColor: '#F3ECE6',
    marginBottom: 20,
  },
  contentCategory: {
    width: '33.3%',
    alignItems: 'center',
    marginTop: 40,
  },
  contentIconCatalogo: {
    width: 90,
    height: 90,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderRadius: 50,
  },
  iconCatalogo: {
    width: 55,
    height: 55,
  },
  textCategory: {
    fontFamily: 'Futura PT Medium',
    width: '100%',
    color: '#3d3d3d',
    fontSize: 12,
    marginTop: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
});
