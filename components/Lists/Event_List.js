import React, { useContext } from 'react';
import { Text, View, FlatList } from 'react-native';
import global from '../../styles/global';
import typography from '../../styles/typography';
import { date_after, event_preview_array_format } from '../../tools/DateTime_Methods';
import { format_events } from '../../tools/Global_Functions';
import Empty from '../UI/Empty';
import List_Footer from '../UI/List_Footer';
import Event_Preview from '../Cards/Event_Preview';
import { ProfileDataContext } from '../../contexts/ProfileData.context';

function Event_List({ data, reverse, date, children, search }){  
    const { filters } = useContext(ProfileDataContext);

    const filter_query_handler = (event) => {       
        const queryText = query.toLowerCase();
        const event_name = event.name.toLowerCase();
        const group_name = event.group_name.toLowerCase();
        return event_name.includes(queryText) || group_name.includes(queryText); 
    }
    const filter_by_type = event => {
        return [false, filters.charity, filters.community, filters.business][event.group_type]
    };
    const filter_by_radius = event => (event.distance < filters.radius);

    const filter_by_date = (array, new_date) => array.filter(item => date_after(item.date, new_date));

    const filter_handler = (events) => {

        var filters = [];
        if(search) filters.push(filter_by_radius);
        if(search) filters.push(filter_by_type);
        const filteredData = events.filter(v => filters.every(f => f(v)));
        const format_filtered = format_events(filteredData);
        if(date){
            return filter_by_date(format_filtered, date);
        } else {
            return format_filtered
        }
    }

    return (
        <FlatList data={reverse ? filter_handler(data).reverse() : filter_handler(data)} 
            ListFooterComponent={data.length > 3 ? List_Footer : null} 
            ListEmptyComponent={<Empty>{children}</Empty>}
            renderItem={({ item }) => {
            return (
                <View>
                    <Text style={[typography.extra_small, global.events_preview_date]}>{event_preview_array_format(item.date).toUpperCase()}</Text>
                    {item.events.map((event, index) => <Event_Preview event={event} key={event.id} />)}
                </View>
                    ) 
                }
            }
            showsVerticalScrollIndicator={false}
            keyExtractor={(item, index) => index.toString()} 
        />
    )
}


export default Event_List;

