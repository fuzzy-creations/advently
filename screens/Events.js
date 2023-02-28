import React, { useContext, useState } from 'react';
import Main_Header from '../components/Headers/Main_Header';
import Event_List from '../components/Lists/Event_List';
import { ProfileDataContext } from '../contexts/ProfileData.context';
import Requests_Prompt from '../components/UI/Requests_Prompt';
import { WhiteBackground } from '../components/Wrappers/Backgrounds';
import SliderMenu from '../components/UI/SliderMenu';
import Invites_Prompt from '../components/UI/Invites_Prompt';
import useFetch from '../hooks/useFetch';
import { fetch_saved } from '../firebase/fetches/Fetches';
import { Main } from '../components/Wrappers/Containers';
import ExploreEvents from './discover/Events';
import Regular from '../components/Wrappers/Typography';
import { View } from 'react-native';

function Events () {  
    const { upcoming,  history, user_profile } = useContext(ProfileDataContext);
    const [selected, set_selected] = useState(0);
    const [type, set_type] = useState(0)

    const personal = (
        <Main>
                {[
                    <Event_List data={upcoming}>Sign up to Events to see them here.</Event_List>, 
                    <Event_List reverse data={history}>Sign up to Events to see them here.</Event_List>, 
                    <Event_List reverse data={useFetch(fetch_saved(user_profile.saved))}>Sign up to Events to see them here.</Event_List>, 
                ][type]}
        </Main>
    )
    
    return (    
        <WhiteBackground>
            <Main_Header url="Create_Event">Events</Main_Header>
            <Requests_Prompt type={1} />  
            <Invites_Prompt type={0} />
            <SliderMenu select={set_selected} selected={selected} type={type} set_type={set_type}>{[["Upcoming", "History", "Saved"], "Discover"]}</SliderMenu>
            <Main container>
                {[personal, <ExploreEvents />][selected]}
            </Main>
        </WhiteBackground>

    )
}

export default Events;




