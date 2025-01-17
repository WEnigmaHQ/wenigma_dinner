import { Link, Redirect } from 'expo-router';
import { IconButton, MD3Colors } from 'react-native-paper';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Alert} from 'react-native';
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
      <IconButton icon={'camera'} iconColor={MD3Colors.secondary60} size={50} onPress={() =>{setEyeCamera(!eyeCamera);}} style={{position: 'relative', top: 150, left: -400}}></IconButton>
      <IconButton icon={'facebook'} iconColor={MD3Colors.primary50} size={50} onPress={() =>{setEyeFacebook(!eyeFacebook)}} style={{position: 'relative', top: 73, left:-200}}></IconButton>
      <IconButton icon={'bitcoin'} iconColor={MD3Colors.neutral80} size={50} onPress={() =>{setEyeBitcoin(!eyeBitcoin);}} style={{position: 'relative', top: 0, left: -25}}></IconButton>
      <IconButton icon={'bell'} iconColor={MD3Colors.error30} size={50} onPress={() =>{setEyeBell(!eyeBell);}} style={{position: 'relative', top: -8, left: -400}}></IconButton>
      <IconButton icon={'fingerprint'} iconColor={MD3Colors.primary70} size={50} onPress={() =>{setEyeFingerprint(!eyeFingerprint);}} style={{position: 'relative', top: -85, left: -200}}></IconButton>
      <IconButton icon={'message'} iconColor={MD3Colors.tertiary80} size={50} onPress={() =>{setEyeMessage(!eyeMessage);}} style={{position: 'relative', top: -160, left: -25}}></IconButton>
      {eyeFacebook ? 
          <View>
            
          </View> :''}
      {eyeCamera ? <View> 
        <Modal isVisible={eyeCamera} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={{width: 300, position: 'relative', left: 300}}>
         <View style={{flex: 1}}>
            <IconButton icon={'close'} iconColor={MD3Colors.secondary90} style={{position: 'relative', top: 50, left: 400}} onPress={() => {setEyeCamera(!eyeCamera)}}></IconButton>
            <Text style={{color: 'gold', fontSize: 20, textAlign: 'center', marginTop: 12}}> Authenicate Yourself </Text>
            <View>
            <Popover isVisible={deviceAuth} onRequestClose={() => setDeviceAuth(false)} from={(
                <TouchableOpacity onPress={() => setDeviceAuth(false)}>
                  <IconButton icon={deviceAuthPromise && deviceAuthTPromise? 'unlock' : 'lock'} iconColor={deviceAuthPromise && deviceAuthTPromise ? MD3Colors.secondary60: MD3Colors.error50} style={{position: 'relative', top: 100, left: -200}}></IconButton>
                  {deviceAuthPromise && deviceAuthTPromise ? <Text style={{color: 'green', position: 'relative', top: 120, width: 150, left: -200}}> Excellent Your device authenticate you </Text>: <Text style={{color: 'red', position: 'relative', top: 120, width: 150, left: -200}}> Add your Face or Fingerprint to authenticate device </Text>}
                </TouchableOpacity>
              )}></Popover>
              <Popover isVisible={deviceFaceRec} onRequestClose={() => setDeviceAuth(false)} from={(
                <TouchableOpacity onPress={() => setDeviceAuth(false)}>
                  <IconButton icon={deviceAuthPromise ? 'cog': 'cogs'} iconColor={deviceAuthPromise ? MD3Colors.secondary60: MD3Colors.error50} style={{position: 'relative', top: 2, left: 300}}></IconButton>
                  {deviceAuthPromise ? <Text style={{color: 'green', position: 'relative', top: 120, width: 150, left: 300}}> Unlock My Account </Text>: <Text style={{color: 'red', position: 'relative', top: 20, width: 150, left: 300}}> Sign in </Text>}
                  {deviceAuthPromise ? <View>
                    <TouchableOpacity onPress={ async() =>{
                      Alert.alert('FaceID', 'Would you like to unlock app through your Face ?', [{text: 'Excellent', onPress: async() =>{},},{ text: 'Cancel', style: 'cancel' },],)
                    } }></TouchableOpacity>
                  </View>: ''}
                </TouchableOpacity>
              )}></Popover>
            </View>
          </View>  
        </Modal> </View> :''}
      {eyeBitcoin ? <View> 
        <Modal isVisible={eyeBitcoin} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={{width: 300, position: 'relative', left: 300}}>
          <View style={{flex: 1}}>
            <Text style={{color: 'gold', fontSize: 20, textAlign: 'center', marginTop: 12}}> Register your Bitcoin Address </Text>
            <View>
            <Text style={{color: 'gold', marginTop: 100}}> Bitcoin Address </Text>
              <TextInput placeholder='Your bitcoin Address' value={bitcoinAddress} onChangeText={setBitcoinAddress} style={{position: 'relative', top: 20, color: 'gold', backgroundColor: 'darkslategrey', height: 40, borderRadius: 12}}></TextInput>
              <IconButton icon={'close'} iconColor={MD3Colors.primary100} style={{position: 'relative', left: 500, top: -190}} onPress={() => {setEyeBitcoin(!eyeBitcoin)}}></IconButton>
              <TouchableOpacity style={{position: 'relative', top: -76, left: 250, opacity: isFormValid ? 1: 0.5}} disabled={!isFormValid} onPress={handleForm}>
                <IconButton icon={'bitcoin'} iconColor={MD3Colors.primary70}></IconButton>
              </TouchableOpacity>
            </View>
          </View>
        </Modal></View> :''}
      {eyeBell ? <View> 
              </View> :''}
      {eyeFingerprint ? <View> <Modal isVisible={eyeFingerprint} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={{width: 300, position: 'relative', left: 300}}>
         <View style={{flex: 1}}>
         <IconButton icon={'close'} iconColor={MD3Colors.secondary90} style={{position: 'relative', top: 50, left: 400}} onPress={() => {setEyeFingerprint(!eyeFingerprint)}}></IconButton>
            <Text style={{color: 'gold', fontSize: 20, textAlign: 'center', marginTop: 12}}> Authenicate Level </Text>
            <View>
              <Popover isVisible={showKeyPopover} onRequestClose={() => setKeyShowPopover(false)} from={(
                <TouchableOpacity onPress={() => setKeyShowPopover(false)}>
                  <IconButton icon={'key'} iconColor={MD3Colors.secondary60} style={{position: 'relative', top: 35, left: 300}}></IconButton>
                  {LocalAuth.SecurityLevel.SECRET ? <Text style={{color: 'green'}}> Pin or pattern detected </Text> : <Text style={{color: 'red'}}> No Pin or pattern detected </Text> }
                </TouchableOpacity>
              )}></Popover>
              <Popover isVisible={showFacePopover} onRequestClose={() => setFaceShowPopover(false)} from={(
                <TouchableOpacity onPress={() => setFaceShowPopover(false)}>
                  <IconButton icon={'eye'} iconColor={isFaceDetect ? MD3Colors.neutral50: MD3Colors.error50} style={{position: 'relative', top: 35, left: 300}}></IconButton>
                  {LocalAuth.AuthenticationType.FACIAL_RECOGNITION && isFaceDetect ? <Text style={{color: 'green'}}> Excellent Face Sensor detected  </Text> : <Text style={{color: 'red'}}> Unbelievable ! NO Face Sensor detected </Text> }
                </TouchableOpacity>
              )}></Popover>
              <Popover isVisible={showTouchPopover} onRequestClose={() => setTouchShowPopover(false)} from={(
                <TouchableOpacity onPress={() => setTouchShowPopover(false)}>
                  <IconButton icon={'fingerprint'} iconColor={isTouchDetect? MD3Colors.neutralVariant50: MD3Colors.error50} style={{position: 'relative', top: 35, left: 300}}></IconButton>
                  {LocalAuth.AuthenticationType.FINGERPRINT  && isTouchDetect ? <Text style={{color: 'green'}}> Excellent Touch Sensor detected  </Text> : <Text style={{color: 'red'}}> Unbelievable ! NO Touch Sensor detected </Text> }
                </TouchableOpacity>
              )}></Popover>
              {isFaceDetect || isTouchDetect ? <Text style={{color: 'green',position: 'relative', top: 100,left: 100}}> Strong Authentication </Text> : <Text style={{color: 'red', position: 'relative', top: 100,left: 100}}> Weak Authentication </Text>}
            </View>
          </View>  
        </Modal> </View> :''}
      {eyeMessage ? <View> <Modal isVisible={eyeMessage} animationOutTiming={1000} animationIn={'pulse'} >
          <View>
            <Text style={{color: 'white', fontSize: 20, position: 'relative', top: -50, textAlign: 'center'}}> Your Message Record </Text>
            <IconButton icon={'close'} iconColor={MD3Colors.secondary90} style={{position: 'relative', top: -80, left: 900}} onPress={() => {setEyeMessage(!eyeMessage)}}></IconButton>
            <View style={{flex: 1}}>
              <RadialSlider variant={'speedometer'} value={speed}  min={0} max={200} onChange={setSpeed} style={{position: 'relative', left: 500, top: -70}}/>
              <IconButton icon={'chat'} iconColor={MD3Colors.primary100} style={{position: 'relative', left: 50, top: -120}}></IconButton>
              <Text style={{color: speed >= 0 ? 'white' : 'blue', position: 'relative', top: -155, left: 120}}> 0% </Text>
              <IconButton icon={'image'} iconColor={MD3Colors.primary100} style={{position: 'relative', left: 50, top: -120}}></IconButton>
              <Text style={{color: speed >= 0 ? 'white' : 'blue', position: 'relative', top: -155, left: 120}}> 0% </Text>
              <IconButton icon={'phone'} iconColor={MD3Colors.secondary95} style={{position: 'relative', top: -80, left: 300}}></IconButton>
              <Text style={{color: speed >= 0 ? 'white' : 'blue', position: 'relative', top: -115, left: 350}}> 0% </Text>
            </View>
          </View>
        </Modal> </View> :''}
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
  }
});
