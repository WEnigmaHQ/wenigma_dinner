import React, { useState } from "react";
import { View, TextInput, Text } from "react-native";
import { Appbar, MD2Colors, IconButton } from "react-native-paper";
import {  Accordion, AccordionItem } from '@mustapha-ghlissi/react-native-accordion';
import { Toast } from "rn-inkpad";
import { router } from "expo-router";
import { supabase } from "./supabase";

export default function Authentication() {
    
    
        // Declaration states 
        const [ toastAuthVisible, setToastAuthVisible ] = useState(false);
        const [ phone, setPhone ] = useState('');
        const [ token, setToken ] = useState('');
        const [ email, setEmail ] = useState('');
        const [ toastVisible, setToastVisible ] = useState(false);
        const [ isSession, setIsSession ] = useState(false);
    
        // back screen functionality
        const back = () => {router.replace('/')};
        //  phone authentication functionality
        const onHandle_phone_authentication = async() => {
        
              const {data: {user}, error} = await supabase.auth.getUser();
        
              if (error){
                console.error('Error while retrieve ', error.message);
                return;
              }
        
              console.log('User successfully :', user?.id);
        
              if (phone.length <= 0){
                console.error("Phone number should not be empty", phone)
                return;
              }
        
              console.log('Your phone number : ', phone);
        
              {
                  const {data: {user: userUpdate}, error} = await supabase.auth.updateUser({
                      phone:  phone
                  });
        
                  if (error){
                    console.error('Error while update user credentials', error.message);
                    return;
                  }
        
                  console.log(" Your phone = ", userUpdate); 
            }
        
        
        };
        // verification functionality
        const verification = async () =>{
        };
    
    return(
    
            <View style={{position: 'absolute', width: 320, top: 50}}>
                <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -90, left: 280}}></Appbar.BackAction>
                <Accordion compact titleStyle={{
    fontSize: 16,
    fontWeight: 700,
}} contentContainerStyle={{
    paddingTop: 15,
    paddingBottom: 20,   
}} itemContainerStyle={{padding: 20}}>
                        <AccordionItem
                                leftIcon="account"
                                title="Membership Authentication"
                                subTitle="Authenticate your credentials" rightIcon="account-circle">
                        <Accordion compact titleStyle={{
    fontSize: 16,
    fontWeight: 700,
}} contentContainerStyle={{
    paddingTop: 15,
    paddingBottom: 20,   
}} itemContainerStyle={{padding: 20}}>
                                <AccordionItem
                                        leftIcon="phone"
                                        title="Authentication via phone"
                                        subTitle="connect with number" rightIcon="cellphone">
                                        <Text> Phone Number * </Text>
                                        <TextInput placeholder='+111 111 1110' inputMode='tel' value={phone} onChangeText={setPhone}></TextInput>
                                        <Text> Token * </Text>
                                        <TextInput placeholder='token' inputMode='text' value={token} onChangeText={setToken}></TextInput>
                                        <IconButton icon={'cellphone-sound'} iconColor={MD2Colors.green500} style={{
  top: 30, 
  left: 60
}} onPress={onHandle_phone_authentication}></IconButton>
                                        {isSession? <View>
                                                        <Toast visible={toastAuthVisible} backgroundColor='#FF7F50' icon='information-circle-outline' position='top' fontSize={8} text='Excellent! Your account have login.' setVisible={setToastVisible}></Toast></View> : ''}
                            </AccordionItem>
                        </Accordion>
                        {/* <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={{
    paddingTop: 15,
    paddingBottom: 20,   
}} itemContainerStyle={{padding: 20}}>
                             <AccordionItem
                                        leftIcon="whatsapp"
                                        title="Authentication via Whatsapp"
                                        subTitle="connect with whatsapp" rightIcon="cellphone">
                                        <Text> Whatsapp Number * </Text>
                                        <TextInput placeholder='+111 111 1110' mode='flat' inputMode='tel'></TextInput>
                                        <IconButton icon={'whatsapp'} iconColor={MD2Colors.green500} style={{top: 30, left: 60}}></IconButton>
                                        </AccordionItem></Accordion> */}
                                         </AccordionItem>
                                <Accordion compact titleStyle={{
    fontSize: 16,
    fontWeight: 700,
}} contentContainerStyle={{
    paddingTop: 15,
    paddingBottom: 20,   
}} itemContainerStyle={{padding: 20}}>
                                        <AccordionItem
                                            leftIcon="email"
                                            title="Member Verification"
                                            subTitle="connect through email" rightIcon="cellphone">
                                            <Text> Email Address * </Text>
                                            <TextInput placeholder='abc@company.com' inputMode='email' value={email} onChangeText={setEmail}></TextInput>
                                            <Text> Token * </Text>
                                            <TextInput placeholder='token'inputMode='text' value={token} onChangeText={setToken}></TextInput>
                                            <IconButton icon={'account-circle'} iconColor={MD2Colors.green500} style={{top: 30, left: 90}} onPress={verification}></IconButton>
                                        </AccordionItem>
                                    </Accordion>
                                </Accordion>
                            </View>)
}