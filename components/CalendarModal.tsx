import React, { Component, useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-native-calendars'
import { Button, Overlay, SearchBar, ListItem } from 'react-native-elements';
import styled from 'styled-components';


const SelectContainer = styled.View`
    
`

const CalendarModal: React.FC = ({calendarVisible,setCalendarVisible}) => {        
    const [searchResults, setSearchResults] = useState();
    const [searchText, setSearchText] = useState('');         
    
    const handleClose = () => {
        setCalendarVisible(false);        
    }           
    return (                
        <Overlay isVisible={calendarVisible} >            
            <SelectContainer>
                <Calendar/>
                <Button title="Close" onPress={handleClose} />
            </SelectContainer>
        </Overlay>

    )
}

export default CalendarModal;

