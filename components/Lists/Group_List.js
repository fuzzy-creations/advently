import React, { useContext } from 'react';
import { FlatList } from 'react-native';
import Empty from '../UI/Empty';
import List_Footer from '../UI/List_Footer';
import Group_Preview from '../Cards/Group_Preview';
import { ProfileDataContext } from '../../contexts/ProfileData.context';

function Group_List({ data, type, query, children, search }){  
    const { filters } = useContext(ProfileDataContext);
   
    const filter_query_handler = (group) => {       
        const queryText = query.toLowerCase();
        const name = group.name.toLowerCase();
        const about = group.about.toLowerCase();
        return name.includes(queryText) || about.includes(queryText);
    }

    const filter_by_type = group => {
        return [false, filters.charity, filters.community, filters.business][group.type]
    };

    const filter_by_radius = group => (group.distance < filters.radius);

    const filter_handler = (groups) => {
        var filters = [];
        if(search) filters.push(filter_by_radius);
        if(search) filters.push(filter_by_type);
        return groups.filter(v => filters.every(f => f(v)));
      }

    return (
        <FlatList 
            data={filter_handler(data)}
            ListFooterComponent={data.length > 3 ? List_Footer : null}
            ListEmptyComponent={<Empty>{children}</Empty>}
            renderItem={({ item }) => (
                <Group_Preview data={item} />
            ) }
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
    />
    )
}

export default Group_List;

