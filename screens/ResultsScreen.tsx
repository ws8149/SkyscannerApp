import React, {useState, useEffect} from 'react';
import { View, TextInput, Text, FlatList, ActivityIndicator } from 'react-native';
import styled from 'styled-components/native';
import { useRoute, RouteProp } from '@react-navigation/native';
import axios from 'axios';
import { ListItem, Button} from 'react-native-elements';
import SortFilterModal from '../components/SortFilterModal'


// Set up axios
axios.defaults.baseURL = "https://skyscanner-skyscanner-flight-search-v1.p.rapidapi.com/apiservices"
axios.defaults.headers.common['x-rapidapi-host'] = 'skyscanner-skyscanner-flight-search-v1.p.rapidapi.com';
axios.defaults.headers.common['x-rapidapi-key'] = '202163265fmsh740d3936afe742bp1da78djsn1614a4f00218';
axios.defaults.headers.common['useQueryString'] = true;

const NoResultsText = styled.Text`    
    text-align: center;    
`

const Container = styled.View`
    flex: 1;
    justify-content: center;
`

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
    
    const makeRequestToApi = () => {
        let url = `/${searchParams.searchType}/v1.0/MY/MYR/en-MY/`
        url += `${searchParams.departureAirportId}/${searchParams.destinationAirportId}/`
        url += `${searchParams.departureDate}`

        console.log(url)

        axios.get(url, { params: {"inboundpartialdate": searchParams.returnDate} }).then( res => {
                        
            let carriers = res.data['Carriers']                       
            // Map carrier name to id
            let responseQuotes = res.data['Quotes']      
            
            console.log(res.data)

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

    const formatCarrierNames = (carrierIds) => {        
        
        let carrierNamesOutput = "";
        carrierIds.map(c => {
            carrierNamesOutput += c['CarrierName'] + " "
        })
        return carrierNamesOutput;
    }

    const showAllFlightsThisMonth = () => {
        searchParams.departureDate = searchParams.departureDate.substring(0,7);
        makeRequestToApi();         
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

    const renderContent = () => {
        
        if (isLoading) {
            return <ActivityIndicator/>
        } else {
            if (quotes.length > 0) {
                return (
                    <FlatList
                      keyExtractor={keyExtractor}
                      data={quotes}
                      renderItem={renderItem}
                    />
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
                showAllFlightsThisMonth={showAllFlightsThisMonth} />
            <Button title='Sort and Filter' onPress={()=>setSortFilterVisible(true)} />
            {  renderContent()  }            
        </Container>
    )
};

export default ResultsScreen;