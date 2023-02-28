import React from 'react';
import { StyleSheet, View } from 'react-native';
import Swipeable from 'react-native-gesture-handler/Swipeable';
import { Octicons } from '@expo/vector-icons';
import colors from '../../assets/colors/colors';

function Swipe(props){

    const Left_Handler = () => props.left_action ? props.left_action() : null;
    const Right_Handler = () => props.right_action ? props.right_action() : null;
    
    const LeftAction = () => props.left_action ? <View style={styles._accept}><View style={styles.swipe}><Octicons name="arrow-right" size={34} color={colors.green} /></View></View> : null
    const RightAction = () => props.right_action ? <View style={styles._decline}><View style={styles.swipe}><Octicons name="arrow-left" size={34} color={colors.red} /></View></View> : null

    return (
        <Swipeable renderLeftActions={LeftAction} renderRightActions={RightAction} onSwipeableLeftOpen={Left_Handler} onSwipeableRightOpen={Right_Handler}>
            {props.children}
        </Swipeable>
    )
}
export default Swipe;

const styles = StyleSheet.create({
    _accept: {
        width: "100%",
        alignItems: 'flex-start',
        justifyContent: 'center'
    },
    _decline: {
        width: "100%",
        alignItems: 'flex-end',
        justifyContent: 'center'
    },
    swipe: {
        marginBottom: 5,
        borderRadius: 15,
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
    }
})
