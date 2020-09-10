import React, {useState, useEffect} from 'react';
import { View, Alert } from 'react-native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
import AirportSelectModal from '../components/AirportSelectModal'
import CalendarModal from '../components/CalendarModal'

import { SearchContainer, SwitchContainer, 
        TitleText, SwitchText, PrimaryButton } from '../styles/index'

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
    let isValidForSearch = true;
    if (searchParams.departureAirport === '') { isValidForSearch = false }
    if (searchParams.destinationAirport === '') { isValidForSearch = false }
    if (searchParams.departureDate === '') { isValidForSearch = false }
    
    if (isValidForSearch) {
      navigation.navigate('Results', {
        searchParams: searchParams
      })
    } else {
      Alert.alert('Please ensure fields are valid')
    }
    
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
        selectDate={selectDate}
        isReturnDate={isReturnDate}
        />      

      <TitleText> Looking for cheap flights? </TitleText>
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
          trackColor={{ false: "white", true: "dodgerblue" }}          
          onValueChange={toggleSwitch}
          value={isOneWay}          
        />           
      </SwitchContainer>                  

      <PrimaryButton title="Search" onPress={search} />          

    </SearchContainer>
  );
};



export default SearchScreen;