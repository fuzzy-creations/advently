import React from 'react';
import { StyleSheet, Text } from 'react-native';
import colors from '../../assets/colors/colors';


export const Header = ({
    children, 
    color, 
    align, 
    size,
    large,
    small,
    marginTop, 
    marginBottom, 
    marginLeft, 
    marginRight,
    paddingTop, 
    paddingBottom, 
    paddingLeft, 
    paddingRight,  
    marginHorizontal,
    marginVertical, 
    paddingVertical,
    paddingHorizontal, 
    }) => <Text style={styles.text({
    color, 
    align, 
    size: size ? size : large ? 40 : small ? 22 :  25,
    marginTop, 
    marginBottom, 
    marginLeft, 
    marginRight,
    paddingTop, 
    paddingBottom, 
    paddingLeft, 
    paddingRight,  
    marginHorizontal,
    marginVertical, 
    paddingVertical,
    paddingHorizontal, 
    })}>
        {children}
    </Text>

export const Regular = ({
    children, 
    color, 
    align, 
    size,
    small,
    bold,
    marginTop, 
    marginBottom, 
    marginLeft, 
    marginRight,
    paddingTop, 
    paddingBottom, 
    paddingLeft, 
    paddingRight,  
    marginHorizontal,
    marginVertical, 
    paddingVertical,
    paddingHorizontal, 
    }) => <Text style={styles.text({
    color, 
    align, 
    size,
    small,
    bold,
    marginTop, 
    marginBottom, 
    marginLeft, 
    marginRight,
    paddingTop, 
    paddingBottom, 
    paddingLeft, 
    paddingRight,  
    marginHorizontal,
    marginVertical, 
    paddingVertical,
    paddingHorizontal, 
    })}>
        {children}
    </Text>

export const Status = ({children}) => <Text style={styles.status()}>{children}</Text>

const styles = StyleSheet.create({
    text: ({
        color, 
        align, 
        size,
        small,
        bold,
        marginTop, 
        marginBottom, 
        marginLeft, 
        marginRight,
        paddingTop, 
        paddingBottom, 
        paddingLeft, 
        paddingRight,  
        marginHorizontal,
        marginVertical, 
        paddingVertical,
        paddingHorizontal, 
    }) => ({
        fontSize: size ? size : small ? 14 : 17,
        lineHeight: size ? size : small ? 14 : 17,
        fontFamily: bold ? 'Quicksand-Bold' : 'VarelaRound-Regular',
        color: color ? color : colors.text_dark,
        textAlign: align ? align : null,
        marginTop: marginTop ? marginTop : marginVertical ? marginVertical : 0,
        marginBottom: marginBottom ? marginBottom : marginVertical ? marginVertical : 0,
        marginRight: marginRight ? marginRight : marginHorizontal ? marginHorizontal : 0,
        marginLeft: marginLeft ? marginLeft : marginHorizontal ? marginHorizontal : 0,
        paddingTop: paddingTop ? paddingTop : paddingVertical ? paddingVertical : 0,
        paddingBottom: paddingBottom ? paddingBottom : paddingVertical ? paddingVertical : 0,
        paddingRight: paddingRight ? paddingRight : paddingHorizontal ? paddingHorizontal : 0,
        paddingLeft: paddingLeft ? paddingLeft : paddingHorizontal ? paddingHorizontal : 0,
    }),
    status: () => ({
        fontSize: 12,
        lineHeight: 15,
        fontFamily: 'VarelaRound-Regular',
        color: colors.text_dark,
        textAlign: 'center',
        marginBottom: 20
    }),
})

export default Regular;