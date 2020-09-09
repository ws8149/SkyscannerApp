import React, { Component, useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-native-calendars'
import { Button, Overlay, SearchBar, ListItem } from 'react-native-elements';
import styled from 'styled-components';


const SelectContainer = styled.View`
    
`

const CalendarModal: React.FC = ({calendarVisible,setCalendarVisible, selectDate}) => {        
    const [searchResults, setSearchResults] = useState();
    const [searchText, setSearchText] = useState('');         
    
    const handleClose = () => {
        setCalendarVisible(false);            
    }           

    const handlePress = (day) => {        
        selectDate(day.dateString)
    }

    return (                
        <Overlay isVisible={calendarVisible} >            
            <SelectContainer>
                <Calendar onDayPress={(day)=>handlePress(day)}/>
                <Button title="Close" onPress={handleClose} />
            </SelectContainer>
        </Overlay>

    )
}

export default CalendarModal;

