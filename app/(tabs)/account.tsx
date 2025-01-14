import { Link, Redirect } from 'expo-router';
import { Button, IconButton, MD3Colors } from 'react-native-paper';
import { View, StyleSheet, Text, TextInput, TouchableOpacity} from 'react-native';
import Modal  from 'react-native-modal';
import { useEffect, useState } from 'react';



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
          </View> :''}
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
      {eyeFingerprint ? <View> 
                </View> :''}
      {eyeMessage ? <View> 
                  </View> :''}
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
