import React, { useState, useContext } from 'react';
import { StyleSheet, View, Pressable } from 'react-native';
import { AuthContext } from '../contexts/Auth.context';
import { update_my_profile } from '../firebase/methods/User_Functions';
import colors from '../assets/colors/colors';
import { MaterialIcons } from '@expo/vector-icons';
import Button_Main from '../components/Buttons/Button_Main';
import { ProfileDataContext } from '../contexts/ProfileData.context';
import { Octicons } from '@expo/vector-icons';
import { PrimaryBackground } from '../components/Wrappers/Backgrounds';
import Alt_Header from '../components/Headers/Alt_Header';
import { Main } from '../components/Wrappers/Containers';
import { Avatar } from '../components/Wrappers/Wrappers';
import Regular, { Header } from '../components/Wrappers/Typography';
import { registerForPushNotificationsAsync } from '../tools/Notification_Methods';


function MyProfile({ navigation }){  
    const { user, sign_out } = useContext(AuthContext);
    const { user_profile } = useContext(ProfileDataContext);
    const [do_not_disturb, set_do_not_disturb] = useState(user_profile.dnd_notifications);
    const [account_private, set_account_private] = useState(user_profile.private);


    const notifications_handler = (status) => {
        set_do_not_disturb(do_not_disturb => !do_not_disturb);
        update_my_profile(user, {dnd_notifications: status});
        update_my_profile(user, {dnd_emails: status});
        if(!status) { registerForPushNotificationsAsync().then(token => update_my_profile(user, {device_id: token})) }
    }

    const privacy_handler = (status) => {
        set_account_private(account_private => !account_private);
        update_my_profile(user, {private: status})
    }

    const sign_out_handler = () => {
        update_my_profile(user, {device_id: null});
        sign_out();
    }
    
    const on = <MaterialIcons name="do-not-disturb-on" size={30} color={colors.white} />
    const off = <MaterialIcons name="do-not-disturb-off" size={30} color={colors.white} />

    return (    
        <PrimaryBackground>
            <Alt_Header white>My Profile</Alt_Header>
            <Main container flex transparent justify='space-between' paddingBottom={40}> 
                <Main align='center'transparent>
                    <Avatar>{user_profile.image}</Avatar>
                    <Header marginTop={15} marginBottom={10} color={colors.white}>{user_profile.name}</Header>
                    <Regular color={colors.background_light}>{user_profile.email}</Regular>
                </Main>

                <View>
                <Regular color={colors.white} marginTop={10}>Privacy</Regular>
                    <Pressable onPress={() => privacy_handler(!account_private)} style={[{opacity: account_private ? 1 : 0.5}, styles.item_wrapper]}>
                        <View style={styles.item_icon}>{account_private ? on : off}</View>
                        <View>
                            <Regular color={colors.white} marginBottom={3}>Account Private</Regular>
                            <Regular color={colors.background_light} small bold>{account_private ? "On" : "Off"}</Regular>
                        </View>
                    </Pressable>
                    <Regular color={colors.white} marginTop={10}>Notifications</Regular>
                    <Pressable onPress={() => notifications_handler(!do_not_disturb)} style={[{opacity: do_not_disturb ? 1 : 0.5}, styles.item_wrapper]}>
                        <View style={styles.item_icon}>{do_not_disturb ? on : off}</View>
                        <View>
                            <Regular color={colors.white} marginBottom={3}>Do not disturb</Regular>
                            <Regular color={colors.background_light} small bold>{do_not_disturb ? "On" : "Off"}</Regular>
                        </View>
                    </Pressable>
                    <Regular color={colors.white} marginTop={10}>Manage</Regular>
                    <View style={styles.bundled_wrapper}>
                        <Pressable onPress={() => navigation.navigate("Edit_Profile")} style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.item_wrapper_half]}>
                            <Octicons name="pencil" size={24} color={colors.white} />
                            <Regular color={colors.background_light} marginHorizontal={25} small>Edit Profile</Regular>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("UserProfile", user_profile)} style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.item_wrapper_half]}>
                            <Octicons name="person" size={24} color={colors.white} />
                            <Regular color={colors.background_light} marginHorizontal={25} small>View Profile</Regular>
                        </Pressable>
                    </View>
                    <View style={styles.bundled_wrapper}>
                        <Pressable onPress={() => navigation.navigate("Profile_Password")} style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.item_wrapper_half]}>
                            <Octicons name="shield-lock" size={24} color={colors.white} />
                            <Regular color={colors.background_light} marginHorizontal={15} small>Change Password</Regular>
                        </Pressable>
                        <Pressable onPress={() => navigation.navigate("Profile_Delete")} style={({pressed}) => [{opacity: pressed ? 0.5 : 1}, styles.item_wrapper_half]}>
                            <Octicons name="stop" size={24} color={colors.white} />
                            <Regular color={colors.background_light} marginHorizontal={15} small>Delete Account</Regular>
                        </Pressable>
                    </View>

                    

                </View>
                <Main marginVertical={10} transparent><Button_Main hollow action={sign_out_handler}>Log out</Button_Main></Main>
            </Main>
                  
        </PrimaryBackground>
    )
}

const styles = StyleSheet.create({
    item_wrapper: {
        backgroundColor: colors.white_opacity,
        height: 80,
        width: "100%",
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
        marginTop: 5
    },
    item_icon: {
        height: 45, 
        width: 45,
        borderRadius: 45,
        backgroundColor: colors.primary_light,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 20
    },  
    bundled_wrapper: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 10,
        marginTop: 5
    },
    item_wrapper_half: {
        backgroundColor: colors.white_opacity,
        height: 70,
        width: "47%",
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 25,
        flexDirection: 'row',
    },
});

export default MyProfile;