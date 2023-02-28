import React from 'react';
import { ScrollView } from 'react-native';
import Request from '../components/Cards/Request';
import Alt_Header from '../components/Headers/Alt_Header';
import colors from '../assets/colors/colors';
import { PrimaryBackground }   from '../components/Wrappers/Backgrounds';
import Regular from '../components/Wrappers/Typography';


function Requests(props){  
    const requests = props.route.params;
    
    return (
        <PrimaryBackground>
            <Alt_Header white>Requests</Alt_Header>
            <ScrollView>
                <Regular color={colors.background_light} marginBottom={15} align={'center'}>Swipe left to decline, right to accept.</Regular>
                {requests.map(item => <Request key={item.id} data={item} />)} 
            </ScrollView>
        </PrimaryBackground>
    );
};

export default Requests;


