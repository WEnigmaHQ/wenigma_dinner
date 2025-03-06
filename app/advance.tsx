import { useEffect, useState } from "react";
import { View, TouchableOpacity, Text } from "react-native";
import { Appbar, MD2Colors, IconButton, MD3Colors } from "react-native-paper";
import Popover from "react-native-popover-view";
import * as LocalAuth from 'expo-local-authentication';
import { router } from "expo-router";

export default function Advance() {

    // popover for security key
    const [ showKeyPopover, setKeyShowPopover] = useState(false);
    const [ showFacePopover, setFaceShowPopover] = useState(false);
    const [ isFaceDetect, setFaceDetect] = useState(false);

    const [showTouchPopover, setTouchShowPopover] = useState(false);
    const [ isTouchDetect, setTouchDetect] = useState(false);
    const [ deviceAuth , setDeviceAuth] =  useState(false);
    const [ deviceFaceRec, setDeviceFaceRec] = useState(false);


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
        setTimeout(() => setDeviceFaceRec(false), 2000);
    
      }, []);

    //   device Authenicate by user through touch
      const back = () => {router.replace('/')}

    return (
        <View>
                <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -200}}></Appbar.BackAction>
                <Text style={{color: 'white',
                    top: -150,
                    left: -210,
                    fontSize: 20}}> Authenicate Level </Text>
                <Popover isVisible={showKeyPopover} onRequestClose={() => setKeyShowPopover(false)} from={(
                    <TouchableOpacity onPress={() => setKeyShowPopover(false)}>
                        <IconButton icon={'key'} iconColor={MD2Colors.green500} style={{ position: 'relative', 
                            top: -70, 
                            left: -150}}></IconButton>
                            {LocalAuth.SecurityLevel.SECRET ? <Text style={{ color: 'white',
                                top: -50, 
                                left: -200}}> Pin or pattern detected </Text> : <Text style={{ color: 'white',
                                    top: -50, 
                                    left: -200}}> No Pin or pattern detected </Text> }
                    </TouchableOpacity>
                )}></Popover>
                
                <Popover isVisible={showFacePopover} onRequestClose={() => setFaceShowPopover(false)} from={(
                    <TouchableOpacity onPress={() => setFaceShowPopover(false)}>
                        <IconButton icon={'face-recognition'} iconColor={isFaceDetect ? MD2Colors.green500: MD3Colors.error50} style={{position: 'relative', 
                            top: -20, 
                            left: -150}}></IconButton>
                            {LocalAuth.AuthenticationType.FACIAL_RECOGNITION && isFaceDetect ? <Text style={{ color: 'white',
                                top: -20, 
                                left:-220}}> Excellent Face Sensor detected  </Text> : <Text style={{ color: 'white',
                                    top: -20, 
                                    left:-200}}> Unbelievable ! NO Face Sensor detected </Text> }
                    </TouchableOpacity>
                )}></Popover>
                                
                <Popover isVisible={showTouchPopover} onRequestClose={() => setTouchShowPopover(false)} from={(
                        <TouchableOpacity onPress={() => setTouchShowPopover(false)}>
                            <IconButton icon={'fingerprint'} iconColor={isTouchDetect? MD2Colors.green500: MD3Colors.error50} style={{position: 'relative', 
                                top:  20, 
                                left: -150}}></IconButton>
                                {LocalAuth.AuthenticationType.FINGERPRINT  && isTouchDetect ? <Text style={{position: 'relative', 
                                    top: 20 , 
                                    left: -150}}> Excellent Touch Sensor detected  </Text> : <Text style={{color: 'white',
                                        top: 20, 
                                        left: -200}}> Unbelievable ! NO Touch Sensor detected </Text> }
                        </TouchableOpacity>
                )}></Popover>
                
        </View>
    )
}