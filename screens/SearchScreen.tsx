// components/Hello.tsx
import React, {useState} from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { NavigationContainer } from '@react-navigation/native';

const SearchContainer = styled.View`
  flex: 1;    
`

const ButtonContainer = styled.View`  
  flex-direction: row;  
  justify-content: space-evenly;  
`

const StyledInput = styled(Input).attrs({
  textAlign: 'right',  
})``;




const SearchScreen: React.FC = ({navigation}) => {   
  
  const [state, setState] = useState({
    departureAirport: '',
    destinationAirport: '',
    departureDate: '',
    returnDate: '',
  })  

  const search = () => {
    navigation.navigate('Results', {
        state: state
    })
  }

  return (
    <SearchContainer>      
      <Input         
        placeholder='Departure From' 
        onChangeText={text => setState({...state, departureAirport: text})}/>        
      <Input 
        placeholder='Destination'
        onChangeText={text => setState({...state, destinationAirport: text})}/>                
      <Input 
        placeholder='Departure Date'
        onChangeText={text => setState({...state, departureDate: text})}/>        
      <Input 
        placeholder='Return Date'
        onChangeText={text => setState({...state, returnDate: text})}/>        
      
      <Button title="Search" onPress={search} />
      
    </SearchContainer>
  );
};



export default SearchScreen;