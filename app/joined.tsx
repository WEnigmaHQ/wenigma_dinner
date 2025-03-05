import { useCallback, useState } from "react";
import { View, TextInput,Text, Platform } from "react-native";
import { PERMISSIONS, RESULTS } from "react-native-permissions";
import { Switch } from 'rn-inkpad';
import { supabase } from "./supabase";
import * as AddCalendarEvent from 'react-native-add-calendar-event';

export default function Joined() {

           
            //  Club openning
            const [ clubName, setClubName] = useState('');
            const [ clubCity, setClubCity] = useState('');
            const [ clubCountry, setClubCountry] = useState('');
            const [ clubPhone, setClubPhone] = useState('');
            const [ count, setCount] = useState(0);
            const [ confirmedInstaLink, setConfirmedInstaLink] = useState(false);
            const [ confirmedBitcoin, setConfirmedBitcoin] = useState(false);
            const [ confirmedDelgation, setConfirmedDelgation] = useState(false);

            const [eventName, setEventName] = useState('');
            const [eventDate, setEventDate] = useState('');
            const [eventId, setEventId] = useState("");
            const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


        //      // club creation
        //     const onHandle_create_club = async() => {
        
        //         const {data, error} = await supabase.from("Club").select('id, Club_name, Role');
        //         error?.message !== 'undefined' ? setErrorStatus(true) : setErrorStatus(false);
        //         data?.entries && data?.entries.length === 0 ? setCount(count+1): setCount((data?.entries?.length || 0) + 1);
            
        //         if (clubPhone.length >= 1 && clubPhone.length < 16 && clubName.length >=1 && clubName.length <= 32 && clubCity.length >=1 && clubCity.length <= 32 && clubCountry.length >=1 && clubCountry.length <= 32) {
              
        //             const {error} = await supabase.from("Club").insert({id: count, 
        //                     Club_name: clubName, City: clubCity, 
        //                     Country: clubCountry, Contact: clubPhone, 
        //                     Declaration: confirmedDelgation, Isbitcoin: confirmedBitcoin, Role: 'ADMIN' }).select(); 
        //             console.log("Error:", error); }
        //     };

        // const showDatePicker = () => {
        //     setDatePickerVisibility(true);
        // };
  
        // const hideDatePicker = () => {
        //     setDatePickerVisibility(false);
        // };
  
        // const handleConfirm = (date: any) => {
        //     console.warn("A date has been picked: ", date);
        //     setEventDate(date);
        //     hideDatePicker();
        // };
      
           

        //     const addToCalendar = useCallback(() => {
      
        //   const eventConfig: AddCalendarEvent.CreateOptions = {
        //       title:eventName !== '' ? eventName: '',
        //       startDate: eventDate,
        //       endDate: eventDate,
        //       notes: '',
        //       navigationBarIOS:{
        //         translucent:false,
        //         tintColor: "teal",
        //         barTintColor: "teal",
        //         backgroundColor: "white",
        //         titleColor: "darkslategrey",
        //       },
        //   };
      
        //   request(
        //       Platform.select({
        //           ios: PERMISSIONS.IOS.CALENDARS_WRITE_ONLY,
        //           default: PERMISSIONS.ANDROID.WRITE_CALENDAR,
        //       })).then((result: any)=>{
        //                   if (result !== RESULTS.GRANTED ) {throw new Error(`No permission , ${result}`)}
        //                               return AddCalendarEvent.presentEventCreatingDialog(eventConfig);
        //       }).then((eventInfo: any)=>{
      
        //             console.warn("json object ", JSON.stringify(eventInfo));
      
        //             if ("eventIdentifier" in eventInfo) {
        //               setEventId(eventInfo.eventIdentifier);
        //             }
        //       }).catch((error:string) =>{
        //           console.warn(`Error report", ${error}`);
        //       });
        //     }, [eventName]);  };
        

    return (
        
            <View style={{top: 50
            
              }}>
                 <Text style={{color: 'white', top: -20, fontSize: 18, marginLeft: 20}}> Club name * </Text>
                 <TextInput placeholder='club name' inputMode={'text'} value={clubName} onChangeText={setClubName} style={{top: -8, marginLeft: 30, color: 'white'}}></TextInput>
                 <Text style={{color: 'white', top: 0, fontSize: 18, marginLeft: 22}}> Club city * </Text>
                 <TextInput placeholder='club city' inputMode={'text'} value={clubCity} onChangeText={setClubCity} style={{top: 15, marginLeft: 30, color: 'white'}}></TextInput>
                 <Text style={{color: 'white', top: 25, fontSize: 18, marginLeft: 22}}> Club country * </Text>
                 <TextInput placeholder='club country' inputMode={'text'} value={clubCountry} onChangeText={setClubCountry} style={{top: 40, marginLeft: 30, color: 'white'}}></TextInput>
                  <View style={{top: 55, marginLeft: 10}}>
                  <Switch
                                backgrounColor="#DB504A"
                                border
                                borderColor="#DB504A"
                                fullWidth
                                isOn={confirmedInstaLink}
                                justifyContent="space-between"
                                onChange={setConfirmedInstaLink}
                                text="Club InstaLink url"
                                textStyle={{fontSize: 16,
                                    fontWeight: '600', color: 'white', marginLeft: 16}}
                                />
                  </View>
                    {confirmedInstaLink ? <View>
                            <Text style={{color: 'white', top: 80, marginLeft: 40, fontSize: 12}}> Phone number * </Text>
                            <TextInput placeholder='club number' style={{top: 110, marginLeft: 30, color: 'white'}} inputMode={'tel'} value={clubPhone} onChangeText={setClubPhone}></TextInput>
                  </View>: ''}
                  <View style={{top: 70, marginLeft: 20}}>
                    <Switch
                        backgrounColor="#DB504A"
                        border
                        borderColor="#DB504A"
                        fullWidth
                        isOn={confirmedBitcoin}
                        justifyContent="space-between"
                        onChange={setConfirmedBitcoin}
                        text="Have bitcoin keys"
                        textStyle={{fontSize: 16,
                            fontWeight: '600', color: 'white', marginLeft: 6}}
                        />   
                  </View>
                   <View style={{top: 90, marginLeft: 20}}>
                      <Switch
                        backgrounColor="#DB504A"
                        border
                        borderColor="#DB504A"
                        fullWidth
                        isOn={confirmedDelgation}
                        justifyContent="space-between"
                        onChange={setConfirmedDelgation}
                        text="Club Delegation signed"
                        textStyle={{fontSize: 16,
                            fontWeight: '600', color: 'white', marginLeft: 6}}
                        />
                   </View>
            </View>
    );
}
