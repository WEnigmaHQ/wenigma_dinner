import { Link, router} from 'expo-router';
import { IconButton, MD2Colors, MD3Colors, Appbar } from 'react-native-paper';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform} from 'react-native';
import Modal  from 'react-native-modal';
import { useEffect, useState, useRef } from 'react';
import Popover from 'react-native-popover-view';
import * as LocalAuth from 'expo-local-authentication';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import BottomDrawer, {BottomDrawerMethods} from 'react-native-animated-bottom-drawer';
import {Accordion, AccordionItem} from '@mustapha-ghlissi/react-native-accordion';
import { SafeAreaView } from 'react-native-safe-area-context';
import Authenicate from '../authenticate';
import DigitalBTC from '../digitalbtc';
import Notification from '../notification';
import MyProfile from '../myprofile';
import Message from '../message';
import Advance from '../advance';






export default function Tab() {
  
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);
  const [ deviceAuthTPromise, setDeviceAuthTPromise] = useState(false);
  const [ deviceAuthPromise, setDeviceAuthPromise] = useState(false);



  // Modal Events triggers
  const [eyeAccount, setEyeAccount] = useState(false);
  const [eyeCamera, setEyeCamera] = useState(false);
  const [eyeBitcoin, setEyeBitcoin] = useState(false);
  const [eyeBell, setEyeBell] = useState(false);
  const [eyeFingerprint, setEyeFingerprint] = useState(false);
  const [eyeMessage, setEyeMessage] = useState(false);


  return (
        <SafeAreaView>
            <View style={styles.container}>
                  <IconButton icon={'cogs'} iconColor={MD3Colors.secondary60} size={50} onPress={() =>{setEyeCamera(!eyeCamera)}} style={styles.eyecamerabutton}></IconButton>
                  <Text style={{color: 'white', top: 65, marginLeft: -180}}> General Setting </Text>
                  <IconButton icon={'account-cog'} iconColor={MD2Colors.amber500} size={50} onPress={() =>{setEyeAccount(!eyeAccount)}} style={styles.eyefacebookbutton}></IconButton>
                  <Text style={{color: 'white', top: 235, marginLeft: 200}}> Profile </Text>
                  <IconButton icon={'bitcoin'} iconColor={MD2Colors.green500} size={50} onPress={() =>{bottomDrawerRef.current?.open; setEyeBitcoin(!eyeBitcoin)}} style={styles.eyebitcoinbutton}></IconButton>
                  <Text style={{color: 'white', top: -5, marginLeft: 200}}> Payment </Text>
                  <IconButton icon={'bell'} iconColor={MD3Colors.error30} size={50} onPress={() =>{setEyeBell(!eyeBell);}} style={styles.eyebellkbutton}></IconButton>
                  <Text style={{color: 'white', top: 40, marginLeft: -200}}> Notification </Text>
                  <IconButton icon={'fingerprint'} iconColor={MD3Colors.primary70} size={50} onPress={() =>{setEyeFingerprint(!eyeFingerprint);}} style={styles.eyefingerprintbutton}></IconButton>
                  <Text style={{color: 'white', top: -320, marginLeft: 200}}> Authentication </Text>
                  <IconButton icon={'message-cog'} iconColor={MD3Colors.tertiary80} size={50} onPress={() =>{setEyeMessage(!eyeMessage);}} style={styles.eyemessagebutton}></IconButton>
                  <Text style={{color: 'white', top: -290, marginLeft: -200}}> Chat </Text>
                  {eyeCamera ? <Modal isVisible={eyeCamera} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={{width: 300, position: 'relative', left: 300}}>
                                    <Authenicate></Authenicate>
                  </Modal>: ''}
                  {eyeBitcoin? <BottomDrawer ref={bottomDrawerRef}  openOnMount>
                                <DigitalBTC></DigitalBTC>
                  </BottomDrawer> : ''}
                  {eyeFingerprint ? <Modal isVisible={eyeFingerprint} 
                      animationOutTiming={1000} animationIn={'lightSpeedIn'} 
                      style={styles.modalfingerprint}>
                        <Advance></Advance>
                  </Modal>:''}
                  {eyeBell ? <Modal isVisible={eyeBell} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={styles.modalfingerprint}>
                            <Notification></Notification>
                        </Modal> :''}
                  {eyeAccount ? <Modal isVisible={eyeAccount} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={styles.modalfingerprint}>
                                <MyProfile></MyProfile>
                            </Modal> : ''}
                  {eyeMessage ? <Modal isVisible={eyeMessage} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={styles.modalfingerprint}>
                                <Message></Message>
                            </Modal>: '' }
            </View>
        </SafeAreaView>
  );
}






