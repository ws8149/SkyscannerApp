import React, {useState, useEffect} from 'react';
import { View, TextInput, Text } from 'react-native';
import styled from 'styled-components/native';
import axios from 'axios';

axios.defaults.baseURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices"
axios.defaults.headers.common['x-rapidapi-host'] = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';
axios.defaults.headers.common['x-rapidapi-key'] = '202163265fmsh740d3936afe742bp1da78djsn1614a4f00218';
axios.defaults.headers.common['useQueryString'] = true;

const ResultsScreen: React.FC = ({route}) => {
    const {searchParams} = route.params;
    const [quotes, setQuotes] = useState([]);
    
    useEffect(() => {
        console.log(searchParams)
        // axios.get(`/browsequotes/v1.0/US/USD/en-US/SFO-sky/JFK-sky/2020-09-25`).then( res => {
        //     console.log(res.data['Quotes'])            
        //   })
        //   .catch(err => console.log(err))                  
    }, [])

    return(
        <View>
            <Text>{searchParams.departureAirport}</Text>
        </View>
    )
};

export default ResultsScreen;