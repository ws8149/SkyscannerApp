import React, { Component, useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-native-calendars'
import { Button, Overlay, SearchBar, ListItem } from 'react-native-elements';
import { View } from 'react-native';
import styled from 'styled-components';
import { PrimaryButton } from '../styles/index'

import moment from 'moment';

const currentDate = moment().format('YYYY-MM-DD');



interface CalendarModalProps {
    calendarVisible: boolean;
    setCalendarVisible: (calendarVisible : boolean) => void
    selectDate: (date : string) => void
    minDate: string
    isReturnDate: boolean
}

const CalendarModal = ( {calendarVisible,setCalendarVisible, selectDate, 
                         isReturnDate } : CalendarModalProps) => {                    
    
    const [minDate, setMinDate] = useState<string>(moment().format('YYYY-MM-DD'))

    const handleClose = () => {
        setCalendarVisible(false);            
    }           

    const handlePress = (day) => {        
        selectDate(day.dateString)
        // If user previously pressed on departure date field
        if (!isReturnDate) {                                   
            setMinDate(day.dateString)
        }
    }

    return (                
        <Overlay isVisible={calendarVisible} >            
            <View>
                <Calendar 
                    onDayPress={(day)=>handlePress(day)}                    
                    minDate={minDate}
                />
                <PrimaryButton title="Close" onPress={handleClose} />
            </View>
        </Overlay>

    )
}

export default CalendarModal;

