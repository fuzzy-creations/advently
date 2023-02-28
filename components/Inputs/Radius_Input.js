import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import colors from '../../assets/colors/colors';
import typography from '../../styles/typography';
import CustomModal from '../UI/CustomModal';
import Slider from '@react-native-community/slider';
import { Main } from '../Wrappers/Containers';

function Radius_Input(props) {

    return ( 
        <Main>      
            <Text style={[typography.main_bold, styles.option]}>Search Radius: {props.distance} miles</Text>

             <View >
             <Slider 
                style={styles.slider} 
                minimumValue={1} 
                maximumValue={50} 
                minimumTrackTintColor={colors.primary_light} 
                maximumTrackTintColor={colors.primary_light} 
                thumbTintColor={colors.primary} 
                value={props.distance} 
                onSlidingComplete={value => props.action(value.toFixed(0))} />
            </View>
        </Main>
    )
}

export default Radius_Input;



const styles = StyleSheet.create({
    drop: {
        flexDirection: 'row',
        borderWidth: 2,
        borderColor: colors.background_medium,
        borderRadius: 30,
        alignItems: 'center',
        justifyContent: 'center',
        height: 50,
        paddingHorizontal: 20,
        position: 'relative',
        zIndex: 10,
    },
    label: {
        color: colors.text_light_medium,
    },
    option: {
        textTransform: 'capitalize',
        marginHorizontal: 10,
    },
    icon: {
        alignItems: 'flex-end',
        justifyContent: 'center'
    },

    
    options: {
        alignItems: 'center',
    },
    slider: { 
        height: 40,
        color: colors.primary,  
        width: "100%",
        alignSelf: 'center'
    },  
})