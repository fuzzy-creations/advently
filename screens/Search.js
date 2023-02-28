import React, { useState } from 'react';
import { StyleSheet, Text, ScrollView, View, Pressable, Image } from 'react-native';
import colors from '../assets/colors/colors';
import { Octicons } from '@expo/vector-icons';
import Button_Main from '../components/Buttons/Button_Main';
import Alt_Header from '../components/Headers/Alt_Header';
import Text_Input from '../components/Inputs/Text_Input';
import { query_events } from '../firebase/methods/Event_Functions';
import { get_groups } from '../firebase/methods/Group_Functions';
import { get_all_users } from '../firebase/methods/User_Functions';
import { useNavigation } from '@react-navigation/native';
import { PrimaryBackground }   from '../components/Wrappers/Backgrounds';
import { Main } from '../components/Wrappers/Containers';
import { Regular, Header } from '../components/Wrappers/Typography';

function Search () { 
    const [query, set_query] = useState("");
    const [status, set_status] = useState("");
    const [loader, set_loader] = useState(false);
    const [state, set_state] = useState(null);

    const submit_handler = async () => {
        set_loader(true);
        const _e = await query_events();
        const _g = await get_groups();
        const _u = await get_all_users();
        const i = {
            events: _e.filter(item => item.name.toLowerCase().includes(query.trim().toLowerCase())), 
            groups: _g.filter(item => item.name.toLowerCase().includes(query.trim().toLowerCase())), 
            users: _u.filter(item => item.name.toLowerCase().includes(query.trim().toLowerCase()))
        };
        set_state(i);
        set_loader(false);
    };

    const main = (
        <>
         <Main paddingHorizontal={25} marginTop={30} flex transparent>
            <Header large color={colors.white} marginBottom={5}>Search</Header>
            <Text_Input lowercase={true} value={query} input={set_query}>What are you looking for?</Text_Input>   
        </Main>
        <View style={styles.footer}>    
            <Button_Main hollow action={submit_handler} loader={loader}>Search</Button_Main>
        </View>
        </>
    );

    const results = (
        <Main paddingHorizontal={25} marginTop={30} flex transparent>
            <Header color={colors.white} large marginBottom={5}>Search</Header>
            <Pressable onPress={() => set_state(null)} style={styles.highlight}>
                <Header small color={colors.white} marginRight={10}>{query}</Header>
                <Octicons name="x-circle" size={20} color={"#ffffff90"} />
            </Pressable>
            <View>
                {(state && state.users.length > 0) && (
                    <View style={styles.list}>
                        <Header color={colors.background_light}>Users</Header>
                        {state.users.map(item => <Preview key={item.id} url="UserProfile" data={item} content={item.about} location={item.location ?? ""} />)}
                    </View>
                )}
                {(state && state.events.length > 0) && (
                    <View style={styles.list}>
                        <Header color={colors.background_light}>Events</Header>
                        {state.events.map(item => <Preview key={item.id} url="Event" data={item} content={item.description} location={item.location ?? ""}/>)}
                    </View>
                )}
                {(state && state.groups.length > 0) && (
                    <View style={styles.list}>
                        <Header color={colors.background_light}>Community</Header>
                        {state.groups.map(item => <Preview key={item.id} url="Group" data={item} content={item.about} location={item.location ?? ""}/>)}
                    </View>
                )}
                {(state && state.users.length === 0 && state.events.length === 0 && state.groups.length === 0) && (
                    <View style={{marginTop: 20}}>
                        <Regular color={colors.white}>No results found.</Regular>
                    </View>
                )}
            </View>  
        </Main>
    );


    return (  
        <PrimaryBackground>
            <Alt_Header white></Alt_Header>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                {state ? results : main}
            </ScrollView>
        </PrimaryBackground>
    );
};


const Preview = (props) => {
    const navigation = useNavigation();
    return (
        <Pressable onPress={() => navigation.navigate(props.url, props.data)} style={styles.preview}>
            <Image style={styles.preview__image} source={{uri: props.data.image}} />
            <View>
                <Regular bold color={colors.white}>{props.data.name}</Regular>
                <Regular small color={colors.background_medium}>{props.content.slice(0, 30)}</Regular>
            </View>
        </Pressable>
    )
};

const styles = StyleSheet.create({
    footer: {
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: 25,
        paddingBottom: 60
       
    },
    question: {
        color: colors.white,
        alignSelf: 'flex-start',
    },
    list: {
        alignSelf: 'stretch',
        marginTop: 20
    },  
    preview: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-start',
        backgroundColor: '#ffffff50',
        padding: 10,
        borderRadius: 20,
        marginTop: 10

    },
    preview__image: {
        height: 50, 
        width: 50,
        borderRadius: 50,
        marginRight: 20,
    },
    highlight: {
        backgroundColor: '#ffffff50',
        alignSelf: 'flex-start',
        height: 35,
        paddingHorizontal: 20,
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
    }
})

export default Search;
