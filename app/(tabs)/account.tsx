import { Link, Stack,  } from 'expo-router';
import { IconButton, MD2Colors, MD3Colors } from 'react-native-paper';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform} from 'react-native';
import Modal  from 'react-native-modal';
import { useEffect, useState, useRef } from 'react';
import { RadialSlider } from 'react-native-radial-slider';
import Popover from 'react-native-popover-view';
import * as LocalAuth from 'expo-local-authentication';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';
import BottomDrawer, {BottomDrawerMethods} from 'react-native-animated-bottom-drawer';
import {Accordion, AccordionItem} from '@mustapha-ghlissi/react-native-accordion';






export default function Tab() {
  
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);


  // Modal Events triggers
  const [eyeFacebook, setEyeFacebook] = useState(false);
  const [eyeCamera, setEyeCamera] = useState(false);
  const [eyeBitcoin, setEyeBitcoin] = useState(false);
  const [eyeBell, setEyeBell] = useState(false);
  const [eyeFingerprint, setEyeFingerprint] = useState(false);
  const [eyeMessage, setEyeMessage] = useState(false);

  // Form States
  const [bitcoinAddress, setBitcoinAddress] = useState('');
  const [errors, setErrors] = useState({});
  const [isFormValid, setIsFormValid] = useState(false);


  // popover for security key
  const [ showKeyPopover, setKeyShowPopover] = useState(false);


  // popover for faceID

  const [ showFacePopover, setFaceShowPopover] = useState(false);
  const [ isFaceDetect, setFaceDetect] = useState(false);

  //  popover for TouchID

  const [showTouchPopover, setTouchShowPopover] = useState(false);
  const [ isTouchDetect, setTouchDetect] = useState(false);


  // device have signature or not

  const [ deviceAuth , setDeviceAuth] =  useState(false);
  const [ deviceAuthPromise, setDeviceAuthPromise] = useState(false);
  const [ deviceAuthTPromise, setDeviceAuthTPromise] = useState(false);
  
  
  
  const [ deviceFaceRec, setDeviceFaceRec] = useState(false);


  // Security or pin

  useEffect(() => {
    setTimeout(() => setKeyShowPopover(false), 2000);
  }, []);


  //  Face scanner

  useEffect(() => {
    setTimeout(() => setFaceShowPopover(false), 1000);
    const FaceAuth = async() => {
        try {
          const hasHardware = await LocalAuth.hasHardwareAsync();
          setFaceDetect(hasHardware);
        } catch (error) {
          console.error("Error checking hardware support:", error);
          setFaceDetect(false); // Fallback in case of error
        }
    }

    FaceAuth();
  }, []);


  //  Fingerprints scanner

  useEffect(() => {
    setTimeout(() => setTouchShowPopover(false), 1000);
    const TouchAuth = async() => {
      try {
        const hasHardware = await LocalAuth.hasHardwareAsync();
        setTouchDetect(hasHardware);
      } catch (error) {
        console.error("Error checking hardware support:", error);
        setTouchDetect(false); // Fallback in case of error
      }
    }

    TouchAuth();
  }, []);


  // device Authenicate by user through face
  useEffect(() => {
    setTimeout(() => setDeviceAuth(false), 2000);

    const isFaceID = async() => {
      
      try {
        const device = await LocalAuth.supportedAuthenticationTypesAsync();
        console.log('device:', device);


        const RNBiometrics = new ReactNativeBiometrics();

        const { available, biometryType } = await RNBiometrics.isSensorAvailable();
        
        if ((device.length > 0 && device.includes(1)) || (available && biometryType === BiometryTypes.FaceID) ) {

          const deviceAuthLock = await LocalAuth.isEnrolledAsync();
          setDeviceAuthPromise(deviceAuthLock);
        }

        if ((device.length > 0 && device.includes(2)) || (available && biometryType === BiometryTypes.TouchID) ) {

          const deviceAuthLock = await LocalAuth.isEnrolledAsync();
          setDeviceAuthTPromise(deviceAuthLock);
        }
        
      } catch (error) {
        console.error("Error checking hardware support:", error);
        setDeviceAuthPromise(false); // Fallback in case of error
        setDeviceAuthTPromise(false);
      }
    }

    isFaceID();

  }, []);


  useEffect(() => {
    setTimeout(() => setDeviceFaceRec(false), 2000);

  }, []);
  

  // Message Data
  const [speed, setSpeed] = useState(0);

  useEffect(() =>{

    // Trigger Form Submission Event
    submitForm();

  },[bitcoinAddress]);

  const submitForm = ()=>{

    let errors = [];

    if (bitcoinAddress.length < 26 && bitcoinAddress.length > 36){errors.push('your bitcoin address is not secure');}
    setErrors(errors);
    setIsFormValid(Object.keys(errors).length === 0);
  }

  const handleForm = () => { isFormValid ? alert('Congrats , Your bitcoin address added in our record') : alert('Poor! , Check your credentials before submission ') }

  return (
    <View style={styles.container}>
      <IconButton icon={'movie-cog'} iconColor={MD3Colors.secondary60} size={50} onPress={() =>{setEyeCamera(!eyeCamera)}} style={styles.eyecamerabutton}></IconButton>
      <IconButton icon={'wifi-cog'} iconColor={MD3Colors.primary50} size={50} onPress={() =>{setEyeFacebook(!eyeFacebook)}} style={styles.eyefacebookbutton}></IconButton>
      <IconButton icon={'bitcoin'} iconColor={MD3Colors.neutral80} size={50} onPress={() =>{bottomDrawerRef.current?.open; setEyeBitcoin(!eyeBitcoin)}} style={styles.eyebitcoinbutton}></IconButton>
      <IconButton icon={'bell'} iconColor={MD3Colors.error30} size={50} onPress={() =>{setEyeBell(!eyeBell);}} style={styles.eyebellkbutton}></IconButton>
      <IconButton icon={'fingerprint'} iconColor={MD3Colors.primary70} size={50} onPress={() =>{setEyeFingerprint(!eyeFingerprint);}} style={styles.eyefingerprintbutton}></IconButton>
      <IconButton icon={'message-cog'} iconColor={MD3Colors.tertiary80} size={50} onPress={() =>{setEyeMessage(!eyeMessage);}} style={styles.eyemessagebutton}></IconButton>
      {Platform.OS === 'android' || Platform.OS === 'ios' ? <Link href={'/home'} style={styles.linkhome}> Return Home 🏠 </Link>: <Text></Text>}
      {eyeCamera ? <Modal isVisible={eyeCamera} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={{width: 300, position: 'relative', left: 300}}>
         <View style={{flex: 1}}>
            {Platform.OS === 'web' ? <IconButton icon={'close'} iconColor={MD3Colors.primary90} style={{position: 'relative', top: 50, left: 400 }} onPress={() => {setEyeCamera(!eyeCamera)}}></IconButton>: ''}
            {Platform.OS === 'ios' || Platform.OS === 'android'? <Link href={'/'} style={{color: 'white', position: 'absolute', top: 550, left: -200}}> Return Home * </Link>: ''}
            <Text style={{color: 'white', position: 'absolute',top: Platform.OS === 'android' || Platform.OS === 'ios' ? 60: 20, left: Platform.OS === 'android' || Platform.OS === 'ios' ? -200: 200, fontSize: Platform.OS === 'web'? 24 : 14}}> Authenicate Yourself </Text>
            <Popover isVisible={deviceAuth} onRequestClose={() => setDeviceAuth(false)} from={(
                <TouchableOpacity onPress={() => setDeviceAuth(false)}>
                  <IconButton icon={deviceAuthPromise && deviceAuthTPromise? 'account-lock-open': 'account-lock'} iconColor={deviceAuthPromise && deviceAuthTPromise ? MD3Colors.secondary60: MD3Colors.error50} style={styles.accountlock}></IconButton>
                  {deviceAuthPromise && deviceAuthTPromise ? <Text style={styles.textmessage1}> Excellent </Text>: <Text style={styles.textmesage2}> Icognitio Mode </Text>}
                </TouchableOpacity>
              )}></Popover>
             <Popover isVisible={deviceFaceRec} onRequestClose={() => setDeviceAuth(false)} from={(
                <TouchableOpacity onPress={() => setDeviceAuth(false)}>
                  <IconButton icon={deviceAuthPromise ? 'face-recognition': 'incognito-circle'} iconColor={deviceAuthPromise ? MD3Colors.secondary60: MD3Colors.error50} style={styles.cogsicon}></IconButton>
                  {deviceAuthPromise ? <Text style={styles.cogiconmessage}> FaceID </Text>: <Text style={styles.cogiconerrormessage}> Sign in </Text>}
                  {deviceAuthPromise ? '' : ''}
                </TouchableOpacity>
              )}></Popover>
          </View>  
        </Modal>: ''}
      {eyeBitcoin? <BottomDrawer ref={bottomDrawerRef}  openOnMount>
          <View>
            <Text style={styles.drawerbitcoinhandler}> Register your Bitcoin Address </Text>
            <Text style={styles.drawertextfield1}> Bitcoin Address * </Text>
            <TextInput placeholder='Your bitcoin Address' value={bitcoinAddress} 
            onChangeText={setBitcoinAddress} style={styles.drawertextinput1}></TextInput>
            <TouchableOpacity style={styles.drawerbitcoinbtn} disabled={!isFormValid} onPress={handleForm}>
                <IconButton icon={'bitcoin'} iconColor={MD2Colors.amber500}></IconButton>
              </TouchableOpacity>
          </View>
        </BottomDrawer> : ''}
      {eyeFingerprint ? <Modal isVisible={eyeFingerprint} 
            animationOutTiming={1000} animationIn={'lightSpeedIn'} 
            style={styles.modalfingerprint}>
          <View>
              {Platform.OS === 'web' ? <IconButton icon={'close'} iconColor={MD3Colors.secondary90} style={styles.modalfingerprintclosebtn} onPress={() => {setEyeFingerprint(!eyeFingerprint)}}></IconButton>:''}
              <Text style={styles.modalfingerprintheader}> Authenicate Level </Text>
              <Popover isVisible={showKeyPopover} onRequestClose={() => setKeyShowPopover(false)} from={(
                <TouchableOpacity onPress={() => setKeyShowPopover(false)}>
                  <IconButton icon={'key'} iconColor={MD2Colors.green500} style={styles.modalfingerprintsecurekey}></IconButton>
                  {LocalAuth.SecurityLevel.SECRET ? <Text style={styles.modalfingerprintsecurekeymessage}> Pin or pattern detected </Text> : <Text style={styles.modalfingerprintsecurekeymessage}> No Pin or pattern detected </Text> }
                </TouchableOpacity>
              )}></Popover>
               <Popover isVisible={showFacePopover} onRequestClose={() => setFaceShowPopover(false)} from={(
                <TouchableOpacity onPress={() => setFaceShowPopover(false)}>
                  <IconButton icon={'face-recognition'} iconColor={isFaceDetect ? MD3Colors.neutral50: MD3Colors.error50} style={styles.modalfingerprintfaceicon}></IconButton>
                  {LocalAuth.AuthenticationType.FACIAL_RECOGNITION && isFaceDetect ? <Text style={styles.modalfingerprintfacemessage}> Excellent Face Sensor detected  </Text> : <Text style={styles.modalfingerprintfaceerror}> Unbelievable ! NO Face Sensor detected </Text> }
                </TouchableOpacity>
              )}></Popover>
              <Popover isVisible={showTouchPopover} onRequestClose={() => setTouchShowPopover(false)} from={(
                <TouchableOpacity onPress={() => setTouchShowPopover(false)}>
                  <IconButton icon={'fingerprint'} iconColor={isTouchDetect? MD3Colors.neutralVariant50: MD3Colors.error50} style={styles.modalfingerprinttouchicon}></IconButton>
                  {LocalAuth.AuthenticationType.FINGERPRINT  && isTouchDetect ? <Text style={styles.modalfingerprinttouchmessage}> Excellent Touch Sensor detected  </Text> : <Text style={styles.modalfingerprinttouchmessage}> Unbelievable ! NO Touch Sensor detected </Text> }
                </TouchableOpacity>
              )}></Popover>
              {isFaceDetect || isTouchDetect ? <Text style={styles.modalstatus}> Strong Authentication </Text> : <Text style={styles.modalstatuserror}> Weak Authentication </Text>}
              {Platform.OS === 'ios' || Platform.OS === 'android'? <Link href={'/'} style={{color: 'gold', position: 'absolute', top: 350, left: -100}}> Return </Link>: ''}
          </View>
        </Modal>:''}
      {eyeBell ? <Modal isVisible={eyeBell} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={styles.modalfingerprint}>
                  <View style={{position: 'relative', left: -290}}>
                    <Text style={styles.modalnotifyheader}> Divulgence  </Text>
                    {Platform.OS === 'web' ? <IconButton icon={'close'} iconColor={MD3Colors.secondary90} style={styles.modalnotifyclosebtn} onPress={() => {setEyeFingerprint(!eyeFingerprint)}}></IconButton>:''}
                    <Text style={styles.modalnotifytext1}> Grant Divulgence consent </Text>
                    {Platform.OS === 'ios' || Platform.OS === 'android' ? <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                          <AccordionItem
                              leftIcon="account-circle"
                              title="Exclusive Dinners"
                              subTitle="Private Dinners invite exclusive members to promote business & other public affairs ">
                                <IconButton icon={'fingerprint'} style={styles.modalnotifyhandshake}></IconButton>
                          </AccordionItem>
                          <AccordionItem leftIcon="handshake" title="Private Capital Clubs" subTitle='Private Capital Clubs negioatte on business deals & transactions'>
                          <IconButton icon={'face-recognition'} style={styles.modalnotifyhandshake}></IconButton>
                          </AccordionItem>
                          <AccordionItem leftIcon="compass" title="News" subTitle='News are prime source of decision paticularly if deals between Moguls'>
                          </AccordionItem>
                      </Accordion>: ''}
                      {Platform.OS === 'ios' || Platform.OS === 'android'? <Link href={'/'} style={{color: 'gold', position: 'absolute', top: 450, left: 150}}> Return </Link>: ''}
                  </View>
              </Modal> :''}
        </View>
  );
}






