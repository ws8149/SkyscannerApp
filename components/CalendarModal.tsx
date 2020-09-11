import React, { useState } from 'react';
import { Calendar } from 'react-native-calendars';
import { Overlay } from 'react-native-elements';
import { View, TouchableOpacity } from 'react-native';

import { PrimaryButton, SearchField, SearchFieldText } from '../styles/index'

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
    setSearchParams: (searchParams: SearchParams) => void
}

const CalendarModal = ({
    isOneWay = false,
    searchParams,
    setSearchParams
}: CalendarModalProps) => {

    const [minDate, setMinDate] = useState<string>(currentDate)
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

        if (markingState === 'START') {
            setMarkedDates({
                [day.dateString]: { startingDay: true, color: 'lightskyblue' }
            })

            setSearchParams({ ...searchParams, departureDate: day.dateString })
            setMarkingState('END')
        }

        if (markingState === 'END') {

            // Accumulate the dates in between the start and end dates
            let startingDate = moment(Object.keys(markedDates)[0])
            let nextDate = moment(Object.keys(markedDates)[0]).add(1, 'days')
            let endingDate = moment(day.dateString)

            // Only accumulate if start and ending date aint the same
            if (!endingDate.isSame(startingDate)) {
                let accumulatedDates = {
                    ...markedDates,
                    [nextDate.format("YYYY-MM-DD")]: { color: 'lightskyblue' }
                }

                while (!nextDate.isSame(endingDate)) {
                    nextDate = nextDate.add(1, 'days')
                    let nextDateString = nextDate.format("YYYY-MM-DD")
                    accumulatedDates = {
                        ...accumulatedDates,
                        [nextDateString]: { color: 'lightskyblue' }
                    }
                }

                setMarkedDates({
                    ...accumulatedDates,
                    [day.dateString]: { endingDay: true, color: 'lightskyblue' }
                })

                setSearchParams({ ...searchParams, returnDate: day.dateString })
                setMarkingState('START')
            }

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
                <SearchField>
                    <SearchFieldText>
                        {searchParams.departureDate === '' ? 'Departure Date' : searchParams.departureDate}
                    </SearchFieldText>
                </SearchField>
            </TouchableOpacity>

            {isOneWay ? <View /> : (
                <TouchableOpacity onPress={() => {
                    setCalendarVisible(true)
                    setIsReturnDate(true)
                }}>
                    <SearchField>
                        <SearchFieldText>
                            {searchParams.returnDate === '' ? 'Return Date' : searchParams.returnDate}
                        </SearchFieldText>
                    </SearchField>
                </TouchableOpacity>
            )}
        </View>

    )
}

export default CalendarModal;
