import React, { useState, useEffect } from 'react';
import { View, Alert, Text } from 'react-native';
import { Input } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Switch, TouchableOpacity } from 'react-native-gesture-handler';
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
    setSearchParams({ ...searchParams, returnDate: '' })
  }

  return (
    <SearchContainer>

      <TitleText> Looking for cheap flights? </TitleText>

      <AirportSelectModal        
        searchParams={searchParams}
      />

      <CalendarModal        
        isOneWay={isOneWay}
        searchParams={searchParams}
      />

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