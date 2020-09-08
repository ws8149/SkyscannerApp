// components/Hello.tsx
import React, {useState} from 'react';
import { View, TextInput } from 'react-native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-gesture-handler';


const SearchContainer = styled.View`
  flex: 1;    
`

const ButtonContainer = styled.View`  
  flex-direction: row;  
  justify-content: space-evenly;  
`

const SwitchContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;  
  margin-bottom: 15px;
`

const OneWaySwitch = styled.Switch`
  
`

const SwitchText = styled.Text`
  margin-top: 5px;
  font-size: 18px;
`




const SearchScreen: React.FC = () => {   
  const navigation = useNavigation();
  const [isOneWay, setIsOneWay] = useState(false)
  const [searchParams, setSearchParams] = useState({
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

  const toggleSwitch = () => {
    setIsOneWay(prevState => !prevState) 
    setSearchParams({...searchParams, returnDate: ''})
  }

  return (
    <SearchContainer>      
      <Input         
        placeholder='Departure From (eg: KUL)' 
        onChangeText={text => setSearchParams({...searchParams, departureAirport: text})}/>        
      <Input 
        placeholder='Destination (eg: LHR)'
        onChangeText={text => setSearchParams({...searchParams, destinationAirport: text})}/>                
      <Input 
        placeholder='Departure Date (YYYY/MM/DD)'
        onChangeText={text => setSearchParams({...searchParams, departureDate: text})}/>        
      { isOneWay ? <View/> : (
        <Input 
        placeholder='Return Date (YYYY/MM/DD)'
        onChangeText={text => setSearchParams({...searchParams, returnDate: text})}/>        
      )}      
      <SwitchContainer>
        <SwitchText>One Way</SwitchText>
        <Switch
          trackColor={{ false: "white", true: "blue" }}          
          onValueChange={toggleSwitch}
          value={isOneWay}
          
        />
      </SwitchContainer>
      <Button title="Search" onPress={search} />      
    </SearchContainer>
  );
};



export default SearchScreen;