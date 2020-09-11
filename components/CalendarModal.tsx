import React, { Component, useState, useEffect, useRef } from 'react';
import { Calendar } from 'react-native-calendars'
import { Button, Overlay, SearchBar, Input, ListItem } from 'react-native-elements';
import { View, TouchableOpacity, Text } from 'react-native';
import styled from 'styled-components';
import { PrimaryButton, CalendarField, CalendarFieldText, CalendarFieldHeader } from '../styles/index'

import moment from 'moment';

const currentDate = moment().format('YYYY-MM-DD');

interface SearchParams {
    departureAirport: string,
    destinationAirport: string,
    departureAirportId: string,
    destinationAirportId: string,
    departureDate: string,
    returnDate: string,
    searchType: string
  }

interface CalendarModalProps {
    calendarVisible: boolean;
    setCalendarVisible: (calendarVisible : boolean) => void    
    minDate: string
    isOneWay: boolean
    searchParams: SearchParams
}

const CalendarModal = ( {
    calendarVisible,
    setCalendarVisible,     
    isOneWay = false,
    searchParams
} : CalendarModalProps) => {                    
    
    const [minDate, setMinDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const [markedDates, setMarkedDates] = useState({})
    const [markingState, setMarkingState] = useState<string>('START')
    const [isReturnDate, setIsReturnDate] = useState<boolean>(false)

    const handleClose = () => {
        setCalendarVisible(false);            
    }           

    const handlePress = (day) => {        

        if (isReturnDate) {
            searchParams.returnDate = day.dateString
        } else {
            searchParams.departureDate = day.dateString
        }
        
        setCalendarVisible(false);

        // console.log("Marking State: " + markingState)

        // if (isOneWay) {
        //     selectDate(day.dateString)
        //     return;
        // }      
        
        // // User wants to mark a different period
        // if (markingState === 'NEXT') {
        //     setMarkedDates({}) 
        //     setMarkingState('START')
        // }               

        // // User is marking the start day
        // if (markingState === 'START' || markingState === 'NEXT') {
        //     setMarkedDates({
        //         [day.dateString] : {startingDay: true, color: 'lightskyblue'}
        //     })
        //     setMarkingState('END')
        // } 
        
        // // User is marking the end day
        // if (markingState === 'END') {
        //     setMarkedDates({ ...markedDates, 
        //         [day.dateString] : {endingDay: true, color: 'lightskyblue'}                            
        //     })
        //     setMarkingState('NEXT')
        // } 
        
        

    }

    return (                
        <View>
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
            
            <TouchableOpacity onPress={()=>{
                setCalendarVisible(true)
                setIsReturnDate(false)
              }}>                                         
                <CalendarField>                             
                <CalendarFieldText>
                    {searchParams.departureDate === '' ? 'Departure Date' : searchParams.departureDate }                      
                </CalendarFieldText> 
                </CalendarField>        
            </TouchableOpacity>  

            { isOneWay ? <View/> : (
                <TouchableOpacity onPress={()=>{
                    setCalendarVisible(true)
                    setIsReturnDate(true)
                  }}>                                         
                    <CalendarField>                             
                      <CalendarFieldText>
                          {searchParams.returnDate === '' ? 'Return Date' : searchParams.returnDate }                      
                      </CalendarFieldText>                                     
                    </CalendarField>        
                </TouchableOpacity>  
            )}            
        </View>

    )
}

export default CalendarModal;
