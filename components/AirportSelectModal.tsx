import React, { Component, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,  
  TouchableOpacity,
  FlatList
} from 'react-native';

import { Button, Overlay, SearchBar, ListItem } from 'react-native-elements';
import styled from 'styled-components';
import axios from 'axios';

const SelectContainer = styled.View`
    margin-top: 50px;
`

const AirportSelectModal: React.FC = ({modalVisible,setModalVisible,selectAirport}) => {        
    const [searchResults, setSearchResults] = useState();
    const [searchText, setSearchText] = useState('');         

    const filterAirports = (text: string) => {
        setSearchText(text)        
        console.log(text)
        if (text.length > 3) {
            axios.get('/autosuggest/v1.0/MY/MYR/en-MY/', { params: {"query": text} }).then( res => {                
                setSearchResults(res.data["Places"])
            }).catch( err => console.log(err) )
        }
        
    }    

    const handleClose = () => {
        setModalVisible(false);
        setSearchText('');
        setSearchResults('');
    }    
    
    const renderItem = ({item}) => (
        <TouchableOpacity onPress={()=>{ 
            selectAirport(item['PlaceId'],item['PlaceName'])
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


    const keyExtractor = (item,index) => index.toString()

    return (                
        <Overlay isVisible={modalVisible} fullScreen={true}>            
            <View>
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
                <Button title="Close" onPress={handleClose} />
            </View>
        </Overlay>

    )
}

export default AirportSelectModal;

