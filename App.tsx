import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import StackTabButtom from './src/navigation/StackTabButtom';
import { NavigationContainer } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';
import StackAccountHeader from './src/navigation/StackAccountHeader';
import { StyleSheet, TouchableOpacity } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

const App = () => {

  useEffect(() => { changeNavigationBarColor('#ffffff'); }, []);

  const [useStackNavigation, setUseStackNavigation] = useState(true);
  const [showBottomTabs, setShowBottomTabs] = useState(true);

  const handleIconPress = () => {
    setUseStackNavigation(prevState => !prevState);
    setShowBottomTabs(!showBottomTabs);
  };

  const iconName = showBottomTabs ? 'person-circle-outline' : 'close-outline';
  const iconSize = iconName === 'person-circle-outline' ? 30 : 40;
  const AccountIconStyle = iconName === 'person-circle-outline'
    ? { ...styles.AccountIcon, top: -1, left: 0 }
    : { ...styles.AccountIcon, top: -6, left: -5 };

  return (

    <NavigationContainer>

      <TouchableOpacity style={styles.contentAccountIcon} onPress={handleIconPress}>
        <Ionicons style={AccountIconStyle} name={iconName} size={iconSize} />
      </TouchableOpacity>

      {useStackNavigation ? <StackTabButtom /> : <StackAccountHeader />}

    </NavigationContainer>

  );

}

export default App;

// ********** Estilos CSS **********
const styles = StyleSheet.create({
  contentAccountIcon: {
    position: 'absolute',
    width: 32,
    height: 32,
    top: 21,
    right: 28,
    zIndex: 1,
  },
  AccountIcon: {
    color: '#7e7e7e',
  },
});