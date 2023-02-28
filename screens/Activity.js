import React, { useContext, useCallback } from 'react';
import { ScrollView } from 'react-native';
import { useFocusEffect} from '@react-navigation/core';
import { ProfileDataContext } from '../contexts/ProfileData.context';
import { AuthContext } from '../contexts/Auth.context';
import Notification from '../components/Cards/Notification';
import colors from '../assets/colors/colors';
import Alt_Header from '../components/Headers/Alt_Header';
import { PrimaryBackground } from '../components/Wrappers/Backgrounds';
import { Regular } from '../components/Wrappers/Typography';


function Activity () { 
    const { notifications, read_notes_handler } = useContext(ProfileDataContext);
    const { user } = useContext(AuthContext);

    useFocusEffect(
        useCallback(() => {
            read_notes_handler();
        }, [])
    )

    return (
        <PrimaryBackground>
            <Alt_Header white>Notifications</Alt_Header>
            <ScrollView>
                <Regular color={colors.background_light} marginBottom={15} align={'center'}>Swipe left to delete.</Regular>
                {notifications.map(item => <Notification key={item.id} data={item} user_id={user} />)}
            </ScrollView>
        </PrimaryBackground>
    );
}


export default Activity;

