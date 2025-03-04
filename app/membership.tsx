import { useState } from "react";
import { View } from "react-native";
import { SegmentedControl } from "rn-inkpad";
import Register from "./register";
import Authentication from "./authentication";
import Antiquity from "./antiquity";

export default function Membership() {

    // Declaration register
    const [register, setRegister] = useState('tab1');
    
    
    // segmented tabs 
    const account = [
        {key: 'Register Membership', value: 'tab1'},
        {key: 'Authentication', value: 'tab2'},
        {key: 'My Antiquity', value: 'tab3'}
      ];

    return(
        <View style={{ 
            position: 'relative', 
            top: -280,
          }}>
            <SegmentedControl label='' values={account} onChange={(value) => setRegister(value)}/>
                    {register === 'tab1'? <Register></Register> : ''}
                    {register === 'tab2'? <Authentication></Authentication> : ''}
                    {register === 'tab3'? <Antiquity></Antiquity> : ''}
                                  </View> 
    );
}