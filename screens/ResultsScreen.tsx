import React, {useState} from 'react';
import { View, TextInput, Text } from 'react-native';
import styled from 'styled-components/native';

const ResultsScreen: React.FC = ({route}) => {
    const {state} = route.params
    

    return(
        <View>
            <Text>{state.departureAirport}</Text>
        </View>
    )
};

export default ResultsScreen;