import React, {useState, useEffect} from 'react';
import { View, TextInput, Text } from 'react-native';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';

// Set up axios
axios.defaults.baseURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices"
axios.defaults.headers.common['x-rapidapi-host'] = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';
axios.defaults.headers.common['x-rapidapi-key'] = '202163265fmsh740d3936afe742bp1da78djsn1614a4f00218';
axios.defaults.headers.common['useQueryString'] = true;


const ResultsScreen: React.FC = () => {
    const route = useRoute();
    const searchParams = route.params.searchParams;
    const [quotes, setQuotes] = useState([]);
    
    useEffect(() => {
        console.log(searchParams)

        axios.get(`/browsequotes/v1.0/MY/MYR/en-MY/KUL-sky/LHR-sky/2020-09-25`).then( res => {
            const quotes = res.data['Quotes']
            console.log(quotes[0])            
          })
          .catch(err => console.log(err))                  
    }, [])

    return(
        <View>
            <Text>{searchParams.departureAirport}</Text>
        </View>
    )
};

export default ResultsScreen;