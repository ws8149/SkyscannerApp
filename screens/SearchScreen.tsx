import React, {useState, useEffect} from 'react';
import { View, Alert } from 'react-native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Switch, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import { Picker } from '@react-native-community/picker';
import AirportSelectModal from '../components/AirportSelectModal'
import CalendarModal from '../components/CalendarModal'


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

interface SearchParams {
  departureAirport: string,
  destinationAirport: string,
  departureAirportId: string,
  destinationAirportId: string,
  departureDate: string,
  returnDate: string,
  searchType: string
}


const SearchScreen: React.FC = () => {   
  const navigation = useNavigation();      
  const [isOneWay, setIsOneWay] = useState<boolean>(false)
  
  // If user pressed on destination field  
  const [isDestination, setIsDestination] = useState<boolean>(false)   
  // If user pressed on return date field
  const [isReturnDate, setIsReturnDate] = useState<boolean>(false)   

  const [modalVisible, setModalVisible] = useState<boolean>(false)  
  const [calendarVisible, setCalendarVisible] = useState<boolean>(false)
  const [searchParams, setSearchParams] = useState<SearchParams>({
    departureAirport: '',
    destinationAirport: '',
    departureAirportId: '',
    destinationAirportId: '',
    departureDate: '',
    returnDate: '',
    searchType: 'browsequotes'
  })      

  const search = () => {
    console.log(searchParams)
    navigation.navigate('Results', {
        searchParams: searchParams
    })
  }

  const toggleSwitch = () => {
    setIsOneWay(prevState => !prevState) 
    setSearchParams({...searchParams, returnDate: ''})
  }

  const selectAirport = (placeId : string, placeName : string) => {      
      setModalVisible(false)
      if (isDestination) {
        setSearchParams({...searchParams, destinationAirportId: placeId, destinationAirport: placeName})
      } else {
        setSearchParams({...searchParams, departureAirportId: placeId, departureAirport: placeName})
      }      
  }

  const dateIsValid = (date: string) => {
    var selectedDate = new Date(date);
    var currentDate = new Date();    
    var departureDate = new Date('');
    currentDate.setHours(0,0,0,0)
    
    if (currentDate > selectedDate) {      
      return false
    } 

    if (isReturnDate && searchParams.departureDate !== '') {
      // if user selected a return date and departure date is not empty
      var departureDate = new Date(searchParams.departureDate);
      if (departureDate > selectedDate) {         
        return false
      }
    } 
    
    return true
    
  }
 
  const selectDate = (date : string) => {           
    if (dateIsValid(date)) {
      setCalendarVisible(false)
      if (isReturnDate) {            
        setSearchParams({...searchParams, returnDate: date})
      } else {
        setSearchParams({...searchParams, departureDate: date})
      }       
    } else {      
      Alert.alert('Invalid return date')
    }
    
         
  }

  

  return (
    <SearchContainer>      
      <AirportSelectModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        selectAirport={selectAirport} />
      
      <CalendarModal 
        calendarVisible={calendarVisible} 
        setCalendarVisible={setCalendarVisible} 
        selectDate={selectDate}/>      

      <TouchableOpacity onPress={()=>{ 
          setModalVisible(true)
          setIsDestination(false)
        }
      }>
        <Input value={searchParams.departureAirport} placeholder='Departure From (eg: KUL)' disabled={true}/>
      </TouchableOpacity>     
      
      
      <TouchableOpacity onPress={()=>{ 
          setModalVisible(true)
          setIsDestination(true)
        }
      }>
        <Input 
          value={searchParams.destinationAirport}
          placeholder='Destination (eg: LHR)'        
          disabled={true}
        />                
      </TouchableOpacity>

      <TouchableOpacity onPress={()=>{
          setCalendarVisible(true)
          setIsReturnDate(false)
        }}>
        <Input 
          value={searchParams.departureDate}
          placeholder='Departure Date (YYYY/MM/DD)'                              
          disabled={true}
        />
      </TouchableOpacity>        

      { isOneWay ? <View/> : (
        <TouchableOpacity onPress={()=>{
          setCalendarVisible(true)
          setIsReturnDate(true)
        }}>
          <Input 
            value={searchParams.returnDate}
            placeholder='Return Date (YYYY/MM/DD)'        
            disabled={true}
          />
        </TouchableOpacity>        
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