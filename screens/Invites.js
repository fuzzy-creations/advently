import React, { useContext } from 'react';
import { ScrollView } from 'react-native';
import Alt_Header from '../components/Headers/Alt_Header';
import { ProfileDataContext } from '../contexts/ProfileData.context';
import colors from '../assets/colors/colors';
import { PrimaryBackground }   from '../components/Wrappers/Backgrounds';
import Invite_Preview from '../components/Cards/Invite_Preview';
import Group_Invite_Preview from '../components/Cards/Group_Invite_Preview';
import Regular from '../components/Wrappers/Typography';


function Invites () {  
    const {  einvites, ginvites } = useContext(ProfileDataContext);
    
    return (
        <PrimaryBackground>
            <Alt_Header white>Invites</Alt_Header>
            <ScrollView>
                <Regular color={colors.background_light} marginBottom={15} align={'center'}>Swipe left to decline, right to accept.</Regular>
                {einvites.map(item => <Invite_Preview key={item.id} data={item} />)} 
                {ginvites.map(item => <Group_Invite_Preview key={item.id} data={item} />)} 
            </ScrollView>
        </PrimaryBackground>
    );
};

export default Invites;


