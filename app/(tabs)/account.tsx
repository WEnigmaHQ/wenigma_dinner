import { Link, Redirect } from 'expo-router';
import { IconButton, MD3Colors } from 'react-native-paper';
import { View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import Modal  from 'react-native-modal';
import { useEffect, useState } from 'react';
import { RadialSlider } from 'react-native-radial-slider';
import Popover from 'react-native-popover-view';
import * as LocalAuth from 'expo-local-authentication';




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
  const [showKeyPopover, setKeyShowPopover] = useState(false);


  // popover for faceID

  const [showFacePopover, setFaceShowPopover] = useState(false);

  //  popover for TouchID

  const [showTouchPopover, setTouchShowPopover] = useState(false);


  useEffect(() => {
    setTimeout(() => setKeyShowPopover(false), 2000);
  }, []);

  useEffect(() => {
    setTimeout(() => setFaceShowPopover(false), 1000);
  }, []);

  useEffect(() => {
    setTimeout(() => setTouchShowPopover(false), 1000);
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
      <IconButton icon={'camera'} iconColor={MD3Colors.secondary60} size={50} onPress={() =>{setEyeCamera(!eyeCamera);}} style={styles.button}></IconButton>
      <IconButton icon={'facebook'} iconColor={MD3Colors.primary50} size={50} onPress={() =>{setEyeFacebook(!eyeFacebook)}} style={styles.button}></IconButton>
      <IconButton icon={'bitcoin'} iconColor={MD3Colors.neutral80} size={50} onPress={() =>{setEyeBitcoin(!eyeBitcoin);}} style={styles.button}></IconButton>
      <IconButton icon={'bell'} iconColor={MD3Colors.error30} size={50} onPress={() =>{setEyeBell(!eyeBell);}} style={styles.button}></IconButton>
      <IconButton icon={'fingerprint'} iconColor={MD3Colors.primary70} size={50} onPress={() =>{setEyeFingerprint(!eyeFingerprint);}} style={styles.button}></IconButton>
      <IconButton icon={'message'} iconColor={MD3Colors.tertiary80} size={50} onPress={() =>{setEyeMessage(!eyeMessage);}} style={styles.button}></IconButton>
      {eyeFacebook ? 
          <View>
            
          </View> :''}
      {eyeCamera ? <View> 
        <Modal isVisible={eyeCamera} animationOutTiming={1000} animationIn={'lightSpeedIn'} style={{width: 300, position: 'relative', left: 300}}>
         <View style={{flex: 1}}>
            <Text style={{color: 'gold', fontSize: 20, textAlign: 'center', marginTop: 12}}> Authenicate Yourself </Text>
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
         <IconButton icon={'close'} iconColor={MD3Colors.secondary90} style={{position: 'relative', top: -50, left: 900}} onPress={() => {setEyeFingerprint(!eyeFingerprint)}}></IconButton>
            <Text style={{color: 'gold', fontSize: 20, textAlign: 'center', marginTop: 12}}> Authenicate Level </Text>
            <View>
              <Popover isVisible={showKeyPopover} onRequestClose={() => setKeyShowPopover(false)} from={(
                <TouchableOpacity onPress={() => setKeyShowPopover(false)}>
                  <IconButton icon={'key'} iconColor={MD3Colors.secondary60} style={{position: 'relative', top: 35, left: 300}}></IconButton>
                  {LocalAuth.SecurityLevel.SECRET ? <Text style={styles.text}> No Pin or pattern detected </Text> : <Text style={styles.text}> Pin or pattern detected </Text> }
                </TouchableOpacity>
              )}></Popover>
              <Popover isVisible={showFacePopover} onRequestClose={() => setFaceShowPopover(false)} from={(
                <TouchableOpacity onPress={() => setFaceShowPopover(false)}>
                  <IconButton icon={'eye'} iconColor={MD3Colors.neutral50} style={{position: 'relative', top: 35, left: 300}}></IconButton>
                  {LocalAuth.AuthenticationType.FACIAL_RECOGNITION ? <Text style={styles.text}> Excellent Your FaceID detected  </Text> : <Text style={styles.text}> Unbelievable ! NO FaceID detected </Text> }
                </TouchableOpacity>
              )}></Popover>
              <Popover isVisible={showTouchPopover} onRequestClose={() => setTouchShowPopover(false)} from={(
                <TouchableOpacity onPress={() => setTouchShowPopover(false)}>
                  <IconButton icon={'fingerprint'} iconColor={MD3Colors.neutralVariant50} style={{position: 'relative', top: 40, left: 300}}></IconButton>
                  {LocalAuth.AuthenticationType.FINGERPRINT ? <Text style={styles.text}> Excellent Your TouchID detected  </Text> : <Text style={styles.text}> Unbelievable ! NO TouchID detected </Text> }
                </TouchableOpacity>
              )}></Popover>
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
