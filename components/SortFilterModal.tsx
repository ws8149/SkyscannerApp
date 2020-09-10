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
import { PrimaryButton } from '../styles/index'

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
    showAllFlightsThisMonth : (allFlightsChecked : boolean) => void;
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

    const handleDateBoxCheck = () => {        
        setDateBoxChecked(!dateBoxChecked)
        if (priceBoxChecked) { setPriceBoxChecked(false)}
        sortByDate();
    }

    const handlePriceBoxCheck = () => {
        setPriceBoxChecked(!priceBoxChecked)
        if (dateBoxChecked) { setDateBoxChecked(false) }
        sortByPrice();
    }
    

    const handleAllFlightsCheck = () => {        
        setAllFlightsChecked(!allFlightsChecked);              
        showAllFlightsThisMonth(!allFlightsChecked);
        setPriceBoxChecked(false);
        setDateBoxChecked(false);
    }

    return (                
        <Overlay isVisible={sortFilterVisible} >            
            <View>                 
                <SortFilterText>Show all flights this month</SortFilterText>
                <CheckBox title='Yes' checked={allFlightsChecked} onPress={handleAllFlightsCheck} />
                <SortFilterText>Sort by</SortFilterText>
                <CheckBox title='Date' checked={dateBoxChecked} onPress={handleDateBoxCheck}/>
                <CheckBox title='Price' checked={priceBoxChecked} onPress={handlePriceBoxCheck} />

                <PrimaryButton title="Close" onPress={handleClose} />
            </View>
        </Overlay>

    )
}

export default SortFilterModal;

