import React, { Component, useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,
  Button,
  TouchableOpacity,
  FlatList
} from 'react-native';


import { Overlay, SearchBar, ListItem } from 'react-native-elements';
import styled from 'styled-components';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

const SelectContainer = styled.View`
    
`

interface AirportSelectScreenProps {
    selectAirport: () => void
}


const AirportSelectScreen = ({selectAirport} : AirportSelectScreenProps) => {        
    const [searchResults, setSearchResults] = useState();
    const [searchText, setSearchText] = useState('');  
    const navigation = useNavigation();      
    

    const filterAirports = (text: string) => {
        setSearchText(text)        
        console.log(text)
        if (text.length > 3) {
            axios.get('/autosuggest/v1.0/MY/MYR/en-MY/', { params: {"query": text} }).then( res => {                
                setSearchResults(res.data["Places"])
            }).catch( err => console.log(err) )
        }        
    }    

    const handleSelect = (item) => {
        navigation.navigate('SearchScreen', {
            destinationAirport: item['PlaceName'],
            destinationAirportId: item['PlaceId']
        })
        setSearchText('');
        setSearchResults('');
    }

    
    const renderItem = ({item}) => (
        <TouchableOpacity onPress={()=>handleSelect}>
            <ListItem bottomDivider>
                <ListItem.Content>
                    <ListItem.Title>
                        {item['PlaceName']}
                    </ListItem.Title>                                      
                </ListItem.Content>
            </ListItem>
        </TouchableOpacity>
    )


    const keyExtractor = (item,index) => index.toString()

    return (                
        <SelectContainer>
            <SearchBar 
                placeholder="Type here.."                    
                value={searchText}
                onChangeText={text => filterAirports(text)}                    
            />
            <FlatList
                keyExtractor={keyExtractor}
                data={searchResults}
                renderItem={renderItem}
            />
        </SelectContainer>
    )
}

export default AirportSelectScreen;


