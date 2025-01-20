import { Link, Stack,  } from 'expo-router';
import { IconButton, MD2Colors, MD3Colors } from 'react-native-paper';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert, Platform} from 'react-native';
import Modal  from 'react-native-modal';
import { useEffect, useState } from 'react';
import { RadialSlider } from 'react-native-radial-slider';
import Popover from 'react-native-popover-view';
import * as LocalAuth from 'expo-local-authentication';
import ReactNativeBiometrics, { BiometryTypes } from 'react-native-biometrics';





export default function Tab() {
  
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
      <IconButton icon={'camera'} iconColor={MD3Colors.secondary60} size={50} onPress={() =>{setEyeCamera(!eyeCamera)}} style={styles.eyecamerabutton}></IconButton>
      <IconButton icon={'facebook'} iconColor={MD3Colors.primary50} size={50} onPress={() =>{setEyeFacebook(!eyeFacebook)}} style={styles.eyefacebookbutton}></IconButton>
      <IconButton icon={'bitcoin'} iconColor={MD3Colors.neutral80} size={50} onPress={() =>{setEyeBitcoin(!eyeBitcoin);}} style={styles.eyebitcoinbutton}></IconButton>
      <IconButton icon={'bell'} iconColor={MD3Colors.error30} size={50} onPress={() =>{setEyeBell(!eyeBell);}} style={styles.eyebellkbutton}></IconButton>
      <IconButton icon={'fingerprint'} iconColor={MD3Colors.primary70} size={50} onPress={() =>{setEyeFingerprint(!eyeFingerprint);}} style={styles.eyefingerprintbutton}></IconButton>
      <IconButton icon={'message'} iconColor={MD3Colors.tertiary80} size={50} onPress={() =>{setEyeMessage(!eyeMessage);}} style={styles.eyemessagebutton}></IconButton>
      {Platform.OS === 'android' || Platform.OS === 'ios' ? <Link href={'/home'} style={styles.linkhome}> Return Home 🏠 </Link>: <Text></Text>}
      {eyeCamera ? <Modal isVisible={eyeCamera} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={{width: 300, position: 'relative', left: 300}}>
         <View style={{flex: 1}}>
            {Platform.OS === 'web' ? <IconButton icon={'close'} iconColor={MD2Colors.amber400} style={{position: 'relative', top: 50, left: 400 }} onPress={() => {setEyeCamera(!eyeCamera)}}></IconButton>: ''}
            {Platform.OS === 'ios' || Platform.OS === 'android'? <Link href={'/'} style={{color: 'white', position: 'absolute', top: 550, left: -200}}> Return Home * </Link>: ''}
            <Text style={{color: 'white', position: 'absolute',top: Platform.OS === 'android' || Platform.OS === 'ios' ? 60: 20, left: Platform.OS === 'android' || Platform.OS === 'ios' ? -200: 200, fontSize: Platform.OS === 'web'? 24 : 14}}> Authenicate Yourself </Text>
          </View>  
        </Modal>: ''}
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
  }

});
