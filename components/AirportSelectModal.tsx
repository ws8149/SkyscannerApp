import React, { useState, useEffect, useRef } from 'react';
import {    
    View,    
    TouchableOpacity,
    FlatList,
    ActivityIndicator
} from 'react-native';

import { Overlay, SearchBar, ListItem } from 'react-native-elements';
import styled from 'styled-components';
import axios from 'axios';
import { PrimaryButton, CalendarField, CalendarFieldText } from '../styles/index'

const SelectContainer = styled.View`
    flex: 1;
    margin-top: 50px;    
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

interface AirportSelectModalProps {    
    searchParams: SearchParams
    setSearchParams: (searchParams : SearchParams) => void
}

const AirportSelectModal = ({ searchParams, setSearchParams }: AirportSelectModalProps) => {
    
    const [searchResults, setSearchResults] = useState<string>();
    const [searchText, setSearchText] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [selectModalVisible, setSelectModalVisible] = useState<boolean>(false);
    // If user pressed on destination field  
    const [isDestination, setIsDestination] = useState<boolean>(false)

    const filterAirports = (text: string) => {
        setSearchText(text)
        if (text.length > 3) {
            setIsLoading(true);
            getSuggestions(text);
        }
    }

    const getSuggestions = (text: string) => {
        setIsLoading(true);
        axios.get('/autosuggest/v1.0/MY/MYR/en-MY/', { params: { "query": text } }).then(res => {
            setSearchResults(res.data["Places"])
            setIsLoading(false)
        }).catch(err => {
            setIsLoading(false)
            console.log(err)
        })

    }
    



    const selectAirport = (placeId: string, placeName: string) => {

        if (isDestination) {
            
            setSearchParams({ 
                ...searchParams, 
                destinationAirport: placeName,
                destinationAirportId: placeId
            })

        } else {
            setSearchParams({ 
                ...searchParams, 
                departureAirport: placeName,
                departureAirportId: placeId
            })
        }

        setSelectModalVisible(false)

    }

    const handleClose = () => {
        setSelectModalVisible(false);
        setSearchText('');
        setSearchResults('');
    }

    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => {
            selectAirport(item['PlaceId'], item['PlaceName'])
            setSearchText('');
            setSearchResults('');
        }
        }>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>
                        {item['PlaceName']}
                    </ListItem.Title>
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )


    const keyExtractor = (item, index) => index.toString()

    return (
        <View>
            <Overlay isVisible={selectModalVisible} fullScreen={true}>
                <View style={{ flex: 1 }}>
                    <SelectContainer>
                        <SearchBar
                            placeholder="Type here.."
                            value={searchText}
                            onChangeText={text => filterAirports(text)}
                        />

                        {isLoading ? (<View style={{ padding: 10 }}>
                            <ActivityIndicator />
                        </View>
                        )
                            : (
                                <FlatList
                                    keyExtractor={keyExtractor}
                                    data={searchResults}
                                    renderItem={renderItem}
                                    keyboardShouldPersistTaps='handled'
                                />
                            )
                        }

                    </SelectContainer>
                    <PrimaryButton title="Close" onPress={handleClose} />
                </View>
            </Overlay>

            <TouchableOpacity onPress={() => {
                setSelectModalVisible(true)
                setIsDestination(false)
                getSuggestions('Kuala')
            }}>
                <CalendarField>
                    <CalendarFieldText>
                        {searchParams.departureAirport === '' ? 'Departure From (eg: KUL)' : searchParams.departureAirport}
                    </CalendarFieldText>
                </CalendarField>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => {
                setSelectModalVisible(true)
                setIsDestination(true)
                getSuggestions('Kuala')
            }}>
                <CalendarField>
                    <CalendarFieldText>
                        {searchParams.destinationAirport === '' ? 'Destination (eg: LHR)' : searchParams.destinationAirport}
                    </CalendarFieldText>
                </CalendarField>
            </TouchableOpacity>


        </View>

    )
}

export default AirportSelectModal;

