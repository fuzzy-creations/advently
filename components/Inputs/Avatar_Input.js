import { ImageBackground, Pressable, StyleSheet, Platform, useEffect } from "react-native"
import { FontAwesome } from '@expo/vector-icons';
import { useContext, useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { select_image_handler } from "../../tools/Upload_Methods";
import { upload_avatar, upload_event_image, upload_logo } from "../../firebase/methods/Storage_Functions";
import { update_my_profile } from "../../firebase/methods/User_Functions";
import { ProfileDataContext } from "../../contexts/ProfileData.context";
import { update_my_group } from "../../firebase/methods/Group_Functions";
import { update_my_event } from "../../firebase/methods/Event_Functions";




const Avatar_Upload = ({url, id, type}) => {
    const { user_profile } = useContext(ProfileDataContext);
    const [image, setImage] = useState(url);
    const [loader, set_loader] = useState(false);
    const [status, set_status] = useState(false);

    const upload_profile = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const data = await upload_avatar(blob, id);
        if(data) {
            try {
                setImage(url);
                await update_my_profile(id, {image: data});
                set_loader(false);
            } catch(error) {
               set_status(error.message)
               set_loader(false);
            }
        }
    }

    const upload_event = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const data = await upload_event_image(blob, id)
        if(data) {
            try {
                setImage(url);
                await update_my_event(id, {image: data});
                set_loader(false);
            } catch(error) {
               set_status(error.message)
               set_loader(false);
            }
        }
    }

    const upload_group = async (url) => {
        const response = await fetch(url);
        const blob = await response.blob();
        const data = await upload_logo(blob, id)
        if(data) {
            try {
                setImage(url);
                await update_my_group(id, {image: data})
                set_loader(false);
            } catch(error) {
                set_loader(false);
                set_status(error.message)

            }
        }
    }


    const image_upload_handler = async () => {
        const status = await select_image_handler();
        if(status.cancelled || false) {

        } else {
            [upload_profile(status.uri), upload_event(status.uri), upload_group(status.uri)][type]
            set_loader(true);
        }
    }


    return (
        <Pressable onPress={image_upload_handler}>
            <ImageBackground imageStyle={styles.image_opacity}  style={styles.image_round} source={{uri: image}}>
                <FontAwesome name="camera" size={50} color={'#ffffff90'} />
            </ImageBackground>
        </Pressable>
    )
}

export default Avatar_Upload


const styles = StyleSheet.create({
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