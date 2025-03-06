import { router } from "expo-router";
import { useEffect, useState } from "react";
import { View, Platform, TouchableOpacity, Text } from "react-native";
import ReactNativeBiometrics, { BiometryTypes } from "react-native-biometrics";
import { Appbar, MD2Colors, IconButton, MD3Colors } from "react-native-paper";
import Popover from "react-native-popover-view";
import * as LocalAuth from 'expo-local-authentication';

export default function Authenicate() {


    // Declaration states
      const [ deviceAuth , setDeviceAuth] =  useState(false);
      const [ deviceAuthPromise, setDeviceAuthPromise] = useState(false);
      const [ deviceAuthTPromise, setDeviceAuthTPromise] = useState(false);
      const [ deviceFaceRec, setDeviceFaceRec] = useState(false);


    // back screen functionality
    const back = () => {router.replace('/')};

    // useEffect to check for device hardware support
    useEffect(() => {
        setTimeout(() => setDeviceAuth(false), 2000);
    
        const isFaceID = async() => {
          
          try {
            const device = await LocalAuth.supportedAuthenticationTypesAsync();
    
    
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

    return (
        <View style={{flex: 1}}>
                        <Appbar.BackAction iconColor={MD2Colors.white} onPress={back}></Appbar.BackAction>
                        <Text style={{color: 'white', position: 'absolute',top: Platform.OS === 'android' || Platform.OS === 'ios' ? 100: 20, left: Platform.OS === 'android' || Platform.OS === 'ios' ? -220: 200, fontSize: Platform.OS === 'web'? 24 : 14}}> Authenicate Yourself </Text>
                        <Popover isVisible={deviceAuth} onRequestClose={() => setDeviceAuth(false)} from={(
                          <TouchableOpacity onPress={() => setDeviceAuth(false)}>
                            <IconButton icon={deviceAuthPromise && deviceAuthTPromise? 'face-recognition': 'account-lock'} iconColor={deviceAuthPromise && deviceAuthTPromise ? MD3Colors.secondary60: MD3Colors.error50} style={{position: 'relative', top: 150, left: -180}}></IconButton>
                            {deviceAuthPromise && deviceAuthTPromise ? <Text style={{
    color: 'green', 
    position: 'relative', 
    top: 150,  
    left: -175,
    width: 90
  }}> Face Recognize Feature accepted </Text>: <Text style={{
    color: 'white', 
    position: 'relative', 
    top: 200,  
    left: -180 ,
  }}> Icognitio Mode </Text>}
                          </TouchableOpacity>
                        )}></Popover>
                        <Popover isVisible={deviceFaceRec} onRequestClose={() => setDeviceAuth(false)} from={(
                          <TouchableOpacity onPress={() => setDeviceAuth(false)}>
                            <IconButton icon={deviceAuthPromise ? 'fingerprint': 'incognito-circle'} iconColor={deviceAuthPromise ? MD3Colors.secondary60: MD3Colors.error50} style={{
    position: 'relative', 
    top: 200, 
    left: -180
  }}></IconButton>
                            {deviceAuthPromise ? <Text style={{
    color: 'green', 
    position: 'relative', 
    top: 200, 
    left: -180,
    width:90   
  }}> Fingerprint Recogize feature accepted </Text>: <Text style={{
    color: 'white', 
    position: 'relative', 
    top: 300, 
    left: -180
  }}> Sign in </Text>}
                            {deviceAuthPromise ? '' : ''}
                          </TouchableOpacity>
                        )}></Popover>
                </View>  
    )

}