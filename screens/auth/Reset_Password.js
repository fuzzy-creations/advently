import React, { useState } from 'react';
import { Text, View, StyleSheet, ImageBackground, ScrollView, Pressable } from 'react-native';
import containers from '../../styles/containers';
import typography from '../../styles/typography';
import colors from '../../assets/colors/colors';
import { reset_password } from '../../firebase/methods/User_Functions';
import global from '../../styles/global';
import Button_Main from '../../components/Buttons/Button_Main';
import Text_Input from '../../components/Inputs/Text_Input';
import Alt_Header from '../../components/Headers/Alt_Header';
import { AntDesign } from '@expo/vector-icons';
import Button_Highlight from '../../components/Buttons/Button_Highlight';


function Reset_Passsword({ navigation }) {   
    const [email_input, set_email_input] = useState("");
    const [status, set_status] = useState("");
    const [loader, set_loader] = useState(false);

    const reset_handler = async  () => {
        if(loader === false) {
            set_loader(true);
            try {
                await reset_password(email_input);
                set_status("Sent")
                set_loader(false);
            } catch(error) {
                set_status(error.message)
                set_loader(false);
            };
        };
    };

    const back_handler = () => navigation.navigate('Login');

    return (    
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground style={styles.wrapper} imageStyle={styles.wrapper} source={require('../../assets/images/form.png')}>
                <Alt_Header white back_handler={back_handler}></Alt_Header>
                <View style={styles.content}>
                    <AntDesign name="key" size={80} color={colors.white} />
                    <Text style={[typography.header_1, styles.question, {marginBottom: 10, marginTop: 30}]}>Forgot password?</Text>
                    <Text style={[typography.small, styles.question, {color: colors.background_medium, marginBottom: 30}]}>No worries, we'll send you reset instructions.</Text>
                    <Text_Input lowercase={true} value={email_input} input={set_email_input}>Email</Text_Input>
                </View>
                <View style={styles.footer}>
                    
                    <Button_Main hollow active={email_input.length >= 1} action={reset_handler} loader={loader}>Reset Password</Button_Main>
                    <Text style={[global.status_text, global.text_light]}>{status}</Text>
                    <Button_Highlight action={() => navigation.navigate('Register')}>
                        <Text style={[typography.main, {color: colors.background_medium}]}>Back to<Text style={[typography.main_bold, global.text_white]}> Login</Text></Text>
                    </Button_Highlight>
                </View>
            </ImageBackground>
        </ScrollView>  

        // <View style={styles.container}>
        //     <Alt_Header></Alt_Header>
        //     <View style={[containers.main(), styles.wrapper]}>
        //         <Text style={[typography.header_4, global.text_light]}>Enter your email to recieve an email reset</Text>
        //         <Text_Input dark={true} value={email_input} input={set_email_input}>Email</Text_Input>
        //         <Button_Main active={true} loader={loader} action={reset_handler}>Reset</Button_Main>
        //         <Text style={[global.status_text, { color: colors.text_light }]}>{status}</Text>
        //     </View>
        // </View>
    )
}

export default Reset_Passsword;



const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        backgroundColor: colors.primary_light,
    },
    wrapper: {
        flex: 1,
        paddingVertical: 60
    },
    content: {
        marginTop: 30,
        alignItems: 'center',
        flex: 1,
        paddingHorizontal: 25
    }, 
    footer: {
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: 25,
       
    },
    question: {
        color: colors.white,
        alignSelf: 'flex-start'
    },
});



