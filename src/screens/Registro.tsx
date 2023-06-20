import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { Image, Modal, SafeAreaView, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ButtonPrimary from '../components/ButtonPrimary';
import ButtonSecondary from '../components/ButtonSecondary';
import Ionicons from 'react-native-vector-icons/Ionicons';
import CustomHeaderReturn from '../components/CustomHeaderReturn';
import CheckBox from '@react-native-community/checkbox';
import { RadioButton } from 'react-native-paper';
import TermsAndConditionsModal from '../components/TermsAndConditionsModal';

type RootStackParamList = {
  Login: undefined;
  Registro: undefined;
};
type RegistroProps = NativeStackScreenProps<RootStackParamList, 'Registro'>;

const Registro = ({ navigation }: RegistroProps) => {

  // --------------------------Estado de los "Inputs"--------------------------
  const [nombre, setNombre] = React.useState('');
  const [apellidos, setApellidos] = React.useState('');
  const [documento, setDocumento] = React.useState('');
  const [direccion, setDireccion] = React.useState('');
  const [telefono, setTelefono] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setContrasena] = React.useState('');
  const [confirmarPassword, setConfirmarContrasena] = React.useState('');
  // --------------------------------------------------------------------------

  // ----------------------Mostrar y ocultar "Contraseña"----------------------
  const [showPassword1, setShowPassword1] = useState(false);
  const [showPassword2, setShowPassword2] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [acceptTerms, setacceptTerms] = useState(false)
  const togglePasswordVisibility1 = () => {
    setShowPassword1(!showPassword1);
  };
  const togglePasswordVisibility2 = () => {
    setShowPassword2(!showPassword2);
  };
  // --------------------------------------------------------------------------

  // Lógica "Imput Select Modal" "Tipo de documento"
  const tipoDocumentoOptions = [
    { label: 'Cédula de extranjería', value: 'Cédula de extranjería' },
    { label: 'Cédula de ciudadanía', value: 'Cédula de ciudadanía' },
    { label: 'Tarjeta de identidad', value: 'Tarjeta de identidad' },
  ];

  const [selectModalVisible, setSelectModalVisible] = useState(false);
  const [selectedTipoDocumento, setSelectedTipoDocumento] = useState('');

  const handleOpenSelectModal = () => {
    setSelectModalVisible(true);
  };

  const handleSelectTipoDocumento = (value: string) => {
    setSelectedTipoDocumento(value);
    setTimeout(() => {
      setSelectModalVisible(false);
    }, 500); // Cambia el valor 2000 a la cantidad de milisegundos que deseas esperar antes de ocultar el modal
  };
  // --------------------------------------------------------------------------

  // Controla la visibilidad del "Modal" en función del valor de "acceptTerms"
  const handleAcceptTerms = () => {
    setacceptTerms(!acceptTerms);
  };

  useEffect(() => {
    if (acceptTerms) {
      setModalVisible(true);
    } else {
      setModalVisible(false);
    }
  }, [acceptTerms]);
  // --------------------------------------------------------------------------

  return (

    <>

      <CustomHeaderReturn title="Registro" />

      <ScrollView style={styles.contentForm}>

        <View style={styles.contentLogoAccount}>
          <Image style={styles.logoAccount} source={require('../../android/assets/img/logo.png')} />
        </View>

        <SafeAreaView>

          <View>
            <Ionicons style={styles.iconForm} name='person-outline' />
            <TextInput
              style={styles.input}
              placeholder='Nombre'
              placeholderTextColor='#000000'
              onChangeText={setNombre}
              value={nombre}
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='people-outline' />
            <TextInput
              style={styles.input}
              placeholder='Apellidos'
              placeholderTextColor='#000000'
              onChangeText={setApellidos}
              value={apellidos}
            />
          </View>

          {/* -------------------------------Campo "Tipo de documento"------------------------------- */}
          <TouchableOpacity style={styles.selectInputContainer} onPress={handleOpenSelectModal}>
            <Ionicons style={styles.selectIconForm} name="card-outline" />
            <Text style={styles.selectInput}>{selectedTipoDocumento ? selectedTipoDocumento : 'Tipo de documento'}</Text>
          </TouchableOpacity>

          {/* --------------------------"Modal" opciones "Tipo de documento"------------------------- */}
          <Modal visible={selectModalVisible} animationType="slide" transparent={true}>
            <View style={styles.selectModalContainer}>
              <View style={styles.selectModalContent}>
                <Text style={styles.modalTitle}>Seleccione tipo de documento</Text>
                {tipoDocumentoOptions.map((option) => (
                  <TouchableOpacity
                    key={option.value}
                    style={styles.selectOption}
                    onPress={() => handleSelectTipoDocumento(option.value)}
                  >
                    <Text style={styles.selectOptionText}>{option.label}</Text>
                    <RadioButton
                      value={option.value}
                      status={selectedTipoDocumento === option.value ? 'checked' : 'unchecked'}
                      onPress={() => handleSelectTipoDocumento(option.value)}
                      uncheckedColor='#FFFFFF'
                      color='#E00083'
                    />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </Modal>
          {/* --------------------------------------------------------------------------------------- */}

          <View>
            <Ionicons style={styles.iconForm} name='card-outline' />
            <TextInput
              style={styles.input}
              placeholder='Documento'
              placeholderTextColor='#000000'
              onChangeText={(text) => {
                // Validación para campo númerico
                const numericValue = text.replace(/[^0-9]/g, '');
                setDocumento(numericValue);
              }}
              value={documento}
              keyboardType='numeric'
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='home-outline' />
            <TextInput
              style={styles.input}
              placeholder='Dirección'
              placeholderTextColor='#000000'
              onChangeText={setDireccion}
              value={direccion}
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='call-outline' />
            <TextInput
              style={styles.input}
              placeholder='Teléfono'
              placeholderTextColor='#000000'
              onChangeText={(text) => {
                // Validación para campo númerico
                const numericValue = text.replace(/[^0-9]/g, '');
                setTelefono(numericValue);
              }}
              value={telefono}
              keyboardType='numeric'
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='at-sharp' />
            <TextInput
              style={styles.input}
              placeholder='E-mail'
              placeholderTextColor='#000000'
              onChangeText={setEmail}
              value={email}
              autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
              keyboardType='email-address'
            />
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='lock-closed-outline' />
            <TextInput
              style={styles.input}
              placeholder='Contraseña'
              placeholderTextColor='#000000'
              onChangeText={setContrasena}
              value={password}
              autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
              secureTextEntry={!showPassword1} // Oculta y muestra carácteres de contraseña
            />
            {password !== '' && ( // Código cambio de icono de la contraseña
              <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibility1}>
                <Ionicons style={styles.iconFormRight} name={showPassword1 ? 'eye-off-sharp' : 'eye-sharp'} />
              </TouchableOpacity>
            )}
          </View>

          <View>
            <Ionicons style={styles.iconForm} name='lock-closed-outline' />
            <TextInput
              style={styles.input}
              placeholder='Confirmar contraseña'
              placeholderTextColor='#000000'
              onChangeText={setConfirmarContrasena}
              value={confirmarPassword}
              autoCapitalize='none' // Evita que la primera letra ingresada sea mayúscula
              secureTextEntry={!showPassword2} // Oculta y muestra carácteres de contraseña
            />
            {confirmarPassword !== '' && ( // Código cambio de icono de la contraseña
              <TouchableOpacity style={styles.contentIconFormRight} onPress={togglePasswordVisibility2}>
                <Ionicons style={styles.iconFormRight} name={showPassword2 ? 'eye-off-sharp' : 'eye-sharp'} />
              </TouchableOpacity>
            )}
          </View>

          {/* -----------------Código "CheckBox" "Política de privacidad y Términos"----------------- */}
          <View style={styles.checkboxAcceptTerms}>
            <CheckBox
              disabled={false}
              value={acceptTerms}
              onValueChange={handleAcceptTerms}
              tintColors={{ true: '#5B009D', false: '#7e7e7e' }} />
            <View style={styles.containerAcceptTerms}>

              <View style={styles.contentAcceptTerms}>
                <Text style={styles.acceptTermsText}>He leído y acepto la </Text>
                <Text style={styles.textTermsConditions}>Política de Privacidad</Text>
              </View>

              <View style={styles.contentAcceptTerms}>
                <Text style={styles.acceptTermsText}>y </Text>
                <Text style={styles.textTermsConditions}>Términos y Condiciones</Text>
              </View>

            </View>
          </View>
          {/* --------------------------------------------------------------------------------------- */}

          <TermsAndConditionsModal modalVisible={modalVisible} setModalVisible={setModalVisible} />

          <View style={{ marginTop: 30 }}>
            <ButtonPrimary
              onPress={() => { }} // onPress vacío, sin funcionalidad
              title={'CREAR CUENTA'}
              backgroundColor={'#5B009D'}
              color={'#FFFFFF'}
              borderRadius={0} />
          </View>

          <View style={styles.separator}></View>

          <View style={{ marginBottom: 30 }}>
            <ButtonSecondary
              onPress={() => navigation.navigate('Login')}
              title={'REGRESAR'}
              backgroundColor={'#00000000'}
              color={'#E00083'}
              borderRadius={0} />
          </View>

        </SafeAreaView>

      </ScrollView>

    </>

  );

};

export default Registro;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentForm: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 30,
  },
  contentLogoAccount: {
    marginVertical: 20,
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoAccount: {
    width: 120,
    height: 72,
  },
  iconForm: {
    fontSize: 20,
    position: 'absolute',
    top: 21,
    left: 6,
    color: '#000000',
    zIndex: 1,
  },
  contentIconFormRight: {
    position: 'absolute',
    top: 21,
    right: 8,
  },
  iconFormRight: {
    fontSize: 22,
    color: '#4E4E4E',
  },
  input: {
    height: 48,
    marginVertical: 8,
    paddingLeft: 32,
    backgroundColor: '#E6E6E6',
    fontWeight: '400',
    letterSpacing: 0.5,
  },
  separator: {
    borderColor: '#D3D3D3',
    borderBottomWidth: 1,
    marginVertical: 20,
  },
  checkboxAcceptTerms: {
    flexDirection: 'row',
    marginTop: 10,
  },
  containerAcceptTerms: {
    marginLeft: 10,
  },
  contentAcceptTerms: {
    flexDirection: 'row',
  },
  acceptTermsText: {
    color: '#4E4E4E'
  },
  textTermsConditions: {
    color: '#5B009D',
  },
  // Estilos "Input Select" "Tipo de documento"
  selectInputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
    height: 48,
    backgroundColor: '#E6E6E6',
    borderRadius: 5,
  },
  selectIconForm: {
    position: 'absolute',
    top: 13,
    left: 6,
    color: '#000000',
    fontSize: 20,
  },
  selectInput: {
    paddingLeft: 32,
    color: '#000000',
  },
  // Estilos "Modal" "Seleccione Tipo de documento"
  selectModalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  selectModalContent: {
    backgroundColor: '#3F3F3F',
    borderRadius: 5,
  },
  modalTitle: {
    paddingVertical: 16,
    paddingRight: 30,
    paddingLeft: 15,
    color: '#FFFFFF',
    fontSize: 18,
    letterSpacing: 0.6,
    fontWeight: 'bold',
  },
  selectOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderColor: '#7A7A7A'
  },
  selectOptionText: {
    color: '#FFFFFF',
    fontSize: 16,
    letterSpacing: 0.6,
    fontWeight: '400',
  },
});