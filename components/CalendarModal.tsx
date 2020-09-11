import React, { Component, useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-native-calendars'
import { Button, Overlay, SearchBar, Input, ListItem } from 'react-native-elements';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';
import { PrimaryButton } from '../styles/index'

import moment from 'moment';

const currentDate = moment().format('YYYY-MM-DD');



interface CalendarModalProps {
    calendarVisible: boolean;
    setCalendarVisible: (calendarVisible : boolean) => void
    selectDate: (date : string) => void
    minDate: string
    isOneWay: boolean
}

const CalendarModal = ( {
    calendarVisible,
    setCalendarVisible, 
    selectDate, 
    isOneWay = false
} : CalendarModalProps) => {                    
    
    const [minDate, setMinDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const [markedDates, setMarkedDates] = useState({})
    const [markingState, setMarkingState] = useState<string>('START')

    const handleClose = () => {
        setCalendarVisible(false);            
    }           

    const handlePress = (day) => {        
        console.log("Marking State: " + markingState)
        if (isOneWay) {
            selectDate(day.dateString)
            return;
        }      
        
        // User wants to mark a different period
        if (markingState === 'NEXT') {
            setMarkedDates({}) 
            setMarkingState('START')
        }               

        // User is marking the start day
        if (markingState === 'START' || markingState === 'NEXT') {
            setMarkedDates({
                [day.dateString] : {startingDay: true, color: 'lightskyblue'}
            })
            setMarkingState('END')
        } 
        
        // User is marking the end day
        if (markingState === 'END') {
            setMarkedDates({ ...markedDates, 
                [day.dateString] : {endingDay: true, color: 'lightskyblue'}                            
            })
            setMarkingState('NEXT')
        } 
        
        

    }

    return (                
        <Overlay isVisible={calendarVisible} >            
            <View style={{padding: 10}}>
                <Calendar 
                    onDayPress={(day)=>handlePress(day)}                    
                    minDate={minDate}
                    markedDates={markedDates}
                    markingType={'period'}
                />
                
                <PrimaryButton title="Close" onPress={handleClose} />
            </View>            
        </Overlay>      

    )
}

export default CalendarModal;

