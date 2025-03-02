import { View, Text } from "react-native";
import {  Accordion, AccordionItem } from '@mustapha-ghlissi/react-native-accordion';
import { Link, router } from 'expo-router';
import {useRef} from "react";


export default function Care() {

    return(
        <View style={{flex: 1}}>
                <Accordion compact titleStyle={{
    fontSize: 16,
    fontWeight: 700,
}} contentContainerStyle={{
    paddingTop: 15,
    paddingBottom: 20,
    
}} itemContainerStyle={{
    padding: 20,
}}>
                                                  <AccordionItem
                                                      leftIcon="phone"
                                                      title="Contact Us"
                                                      subTitle="Send me a quote" rightIcon="whatsapp">
                                                        <Text style={{position: 'relative',
  left: 20,
  top: 10}}> WISDOMENIGMA INC </Text>
                                                        <Text style={{position: 'relative',
  left: 20,
  top: 10}}> (+92) 317 4287 461 </Text>
                                                  </AccordionItem>
                                                  <AccordionItem leftIcon="link" title="Social Connect" subTitle='Social Connect & store is more exclusive option for quote' rightIcon="instagram">
                                                      <Link style={{position: 'relative',
  left: 20,
  top: 10}} href={'https://www.instagram.com/wisdomenigma/'}> instagram@wisdomenigma </Link>
                                                      <Link style={{position: 'relative',
  left: 20,
  top: 10}} href={'https://www.facebook.com/wisdomenigma'}> facebook@wisdomenigma </Link>
                                                      <Link style={{position: 'relative',
  left: 20,
  top: 10}} href={'https://www.linkedin.com/company/wisdom-enigma/'}> linkedin@wisdomenigma </Link>
                                                      <Link style={{position: 'relative',
  left: 20,
  top: 10}} href={'https://wemerchandise-61a94.web.app/'}> url@wisdomenigma </Link>
                                                  </AccordionItem>
                                                  <AccordionItem leftIcon="chat"  title="Interview Request" subTitle='Interview / Discussions are good to learn about ' rightIcon='at'>
                                                        <Text style={{position: 'relative', left: 20,top: 10}}> wizdwarfs@gmail.com </Text>
                                                  </AccordionItem>
                        </Accordion>
                      </View>
    );
}


