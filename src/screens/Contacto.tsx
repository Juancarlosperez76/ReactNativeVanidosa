import { Image, Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import HeaderSettingsReturn from '../components/HeaderSettingsReturn';
import LoadingIndicator from '../components/LoadingIndicator';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, { useEffect, useState } from 'react';

// ----------------------------Código de redirección a la aplicación de "Google Maps" del teléfono----------------------------- 
const latitude = 6.231539; // Latitud del destino
const longitude = -75.597750; // Longitud del destino

const handleMapsPress = () => {
  const query = `${latitude},${longitude}`;
  const url = `https://www.google.com/maps/dir/?api=1&destination=${query}&travelmode=driving`;
  Linking.openURL(url);
};
// ----------------------------------------------------------------------------------------------------------------------------

// -------------------------------Código de redirección a la aplicación de llamadas del teléfono-------------------------------
const phoneNumber = '3117794075';

const handlePhoneCallPress = () => {
  const url = `tel:${phoneNumber}`;
  Linking.openURL(url);
};
// ----------------------------------------------------------------------------------------------------------------------------

// ---------------------------------Código de redirección a Whatsapp con mensaje personalizado---------------------------------
const phoneWharsApp = '3117794075';
const message = 'Bienvenido a Vanidosa SPA, ¿cómo podemos ayudarte?';

const handleWhatsAppPress = () => {
  const encodedMessage = encodeURIComponent(message);
  const url = `whatsapp://send?phone=${phoneWharsApp}&text=${encodedMessage}`;
  Linking.openURL(url);
};
// ----------------------------------------------------------------------------------------------------------------------------

// --------------------------------Código de redirección a la aplicación de Correo del teléfono--------------------------------
const recipientEmail = 'vanidosa22adso@gmail.com';
const emailSubject = 'Asunto del correo';

const handleEmailPress = () => {
  const url = `mailto:${recipientEmail}?subject=${encodeURIComponent(emailSubject)}`;
  Linking.openURL(url);
};
// ----------------------------------------------------------------------------------------------------------------------------

type RootStackParamList = {
  Contacto: undefined;
};
type ContactoProps = NativeStackScreenProps<RootStackParamList, 'Contacto'>;

const Contacto = ({ navigation }: ContactoProps) => {
  const [isLoading, setIsLoading] = useState(true); // Controla la carga del "Preload"

  // -----------------------------------------controla el tiempo que dura el "Preload"-----------------------------------------
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false); // Ocultar el "preload" después de completar la carga o el proceso
    }, 800); // Tiempo de carga simulado (en milisegundos)
  }, []);
  // --------------------------------------------------------------------------------------------------------------------------

  return (

    <View style={styles.generalContainer}>

      <LoadingIndicator isLoading={isLoading} />

      <HeaderSettingsReturn navigation={navigation} title="Contacto" />

      <View style={styles.scrollView}>

        <View style={styles.contentLogoAccount}>
          <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
        </View>

        <View style={styles.contentMain}>

          <View style={styles.contentContactOption}>
            <TouchableOpacity onPress={handleMapsPress}>
              <View style={[styles.contactOption, { marginRight: 8, marginBottom: 8 }]}>
                <Ionicons style={styles.contactOptionIcon} name="map-outline" />
                <View style={styles.contentTitleText}>
                  <Text style={styles.titleContactOption}>NUESTRA SEDE</Text>
                  <Text style={styles.textContactOption}>Carrera 64C # 88 - 16</Text>
                  <Text style={styles.textContactOption}>Barrio Laureles</Text>
                  <Text style={styles.textContactOption}>MEDELLÍN</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContactOption}>
            <TouchableOpacity onPress={handlePhoneCallPress}>
              <View style={[styles.contactOption, { marginLeft: 8, marginBottom: 8 }]}>
                <Ionicons style={styles.contactOptionIcon} name="call" />
                <View style={styles.contentTitleText}>
                  <Text style={styles.titleContactOption}>TELÉFONO</Text>
                  <Text style={styles.textContactOption}>604-4212500</Text>
                  <Text style={styles.textContactOption}>+57 3117795670</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContactOption}>
            <TouchableOpacity onPress={handleWhatsAppPress}>
              <View style={[styles.contactOption, { marginRight: 8, marginTop: 8 }]}>
                <Ionicons style={styles.contactOptionIcon} name="logo-whatsapp" />
                <View style={styles.contentTitleText}>
                  <Text style={styles.titleContactOption}>WHATSAPP</Text>
                  <Text style={styles.textContactOption}>+57 3117795670</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContactOption}>
            <TouchableOpacity onPress={handleEmailPress}>
              <View style={[styles.contactOption, { marginLeft: 8, marginTop: 8 }]}>
                <Ionicons style={styles.contactOptionIcon} name="mail" />
                <View style={styles.contentTitleText}>
                  <Text style={styles.titleContactOption}>E-MAIL</Text>
                  <Text style={styles.textContactOption}>vanidosaspa@gmail.com</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

        </View>
      </View>
    </View>
  );
};

export default Contacto;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  generalContainer: {
    flex: 1,
    width: '100%',
    backgroundColor: '#E5E5E5',
  },
  scrollView: {
    flex: 1,
    backgroundColor: '#E5E5E5',
  },
  contentLogoAccount: {
    width: '86%',
    marginHorizontal: '7%',
    marginVertical: 40,
    backgroundColor: '#E5E5E5',
    alignItems: 'center',
  },
  logoAccount: {
    width: 120,
    height: 72,
  },
  contentMain: {
    flexDirection: 'row', // Posisiona elementos en fila
    flexWrap: 'wrap', // Posiciona elementos horixontalmente en varias filas
    width: '86%',
    marginHorizontal: '7%',
    backgroundColor: '#E5E5E5',
  },
  contentContactOption: {
    width: '50%',
  },
  contactOption: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  contactOptionIcon: {
    fontSize: 50,
    marginVertical: 20,
    color: '#7870e2',
  },
  contentTitleText: {
    height: 100,
    marginBottom: 20,
  },
  titleContactOption: {
    fontFamily: 'Aspira W05 Bold',
    marginBottom: 10,
    fontSize: 17,
    textAlign: 'center',
    color: '#3b3b3b',
  },
  textContactOption: {
    fontFamily: 'Aspira W05 Medium',
    marginBottom: 2,
    textAlign: 'center',
    fontSize: 15,
    color: '#3b3b3b',
  },
});
