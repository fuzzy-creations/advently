import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import colors from '../../assets/colors/colors';

function Text_Input(props){
    const [focused, setFocused] = useState(false);
    return (
    <View style={styles.wrapper}>
        {/* {props.children ? <Text style={props.dark ? styles.label_dark : styles.label}>{props.children}</Text> : null} */}
        <TextInput
         onFocus={() => setFocused(true)}
         onBlur={() => setFocused(false)}
         onSubmitEditing={Keyboard.dismiss}
         autoCapitalize={props.lowercase === true ? "none" : null} 
         style={props.dark ? styles.input_dark : [styles.input, {backgroundColor: focused ? "#fff" : '#ffffff50', color: focused ? colors.text_medium : colors.white}]} 
         placeholderTextColor={props.dark ? colors.text_medium : focused ? colors.text_medium : colors.white} value={props.value} 
         placeholder={props.children} onChangeText={(e) => props.input(e)}/>
    </View>
    )
}

export default Text_Input;



const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'stretch'
    },
    input: {
        backgroundColor: '#ffffff50',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        width: '100%',
        color: colors.text_medium,
        alignSelf: 'stretch',  
        height: 60,
    },
    label: {
        fontFamily: 'VarelaRound-Regular',
        color: colors.white,
        marginBottom: 5
    },
    input_dark: {
        borderWidth: 2,
        borderColor: colors.background_medium,
        // backgroundColor: '#eee',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        width: '100%',
        color: colors.text_medium,
        alignSelf: 'stretch',  
        height: 60,
    },
    label_dark: {
        fontFamily: 'VarelaRound-Regular',
        color: colors.text_light_medium,
        marginBottom: 5
    },
})