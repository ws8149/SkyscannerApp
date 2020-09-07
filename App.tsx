// components/Hello.tsx
import React, {useState} from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './screens/SearchScreen'
import ResultsScreen from './screens/ResultsScreen'

const Stack = createStackNavigator();


const App: React.FC = () => {   

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
