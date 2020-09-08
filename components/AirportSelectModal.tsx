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

const SelectContainer = styled.View`
    margin-top: 50px;
`

const AirportSelectModal: React.FC = ({modalVisible,setModalVisible}) => {
    const foo = ['a','b','c','d','e','f','g','h','i','j','k','2','4','5','1','1','1','1','1','1','1'];
    const [airportData, setAirportData] = useState();
    const [searchResults, setSearchResults] = useState();

    const filterAirports = (text: string) => {
        
    }

    const renderItem = ({item}) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>
                    Kuala Lumpur Airport
                </ListItem.Title>                                      
            </ListItem.Content>
        </ListItem>
    )


    const keyExtractor = (item,index) => index.toString()

    return (                
        <Overlay isVisible={modalVisible} fullScreen={true}>
            <SelectContainer>
                <SearchBar 
                    placeholder="Type here.."
                    value={''}
                    onChangeText={text => filterAirports(text)}
                />
                <FlatList
                            keyExtractor={keyExtractor}
                            data={foo}
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
