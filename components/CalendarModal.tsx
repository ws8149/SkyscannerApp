import React, { Component, useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-native-calendars'
import { Button, Overlay, SearchBar, ListItem } from 'react-native-elements';
import { View } from 'react-native';
import styled from 'styled-components';
import { PrimaryButton } from '../styles/index'



interface CalendarModalProps {
    calendarVisible: boolean;
    setCalendarVisible: (calendarVisible : boolean) => void
    selectDate: (date : string) => void
}

const CalendarModal = ( {calendarVisible,setCalendarVisible, selectDate} : CalendarModalProps) => {                    
    
    const handleClose = () => {
        setCalendarVisible(false);            
    }           

    const handlePress = (day) => {        
        selectDate(day.dateString)
    }

    return (                
        <Overlay isVisible={calendarVisible} >            
            <View>
                <Calendar 
                    onDayPress={(day)=>handlePress(day)}                    
                />
                <PrimaryButton title="Close" onPress={handleClose} />
            </View>
        </Overlay>

    )
}

export default CalendarModal;

