import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import StackTabButtom from './src/navigation/StackTabButtom';
import { NavigationContainer } from '@react-navigation/native';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const App = () => {

  useEffect(() => { changeNavigationBarColor('#ffffff'); }, []);

  return (

    <NavigationContainer>
      <StackTabButtom />
    </NavigationContainer>

  );

}

export default App;

// ********** Estilos CSS **********
