import React from 'react';
import { FlatList, View } from 'react-native';
import Group_Invite_Preview from '../Cards/Group_Invite_Preview';
import Invite_Preview from '../Cards/Invite_Preview';

function Invite_List(props){  
    const data = props.data;


    return (
        <FlatList 
            data={data} 
                renderItem={({ item }) => ( props.group ? <Group_Invite_Preview data={item} /> : <Invite_Preview data={item} /> )}
                keyExtractor={item => item.id} 
                horizontal
                pagingEnabled snapToAlignment='center' showsHorizontalScrollIndicator={false}
                showsVerticalScrollIndicator={false}
              />             
    )
}


export default Invite_List;

