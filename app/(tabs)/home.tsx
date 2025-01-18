import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import ReactNativeModal from 'react-native-modal';
import { IconButton, MD2Colors, MD3Colors, TextInput } from 'react-native-paper';
import { useEffect, useCallback } from 'react';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';


export default function Tab() {
  
  const [exclusiveDinnerInvitation, setExclusiveDinnerInvitation] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

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
  
  return (
    <View style={styles.container}>
      <IconButton icon={'calendar-clock'} iconColor={MD2Colors.amber300} style={{position: 'relative', top: -100, left: -300}} onPress={() => {
        setExclusiveDinnerInvitation(true);
      }}></IconButton>
      {exclusiveDinnerInvitation ? <View style={{flex: 1}}>
          <ReactNativeModal isVisible={exclusiveDinnerInvitation} animationInTiming={1000} animationIn={'lightSpeedIn'} animationOut={'lightSpeedIn'}>
            <View>
              <IconButton icon={'close'} iconColor={MD3Colors.primary90} style={{position: 'relative', top: -100, left: 700}} onPress={() => {setExclusiveDinnerInvitation(false)}}></IconButton>
              <Text style={{position: 'relative', top: -150, fontSize: 25, color: 'gold', left: 200}}> Exclusive Events </Text>
              <IconButton icon={'plus'} iconColor={MD2Colors.green500} style={{position: 'relative', top: -150, left: 400}} onPress={() => {setPlusExclusiveDinner(true)}}></IconButton>
              <ReactNativeModal isVisible={plusExclusiveDinner}>
                <View style={{position: 'relative', justifyContent: 'space-evenly'}}>
                  <Text style={{color: 'white', flex: 1, position: 'relative', top: -100, left: 100}}> Event Name: </Text>
                  <TextInput placeholder='event name' value={eventName} onChangeText={setEventName} inputMode={'text'} style={{width: 300, position: 'relative', top: -80, left: 200}}></TextInput>
                  <Text style={{color: 'white', flex: 1, position: 'relative', top: -70, left: 100}}> Event Date: </Text>
                  { Platform.OS === 'android' || Platform.OS === 'ios'? <View>
                    <IconButton icon={'calendar-clock'} iconColor={MD2Colors.blue400} onPress={showDatePicker} style={{position: 'relative', top: -50, left: 200}}></IconButton>
                    <DateTimePickerModal isVisible={isDatePickerVisible} mode="date" onConfirm={handleConfirm} onCancel={hideDatePicker}/>
                  </View>: <TextInput placeholder='date add here' value={eventDate} onChangeText={setEventDate} inputMode={'text'} style={{width: 300, position: 'relative', left: 200}}></TextInput>}
                  {Platform.OS === 'android' || Platform.OS === 'ios' ? <View>
                      <IconButton icon={'calendar-lock'} style={{position: 'relative', top: -40, left: 100}} iconColor={MD2Colors.yellow500} onPress={addToCalendar}></IconButton>
                  </View>: ''}
                </View>
              </ReactNativeModal>
              
              {/* 
              <IconButton icon={'delete'} iconColor={MD2Colors.red500} style={{position: 'relative', top: -200, left: 500}} onPress={() => {}}></IconButton>
              <IconButton icon={'database-search'} iconColor={MD2Colors.yellow500} style={{position: 'relative', top: -250, left: 600}} onPress={() => {}}></IconButton> */}

            </View>
          </ReactNativeModal>
        </View> : ''}
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
});
