import React, { useState, useContext } from 'react';
import { StyleSheet, Text, ScrollView, ImageBackground, View } from 'react-native';
import colors from '../../assets/colors/colors';
import global from '../../styles/global';
import { AntDesign } from '@expo/vector-icons';
import typography from '../../styles/typography';
import { AuthContext } from '../../contexts/Auth.context';
import Button_Main from '../../components/Buttons/Button_Main';
import Alt_Header from '../../components/Headers/Alt_Header';
import Text_Input from '../../components/Inputs/Text_Input';
import Password_Input from '../../components/Inputs/Password_Input';
import Button_Highlight from '../../components/Buttons/Button_Highlight';
import { Main } from '../../components/Wrappers/Containers';
import { Status } from '../../components/Wrappers/Typography';

function Login({ navigation }){ 
    const { sign_in } = useContext(AuthContext);
    const [email_input, set_email_input] = useState("");
    const [password_input, set_password_input] = useState("");
    const [status, set_status] = useState("");
    const [loader, set_loader] = useState(false);


    const submit_handler = () => {
        set_loader(true);
        sign_in({email: email_input.trim(), password: password_input.trim()}).then(result => {
            if(result === true){
                set_status("Logged in")
            } else {
                set_loader(false);
                set_status(result);
            }
        })        
    }

    const back_handler = () => navigation.navigate('Landing');

    return (      
        <ScrollView contentContainerStyle={styles.container}>
            <ImageBackground style={styles.wrapper} imageStyle={styles.wrapper} source={require('../../assets/images/form.png')}>
                <Alt_Header white back_handler={back_handler}></Alt_Header>
                <Main transparent flex container marginTop={30} align='center'>
                    <AntDesign name="login" size={80} color={colors.white} />
                    <Text style={[typography.header_1, styles.question]}>Welcome back</Text>
                    <Text_Input lowercase value={email_input} input={set_email_input}>Email</Text_Input>
                    <View style={{marginVertical: 5}}></View>
                    <Password_Input value={password_input} input={set_password_input}>Password</Password_Input>
                    <Button_Highlight marginTop={25} action={() => navigation.navigate("Reset_Password")}>
                        <Text style={[typography.small, {color: colors.background_medium}]}>Forgot your password?</Text>
                    </Button_Highlight>
                </Main>

                <Main align='center' container transparent>
                    <Status>{status}</Status>
                    <Button_Main hollow active={email_input.length >= 1 && password_input.length >= 1} action={submit_handler} loader={loader}>Login</Button_Main>
                    <Button_Highlight marginTop={25} action={() => navigation.navigate('Register')}>
                        <Text style={[typography.main, {color: colors.background_medium}]}>Back to<Text style={[typography.main_bold, global.text_white]}> Register</Text></Text>
                    </Button_Highlight>
                </Main>
            </ImageBackground>
        </ScrollView>
    )


}

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
    question: {
        color: colors.white,
        alignSelf: 'flex-start',
        marginVertical: 30
    },
})

export default Login;
