import React from "react"
import { View, Text } from "react-native"
import { IconButton, Appbar, MD2Colors } from "react-native-paper"
import {Accordion, AccordionItem} from '@mustapha-ghlissi/react-native-accordion';
import { router } from "expo-router";

export default function Notification() {


    // Function to navigate back to the home page
    const back = () => {router.replace('/')}

    return (
        <View style={{position: 'relative', left: -290}}>
            <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -50, left: 280}}></Appbar.BackAction>
            <Text style={{position: 'relative',
                color: 'white',
                top: -70,
                left: 50, 
                fontSize: 16,
                fontWeight: 'bold'}}> Grant Divulgence consent </Text>
            <Accordion compact titleStyle={{fontSize: 16,
        fontWeight: 700}} contentContainerStyle={{paddingTop: 15,
            paddingBottom: 20}} itemContainerStyle={{ padding: 20}}>
                    <AccordionItem
                                leftIcon="account-circle"
                                title="Exclusive Dinners"
                                subTitle="Private Dinners invite exclusive members to promote business & other public affairs ">
                                <IconButton icon={'fingerprint'} style={{position: 'absolute',
    left: 100,
    top: 20}}></IconButton>
                    </AccordionItem>
                    <AccordionItem leftIcon="handshake" title="Private Capital Clubs" subTitle='Private Capital Clubs make hand to negioatte on business deals & transactions'>
                         <IconButton icon={'face-recognition'} style={{position: 'absolute',
    left: 100,
    top: 20}}></IconButton>
                    </AccordionItem>
                    <AccordionItem leftIcon="compass"  title="News" subTitle='Authenticate news are prime source of decision making paticularly if deals between Moguls.'>
                    </AccordionItem>
                </Accordion>
        </View>
    )

}