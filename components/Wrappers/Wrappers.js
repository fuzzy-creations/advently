import React from 'react';
import { StyleSheet, View, Text, Pressable, Image, ImageBackground } from 'react-native';
import colors from '../../assets/colors/colors';
import global from "../../styles/global";
import typography from "../../styles/typography";
import { FontAwesome } from '@expo/vector-icons';


export const Highlight = ({children, primary, marginRight, marginBottom}) => {
    return (
        <View style={styles.highlight({primary, marginRight, marginBottom})}>
            <Text style={[typography.small, global.text_white, {fontSize: 12}]}>{children}</Text>
        </View>
    )
}

export const Icon = (props) => {
    return (
        <Pressable onPress={props.action} style={({pressed}) => [{
                backgroundColor: pressed ? props.white ? '#ffffff50' : '#CDCDCD50' : (props.filled ? "rgba(249, 249, 251, 0.3)" : "transparent")}, 
                styles.wrapper, 
                props.style
            ]}>
            {props.children}
        </Pressable>
    )
}

export const Avatar = ({children, size}) => <Image style={styles.avatar(size)} source={{uri: children}} />



const styles = StyleSheet.create({
    wrapper: {
        width: 50,
        aspectRatio: 1,
        borderRadius: 40,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 2,
    },
    avatar: size => ({
        alignSelf: 'center',
        height: size ?? 120, 
        aspectRatio: 1,
        borderRadius: size ?? 120,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden',
        backgroundColor: colors.background_medium
    }),
    highlight: ({primary, marginBottom, marginRight}) => ({
        backgroundColor: primary ? colors.primary_light : "rgba(85, 85, 85, 0.64)",
        paddingVertical: 7, 
        paddingHorizontal: 15,
        alignItems: 'center',
        justifyContent: 'center', 
        color: colors.white,
        borderRadius: 20,
        alignSelf: 'flex-start',
        marginBottom: marginBottom ?? 0,
        marginRight: marginRight ?? 0,
    }),
    image_round: {
        alignSelf: 'center',
        height: 120, 
        width: 120,
        borderRadius: 120,
        justifyContent: 'center',
        alignItems: 'center',
        overflow: 'hidden'
    },
    image_opacity: {
        opacity: 0.8
    }, 
})

export default Icon;