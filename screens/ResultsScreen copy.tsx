import React, {useState, useEffect} from 'react';
import { View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { ListItem, Button} from 'react-native-elements';
import SortFilterModal from '../components/SortFilterModal'
import {  NoResultsText, Container } from '../styles/index'
import { PrimaryButton } from '../styles/index'

// Set up axios
axios.defaults.baseURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices"
axios.defaults.headers.common['x-rapidapi-host'] = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';
axios.defaults.headers.common['x-rapidapi-key'] = '202163265fmsh740d3936afe742bp1da78djsn1614a4f00218';
axios.defaults.headers.common['useQueryString'] = true;



interface SearchParams {
    departureAirport: string,
    destinationAirport: string,
    departureAirportId: string,
    destinationAirportId: string,
    departureDate: string,
    returnDate: string,
    searchType: string,
}

type NaviRouteProps = {
    ResultsScreen: {
        searchParams: SearchParams
    }
}



const ResultsScreen: React.FC = () => {
    const route = useRoute<RouteProp<NaviRouteProps, "ResultsScreen">>();        
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [sortFilterVisible, setSortFilterVisible] = useState<boolean>(false);
    const searchParams = route.params.searchParams;
    const [quotes, setQuotes] = useState([]);       
    
    //////////////////////////// Helper Functions Start ////////////////////////////////////
    const formatCarrierNames = (carrierIds) => {        
        
        let carrierNamesOutput = "";
        carrierIds.map(c => {
            carrierNamesOutput += c['CarrierName'] + " "
        })
        return carrierNamesOutput;
    }

    const sort_by_key = (array, key) => {
        return array.sort(function(a, b)
        {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
        });
    }

    // Temporarily set departure date to only include the month
    const requestQuotesByMonth = () => {        
        let prevDate = searchParams.departureDate;
        searchParams.departureDate = searchParams.departureDate.substring(0,7);
        makeRequestToApi();                     
        searchParams.departureDate = prevDate;
    }

     //////////////////////////// Helper Functions End ////////////////////////////////////
    
    const makeRequestToApi = () => {
        console.log("making request...")
        let url = `/${searchParams.searchType}/v1.0/MY/MYR/en-MY/`
        url += `${searchParams.departureAirportId}/${searchParams.destinationAirportId}/`
        url += `${searchParams.departureDate}`
        

        axios.get(url, { params: {"inboundpartialdate": searchParams.returnDate} }).then( res => {
                        
            let carriers = res.data['Carriers']                       
            // Map carrier name to id
            let responseQuotes = res.data['Quotes']                 
            

            for (var i = 0; i < responseQuotes.length; i++) {
                let carrierIds = responseQuotes[i]['OutboundLeg']['CarrierIds']                
                for (var j = 0; j < carrierIds.length; j++) {
                    let carrier = carriers.find(c => { 
                        return c['CarrierId'] === carrierIds[j]
                    })                                                 
                    carrierIds[j] = { 
                        CarrierId: carrierIds[j], 
                        CarrierName: carrier['Name'] 
                    };              
                }
            }
            
            setQuotes(responseQuotes)
            setIsLoading(false)            
            
          })
          .catch(err => { 
              console.log(err) 
              setIsLoading(false)
            })                  
    }
        
    useEffect(() => {                        
        makeRequestToApi();
    }, [])    

    const showAllFlightsThisMonth = (allFlightsChecked : boolean) => {
        if (allFlightsChecked) {            
            requestQuotesByMonth();
        } else {                        
            makeRequestToApi();                     
        }        
    }    

    const sortByPrice = () => {                
        let sortedQuotes = sort_by_key(quotes, 'MinPrice')
        setQuotes(sortedQuotes);
    }

    // Since response is already sorted by date, we make a request again
    const sortByDate = () => {                
        requestQuotesByMonth();
    }

    const renderItem = ({item}) => (
        <ListItem bottomDivider>
            <ListItem.Content>
                <ListItem.Title>                    
                    { formatCarrierNames(item['OutboundLeg']['CarrierIds'])}
                </ListItem.Title>                                
                <ListItem.Title>{"  RM "+ item['MinPrice']}</ListItem.Title>                              
                <ListItem.Title>
                    {"  Date: " + item['OutboundLeg']['DepartureDate'].substring(0,10)}
                </ListItem.Title>                  
                
                <ListItem.Title>{"  Direct: " + item['Direct']}</ListItem.Title>  
                
            </ListItem.Content>
        </ListItem>
    )

    


    const keyExtractor = (item,index) => index.toString()

    const renderContent = () => {
        
        if (isLoading) {
            return <ActivityIndicator/>
        } else {
            if (quotes.length > 0) {
                return (
                    <Container>
                        <PrimaryButton title='Sort and Filter' onPress={()=>setSortFilterVisible(true)} />
                        <FlatList
                          keyExtractor={keyExtractor}
                          data={quotes}
                          renderItem={renderItem}
                        />
                    </Container>
                )
            } else {
                return <NoResultsText>No Results Found</NoResultsText>
            }
        }
    }

    return(
        <Container>                        
            <SortFilterModal 
                sortFilterVisible={sortFilterVisible} 
                setSortFilterVisible={setSortFilterVisible} 
                showAllFlightsThisMonth={showAllFlightsThisMonth}
                sortByPrice={sortByPrice}    
                sortByDate={sortByDate}            
            />
            
            {  renderContent()  }            
        </Container>
    )
};

export default ResultsScreen;