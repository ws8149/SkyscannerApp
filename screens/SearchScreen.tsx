import React, {useState} from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { Text } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Switch, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
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


// Custom created text containers ( not in use )
const AirportSelectContainer = styled.TouchableHighlight`    
  border-bottom-width: 1px;  
  padding: 10px;
  margin: 10px;  
`

const AirportSelectText = styled.Text`
  font-size: 20px;
`




const SearchScreen: React.FC = () => {   
  const navigation = useNavigation();      
  const [isOneWay, setIsOneWay] = useState(false)
  
  // If user pressed on destination field  
  const [isDestination, setIsDestination] = useState(false)   
  // If user pressed on return date field
  const [isReturnDate, setIsReturnDate] = useState(false)   

  const [modalVisible, setModalVisible] = useState(false)  
  const [calendarVisible, setCalendarVisible] = useState(false)
  const [searchParams, setSearchParams] = useState({
    departureAirport: '',
    destinationAirport: '',
    departureAirportId: '',
    destinationAirportId: '',
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

  const selectAirport = (placeId : string, placeName : string) => {      
      setModalVisible(false)
      if (isDestination) {
        setSearchParams({...searchParams, destinationAirportId: placeId, destinationAirport: placeName})
      } else {
        setSearchParams({...searchParams, departureAirportId: placeId, departureAirport: placeName})
      }      
  }

  const selectDate = (date : string) => {      
    setCalendarVisible(false)
    if (isReturnDate) {
      setSearchParams({...searchParams, returnDate: date})
    } else {
      setSearchParams({...searchParams, departureDate: date})
    }      
}

  
  

  return (
    <SearchContainer>      
      <AirportSelectModal modalVisible={modalVisible} setModalVisible={setModalVisible} selectAirport={selectAirport} />
      <CalendarModal calendarVisible={calendarVisible} setCalendarVisible={setCalendarVisible} selectDate={selectDate}/>      

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