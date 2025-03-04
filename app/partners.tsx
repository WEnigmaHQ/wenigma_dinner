import { useState } from "react";
import { View, Text } from "react-native";
import { SegmentedControl } from "rn-inkpad";


export default function Partners() {


    //  [active or open]
      const values = [
        {key: 'Active', value: 'tab1'},
        {key: 'Open', value: 'tab2'},
      ];
    
    
      const [ value, setValue ] = useState('active'); 
    

    return(
        <View style={{position: 'absolute', width: 300, top: 30}}>
                        <SegmentedControl label="" values={values} onChange={value => setValue(value)} style={{position: 'relative', left: 30}}
                          />
                          {value !== 'tab2' && (<View style={{flex: 1}}>
                            <Text style={{
  position: 'relative', 
  left: 20,
  fontSize: 50,
  color: 'darkslategrey',
  top: 20
}}> DAMAC </Text>
                            <Text style={{
  position: 'relative', 
  left: 160,
  fontSize: 20,
  color: 'orange',
  top: 20
}}> Ocean House </Text>
                            <Text style={{
  position: 'relative', 
  left: 60,
  fontSize: 20,
  color: 'green',
  top: 40
}}> IMI-LUXURY-EXCELSIOR </Text>
                            <Text style={{
  position: 'relative', 
  left: 30,
  fontSize: 20,
  color: 'purple',
  top: 60
}}> RAS-AL-KHAMAH </Text>
                            </View>)}
                            {value !== 'tab1' && (<View style={{flex: 1}}>
                            <Text style={{
  position: 'relative', 
  left: 160,
  fontSize: 20,
  color: 'orange',
  top: 20
}}> Nine Elm Versace </Text>
                            <Text style={{
  position: 'relative', 
  left: 160,
  fontSize: 20,
  color: 'orange',
  top: 20
}}> JACBO & CO Inc </Text>
                            <Text style={{
  position: 'relative', 
  left: 60,
  fontSize: 20,
  color: 'green',
  top: 40
}}> Trump International  </Text>
                            <Text style={{
  position: 'relative', 
  left: 30,
  fontSize: 20,
  color: 'purple',
  top: 60
}}> BINGATTI </Text>
                            <Text style={{
  position: 'relative', 
  left: 100,
  fontSize: 20,
  color: 'red',
  top: 70
}}> GRANT CARDONE </Text>
                            </View>)}
                      </View>
    );
}