const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
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
    top: Platform.OS === 'ios' || Platform.OS === 'android' ? 240: Platform.OS === 'web'? 75 : 75, 
    left:Platform.OS == 'ios' || Platform.OS === 'android'? 100: Platform.OS === 'web'? -150: -150,
  },
  eyebellkbutton:{
    position: Platform.OS === 'android' || Platform.OS === 'ios'? 'relative': 'relative',    
    top: Platform.OS === 'ios' || Platform.OS === 'android' ? 80: Platform.OS === 'web'? -80 : -80, 
    left:Platform.OS == 'ios' || Platform.OS === 'android'? -100: Platform.OS === 'web'? 70: 70,
  },
  eyebitcoinbutton:{ 
    position: Platform.OS === 'android' || Platform.OS === 'ios'? 'relative': 'relative',    
    top: Platform.OS === 'ios' || Platform.OS === 'android' ? 30: Platform.OS === 'web'? 100 : 100, 
    left:Platform.OS == 'ios' || Platform.OS === 'android'? 100: Platform.OS === 'web'? -400: -400,
  },
  eyefingerprintbutton:{
    position: Platform.OS === 'android' || Platform.OS === 'ios'? 'relative': 'relative',    
    top: Platform.OS === 'ios' || Platform.OS === 'android' ? -245: Platform.OS === 'web'? -52 : -52, 
    left:Platform.OS == 'ios' || Platform.OS === 'android'? 100: Platform.OS === 'web'? -150: -200,
  },
  eyemessagebutton:{
    position: Platform.OS === 'android' || Platform.OS === 'ios'? 'relative': 'relative',    
    top: Platform.OS === 'ios' || Platform.OS === 'android' ? -200: Platform.OS === 'web'? -125 : -125, 
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
  }

});
