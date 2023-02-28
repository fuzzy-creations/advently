import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Keyboard } from 'react-native';
import colors from '../../assets/colors/colors';

function TextAreaInput(props){
    const [focused, setFocused] = useState(false);
    return (
    <View style={styles.wrapper}>
        <TextInput
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onSubmitEditing={Keyboard.dismiss}
            autoCapitalize={props.lowercase === true ? "none" : null} 
            numberOfLines={15}
            multiline={true}
            style={props.dark ? styles.input_dark : [styles.input, {backgroundColor: focused ? "#fff" : '#ffffff50', color: focused ? colors.text_medium : colors.white}]} 
            placeholderTextColor={props.dark ? colors.text_dark : focused ? colors.text_medium : colors.white} value={props.value} 
            placeholder={props.children} 
            onChangeText={(e) => props.input(e)}/>
    </View>
    )
}

export default TextAreaInput;

const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'stretch'
    },
    input: {
        backgroundColor: '#ffffff50',
        borderRadius: 30,
        width: '100%',
        color: colors.text_medium,
        alignSelf: 'stretch',  
        height: 60,
        textAlignVertical: 'top', 
        flex: 1, 
        minHeight: 300, 
        padding: 25, 
        paddingTop: 25,
        marginBottom: 20 
    },
    input_dark: {
        backgroundColor: '#eee',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        width: '100%',
        color: colors.text_medium,
        alignSelf: 'stretch',  
        height: 60,
        textAlignVertical: 'top', 
        flex: 1, 
        minHeight: 200, 
        padding: 25, 
        marginBottom: 20 
    },
})