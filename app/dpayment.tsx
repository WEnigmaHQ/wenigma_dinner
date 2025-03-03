import { View, Text } from "react-native";
import { Card } from "rn-inkpad";


export default function DPayment() {
    return(
        <View style={{position: 'absolute', width: 300, top: 30}}>
                <Text style={{
  position: 'relative',
  left: 20,
  fontSize: 25
}}> Active Payment Method </Text>
                <Card
                    buttons={[
                        
                    ]}
                    description={
                        'Bitcoin release by satoshi or satoshi group in a paper under [A peer to peer electronic cash system] in 2009. This paper revoulatize many tycoons business & small firms. Perhaps, people widely adopt bitcoin in late 2015. Today many tycoons add bitcoin holdings in their portfilio because of store in value feature. Bitcoin 24/7 open market, store in value against inflation, limited supply. Venture capitalist David Sacks, who Trump tapped as his crypto and artificial intelligence czar, joined Trump in the Oval Office for the signing of the order. "The digital asset industry plays a crucial role in innovation and economic development in the United States, as well as our Nation’s international leadership" the order states.'
                    }
                    icon={'information-circle'}
                    title={'Bitcoin'}
                    theme={{
                        themeColor: '#DB504A',
                    }}
                    />
      </View>
    )
}