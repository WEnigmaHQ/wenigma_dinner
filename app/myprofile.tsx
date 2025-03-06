import React from "react";
import { View, Platform, TextInput, Text } from "react-native";
import { Appbar, MD2Colors } from "react-native-paper";
import {Accordion, AccordionItem} from '@mustapha-ghlissi/react-native-accordion';
import { router } from "expo-router";


export default function MyProfile() {

    // Function to navigate back to the home page
        const back = () => {router.replace('/')}
        
        return (
            <View style={{position: 'relative', left: -290}}>
                <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -50, left: 280}}></Appbar.BackAction>
                <Accordion compact titleStyle={{fontSize: 16,
        fontWeight: 700}} contentContainerStyle={{paddingTop: 15,
            paddingBottom: 20}} itemContainerStyle={{padding: 20}}>
                    <AccordionItem
                            leftIcon="account-circle"
                            rightIcon="pencil"
                            title="My Profile"
                            subTitle="Inspire people, with your actions">
                                <Text style={{position: 'relative', 
    left: 10}}> Edit Name * </Text>
                                <TextInput style={{position: 'relative', 
    left: 20, 
    backgroundColor: 'silver', 
    width: 200, 
    top: 10, 
    borderRadius: 20}} inputMode='text' placeholder='Edit name' value=''></TextInput>
                                <Text style={{position: 'relative', 
    left: 10,
    top: 12}}> Edit Persona * </Text>
                                <TextInput style={{position: 'relative', 
    left: 20, 
    backgroundColor: 'silver', 
    width: 200, 
    top: 18, 
    borderRadius: 20}} inputMode='text' placeholder='Bio' value=''></TextInput>
                                <Text style={{position: 'relative', 
    left: 10,
    top: 20}}> Business Name * </Text>
                                <TextInput style={{position: 'relative', 
    left: 20, 
    backgroundColor: 'silver', 
    width: 200, 
    top: 27, 
    borderRadius: 20}} inputMode='text' placeholder='Edit business' value=''></TextInput>
                                <Text style={{position: 'relative', 
    left: 10,
    top: 28}}> Business Website * </Text>
                                <TextInput style={{position: 'relative', 
    left: 20, 
    backgroundColor: 'silver', 
    width: 200, 
    top: 32, 
    borderRadius: 20}} inputMode='url' placeholder='url' value=''></TextInput>
                            </AccordionItem>
                            <AccordionItem leftIcon="facebook" rightIcon="instagram" title="Social Connect" subTitle='Connect your social account'>
                            </AccordionItem>
                            <AccordionItem leftIcon="radar" rightIcon="link" title="Invite Partners" subTitle='Community embrose success'>
                            </AccordionItem>
                        </Accordion>
            </View> 
        );
}