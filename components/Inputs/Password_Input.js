import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, Pressable, Keyboard } from 'react-native';
import colors from '../../assets/colors/colors';
import { Octicons, Ionicons } from '@expo/vector-icons';

function Password_Input(props){
    const [hide_password, set_hide_password] = useState(true);
    const [focused, setFocused] = useState(false);

    return (
    <View style={styles.wrapper}>
        {/* <Text style={styles.label_dark}>{props.children}</Text> */}
        <View style={props.dark ? styles.input_dark : [styles.input, {backgroundColor: focused ? "#fff" : '#ffffff50', color: focused ? colors.text_medium : colors.white}]} >
            <TextInput 
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
                onSubmitEditing={Keyboard.dismiss}
                autoCapitalize={props.lowercase === true ? "none" : null} 
                style={[styles.input_inner, {color: focused ? colors.text_medium : colors.white}]} 
                placeholderTextColor={focused ? colors.text_medium : colors.white} 
                value={props.value} 
                placeholder={props.children} onChangeText={(e) => props.input(e)}
                secureTextEntry={hide_password} 
                />
            <Pressable autoCapitalize="none" onPress={() => set_hide_password(password => !password)}>
                {hide_password ? 
                <Octicons name="eye-closed" size={24} color={focused ? colors.text_medium : colors.white} /> 
                : 
                <Octicons name="eye" size={24} color={focused ? colors.text_medium : colors.white} />}
            </Pressable>
        </View>
    </View>
    )
}

export default Password_Input;



const styles = StyleSheet.create({
    wrapper: {
        alignSelf: 'stretch',
    },
    label_dark: {
        fontFamily: 'VarelaRound-Regular',
        color: colors.text_light_medium,
        marginBottom: 5
    },
    input: {
        backgroundColor: '#ffffff50',
        paddingVertical: 15,
        paddingHorizontal: 25,
        borderRadius: 30,
        width: '100%',
        color: colors.text_medium,
        alignSelf: 'stretch',  
        flexDirection: 'row',
        alignItems: 'center',
        height: 60
    },
    input_inner: {
        color: colors.text_light,
        flex: 1
    },
    
})