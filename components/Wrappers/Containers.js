import { View, StyleSheet } from 'react-native';
import colors from '../../assets/colors/colors';



export const Main = ({ 
    children, 
    marginTop, 
    marginBottom, 
    marginLeft, 
    marginRight, 
    paddingTop, 
    paddingBottom, 
    paddingLeft, 
    paddingRight, 
    flex, 
    light,
    marginHorizontal,
    marginVertical, 
    paddingVertical,
    paddingHorizontal, 
    container,
    align, 
    justify, 
    transparent
    }) => (
    <View style={styles.main({
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
        flex, 
        light,
        container,
        align, 
        justify, 
        transparent
    })}>
        {children}
    </View>
);





const styles = StyleSheet.create({
    main: ({
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
        flex, 
        light,
        container, 
        align, 
        justify,
        transparent 
        
    }) => ({
        backgroundColor: transparent ? 'transparent' : light ? colors.background_light : colors.white,

        marginTop: marginTop ?? marginVertical ??  0,
        marginBottom: marginBottom ?? marginVertical ?? 0,
        marginRight: marginRight ?? marginHorizontal ?? container ? 25 : 0,
        marginLeft: marginLeft ? marginLeft : marginHorizontal ? marginHorizontal : container ? 25 : 0,

        paddingTop: paddingTop ? paddingTop : paddingVertical ? paddingVertical : 0,
        paddingBottom: paddingBottom ? paddingBottom : paddingVertical ? paddingVertical : 0,
        paddingRight: paddingRight ? paddingRight : paddingHorizontal ? paddingHorizontal : 0,
        paddingLeft: paddingLeft ? paddingLeft : paddingHorizontal ? paddingHorizontal : 0,

        flex: flex ? 1 : null,
        alignItems: align ? align : null,
        justifyContent: justify ? justify : null,
    }),
})