const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    paddingBottom: 170
  },
  text:{
    color: '#fff',
    fontSize: 20
  },
  button:{
    position: 'relative',
    left: -600,
    top: -20
  }, 
  eyecamerabutton:{
    position: Platform.OS === 'android' || Platform.OS === 'ios' ? 'relative' : 'relative',
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? 70 : Platform.OS === 'web' ? 150 : 150,
    left: Platform.OS === 'android' || Platform.OS === 'ios'? -105: Platform.OS === 'web' ? -400: -400,
  }, 
  eyefacebookbutton:{
    position: Platform.OS === 'android' || Platform.OS === 'ios'? 'relative': 'relative',    
    top: Platform.OS === 'ios' || Platform.OS === 'android' ? 245: Platform.OS === 'web'? 75 : 75, 
    left:Platform.OS == 'ios' || Platform.OS === 'android'? 100: Platform.OS === 'web'? -150: -150,
  },
  eyebellkbutton:{
    position: Platform.OS === 'android' || Platform.OS === 'ios'? 'relative': 'relative',    
    top: Platform.OS === 'ios' || Platform.OS === 'android' ? 50: Platform.OS === 'web'? -80 : -80, 
    left:Platform.OS == 'ios' || Platform.OS === 'android'? -100: Platform.OS === 'web'? 70: 70,
  },
  eyebitcoinbutton:{ 
    position: Platform.OS === 'android' || Platform.OS === 'ios'? 'relative': 'relative',    
    top: Platform.OS === 'ios' || Platform.OS === 'android' ? 10: Platform.OS === 'web'? 100 : 100, 
    left:Platform.OS == 'ios' || Platform.OS === 'android'? 100: Platform.OS === 'web'? -400: -400,
  },
  eyefingerprintbutton:{
    position: Platform.OS === 'android' || Platform.OS === 'ios'? 'relative': 'relative',    
    top: Platform.OS === 'ios' || Platform.OS === 'android' ? -310: Platform.OS === 'web'? -52 : -52, 
    left:Platform.OS == 'ios' || Platform.OS === 'android'? 100: Platform.OS === 'web'? -150: -200,
  },
  eyemessagebutton:{
    position: Platform.OS === 'android' || Platform.OS === 'ios'? 'relative': 'relative',    
    top: Platform.OS === 'ios' || Platform.OS === 'android' ? -270: Platform.OS === 'web'? -125 : -125, 
    left:Platform.OS == 'ios' || Platform.OS === 'android'? -100: Platform.OS === 'web'? 70: 70,
  },
  linkhome:{
    flex: 1,
    top: 100,
    justifyContent: 'center',
    flexDirection: 'row',
    color: 'black',
    backgroundColor: 'white',
    width: 100,
    borderRadius: 12,
    textAlign: 'center',
    fontSize: 20,
  },
  cameramodaltext: {
    color: 'white' ,
    fontSize : 20,
    textAlign:  'center',
    position: 'relative',
    top: 50   
  },
  accountlock: {
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios'? 200 : 120, 
    left: Platform.OS === 'android' || Platform.OS === 'ios'? -180 : -180
  },
  textmessage1:{
    color: 'green', 
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? 200 : 120,  
    left: Platform.OS === 'android' || Platform.OS === 'ios'? -180 : -200
  }, 
  textmesage2: {
    color: 'white', 
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? 200 : 120,  
    left: Platform.OS === 'android' || Platform.OS === 'ios'? -180 : -200,
  },
  cogsicon:{
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? 300 : 50, 
    left: Platform.OS === 'android' || Platform.OS === 'ios' ? -180: 300
  },
  cogiconmessage:{
    color: 'green', 
    position: 'relative', 
    top: Platform.OS === 'android'|| Platform.OS === 'ios' ? 300 :120, 
    left: Platform.OS === 'android' || Platform.OS === 'ios'? -180 : 300   
  },
  cogiconerrormessage:{
    color: 'white', 
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? 300 : 50, 
    left: Platform.OS === 'android' || Platform.OS === 'ios'? -180 : 300
  },
  drawerbitcoinhandler: {
    color: 'black', 
    fontSize: 20, 
    textAlign: 'center'
  },
  drawertextfield1:{
    color: 'darkslategrey',
    position: 'relative',
    top: Platform.OS === 'android' || Platform.OS === 'ios'? 50: 50,
    left: Platform.OS === 'android' || Platform.OS === 'ios'? 50: 50,
    fontWeight: 'bold'
  }, 
  drawertextinput1:{
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? 60: 60, 
    color: 'gold', 
    backgroundColor: 'grey', 
    height: 40, 
    borderRadius: 12,
    width: Platform.OS === 'android' || Platform.OS === 'ios'? 250 :350,
    left: Platform.OS === 'android' || Platform.OS === 'ios' ? 70: 70,
  },
  drawerbitcoinbtn:{
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios'?  15 : 15, 
    left: Platform.OS === 'android' || Platform.OS === 'ios'?  270: 370,
  },
  modalfingerprint: {
    position: 'relative', 
    left: 300
  },
  modalfingerprintclosebtn: {
    position: 'relative', 
    top: -120, 
    left: 400,
  },
  modalfingerprintheader:{
    color: 'white',
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? -150 : -150,
    left: Platform.OS === 'android' || Platform.OS === 'ios'? -210: 100,
    fontSize: 20
  },
  modalfingerprintsecurekey: {
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? -70: -100, 
    left:Platform.OS === 'android' || Platform.OS === 'ios' ? -150: -50, 
  },
  modalfingerprintsecurekeymessage: {
    color: 'white',
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? -50: -100, 
    left:Platform.OS === 'android' || Platform.OS === 'ios' ? -200: -100, 
  },
  modalfingerprintfaceicon:{
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? -20 : -170, 
    left:Platform.OS === 'android' || Platform.OS === 'ios' ? -150: 300, 
  },
  modalfingerprintfacemessage:{
    color: 'white',
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? -20 : -170, 
    left:Platform.OS === 'android' || Platform.OS === 'ios' ? -200: 200, 
  },
  modalfingerprintfaceerror:{
    color: 'white',
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? -20 : -170, 
    left:Platform.OS === 'android' || Platform.OS === 'ios' ? -200: 200, 
  },
  modalfingerprinttouchicon:{
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? 20 : -240, 
    left:Platform.OS === 'android' || Platform.OS === 'ios' ? -150: 700, 
  },
  modalfingerprinttouchmessage:{
    color: 'white',
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? 20 : -240, 
    left:Platform.OS === 'android' || Platform.OS === 'ios' ? -200: 600, 
  },
  modalstatus:{
    color: 'green',
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? -310 : -100,
    left: Platform.OS === 'android' || Platform.OS === 'ios' ? -200 : 100
  },
  modalstatuserror:{
    color: 'red',
    position: 'relative', 
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? -270 : -100,
    left: Platform.OS === 'android' || Platform.OS === 'ios' ? -270 : 300
  },
  modalnotifyheader:{
    color: 'white',
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? -130 : -200,
    left: Platform.OS === 'android' || Platform.OS === 'ios'? 80: 200,
    fontSize: 20
  },

  modalnotifyclosebtn: {
    position: 'relative', 
    top: -240, 
    left: 400,
  },

  modalnotifytext1:{
    position: 'relative',
    color: 'white',
    top: Platform.OS === 'android' || Platform.OS === 'ios' ? -50 : -150,
    left: Platform.OS === 'android' || Platform.OS === 'ios' ? 50 : -150, 
    fontWeight: 'bold'
  },
  contentContainerStyle: {
        paddingTop: 15,
        paddingBottom: 20,
        
  },
  titleStyle: {
        fontSize: 16,
        fontWeight: 700,
  },
  itemcontainer:{
    padding: 20,
  },
  modalnotifyhandshake:{

    position: 'absolute',
    left: 100,
    top: 20
  },

  viewstyle:{
    position: 'relative', left: -290
  },

  editnamelabel:{
    position: 'relative', 
    left: 10
  },
  editnamefield:{
    position: 'relative', 
    left: 20, 
    backgroundColor: 'silver', 
    width: 200, 
    top: 10, 
    borderRadius: 20
  },

  editbiolabel:{
    position: 'relative', 
    left: 10,
    top: 12
  },
  editbiofield:{
    position: 'relative', 
    left: 20, 
    backgroundColor: 'silver', 
    width: 200, 
    top: 18, 
    borderRadius: 20
  },
  editwebsitelabel:{
    position: 'relative', 
    left: 10,
    top: 20
  },
  editwebsitefield:{
    position: 'relative', 
    left: 20, 
    backgroundColor: 'silver', 
    width: 200, 
    top: 27, 
    borderRadius: 20
  },

  editwebsiteurllabel:{
    position: 'relative', 
    left: 10,
    top: 28
  },
  editwebsiteurlfield:{
    position: 'relative', 
    left: 20, 
    backgroundColor: 'silver', 
    width: 200, 
    top: 32, 
    borderRadius: 20
  },
  messageuse:{
    position: 'relative',
    left: 50
  }
});
