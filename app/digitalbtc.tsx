import { useEffect, useState } from "react";
import { View, TextInput, TouchableOpacity, Text } from "react-native";
import { IconButton, MD2Colors } from "react-native-paper";

export default function DigitalBTC() {

    // Declaration states
    const [bitcoinAddress, setBitcoinAddress] = useState('');
    const [errors, setErrors] = useState({});
    const [isFormValid, setIsFormValid] = useState(false);

    // Annyomous function to check for bitcoin address
    useEffect(() =>{
    
        // Trigger Form Submission Event
        submitForm();
    
      },[bitcoinAddress]);
    
    //   Function to check for bitcoin address
      const submitForm = ()=>{
    
        let errors = [];
    
        if (bitcoinAddress.length < 26 && bitcoinAddress.length > 36){errors.push('your bitcoin address is not secure');}
        setErrors(errors);
        setIsFormValid(Object.keys(errors).length === 0);
      }

    //   Function to handle form submission
      const handleForm = () => { isFormValid ? alert('Congrats , Your bitcoin address added in our record') : alert('Poor! , Check your credentials before submission ') }

    return (

        // View to display the form
        <View>
                      <Text style={{
    color: 'black', 
    fontSize: 20, 
    textAlign: 'center'
  }}> Register your Bitcoin Address </Text>
                      <Text style={{
                          color: 'darkslategrey',
                          position: 'relative',
                          top: 50,
                          left: 50,
                          fontWeight: 'bold'
                        }}> Bitcoin Address * </Text>
                      <TextInput placeholder=' Your bitcoin Address ' value={bitcoinAddress} 
                      onChangeText={setBitcoinAddress} style={{
                          position: 'relative', 
                          top: 60, 
                          color: 'gold', 
                          backgroundColor: 'grey', 
                          height: 40, 
                          borderRadius: 12,
                          width: 250,
                          left: 70,
                        }}></TextInput>
                      <TouchableOpacity style={{
                          position: 'relative', 
                          top:  15, 
                          left: 270,
                        }} disabled={!isFormValid} onPress={handleForm}>
                          <IconButton icon={'bitcoin'} iconColor={MD2Colors.amber500}></IconButton>
                        </TouchableOpacity>
        </View>
    )
}