import React, {useState, useEffect} from 'react';
import { View, TextInput, Text, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { useRoute } from '@react-navigation/native';
import axios from 'axios';
import { ListItem } from 'react-native-elements';

// Set up axios
axios.defaults.baseURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices"
axios.defaults.headers.common['x-rapidapi-host'] = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';
axios.defaults.headers.common['x-rapidapi-key'] = '202163265fmsh740d3936afe742bp1da78djsn1614a4f00218';
axios.defaults.headers.common['useQueryString'] = true;

interface Quote {
    quoteId: string,
    minPrice: number,
    isDirect: boolean,
    carrierName: string
}

const ResultsScreen: React.FC = () => {
    const route = useRoute();
    const searchParams = route.params.searchParams;
    const [quotes, setQuotes] = useState([]);
    const [carriers, setCarriers] = useState([]);
    
        
    useEffect(() => {
        console.log(searchParams)

        axios.get(`/browsequotes/v1.0/MY/MYR/en-MY/KUL-sky/LHR-sky/2020-09-25`).then( res => {
            
            setQuotes(res.data['Quotes'])
            setCarriers(res.data['Carriers'])            
            
          })
          .catch(err => console.log(err))                  
    }, [])

    const renderItem = ({item}) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>
                    {carrierIdToName(item['OutboundLeg']['CarrierIds'][0])}
                </ListItem.Title>                
                <ListItem.Subtitle>{"Minimum Price: RM"+ item['MinPrice']}</ListItem.Subtitle>
                <ListItem.Subtitle>{"Direct: " + item['Direct']}</ListItem.Subtitle>
            </ListItem.Content>
        </ListItem>
    )

    // Converts carrier id to carrier name
    const carrierIdToName = (id) => {        
        let carrier = carriers.find(c => c['CarrierId'] === id)        
        return carrier['Name'];              
    }

    const keyExtractor = (item,index) => index.toString()

    return(
        <View>
            <FlatList
                keyExtractor={keyExtractor}
                data={quotes}
                renderItem={renderItem}
            />
        </View>
    )
};

export default ResultsScreen;