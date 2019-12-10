import React from 'react'; 
import { StyleSheet } from 'react-native'; 
import { Text, Title, Card } from 'react-native-paper';
import { FlatList } from 'react-native-gesture-handler';


const styles = StyleSheet.create({
    flatlistStyle : {
        paddingLeft: 30, 
        paddingRight: 30, 
    },
    titleStyle: {
        textAlign: 'center', 
    }, 
    textStyle: { 
        textAlign: 'center', 
        opacity: 0.7,
    },
});

export default function HistoryList(props) { 
    return (
        <FlatList 
            style={styles.flatlistStyle}
            data={props.history.map((item, i) => ({...item, i}))}
            removeClippedSubviews={false}
            initialNumToRender={10}
            extraData={props.history.length}
            renderItem={(props) => (
                <Card style={{ elevation: 10, marginTop: 10, marginLeft: 10, marginRight: 10}}> 
                    <Card.Content>
                        <Title style={styles.titleStyle}> 
                            {props.item.title}
                        </Title>
                        <Text style={styles.textStyle}> 
                            {props.item.artist}
                        </Text>
                    </Card.Content>
                </Card>
            )}
            keyExtractor={item => String(item.i)}
        />  
    )
}