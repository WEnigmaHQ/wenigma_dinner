import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { IconButton, MD2Colors, MD3Colors, TextInput } from 'react-native-paper';
import { useEffect, useCallback, useRef } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {DrawerNavigation} from 'rn-inkpad';
import BottomDrawer, {BottomDrawerMethods} from 'react-native-animated-bottom-drawer';
import {Accordion, AccordionItem} from '@mustapha-ghlissi/react-native-accordion';
import { Link } from 'expo-router';





export default function Tab() {
  
  const [exclusiveDinnerInvitation, setExclusiveDinnerInvitation] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const [customerService, setCustomerService] = useState(false);

  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventId, setEventId] = useState("");

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date: any) => {
    console.warn("A date has been picked: ", date);
    setEventDate(date);
    hideDatePicker();
  };
  



  // popover add event 
  const [plusExclusiveDinner, setPlusExclusiveDinner] = useState(false);


  useEffect(() => {
      setTimeout(() => setPlusExclusiveDinner(false), 2000);
    }, []);

  const addToCalendar = useCallback(() => {

    const eventConfig: AddCalendarEvent.CreateOptions = {
        title:eventName !== '' ? eventName: '',
        startDate: eventDate,
        endDate: eventDate,
        notes: '',
        navigationBarIOS:{
          translucent:false,
          tintColor: "teal",
          barTintColor: "teal",
          backgroundColor: "white",
          titleColor: "darkslategrey",
        },
  };

  request(
    Platform.select({
      ios: PERMISSIONS.IOS.CALENDARS_WRITE_ONLY,
      default: PERMISSIONS.ANDROID.WRITE_CALENDAR,
    })
        ).then((result)=>{
      if (result !== RESULTS.GRANTED ) {throw new Error(`No permission , ${result}`)}
      return AddCalendarEvent.presentEventCreatingDialog(eventConfig);
        }).then((eventInfo)=>{

              console.warn("json object ", JSON.stringify(eventInfo));

              if ("eventIdentifier" in eventInfo) {
                setEventId(eventInfo.eventIdentifier);
              }
        }).catch((error:string) =>{
            console.warn(`Error report", ${error}`);
        });
  }, [eventName]);  

  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);

  
  return (

    <View style={{flex: 1}}>
      <DrawerNavigation backgroundColor='white' items={[
        {icon:'restaurant', text: 'Exclusive Dinners', onPress:() =>{} },
        {icon: 'logo-bitcoin', text: 'Capital Clubs', onPress:() =>{}},
        {
          text: 'News',
          icon: 'compass',
          items: [
            {
              icon: 'earth',
              text: 'Politics',
              onPress:() =>{},
            },
            {
              icon: 'construct',
              text: 'Real Estate',
              onPress:() =>{},
            },
            {
              icon: 'man',
              text: 'Aura',
              onPress:() =>{}
            },
            {
              icon: 'business',
              text: 'Business & Legal',
              onPress:() =>{}
            },
            {
              icon: 'bag-handle',
              text: 'Fashion',
              onPress:() =>{}
            },
            {
              icon: 'fast-food',
              text: 'Food',
              onPress:() =>{}
            },
            {
              icon: 'airplane',
              text: 'Travel',
              onPress:() =>{}
            },
            {
              icon: 'golf',
              text: 'Sports & Fitness',
              onPress:() =>{}
            },
          ]
        },
        {icon: 'diamond', text: 'Partners', onPress:() =>{}},
        {icon: 'medal', text: 'Rewards', onPress:() =>{}},
        {icon: 'wallet', text: 'Payment Method', onPress:() =>{}},
        {icon: 'call', text: 'Customer Service', onPress:() =>{
          bottomDrawerRef.current?.open;
          setCustomerService(!customerService);
        }},
      ]}></DrawerNavigation>
      {customerService ? <BottomDrawer ref={bottomDrawerRef} openOnMount>
            <View style={{flex: 1}}>
              {Platform.OS === 'ios' || Platform.OS === 'android' ? <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                        <AccordionItem
                                            leftIcon="phone"
                                            title="Contact Us"
                                            subTitle="Send me a quote" rightIcon="whatsapp">
                                              <Text style={styles.contactbusinessname}> WISDOMENIGMA INC </Text>
                                              <Text style={styles.contactnumber}> (+92) 317 4287 461 </Text>
                                        </AccordionItem>
                                        <AccordionItem leftIcon="link" title="Social Connect" subTitle='Social Connect & store is more exclusive option for quote' rightIcon="instagram">
                                            <Link style={styles.contactnumber} href={'https://www.instagram.com/wisdomenigma/'}> instagram@wisdomenigma </Link>
                                            <Link style={styles.contactnumber} href={'https://www.facebook.com/wisdomenigma'}> facebook@wisdomenigma </Link>
                                            <Link style={styles.contactnumber} href={'https://www.linkedin.com/company/wisdom-enigma/'}> linkedin@wisdomenigma </Link>
                                            <Link style={styles.contactnumber} href={'https://wemerchandise-61a94.web.app/'}> url@wisdomenigma </Link>
                                        </AccordionItem>
                                        <AccordionItem leftIcon="chat"  title="Interview Request" subTitle='Interview / Discussions are good to learn about ' rightIcon='at'>
                                              <Text style={styles.contactnumber}> wizdwarfs@gmail.com </Text>
                                        </AccordionItem>
                                    </Accordion>: ''}
            </View>
          </BottomDrawer>: ''}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
  contentContainerStyle: {
    paddingTop: 15,
    paddingBottom: 20,
    
},
titleStyle: {
    fontSize: 16,
    fontWeight: 700,
},
itemcontainer:{
  padding: 20,
},
contactbusinessname: {
  position: 'relative',
  left: 20
},
contactnumber: {
  position: 'relative',
  left: 20,
  top: 10

},
});
