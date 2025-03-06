import React from "react";
import { View, Platform } from "react-native";
import { IconButton, MD2Colors, Appbar } from "react-native-paper";
import {Accordion, AccordionItem} from '@mustapha-ghlissi/react-native-accordion';
import { router } from "expo-router";

export default function Message() {
    

     // Function to navigate back to the home page
            const back = () => {router.replace('/')}
    
    return (
        <View style={{position: 'relative', left: -290}}>
            <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -50, left: 280}}></Appbar.BackAction>
            <Accordion compact titleStyle={{fontSize: 16,
        fontWeight: 700}} contentContainerStyle={{paddingTop: 15,
            paddingBottom: 20}} itemContainerStyle={{padding: 20}}>
            <AccordionItem
                       leftIcon="chat"
                       rightIcon="cogs"
                       title=" Message Usage "
                       subTitle="Communication with mindlike people are most enjoyable">
                        <IconButton icon={'comment'} style={{position: 'relative',
    left: 50}} iconColor={MD2Colors.green500}></IconButton>
                        <IconButton icon={'chat'} style={{position: 'relative',
    left: 50}} iconColor={MD2Colors.blue500}></IconButton>
                </AccordionItem>
                <AccordionItem leftIcon="satellite" rightIcon="message" title="Boardcast Message Usage" subTitle=' Boardcast public message '>
                            <IconButton icon={'message'} style={{position: 'relative',
    left: 50}} iconColor={MD2Colors.green500}></IconButton>
                            <IconButton icon={'phone'} style={{position: 'relative',
    left: 50}} iconColor={MD2Colors.blue500}></IconButton>
                            <IconButton icon={'video'} style={{position: 'relative',
    left: 50}} iconColor={MD2Colors.purple500}></IconButton>
                            <IconButton icon={'link'} style={{position: 'relative',
    left: 50}} iconColor={MD2Colors.orange500}></IconButton>
                            <IconButton icon={'image'} style={{position: 'relative',
    left: 50}} iconColor={MD2Colors.brown500}></IconButton>
                </AccordionItem>
                <AccordionItem leftIcon="compass" rightIcon="radar" title="News Usage" subTitle='Information is not regarding domain or events around you but your preference of knowledge'>
                        <IconButton icon={'chess-queen'} style={{position: 'relative', top: -8, marginLeft: -30,
    left: 50}} iconColor={MD2Colors.blue500}></IconButton>
                        <IconButton icon={'chess-king'} style={{position: 'relative', top: -15, marginLeft: -30,
    left: 50}} iconColor={MD2Colors.purple500}></IconButton>
                        <IconButton icon={'account'} style={{position: 'relative', top: -15, marginLeft: -30,
    left: 50}} iconColor={MD2Colors.orange500}></IconButton>
                        <IconButton icon={'bitcoin'} style={{position: 'relative',top: -15, marginLeft: -30,
    left: 50}} iconColor={MD2Colors.green500}></IconButton>
                        <IconButton icon={'food'} style={{position: 'relative',top: -215, marginLeft: 100,
    left: 50}} iconColor={MD2Colors.amber500}></IconButton>
                        <IconButton icon={'purse'} style={{position: 'relative',top: -220, marginLeft: 100,
    left: 50}} iconColor={MD2Colors.cyan500}></IconButton>
                        <IconButton icon={'cricket'} style={{position: 'relative', top: -220, marginLeft: 100,
    left: 50}} iconColor={MD2Colors.blueGrey500}></IconButton>
                        <IconButton icon={'gavel'} style={{position: 'relative',top: -220, marginLeft: 100,
    left: 50}} iconColor={MD2Colors.brown500}></IconButton>
                    </AccordionItem>
                </Accordion>
            </View> 
    );
}