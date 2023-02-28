import { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import colors from "../../assets/colors/colors";
import Regular from "../Wrappers/Typography";


function Switch_Input ({children, value, onPress}) {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);
    return (
        <View style={styles.container}>
            <Regular bold color={colors.background_light}>{children}</Regular>
            <Switch
                trackColor={{false: colors.white_opacity, true: colors.white_opacity}}
                thumbColor={value ? colors.background_light : colors.background_light}
                ios_backgroundColor={colors.white_opacity}
                onValueChange={onPress}
                value={value}
            />
        </View>
    )
}

export default Switch_Input;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: 'space-between',
        marginBottom: 10
    }
})