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
    minDate: string
    isOneWay: boolean
    searchParams: SearchParams
    setSearchParams: (searchParams : SearchParams) => void
}

const CalendarModal = ({    
    isOneWay = false,
    searchParams,
    setSearchParams
}: CalendarModalProps) => {

    const [minDate, setMinDate] = useState<string>(moment().format('YYYY-MM-DD'))
    const [markedDates, setMarkedDates] = useState({})
    const [markingState, setMarkingState] = useState<string>('START')
    const [isReturnDate, setIsReturnDate] = useState<boolean>(false)
    const [calendarVisible, setCalendarVisible] = useState<boolean>(false)

    const handleClose = () => {
        setCalendarVisible(false);
    }

    const handlePress = (day) => {
        

        if (isOneWay) {
            setSearchParams({ ...searchParams, departureDate: day.dateString })            
            setCalendarVisible(false);
            return;
        }      

        // if (isReturnDate) {            
        //     setSearchParams({ ...searchParams, returnDate: day.dateString})
        // } else {
        //     setSearchParams({ ...searchParams, departureDate: day.dateString })            
        // }
        
        console.log("Marking State: " + markingState)        

        // User wants to mark a different period
        // if (markingState === 'NEXT') {
        //     setMarkedDates({}) 
        //     setMarkingState('START')
        // }               

        // User is marking the start day
        if (markingState === 'START') {
            setMarkedDates({ 
                [day.dateString] : {startingDay: true, color: 'lightskyblue'}
            })
            setMarkingState('END')
        } 

        // User is marking the end day
        if (markingState === 'END') {                        
            
            // Accumulate the dates in between the start date and the ending date
            let startingDate = moment(Object.keys(markedDates)[0])                        
            let nextDate = moment(Object.keys(markedDates)[0]).add(1,'days')                        
            let endingDate = moment(day.dateString)             

            let accumulatedDates = {
                ...markedDates,
                [nextDate.format("YYYY-MM-DD")] : {color : 'lightskyblue'}
            }                      
            
            while (!nextDate.isSame(endingDate)) {                
                nextDate = nextDate.add(1, 'days')           
                let nextDateString = nextDate.format("YYYY-MM-DD")
                accumulatedDates = { ...accumulatedDates, 
                    [nextDateString] : {color: 'lightskyblue'}                            
                }
            }                                              
            
            setMarkedDates({ ...accumulatedDates, 
                [day.dateString] : {endingDay: true, color: 'lightskyblue'}                            
            })

                    
            setMarkingState('START')
        } 



    }

    return (
        <View>
            <Overlay isVisible={calendarVisible} >
                <View style={{ padding: 10 }}>
                    <Calendar
                        onDayPress={(day) => handlePress(day)}
                        minDate={minDate}
                        markedDates={markedDates}
                        markingType={'period'}
                    />

                    <PrimaryButton title="Close" onPress={handleClose} />
                </View>
            </Overlay>

            <TouchableOpacity onPress={() => {
                setCalendarVisible(true)
                setIsReturnDate(false)
            }}>
                <CalendarField>
                    <CalendarFieldText>
                        {searchParams.departureDate === '' ? 'Departure Date' : searchParams.departureDate}
                    </CalendarFieldText>
                </CalendarField>
            </TouchableOpacity>

            {isOneWay ? <View /> : (
                <TouchableOpacity onPress={() => {
                    setCalendarVisible(true)
                    setIsReturnDate(true)
                }}>
                    <CalendarField>
                        <CalendarFieldText>
                            {searchParams.returnDate === '' ? 'Return Date' : searchParams.returnDate}
                        </CalendarFieldText>
                    </CalendarField>
                </TouchableOpacity>
            )}
        </View>

    )
}

export default CalendarModal;
