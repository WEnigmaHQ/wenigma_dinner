import { Calendar, toLocaleDateString } from "@fowusu/calendar-kit";
import React, { useCallback, useRef, useState } from "react";
import { View, TextInput, Text } from "react-native";
import BottomDrawer, {BottomDrawerMethods} from "react-native-animated-bottom-drawer";
import { Appbar, MD2Colors, IconButton, SegmentedButtons, Card } from "react-native-paper";
import {  Accordion, AccordionItem } from '@mustapha-ghlissi/react-native-accordion';
import { FloatingActionButton } from "rn-inkpad";
import { router } from "expo-router";
import btmempool from "./db/queries/btmempool";
import { useQuery } from "@apollo/client";


export default function Antiquity() {

    // Declaration section

    const [ bitcoinAddress, setBitcoinAddress ] = useState('');
    const [ confirmed, setConfirmed ] = useState(false);
    
    //  bottom drawer for bitcoin wallet

    const bottomWalletDrawerRef = useRef<BottomDrawerMethods>(null);

    //  bottom drawer for transactions

    const bottomTXSDrawerRef = useRef<BottomDrawerMethods>(null);

    const [ segmentedState, setSegmentedState] = useState('');


    // event handlers
    const back = () => {router.replace('/')};
    
    const today = new Date();

    const todayDateString = toLocaleDateString(today);
  
    const [selectedDay, setSelectedDay] = useState<string>();
  
    const onDayPress = useCallback((dateString: string) => {
      setSelectedDay(dateString);
    }, []);


    const {data, loading, error} = useQuery(btmempool.GET_BTX_TRANSACTION_CLOSE_BALANCE);

    console.log("Data:", data, loading, error);


    

    return (        
        <View style={{
            position: 'absolute', 
            width: 320, 
            top: 150
          }}>
        <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -190, left: 280}}></Appbar.BackAction>
            <Accordion compact titleStyle={{fontSize: 16, fontWeight: 700}} contentContainerStyle={{padding: 20}} itemContainerStyle={{padding: 20}}>
                <View style={{top: 20}}>
                    <AccordionItem
                        leftIcon="account-circle"
                        title="Decentralize Wallet"
                        subTitle="Decentralize mobile wallet" rightIcon="bitcoin">
                            <Accordion compact titleStyle={{
    fontSize: 16,
    fontWeight: 700,
}} contentContainerStyle={{
    paddingTop: 15,
    paddingBottom: 20,
    
}} itemContainerStyle={{
  padding: 20,
}}>
                                <AccordionItem
                                        leftIcon="pen"
                                        title="Bitcoin wallet"
                                        subTitle="Create decentralize mobile wallet" rightIcon="bitcoin">
                                        <View>
                                            <Text> Bitcoin Address * </Text>
                                            <TextInput placeholder='bitcoin address' inputMode='text' value={bitcoinAddress} onChangeText={setBitcoinAddress} style={{ top: 5}}></TextInput>
                                            <IconButton icon={'bitcoin'} iconColor={MD2Colors.green500} style={{top : 30, left: 50}}></IconButton>
                                        </View>
                                </AccordionItem>
                                <AccordionItem
                                                leftIcon="fingerprint"
                                                title="Transactions"
                                                subTitle="Decentralize mobile wallet" rightIcon="bitcoin">
                                                <View style={{flex: 1}}>
                                                    <SegmentedButtons value={segmentedState} onValueChange={setSegmentedState} style={{top: 5}} buttons={[
                                                    {
                                                        value: 'fingerprint',
                                                        label: 'Wallet'
                                                    },
                                                    {

                                                        value: 'handshake',
                                                        label: 'Deal'
                                                    }]}></SegmentedButtons>
                                                    {segmentedState === 'fingerprint' ?
                                                    <View>
                                                        bottomWalletDrawerRef.current?.open
                                                        <BottomDrawer ref={bottomWalletDrawerRef} openOnMount>
                                                        <View>
                                                            <Text style={{fontSize: 40, color: 'silver', top: 50, left: 80}}> 0.00000 </Text>
                                                            <Text style={{top: 25, left: 240}}> BTC </Text>
                                                            <View style={{flex: 1, top: 100, width: 300, left: 20}}>
                                                                {confirmed ? <View> <TextInput placeholder='sender bitcoin address' inputMode={'text'}></TextInput> 
                                                                                    <View style={{flex: 1, top: 200}}> <FloatingActionButton icon={'qr-code'} backgroundColor="#FFFFFF" iconColor='#008000' align={'bottom-right'}></FloatingActionButton></View>
                                                                                    <View style={{flex: 1, top: 150}}> <FloatingActionButton icon={'heart-circle'} backgroundColor="#FFFFFF" iconColor='#FF0000' align={'bottom-right'}></FloatingActionButton></View>
                                                                                    </View> : <View style={{flex: 1, top: 150}}> <FloatingActionButton icon={'heart-circle'} backgroundColor="#FFFFFF" iconColor='#FF0000' align={'bottom-right'}></FloatingActionButton></View>}
                                                                                  </View>
                                                                                </View>
                                                                              </BottomDrawer>
                                                                          </View> : ''}
                                                                {segmentedState === 'handshake'? <View>
                                                                    bottomTXSDrawerRef.current?.open
                                                                <BottomDrawer ref={bottomTXSDrawerRef} openOnMount>
                                                                    <View>
                                                                        <Calendar
                                                                            date={todayDateString}
                                                                            markedDates={[selectedDay as string]}
                                                                            onDayPress={onDayPress}
                                                                            firstDayOfWeek={1}
                                                                        />
                                                                    </View>
                                                                    </BottomDrawer>
                                                                </View> : ''}
                                                                    </View>
                                </AccordionItem>
                            </Accordion>
                    </AccordionItem>
                </View>
            </Accordion>
            <Accordion compact titleStyle={{
    fontSize: 16,
    fontWeight: 700,
}} contentContainerStyle={{
    paddingTop: 15,
    paddingBottom: 20,
    
}} itemContainerStyle={{
  padding: 20,
}}>
        <AccordionItem
                    leftIcon="send"
                    title="My Networth"
                    subTitle="Decentralize mobile wallet hold assets [cash-in] & liabilities [cash-out] " rightIcon="handshake">
        </AccordionItem>
        <AccordionItem
                        leftIcon="atm"
                        title="Bitcoin Digital Card"
                        subTitle="Decentralize mobile wallet" rightIcon="star">
                        <IconButton icon={'card'} iconColor={MD2Colors.green500} style={{top : 5, left: 50}}></IconButton>
                        <Text> Request for personal bitcoin card </Text>
        </AccordionItem>
            </Accordion>
         </View>
    );
}