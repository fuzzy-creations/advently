import React from 'react';
import { FlatList, ScrollView, StyleSheet } from 'react-native';
import { WIDTH } from '../../tools/Constants';
import Date_Selector from '../Inputs/Date_Selector';

const Dates_List = (props) => (
    <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={{flexDirection: 'row', width: WIDTH, marginLeft: -25, paddingLeft: 25}} >
        {props.data.map(item => (
            <Date_Selector
              data={item}
              action={() => props.selector(item.id)}
              dark={props.dark}
              selected={item.id === props.selected ? true : false}
              key={item.id.toString()}
            />
            ))}
    </ScrollView>
);

export default Dates_List;

