import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import ButtonSecondary from '../components/ButtonSecondary';
import React from 'react';

type RootStackParamList = {
  AgendarCita: undefined;
  Maquillaje: undefined;
};
type MaquillajeProps = NativeStackScreenProps<RootStackParamList, 'Maquillaje'>;

const Maquillaje = ({ navigation }: MaquillajeProps) => {

  return (
    <>
      <HeaderSettingsReturn navigation={navigation} title="Maquillaje" />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.contentHair}>

          <View style={styles.containerDescriptionImg}>
            <Image style={styles.descriptionImg} source={require('../../android/assets/img/categorias/maquillaje.png')} />
          </View>

          <Text style={styles.descriptionTitle}>Maquillaje</Text>

          <Text style={styles.descriptionText}>
            Descubre un nuevo nivel de expresión personal a través del arte del maquillaje. Diseñado para elevar la confianza y realzar la autenticidad, te ofrecemos la oportunidad de crear looks que reflejen tu estilo único. Desde tonos clásicos hasta audaces innovaciones, te proporcionamos las herramientas para brilles con elegancia y sofisticación.
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
                onPress={() => { }}
                width={'100%'}
                height={40}
                backgroundColor={'#00000000'}
                borderColor={'#E00083'}
                borderWidth={1}
                borderRadius={0}
                borderTopLeftRadius={0}
                borderTopRightRadius={0}
                borderBottomRightRadius={0}
                borderBottomLeftRadius={0}
                fontFamily={'Aspira W05 Demi'}
                color={'#E00083'}
                fontSize={14}
                fontWeight={undefined}
                letterSpacing={0.5}
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
                onPress={() => { }}
                width={'100%'}
                height={40}
                backgroundColor={'#00000000'}
                borderColor={'#E00083'}
                borderWidth={1}
                borderRadius={0}
                borderTopLeftRadius={0}
                borderTopRightRadius={0}
                borderBottomRightRadius={0}
                borderBottomLeftRadius={0}
                fontFamily={'Aspira W05 Demi'}
                color={'#E00083'}
                fontSize={14}
                fontWeight={undefined}
                letterSpacing={0.5}
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
                onPress={() => { }}
                width={'100%'}
                height={40}
                backgroundColor={'#00000000'}
                borderColor={'#E00083'}
                borderWidth={1}
                borderRadius={0}
                borderTopLeftRadius={0}
                borderTopRightRadius={0}
                borderBottomRightRadius={0}
                borderBottomLeftRadius={0}
                fontFamily={'Aspira W05 Demi'}
                color={'#E00083'}
                fontSize={14}
                fontWeight={undefined}
                letterSpacing={0.5}
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
                onPress={() => { }}
                width={'100%'}
                height={40}
                backgroundColor={'#00000000'}
                borderColor={'#E00083'}
                borderWidth={1}
                borderRadius={0}
                borderTopLeftRadius={0}
                borderTopRightRadius={0}
                borderBottomRightRadius={0}
                borderBottomLeftRadius={0}
                fontFamily={'Aspira W05 Demi'}
                color={'#E00083'}
                fontSize={14}
                fontWeight={undefined}
                letterSpacing={0.5}
                title={'AGENDAR CITA'}
              />
            </View>

          </View>

        </View>
      </ScrollView>
    </>
  );
};

export default Maquillaje;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f5f5f5',
  },
  contentHair: {
    width: '94%',
    marginHorizontal: '3%',
    backgroundColor: '#f5f5f5',
  },
  containerDescriptionImg: {
    width: '100%',
    aspectRatio: 1 * 1, // Convertir pixeles de imágen a "Relación Aspecto" 
  },
  descriptionImg: {
    width: '100%',
    height: '100%',
  },
  descriptionTitle: {
    marginVertical: 20,
    paddingHorizontal: 12,
    fontFamily: 'Aspira W05 Bold',
    color: '#000000',
    fontSize: 24,
    letterSpacing: 0.3,
  },
  descriptionText: {
    marginBottom: 30,
    paddingHorizontal: 12,
    fontFamily: 'Aspira W05 Regular',
    color: '#000000',
    fontSize: 16,
    letterSpacing: 0.3,
  },
  separator: {
    width: '80%',
    marginHorizontal: '10%',
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
    width: '94%',
    marginVertical: 12,
    marginHorizontal: '3%',
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
    fontWeight: '600',
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
    fontFamily: 'Futura PT Medium',
    color: '#333333',
    fontSize: 16,
    letterSpacing: 0.3,
    textAlign: 'center',
  },
});
