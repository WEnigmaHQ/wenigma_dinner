import { View } from "react-native";
import { useState } from 'react';
import Joined from "./joined";
import { Appbar, MD2Colors } from "react-native-paper";
import { BottomTabNavigation, SegmentedControl } from "rn-inkpad";
import { router } from "expo-router";


export default function Clubs() {

         // Club form states
        const [tab, setTab ] = useState('tab1');
        const [ isJoined, setIsJoined ] = useState(false);
        const [ errorStatus, setErrorStatus ] = useState(false);
    
        const tabs = [
          {key: 'Create Club', value: 'tab1'},
          {key: 'Explore', value: 'tab2'},
          {key: 'Delegation Pact', value: 'tab3'},
          {key: 'Active Clubs', value: 'tab4'}
        ];


        const back = () => {router.replace('/')};
        

    return (
        <View style={{flex: 1,  position: 'relative',  top: 10}}>
          <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -20, left: 280}}></Appbar.BackAction>
          <BottomTabNavigation selectedIndex={0} highlightedIconColor='#FFF' values={[
                                  {icon: 'ribbon', text: 'Join', onPress:() => { setIsJoined(true);
                                  },}, 
                                  {icon: 'search-circle', text: 'Search'},
                                  {icon: 'rose', text: 'Events'},
                                  {icon: 'layers', text: 'Extras'}
          ]}></BottomTabNavigation>
          <View>
            {isJoined ? <View style={{top: -25}}>
                                <SegmentedControl label='' values={tabs} onChange={(value) => setTab(value)}/>
                                {tab === 'tab1'? <Joined></Joined> : ''}
                                {tab === 'tab2'? <View style={{ position: 'absolute', width: 320, top: 50}}> </View> : ''}
                                {tab === 'tab3'? <View style={{position: 'relative', top: -600}}> </View> : ''}
                        </View>: ''}
          </View>
        </View>
    );
}
