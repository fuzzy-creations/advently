import { ImageBackground, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, ScrollView } from 'react-native'


export const PrimaryBackground = ({ children }) => {
    return (
        <ImageBackground style={styles.primary} source={require('../../assets/images/form.png')}>
             <SafeAreaView><StatusBar translucent backgroundColor={"transparent"} style="light" barStyle="light-content"  /></SafeAreaView>
            {children}
        </ImageBackground>
    );
};


export const WhiteBackground = ({ children, flex, noScroll, ref }) => {
    return (
        <ScrollView ref={ref} contentContainerStyle={[{ flexGrow: flex ? 1 : null }]} style={styles.white} scrollEnabled={noScroll ? false : true} showsVerticalScrollIndicator={false}>
            <SafeAreaView><StatusBar translucent backgroundColor={"#fff"} style={"dark"} barStyle="dark-content"  /></SafeAreaView>
            {children}
        </ScrollView>
    );
};

export const KeyboardBackground = ({ children, flex, noScroll }) => {
    return (
        <KeyboardAvoidingView style={[styles.white, { flex: flex ? 1 : null }]} behavior={Platform.OS === "ios" ? "padding" : "height"} keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 50}>
            <SafeAreaView><StatusBar translucent backgroundColor={"#fff"} style={"dark"} barStyle="dark-content"  /></SafeAreaView>
            {children}
        </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create({
    primary: {
        flex: 1,
        paddingTop: Platform.OS === 'ios'? 50 : 50,
        justifyContent: 'space-between',
    },
    white: {
        marginTop: Platform.OS === 'ios'? 0 : 50,
    },
})