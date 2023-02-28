import React from 'react';
import { StyleSheet, Pressable, Text } from 'react-native';
import colors from '../../assets/colors/colors';
import typography from '../../styles/typography';

const Date_Selector = (props) => (
    <Pressable onPress={() => props.action()} style={({pressed}) => [{}, styles.container(props.selected, props.dark)]}>
        <Text style={[typography.main, styles.text(props.selected, props.dark)]}>{props.data.day.slice(0, 3)}</Text>
        <Text style={[typography.large, styles.date(props.selected, props.dark)]}>{props.data.date}</Text>
    </Pressable>
);


const styles = StyleSheet.create({
    container: (selected, dark) => ({
        height: 85,
        alignItems: 'center',
        justifyContent: 'center',
        width: 65,
        borderWidth: 2,
        borderColor: colors.background_medium,
        borderRadius: 25,
        marginBottom: 10,
        marginRight: 5,
        backgroundColor: dark ? (selected ? colors.white : '#ffffff50') : (selected ? colors.primary_light : colors.white) 
    }),
    text: (selected, dark) => ({
        marginBottom: 10,
        opacity: dark ? 1 : selected ? 1 : 0.5, 
        color: dark ? (selected ? colors.text_light_medium : colors.background_medium) : (selected ? colors.background_light : colors.text_medium) 
    }),
    date: (selected, dark) => ({
        fontSize: 20,
        lineHeight: 20,
        color: dark ? (selected ? colors.text_medium : colors.white) : (selected ? colors.white : colors.text_medium) 
    })

})

export default Date_Selector;