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
        

        axios.get(`/browsequotes/v1.0/MY/MYR/en-MY/KUL-sky/LHR-sky/2020-09-25`).then( res => {
                        
            let carriers = res.data['Carriers']                       
            
            // Map carrier name to id
            let responseQuotes = res.data['Quotes']                        

            for (var i = 0; i < responseQuotes.length; i++) {
                let carrierIds = responseQuotes[i]['OutboundLeg']['CarrierIds']                
                for (var j = 0; j < carrierIds.length; j++) {
                    let carrier = carriers.find(c => { 
                        c['CarrierId'] === carrierIds[j]
                    })                                    
                    carrierIds[j] = { 
                        CarrierId: carrierIds[j], 
                        CarrierName: carrier['Name'] 
                    };              
                }
            }
            
            setQuotes(responseQuotes)
            
            
          })
          .catch(err => console.log(err))                  
    }, [])

    const formatCarrierNames = (carrierIds) => {        
        let carrierNamesOutput = "";
        carrierIds.map(c => {
            carrierNamesOutput += c['CarrierName'] + " "
        })
        return carrierNamesOutput;
    }

    const renderItem = ({item}) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>
                    {/* TODO: format for inboundleg as well */}
                    {formatCarrierNames(item['OutboundLeg']['CarrierIds'])}
                </ListItem.Title>                
                <ListItem.Subtitle>{"Minimum Price: RM"+ item['MinPrice']}</ListItem.Subtitle>
                <ListItem.Subtitle>{"Direct: " + item['Direct']}</ListItem.Subtitle>                
            </ListItem.Content>
        </ListItem>
    )


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