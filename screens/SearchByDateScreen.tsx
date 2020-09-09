import React, {useState} from 'react';
import styled from 'styled-components/native';
import { Input } from 'react-native-elements';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Switch, TouchableHighlight, TouchableOpacity } from 'react-native-gesture-handler';
import AirportSelectModal from '../components/AirportSelectModal'



const SearchContainer = styled.View`
  flex: 1;    
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
  
  // If user pressed on destination field  
  const [isDestination, setIsDestination] = useState<boolean>(false)    
  const [modalVisible, setModalVisible] = useState<boolean>(false)    
  const [searchParams, setSearchParams] = useState<SearchParams>({
    departureAirport: '',
    destinationAirport: '',
    departureAirportId: '',
    destinationAirportId: '',
    departureDate: 'anytime',
    returnDate: 'anytime',
    searchType: 'browsedates'
  })    

  const search = () => {
    navigation.navigate('Results', {
        searchParams: searchParams
    })
  }
  

  const selectAirport = (placeId : string, placeName : string) => {      
      setModalVisible(false)
      if (isDestination) {
        setSearchParams({...searchParams, destinationAirportId: placeId, destinationAirport: placeName})
      } else {
        setSearchParams({...searchParams, departureAirportId: placeId, departureAirport: placeName})
      }      
  }   

  return (
    <SearchContainer>      
      <AirportSelectModal 
        modalVisible={modalVisible} 
        setModalVisible={setModalVisible} 
        selectAirport={selectAirport} />     
      

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

      
      <Button title="Search" onPress={search} />            

    </SearchContainer>
  );
};



export default SearchScreen;