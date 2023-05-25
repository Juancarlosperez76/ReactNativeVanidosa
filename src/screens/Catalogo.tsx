import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { TouchableOpacity, StyleSheet, Text, View, ScrollView, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

type RootStackParamList = {
  Catalogo: undefined;
  Maquillaje: undefined;
  Cabello: undefined;
  Unas: undefined;
  Pestanas: undefined;
  Novias: undefined;
  Quinceanera: undefined;
  // otras rutas de tu aplicación
};
type CatalogoProps = NativeStackScreenProps<RootStackParamList, 'Catalogo'>;

const Catalogo = ({ navigation }: CatalogoProps) => {

  return (
    // La propiedad "contentContainerStyle" en el contenedor "<ScrollView>"
    // junto con "flexGrow: 1" solucionan problemas de Scroll
    <ScrollView contentContainerStyle={styles.container}>
      <View style={{ alignItems: 'center', backgroundColor: '#ffffff' }}>
        <Image style={{ width: '90%', borderRadius: 20, marginTop: 25 }} source={require('../../android/assets/img-main-catalogo.jpg')} />
      </View>
      <View style={styles.contentCatalog}>
        <View style={styles.catalog}>
          <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Maquillaje')}>
            <View style={styles.contentIconCatalogo1}>
              <Ionicons style={styles.iconCatalogo} name="hand-left-outline" />
            </View>
            <Text style={styles.textCategory}>Maquillaje</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Cabello')}>
            <View style={styles.contentIconCatalogo2}>
              <Ionicons style={styles.iconCatalogo} name="planet-outline" />
            </View>
            <Text style={styles.textCategory}>Cabello</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Unas')}>
            <View style={styles.contentIconCatalogo3}>
              <Ionicons style={styles.iconCatalogo} name="gift-outline" />
            </View>
            <Text style={styles.textCategory}>Uñas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Pestanas')}>
            <View style={styles.contentIconCatalogo4}>
              <Ionicons style={styles.iconCatalogo} name="beer-outline" />
            </View>
            <Text style={styles.textCategory}>Pestañas</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Novias')}>
            <View style={styles.contentIconCatalogo5}>
              <Ionicons style={styles.iconCatalogo} name="leaf-outline" />
            </View>
            <Text style={styles.textCategory}>Novias</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.contentCategory} onPress={() => navigation.navigate('Quinceanera')}>
            <View style={styles.contentIconCatalogo6}>
              <Ionicons style={styles.iconCatalogo} name="color-wand-outline" />
            </View>
            <Text style={styles.textCategory}>Quinceañera</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Catalogo;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
  },
  contentCatalog: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  catalog: {
    flexDirection: 'row', // Posisiona elementos en fila
    flexWrap: 'wrap', // Posiciona elementos horixontalmente en varias filas
    justifyContent: 'center',
    backgroundColor: '#ffffff',
  },
  contentCategory: {
    width: 110,
    alignItems: 'center',
    marginHorizontal: 6,
    marginVertical: 40,
  },
  textCategory: {
    color: '#7e7e7e',
    fontSize: 14,
    marginTop: 10,
    fontWeight: '500',
    textAlign: 'center',
  },
  contentIconCatalogo1: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#d7c6f7',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 15,
  },
  contentIconCatalogo2: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#b7fadf',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 15,
  },
  contentIconCatalogo3: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fed2e5',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 15,
  },
  contentIconCatalogo4: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#c3e8ff',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 15,
  },
  contentIconCatalogo5: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#fffec2',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 15,
  },
  contentIconCatalogo6: {
    width: 80,
    height: 80,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: '#ffc4b7',
    borderColor: '#d3d3d3',
    borderWidth: 1,
    borderRadius: 15,
  },
  iconCatalogo: {
    fontSize: 35,
    color: '#5e5e5e',
  },
});
