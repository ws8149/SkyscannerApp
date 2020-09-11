import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { Switch } from 'react-native-gesture-handler';
import AirportSelectModal from '../components/AirportSelectModal'
import CalendarModal from '../components/CalendarModal'

import {
  SearchContainer, SwitchContainer,
  TitleText, SwitchText, PrimaryButton,
  CalendarField, CalendarFieldText
} from '../styles/index'

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
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(false)
    
  const [searchParams, setSearchParams] = useState<SearchParams>({
    departureAirport: '',
    destinationAirport: '',
    departureAirportId: '',
    destinationAirportId: '',
    departureDate: '',
    returnDate: '',
    searchType: 'browsequotes'
  })

  const validateForm = () => {    
    if (searchParams.departureAirport === '') { return false}
    if (searchParams.destinationAirport === '') { return false}
    if (searchParams.departureDate === '') { return false}    
    return true
  }

  useEffect(() => {
    console.log("checking if search params is valid")
    let formIsValid = validateForm()
    if (formIsValid) {
      setButtonIsDisabled(false)
    } else {
      setButtonIsDisabled(true)
    }
  }, [searchParams])

  const search = () => {
    navigation.navigate('Results', {
      searchParams: searchParams
    })
  }
  

  const toggleSwitch = () => {
    setIsOneWay(prevState => !prevState)
    setSearchParams({ ...searchParams, returnDate: '' })
  }

  return (
    <SearchContainer>

      <TitleText> Looking for cheap flights? </TitleText>

      <AirportSelectModal        
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <CalendarModal        
        isOneWay={isOneWay}
        searchParams={searchParams}
        setSearchParams={setSearchParams}
      />

      <SwitchContainer>
        <SwitchText>One Way</SwitchText>
        <Switch
          trackColor={{ false: "white", true: "dodgerblue" }}
          onValueChange={toggleSwitch}
          value={isOneWay}
        />
      </SwitchContainer>

      <PrimaryButton title="Search" onPress={search} disabled={buttonIsDisabled} />

    </SearchContainer>
  );
};



export default SearchScreen;