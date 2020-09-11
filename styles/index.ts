import styled from 'styled-components/native'
import {Button} from 'react-native-elements'

export const SearchContainer = styled.View`
  flex: 1;   
`
export const SwitchContainer = styled.View`
  flex-direction: row;
  justify-content: space-evenly;  
  margin-bottom: 25px;
`
export const TitleText = styled.Text`
 margin-top: 100px;
 text-align: center;
 font-size: 25px;
 margin-bottom: 100px;
`

export const SwitchText = styled.Text`
  margin-top: 5px;
  font-size: 18px;
`

export const NoResultsText = styled.Text`    
    text-align: center;    
`

export const Container = styled.View`
    flex: 1;
    justify-content: center;`


export const PrimaryButton = styled(Button).attrs({  
  containerStyle: { margin: 2}  ,
  buttonStyle: { backgroundColor: "dodgerblue" },
  raised: true  
})``;

export const CalendarField = styled.View`
  border-bottom-width: 1;  
  margin: 10px;
`

export const CalendarFieldText = styled.Text`
  font-size: 20px;
`