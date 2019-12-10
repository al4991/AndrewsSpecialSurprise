import React from 'react';

import { Button, Title, Card, TextInput } from 'react-native-paper';
import { StyleSheet } from 'react-native'; 


const styles = StyleSheet.create({
    cardActionsContainer: {
        display: 'flex',
        justifyContent: 'center', 
        alignItems: 'center'
    },
    titleStyle: {
        textAlign: 'center', 
    }
})

export default function MainScreenForm(props) { 
    return (
        <Card style={{ elevation: 10 }}> 
            <Card.Content>
                <Title style={styles.titleStyle}> 
                    Put in a song!
                </Title>
                <TextInput
                    label='title'
                    value={props.title}
                    onChangeText={text => props.setTitle(text)}
                />
                <TextInput
                    label='artist'
                    value={props.artist}
                    onChangeText={text => props.setArtist(text)}
                />
            </Card.Content>
            <Card.Actions style={styles.cardActionsContainer}> 
                <Button onPress={props.onSwap}> 
                    Swap! 
                </Button>    
            </Card.Actions>
        </Card>
    )
}