import React, { Component, useState, useEffect, useRef } from 'react';
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

const SelectContainer = styled.View`
    margin-top: 50px;
`

const AirportSelectModal: React.FC = ({modalVisible,setModalVisible}) => {    
    const [airportData, setAirportData] = useState();
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

    const selectAirport = (placeId : string) => {
        console.log(placeId)
    }

    const renderItem = ({item}) => (
        <TouchableOpacity onPress={()=>selectAirport(item['PlaceId'])}>
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
        </Overlay>

    )
}

export default AirportSelectModal;

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        marginTop: 22,
        backgroundColor: `rgba(0,0,0,0.6)`       
      },
      modalView:{        
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 15,        
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,        
      },
      modalText: {
        marginBottom: 15,
        textAlign: "center"
      },
      buttonsContainer: {                
        flexDirection: 'row',        
        justifyContent: 'space-around',        
        
      },
      buttons: {          
          flex: 1,
          paddingVertical: 10,          
          backgroundColor: '#0096FA'
      },
      btnText: {
        textAlign: 'center',
        color: 'white'
      }
      
})
