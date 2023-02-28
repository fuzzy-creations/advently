

import Slider from "@react-native-community/slider"
import { useContext, useState } from "react"
import { ScrollView, StyleSheet } from "react-native"
import colors from "../assets/colors/colors"
import Button_Main from "../components/Buttons/Button_Main"
import Alt_Header from "../components/Headers/Alt_Header"
import GoogleAddress from "../components/Inputs/GoogleAddress"
import Switch_Input from "../components/Inputs/Switch_Input"
import { PrimaryBackground } from "../components/Wrappers/Backgrounds"
import { Main } from "../components/Wrappers/Containers"
import Regular, { Header } from "../components/Wrappers/Typography"
import { LocationContext } from "../contexts/Location.context"
import { ProfileDataContext } from "../contexts/ProfileData.context"

// - Search Radius 
//- Search Type 
//- Set Location 
//- Blocked list 

// 

function Filters () {
    const { filters, set_filters } = useContext(ProfileDataContext);
    const { location, address, set_custom_location } = useContext(LocationContext);
    const [addu, set_addu] = useState(address.city);
    const [geo, set_geo] = useState("");

    const [region, city] = address ? [address.district || address.city || address.subregion, address.region || address.country] : ["Hidden", "Earth"]

    const location_handler = () => {
        set_custom_location(geo)
    }

    return (
        <PrimaryBackground>
            <Alt_Header white></Alt_Header>
            <ScrollView contentContainerStyle={{flexGrow: 1}}>
                <Main paddingHorizontal={25} marginTop={30} flex transparent>
                <Header color={colors.white} large marginBottom={30}>Filters</Header>
                <Regular>{region}, {city}</Regular>
                <Header color={colors.white} marginBottom={10}>Set Location</Header>



                <GoogleAddress location={addu} set_location={set_addu} geo={set_geo} />
                <Button_Main action={location_handler}>Set Location</Button_Main>



                <Header color={colors.white} marginBottom={10}>Radius</Header>
                <Regular color={colors.white}>Search Radius: {filters.radius} miles</Regular>
                <Slider 
                    style={styles.slider} 
                    minimumValue={1} 
                    maximumValue={50} 
                    minimumTrackTintColor={colors.white_opacity} 
                    maximumTrackTintColor={colors.white_opacity} 
                    thumbTintColor={colors.background_light} 
                    value={filters.radius} 
                    onSlidingComplete={radius => set_filters({...filters, radius: radius.toFixed(0)})} 
                />  
                <Header color={colors.white} marginBottom={10} marginTop={20}>Type</Header>
                <Switch_Input value={filters.charity} onPress={() => set_filters({...filters, charity: !filters.charity})}>Charity</Switch_Input>
                <Switch_Input value={filters.community} onPress={() => set_filters({...filters, community: !filters.community})}>Community</Switch_Input>
                <Switch_Input value={filters.business} onPress={() => set_filters({...filters, business: !filters.business})}>Business</Switch_Input>
                </Main>
            </ScrollView>
        </PrimaryBackground>
    )
}

export default Filters

const styles = StyleSheet.create({
    slider: { 
        height: 40,
        color: colors.primary,  
        width: "100%",
        alignSelf: 'center'
    },  
})