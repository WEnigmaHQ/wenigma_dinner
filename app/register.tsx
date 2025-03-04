import { router } from "expo-router";
import { useRef, useState } from "react";
import { View, TextInput, Text } from "react-native";
import BottomDrawer, { BottomDrawerMethods } from "react-native-animated-bottom-drawer";
import { Appbar, MD2Colors, IconButton, Card } from "react-native-paper";
import { Toast,Switch } from "rn-inkpad";
import { supabase } from "./supabase";


export default function Register() {


    // Declaration states

    const [ isBitcoin, setIsBitcoin ] = useState(false);
    const [ incogEmail, setIncogEmail ] = useState('');
    const [ isMagicLink, setIsMagicLink ] = useState(false);
    const [ email, setEmail ] = useState('');
    const [ isDelegation, setIsDelegation ] = useState(false);
    const [ isSocialLink, setIsSocialLink ] = useState(false);
    const [ toastVisible, setToastVisible ] = useState(false);
    const [ isOTP, setIsOTP ] = useState(false);
    const [ appError, setAppError ] = useState('Connection refused');
    
    // bottom drawer for incogito mode.

    const bottomIncogsDrawerRef = useRef<BottomDrawerMethods>(null);
    const bottomDelegateDrawerRef = useRef<BottomDrawerMethods>(null);
    // const [ toastAuthVisible, setToastAuthVisible ] = useState(false);

    // back screen functionality
    const back = () => {router.replace('/')};

    const onHandle_EmailOTP = async() =>{

      const {data, error} = await supabase.auth.signInWithOtp(
        { email: email, options: { shouldCreateUser: true, },});
        
      console.log('sign in with OTP:', data);
        
      if (error !== null){
        console.error('Error signing in with OTP:', error.message);
        setIsOTP(false);
        return;
      }

      setIsOTP(true);

      setToastVisible(true);

    };

    // authentication token
    const onHandle_sceret = async () => {
    
          const {data, error} = await supabase.auth.signInAnonymously();
          console.log("user ID : ", data.session?.user.id);
    
    
          if (error){
            console.error('Error in sign as anonymous user', error.message);
            return;
          }
    
    
          if (data.session?.user.id !== ''){ 
    
            if (!incogEmail){
                console.error('Error email is null ', incogEmail);
                return;
            }
    
    
            try{
            
                    const {data:{user: userCheck}, error} = (await supabase.auth.getUser());
    
                    if (!userCheck && error){
                        console.error('Error user cannot exist', error.message);
                        setAppError(error.message);
                        return;
                    }
    
                    const {data: {user}} = await supabase.auth.updateUser ({email: incogEmail});
    
                    if (error){
                      console.error('Error email cannot linked', error.message);
                      setAppError(error.message);
                      return;
                    }
    
                    console.log('Wonderful user email linked', user);
                    const session = create_session();
                    setAppError('Email Linked'); 
    
                if (session) {
                  console.log('Session created successfully:', session); 
                } else {
                      console.error('No session found for anonymous user.. ');
                      setAppError('No session ');
                      return;
                }
    
              }catch(error){
                 console.log('error', error);
              }
        }
          else{ setAppError('Email already register'); }
    
    };

    const create_session = async () =>{

      const sessionData = await supabase.auth.getSession();
      return sessionData.data.session;
    };

    return(
        <View style={{
            position: 'absolute', 
            width: 320, 
            top: 50
          }}>
            <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -85, left: 280}}></Appbar.BackAction>
            <View style={{top: 50}}>
            <Switch
      backgrounColor="#008000"
      border
      borderColor="#008000"
      fullWidth
      isOn={isMagicLink}
      justifyContent="space-between"
      onChange={setIsMagicLink}
      text="Register / Login your email"
      textStyle={{fontSize: 18,
        fontWeight: '600', color: 'white'}}
    />
            </View>
                { isMagicLink ? <View style={{top: 100}}>
                                    <Text style={{ color: 'white', top: -10}}> Email Address * </Text>
                                    <TextInput placeholder='Email' value={email} onChangeText={setEmail} inputMode={'email'} style={{top: 0, color: 'white'}}></TextInput>
                                    <View style={{top: 30}}>
                                      <Switch
                                        backgrounColor="#008000"
                                        border
                                        borderColor="#008000"
                                        fullWidth
                                        isOn={isMagicLink}
                                        justifyContent="space-between"
                                        onChange={setIsMagicLink}
                                        text="Have Bitcoin wallet ?"
                                        textStyle={{fontSize: 12,
                                        fontWeight: '500', color: 'white'}}></Switch>
                                    </View>
                                    <View style={{top: 60}}>
                                    <Switch
                                      backgrounColor="#008000"
                                      border
                                      borderColor="#008000"
                                      fullWidth
                                      isOn={isDelegation}
                                      justifyContent="space-between"
                                      onChange={setIsDelegation}
                                      text="Delegartion Terms"
                                      textStyle={{fontSize: 12,
                                        fontWeight: '500', color: 'white'}}></Switch>
                                    </View>
                                        
                                      {isDelegation && isBitcoin && isMagicLink ? bottomDelegateDrawerRef.current?.open : bottomDelegateDrawerRef.current?.close}
                                      <BottomDrawer ref={bottomDelegateDrawerRef} openOnMount>
                                                <Text style={{top: 2, left: 30, fontWeight: 'bold', fontSize: 15}}> Following Delegation should be applied :- </Text>
                                                <Text style={{top: 30, left: 50, fontSize: 15, width: 250}}> 1. All Members should have email address or phone number for his/ her account. </Text>
                                                <Text style={{top: 30, left: 50, fontSize: 15, width: 250}}> 2. Every member should have bitcoin wallet. </Text>
                                                <Text style={{top: 30, left: 50, fontSize: 15, width: 250}}> 3. Every member should secure his/her bitcoin wallet keys.</Text>
                                                <Text style={{top: 30, left: 50, fontSize: 15, width: 250}}> 4. Every member should use bitcoin as payment. </Text>
                                                <Text style={{top: 30, left: 50, fontSize: 15, width: 250}}> 5. All members either create prenium clubs , or join clubs, invite prenuim dinners. </Text>
                                                <Text style={{top: 30, left: 50, fontSize: 15, width: 250}}> 6. Prenium clubs provide various services such collabration between highly influential executives directly in a secure environment. </Text>
                                                <IconButton icon={'timer'} iconColor={MD2Colors.green700} style={{top: 25, left: 300}} onPress={onHandle_EmailOTP}></IconButton>
                                                {isOTP ? <View>
                                                            <Toast visible={toastVisible} backgroundColor='#FF7F50' icon='information-circle-outline' position='top' fontSize={8} text='Check your Email. Add your token for your authentication' setVisible={setToastVisible}></Toast>
                                                         </View> : ''}
                                      </BottomDrawer>
                            </View> : ''}
                <View style={{top: 200}}>
                  <Switch
                                      backgrounColor="#008000"
                                      border
                                      borderColor="#008000"
                                      fullWidth
                                      isOn={isSocialLink}
                                      justifyContent="space-between"
                                      onChange={setIsSocialLink}
                                      text="Incogntio Account ?"
                                      textStyle={{fontSize: 20,
                    fontWeight: '500', color: 'white'}}></Switch>
                    { isSocialLink ? <View>
                                          <Text style={{position: 'relative', top: 30, color: 'yellow'}} > Email Address * </Text>
                                          <TextInput placeholder='Email' value={incogEmail} onChangeText={setIncogEmail} inputMode={'email'} style={{top: 50, color: 'white'}}></TextInput>
                                          <IconButton icon={'cellphone-link'} iconColor={MD2Colors.white} style={{top: 20, left: 265}} onPress={onHandle_sceret}></IconButton>
                                          <View style={{top: 20}}>
                                            <Switch
                                      backgrounColor="#008000"
                                      border
                                      borderColor="#008000"
                                      fullWidth
                                      isOn={isMagicLink}
                                      justifyContent="space-between"
                                      onChange={setIsMagicLink}
                                      text="Have Bitcoin wallet ?"
                                      textStyle={{fontSize: 12,
                                        fontWeight: '500', color: 'white'}}></Switch>
                                          </View>
                                          { isBitcoin ? <BottomDrawer ref={bottomIncogsDrawerRef} openOnMount>
                                                    <View>
                                                        {appError.includes('Email Linked') ? <View>
                                                                                                <IconButton icon={'incognito-circle'} iconColor={MD2Colors.green500} size={80} style={{top: 20,
  left: 120}}></IconButton>
                                                                                                <Text style={{
  top: 20,
  left: 100,
  color: 'green'
}}> `{appError} complete` </Text>
                                                                                                <Text style={{
  top: 40,
  left: 80,
  color: 'black'
}}> Incognito Shopping Mode  </Text>
                                                                                                <Text style={{
  top: 40,
  left: 80,
  color: 'black'
}}> Secure & Borderless transacton  </Text>
                                                                                                <Text style={{
  top: 40,
  left: 80,
  color: 'black'
}}> Private Identity  </Text>
                                                                                                <Text style={{
  top: 40,
  left: 80,
  color: 'black'
}}> Bitcoins accepted  </Text>
                                                                                        </View> : <View>
                                                                        <IconButton icon={'incognito-circle-off'} iconColor={MD2Colors.red500} size={80} style={{top: 20,
  left: 120}}></IconButton>
                                                                        <Text style={{
  top: 20,
  left: 100,
  color: 'green'
}}> `{appError} 100` </Text>
                                                                </View>}
                                                            </View>
                                                        </BottomDrawer> : ''}
                                     </View> : ''}
                </View>
        </View>      
    );
}