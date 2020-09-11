// components/Hello.tsx
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SearchScreen from './screens/SearchScreen'
import ResultsScreen from './screens/ResultsScreen'
import { ActivityIndicator, View } from 'react-native';

const Stack = createStackNavigator();


const App: React.FC = () => {   

  return (    
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen options={{headerShown:false}}name="Search" component={SearchScreen} />
        <Stack.Screen name="Results" component={ResultsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
