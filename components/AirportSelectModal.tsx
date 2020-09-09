import React, { Component, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,  
  TouchableOpacity,
  FlatList,
  ActivityIndicator
} from 'react-native';

import { Button, Overlay, SearchBar, ListItem } from 'react-native-elements';
import styled from 'styled-components';
import axios from 'axios';

const SelectContainer = styled.View`
    flex: 1;
    margin-top: 50px;    
`

interface AirportSelectModalProps {
    modalVisible : boolean;
    setModalVisible : (modalVisible : boolean) => void;
    selectAirport : () => void;
}

const AirportSelectModal = ({modalVisible,setModalVisible,selectAirport} : AirportSelectModalProps ) => {        
    const [searchResults, setSearchResults] = useState<string>();
    const [searchText, setSearchText] = useState<string>('');   
    const [isLoading, setIsLoading] = useState<boolean>(false);      
    
    const filterAirports = (text: string) => {
        setSearchText(text)                
        if (text.length > 3) {
            setIsLoading(true);
            axios.get('/autosuggest/v1.0/MY/MYR/en-MY/', { params: {"query": text} }).then( res => {                
                setSearchResults(res.data["Places"])
                setIsLoading(false)
            }).catch( err => { 
                setIsLoading(false)
                console.log(err)             
            } )
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
            <View style={{flex:1}}>
                <SelectContainer>                            
                    <SearchBar 
                        placeholder="Type here.."                    
                        value={searchText}
                        onChangeText={text => filterAirports(text)}                    
                    />                    
                    
                    { isLoading ? ( <View style={{padding:10}}>
                                        <ActivityIndicator/>
                                    </View>
                                  )
                                : (
                                    <FlatList
                                        keyExtractor={keyExtractor}
                                        data={searchResults}
                                        renderItem={renderItem}
                                    />                               
                                  )
                    }
                             
                </SelectContainer>
                <Button title="Close" onPress={handleClose} />
            </View>
        </Overlay>

    )
}

export default AirportSelectModal;

