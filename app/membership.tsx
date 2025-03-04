import { useState } from "react";
import { View } from "react-native";
import { SegmentedControl } from "rn-inkpad";
import Register from "./register";

export default function Membership() {

    // Declaration register
    const [register, setRegister] = useState('tab1');

    // segmented tabs 
    const account = [
        {key: 'Register Membership', value: 'tab1'},
        {key: 'Authentication', value: 'tab2'},
        {key: 'My Antiquity', value: 'tab3'}
      ];

    return(
        <View style={{ 
            position: 'relative', 
            top: -300,
          }}>
            <SegmentedControl label='' values={account} onChange={(value) => setRegister(value)}/>
                    {register === 'tab1'? <Register></Register> : ''}
                    {register === 'tab2'? <View style={{
            position: 'absolute', 
            width: 320, 
            top: 50
          }}>
                                    <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -90, left: 280}}></Appbar.BackAction>
                                    <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                  <AccordionItem
                                                      leftIcon="account"
                                                      title="Membership Authentication"
                                                      subTitle="Authenticate your credentials" rightIcon="account-circle">
                                                        <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                            <AccordionItem
                                                                leftIcon="phone"
                                                                title="Authentication via phone"
                                                                subTitle="connect with number" rightIcon="cellphone">
                                                                  <Text> Phone Number * </Text>
                                                                  <TextInput placeholder='+111 111 1110' mode='flat' inputMode='tel' value={phone} onChangeText={setPhone}></TextInput>
                                                                  <Text> Token * </Text>
                                                                  <TextInput placeholder='token' mode='flat' inputMode='text' value={token} onChangeText={setToken}></TextInput>
                                                                  <IconButton icon={'cellphone-sound'} iconColor={MD2Colors.green500} style={styles.accountauth} onPress={onHandle_phone_authentication}></IconButton>
                                                                  {isSession? <View>
                                                                                  <Toast visible={toastAuthVisible} backgroundColor='#FF7F50' icon='information-circle-outline' position='top' fontSize={8} text='Excellent! Your account have login.' setVisible={setToastVisible}></Toast>
                                                                              </View> : ''}
                                                            </AccordionItem></Accordion>
                                                            {/* <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                            <AccordionItem
                                                                leftIcon="whatsapp"
                                                                title="Authentication via Whatsapp"
                                                                subTitle="connect with whatsapp" rightIcon="cellphone">
                                                                  <Text> Whatsapp Number * </Text>
                                                                  <TextInput placeholder='+111 111 1110' mode='flat' inputMode='tel'></TextInput>
                                                                  <IconButton icon={'whatsapp'} iconColor={MD2Colors.green500} style={{top: 30, left: 60}}></IconButton>
                                                            </AccordionItem></Accordion> */}
                                                  </AccordionItem>
                                                            <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                            <AccordionItem
                                                                leftIcon="email"
                                                                title="Member Verification"
                                                                subTitle="connect through email" rightIcon="cellphone">
                                                                  <Text> Email Address * </Text>
                                                                  <TextInput placeholder='abc@company.com' mode='flat' inputMode='email' value={email} onChangeText={setEmail}></TextInput>
                                                                  <Text> Token * </Text>
                                                                  <TextInput placeholder='token' mode='flat' inputMode='text' value={token} onChangeText={setToken}></TextInput>
                                                                  <IconButton icon={'account-circle'} iconColor={MD2Colors.green500} style={{top: 30, left: 90}} onPress={verification}></IconButton>
                                                            </AccordionItem></Accordion>
                                        </Accordion>
                                         </View>: ''}
                    {register === 'tab3'? <View style={{
            position: 'absolute', 
            width: 320, 
            top: 50
          }}>
                                      <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -90, left: 280}}></Appbar.BackAction>
                                        <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                <AccordionItem
                                                      leftIcon="account-circle"
                                                      title="Decentralize Wallet"
                                                      subTitle="Decentralize mobile wallet" rightIcon="bitcoin">
                                                        <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                            <AccordionItem
                                                                leftIcon="pen"
                                                                title="Bitcoin wallet"
                                                                subTitle="Create decentralize mobile wallet" rightIcon="bitcoin">
                                                                  <View>
                                                                  <Text> Bitcoin Address * </Text>
                                                                  <TextInput placeholder='bitcoin address' mode='flat' inputMode='text' value={bitcoinAddress} onChangeText={setBitcoinAddress} style={{ top: 5}}></TextInput>
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
                                                                                      {!confirmed ? <SlideAction icon={'wallet'} textPosition='center' iconOnCompleted={'logo-bitcoin'} text='send money to your peers' 
                                                                                                textOnCompleted='completed' onCompleted={() => setConfirmed(true)}></SlideAction>: ''}
                                                                                      {confirmed ? <View> <TextInput placeholder='sender bitcoin address' mode='outlined' inputMode={'text'}></TextInput> 
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
                                                              <AccordionItem
                                                                    leftIcon="atm"
                                                                    title="Bitcoin Digital Card"
                                                                    subTitle="Decentralize mobile wallet" rightIcon="bitcoin">
                                                                      <Card buttons={[
                                                                        {text: 'Request for Card '},
                                                                      ]} 
                                                                        description={'Register your Bitcoin Card'}
                                                                        title=''
                                                                        theme={{themeColor: '#DB504A'}}
                                                                        icon={'logo-bitcoin'}
                                                                      />
                                                                    </AccordionItem>
                                                      </Accordion>
                                                      </AccordionItem>
                                        </Accordion>
                                        <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                <AccordionItem
                                                      leftIcon="send"
                                                      title="My Networth"
                                                      subTitle="Decentralize mobile wallet hold assets [cash-in] & liabilities [cash-out] " rightIcon="handshake"></AccordionItem>
                                        </Accordion>
                                          </View> : ''}
                                  </View> 
    );
}