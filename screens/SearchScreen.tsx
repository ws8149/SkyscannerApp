// components/Hello.tsx
import React, {useState} from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';


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




const SearchScreen: React.FC = () => {   
  const navigation = useNavigation();

  const [searchParams, setState] = useState({
    departureAirport: '',
    destinationAirport: '',
    departureDate: '',
    returnDate: '',
  })  

  const search = () => {
    navigation.navigate('Results', {
        searchParams: searchParams
    })
  }

  return (
    <SearchContainer>      
      <Input         
        placeholder='Departure From (eg: KUL)' 
        onChangeText={text => setState({...searchParams, departureAirport: text})}/>        
      <Input 
        placeholder='Destination (eg: LHR)'
        onChangeText={text => setState({...searchParams, destinationAirport: text})}/>                
      <Input 
        placeholder='Departure Date (YYYY/MM/DD)'
        onChangeText={text => setState({...searchParams, departureDate: text})}/>        
      <Input 
        placeholder='Return Date (YYYY/MM/DD)'
        onChangeText={text => setState({...searchParams, returnDate: text})}/>        
      
      <Button title="Search" onPress={search} />
      
    </SearchContainer>
  );
};



export default SearchScreen;