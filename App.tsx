// components/Hello.tsx
import React, {useState} from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';



export interface Props {
  name: string;  
}

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




const App: React.FC<Props> = (props) => {
  
  const [departureAirport, setDepartureAirport] = useState('')        
  const [destinationAirport, setDestinationAirport] = useState('')
  const [departureDate, setDepartureDate] = useState('')
  const [returnDate, setReturnDate] = useState('')  

  return (
    <SearchContainer>      
      <Input         
        placeholder='Departure From' 
        onChangeText={text => setDepartureAirport(text)}/>        
      <Input 
        placeholder='Destination'
        onChangeText={text => setDestinationAirport(text)}
      />            
      <Input 
        placeholder='Departure Date'
        onChangeText={text => setDepartureDate(text)}/>
      <Input 
        placeholder='Return Date'
        onChangeText={text => setReturnDate(text)}/>
      
      <Button title="Search"/>
      
    </SearchContainer>
  );
};



export default App;