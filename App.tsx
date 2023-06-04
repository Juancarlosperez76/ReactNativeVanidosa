import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import StackTabButtom from './src/navigation/StackTabButtom';
import changeNavigationBarColor from 'react-native-navigation-bar-color';

const App = () => {

  useEffect(() => {
    changeNavigationBarColor('#ffffff');
  }, []);

  return (
    <StackTabButtom />
  );
}

export default App;
