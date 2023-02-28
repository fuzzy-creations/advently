import React, { useContext, useState } from 'react';
import Main_Header from '../components/Headers/Main_Header';
import { ProfileDataContext } from '../contexts/ProfileData.context';
import Group_List from '../components/Lists/Group_List';
import Requests_Prompt from '../components/UI/Requests_Prompt';
import { WhiteBackground } from '../components/Wrappers/Backgrounds';
import Invites_Prompt from '../components/UI/Invites_Prompt';
import { Main } from '../components/Wrappers/Containers';
import SliderMenu from '../components/UI/SliderMenu';
import ExploreGroups from './discover/Groups';

function Groups(){
    const { groups } = useContext(ProfileDataContext);
    const [selected, set_selected] = useState(0);

    return (  
        <WhiteBackground>
            <Main_Header url="Create_Group">Communities</Main_Header>
            <Requests_Prompt type={2} />
            <Invites_Prompt type={1} />
            <SliderMenu select={set_selected} selected={selected}>{["Member", "Discover"]}</SliderMenu>
            <Main container>
                {[<Group_List data={groups} />, <ExploreGroups />][selected]}
            </Main>
        </WhiteBackground>
    );
};

export default Groups;

