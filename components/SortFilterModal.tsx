import React, { Component, useState, useEffect, useRef } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Modal,  
  TouchableOpacity,
  Switch,
} from 'react-native';

import { Button, Overlay, CheckBox } from 'react-native-elements';
import styled from 'styled-components';

const SelectContainer = styled.View`    
    margin-top: 50px;    
`
const SwitchContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;  
  margin-bottom: 15px;
`

const OneWaySwitch = styled.Switch`
  
`
const SortFilterText = styled.Text`  
  margin: 10px;
  font-size: 18px;
`



interface SortFilterModalProps {
    sortFilterVisible : boolean;
    setSortFilterVisible : (sortFilterVisible : boolean) => void;
    showAllFlightsThisMonth : () => void;
    sortByPrice : () => void;
    sortByDate : () => void;
}

const SortFilterModal = ({sortFilterVisible,setSortFilterVisible, showAllFlightsThisMonth, sortByDate, sortByPrice} : SortFilterModalProps ) => {            

    const [allFlightsChecked, setAllFlightsChecked] = useState<boolean>(false);
    const [dateBoxChecked, setDateBoxChecked] = useState<boolean>(false);
    const [priceBoxChecked, setPriceBoxChecked] = useState<boolean>(false);

    const handleClose = () => {
        setSortFilterVisible(false);                
    }       

    const handleSortBoxCheck = () => {

    }

    const handleAllFlightsCheck = () => {
        setAllFlightsChecked(prevState => !prevState);              
        showAllFlightsThisMonth();
    }

    return (                
        <Overlay isVisible={sortFilterVisible} >            
            <View>                 
                <SortFilterText>Show all flights this month</SortFilterText>
                <CheckBox title='Yes' checked={allFlightsChecked} onPress={handleAllFlightsCheck} />
                <SortFilterText>Sort by</SortFilterText>
                <CheckBox title='Date' checked={dateBoxChecked}/>
                <CheckBox title='Price' checked={priceBoxChecked} onPress={handleSortBoxCheck} />

                <Button title="Close" onPress={handleClose} />
            </View>
        </Overlay>

    )
}

export default SortFilterModal;

