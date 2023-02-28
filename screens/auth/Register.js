import React, { useState, useContext, useRef } from 'react';
import { StyleSheet, Text, ScrollView, View, Dimensions, ImageBackground } from 'react-native';
import { Octicons } from '@expo/vector-icons';
import { AuthContext } from '../../contexts/Auth.context';
import colors from '../../assets/colors/colors';
import global from '../../styles/global';
import typography from '../../styles/typography';
import Button_Main from '../../components/Buttons/Button_Main';
import Alt_Header from '../../components/Headers/Alt_Header';
import Text_Input from '../../components/Inputs/Text_Input';
import Password_Input from '../../components/Inputs/Password_Input';
import { FlatList } from 'react-native-gesture-handler';
import Button_Highlight from '../../components/Buttons/Button_Highlight';
import { WIDTH } from '../../tools/Constants';
import { Status } from '../../components/Wrappers/Typography';
import Carousel from '../../components/Animations/Carousel';

function Register({ navigation }){ 
    const { register_user } = useContext(AuthContext);
    const [stage, set_stage] = useState(0);
    const [name_input, set_name_input] = useState("");
    const [email_input, set_email_input] = useState("");
    const [password_input, set_password_input] = useState("");
    const [loader, set_loader] = useState(false);
    const [status, set_status] = useState("");
    const carouselRef = useRef();


    const next_active_handler = () => {
        if(stage === 0) return name_input.length >= 3 && name_input.length < 20;
        if(stage === 1) return email_input.length >= 3;
        if(stage === 2) return password_input.length >= 3;
    };

    const submit_handler = () => {
        if(loader === false) {
            set_loader(true);
            const user_main = {email: email_input.trim(), password: password_input.trim()};
            const user_profile = {name: name_input.trim()};
            register_user(user_main, user_profile).then(result => {
                if(result === true) {
                    set_status("Created")
                } else {
                    set_loader(false)
                    set_status(result);
                };
            });
        };
    };
      
    
    const back_handler = () => stage === 0 ? navigation.navigate('Landing') : scrollToIndex(stage -1);


    const stage_one = (
        <>
        <Octicons name="person" size={80} color={colors.white} />
        <Text style={[typography.header_1, styles.question]}>To start, what is your name?</Text>
        <Text_Input value={name_input} input={set_name_input}>Your Name</Text_Input>
        </>
    );

    const stage_two = (
        <>
        <Octicons name="mail" size={80} color={colors.white} />
        <Text style={[typography.header_1, styles.question]}>We need to know your email address</Text>
        <Text_Input lowercase value={email_input} input={set_email_input}>Email</Text_Input>
        </>
    );

    const stage_three = (
        <>
        <Octicons name="lock" size={80} color={colors.white} />
        <Text style={[typography.header_1, styles.question]}>Lastly, set your password</Text>
        <Password_Input value={password_input} input={set_password_input}>Password</Password_Input>
        </>
    );

    const scrollToIndex = (index) => {
        set_stage(index);
        carouselRef.current.scrollToIndex(index);
    }

    const content = [stage_one, stage_two, stage_three];

    return (      
        <ScrollView contentContainerStyle={styles.container} >
        <ImageBackground style={styles.wrapper} imageStyle={styles.wrapper} source={require('../../assets/images/form.png')}>
                <Alt_Header white back_handler={back_handler}></Alt_Header>
                <Carousel content={content} ref={carouselRef} align='center' />
                <View style={styles.footer}>
                    <Status>{status}</Status>
                    {stage === 2 ? 
                    <Button_Main hollow active={next_active_handler()} loader={loader} action={submit_handler}>Complete</Button_Main> 
                    : <Button_Main active={next_active_handler()} hollow action={() => scrollToIndex(stage + 1)}>Continue</Button_Main> 
                    }
                    <Button_Highlight marginTop={25} action={() => navigation.navigate('Login')}>
                        <Text style={[typography.main, {color: colors.background_medium}]}>Back to<Text style={[typography.main_bold, global.text_white]}> Login</Text></Text>
                    </Button_Highlight>
                </View>
        </ImageBackground>
        </ScrollView>
    );
};

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
        width: WIDTH,
        paddingHorizontal: 25
    }, 
    footer: {
        alignItems: 'center',
        textAlign: 'center',
        paddingHorizontal: 25,
       
    },
    question: {
        color: colors.white,
        alignSelf: 'flex-start',
        marginVertical: 30
    },
});

export default Register;
