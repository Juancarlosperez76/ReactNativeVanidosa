import React, { useEffect, useState } from 'react';
import { Linking, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeaderSettings from '../components/CustomHeaderSettings';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import LoadingIndicator from '../components/LoadingIndicator';

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

    <>

      <LoadingIndicator isLoading={isLoading} />

      <CustomHeaderSettings navigation={navigation} title="Contacto" />

      <View style={styles.containerContact}>

        <View style={styles.contentContact}>

          <View style={styles.contentContactOption}>
            <TouchableOpacity onPress={handleMapsPress}>
              <View style={styles.contactOption}>
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
              <View style={styles.contactOption}>
                <Ionicons style={styles.contactOptionIcon} name="call" />
                <View style={styles.contentTitleText}>
                  <Text style={styles.titleContactOption}>TELÉFONO{'\n'}DE CONTACTO</Text>
                  <Text style={styles.textContactOption}>604-4212500</Text>
                  <Text style={styles.textContactOption}>+57 3117795670</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          <View style={styles.contentContactOption}>
            <TouchableOpacity onPress={handleWhatsAppPress}>
              <View style={styles.contactOption}>
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
              <View style={styles.contactOption}>
                <Ionicons style={styles.contactOptionIcon} name="mail" />
                <View style={styles.contentTitleText}>
                  <Text style={styles.titleContactOption}>CORREO{'\n'}ELECTRÓNICO</Text>
                  <Text style={styles.textContactOption}>vanidosaspa@gmail.com</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

        </View>

      </View>

    </>

  );

};

export default Contacto;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  containerContact: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 15,
    backgroundColor: '#E5E5E5',
    borderColor: '#ffffff',
  },
  contentContact: {
    flexDirection: 'row', // Posisiona elementos en fila
    flexWrap: 'wrap', // Posiciona elementos horixontalmente en varias filas
  },
  contentContactOption: {
    width: '50%',
  },
  contactOption: {
    margin: 6,
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  contactOptionIcon: {
    fontSize: 50,
    marginVertical: 20,
    color: '#5C54DB',
  },
  contentTitleText: {
    height: 100,
    marginBottom: 20,
  },
  titleContactOption: {
    fontSize: 14,
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '800',
    color: '#3b3b3b',
  },
  textContactOption: {
    marginBottom: 2,
    textAlign: 'center',
    fontSize: 13,
    color: '#3b3b3b',
  },
});
