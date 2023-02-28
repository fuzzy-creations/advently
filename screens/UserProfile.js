import React, { useState, useContext, useCallback } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { get_users_communities, get_users_events } from '../firebase/methods/User_Functions';
import typography from '../styles/typography';
import colors from '../assets/colors/colors';
import { useFocusEffect } from '@react-navigation/native';
import Missing from '../components/UI/Missing';
import User_Action_Button from '../components/Buttons/User_Action_Button';
import Alt_Header from '../components/Headers/Alt_Header';
import { AuthContext } from '../contexts/Auth.context';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { listenRealTimeUser } from '../tools/Fetches';
import { Ionicons } from '@expo/vector-icons';
import { WhiteBackground } from '../components/Wrappers/Backgrounds';
import Icon, { Avatar } from '../components/Wrappers/Wrappers';
import Regular, { Header } from '../components/Wrappers/Typography';
import { Main } from '../components/Wrappers/Containers';


function UserProfile(props){  
    const data = props.route.params;
    const { user } = useContext(AuthContext)
    const [user_data, set_user_data] = useState(data);
    const [groups, set_groups] = useState([]);
    const [events, set_events] = useState([]);
    

    useFocusEffect(
        useCallback(() => {
            if(data) {
                const unlistenUser = listenRealTimeUser(set_user_data, data.id)
                const fetch_data = async () => {
                    const g = await get_users_communities(data.id);
                    const e = await get_users_events(data.id);
                    set_groups(g);
                    set_events(e);
                }
                fetch_data()
                return () => { unlistenUser(); };
            }
        }, [])
      );

      
    if(!user_data) { return <Missing /> }


    return (    
    <WhiteBackground>
        <Alt_Header>Profile</Alt_Header>
        <Main container flex>
            <View style={{alignItems: 'center', marginBottom: user_data.id === user ? 30 : 10}}>
                <Avatar>{user_data.image}</Avatar>
                <Header marginTop={15} marginBottom={5}>{user_data.name}</Header>
                <Regular color={colors.text_light_medium}>{user_data.location ?? null}</Regular>
            </View>

            {user_data.id === user ? null : (
            <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 30, paddingHorizontal: 40}}>
                <User_Action_Button user_data={user_data} />
                <Icon action={() => props.navigation.navigate("Chat", user_data)}><Ionicons name="md-chatbubbles-outline" size={24} color={colors.text_dark} /></Icon>
            </View>
            )}

            <Main marginBottom={40}>
                <Regular marginBottom={10}>About</Regular>
                <Regular color={colors.text_medium}>{user_data.about}</Regular>
            </Main>

            <Main marginBottom={30}>
                <Regular marginBottom={10}>Activity</Regular>
                <View style={styles.activity}>
                    <MaterialIcons name="event" size={25} color={colors.text_light} />
                    <Text style={[typography.main_thin, {marginRight: 'auto', marginLeft: 15}]}>Events</Text>
                    <View style={styles.icon}><Text style={typography.main_bold}>{events.length}</Text></View>
                </View>
                <View style={styles.activity}>
                    <Feather name="command" size={25} color={colors.text_light} />
                    <Text style={[typography.main_thin, {marginRight: 'auto', marginLeft: 15}]}>Communities</Text>
                    <View style={styles.icon}><Text style={typography.main_bold}>{groups.length}</Text></View>
                </View>
                <View style={styles.activity}>
                    <FontAwesome name="group" size={25} color={colors.text_light} />
                    <Text style={[typography.main_thin, {marginRight: 'auto', marginLeft: 15}]}>Friends</Text>
                    <View style={styles.icon}><Text style={typography.main_bold}>{user_data.friends.length}</Text></View>
                </View>
            </Main>  
        </Main>
    </WhiteBackground>
    )
}


const styles = StyleSheet.create({
    activity: {
        backgroundColor: colors.background_light,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 20,
        height: 75,
        marginBottom: 10,
    },
    icon: {
        height: 40, 
        width: 40, 
        borderRadius: 5, 
        backgroundColor: colors.text_light,
        alignItems: 'center',
        justifyContent: 'center'
    },
});

export default UserProfile;