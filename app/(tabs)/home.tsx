import { useState } from 'react';
import { View, Text, StyleSheet, Platform} from 'react-native';
import { useEffect, useCallback, useRef } from 'react';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import { DrawerNavigation, Card, SegmentedControl, BottomTabNavigation, Switch} from 'rn-inkpad';
import BottomDrawer, { BottomDrawerMethods } from 'react-native-animated-bottom-drawer';
import { router } from 'expo-router';
import Modal  from 'react-native-modal';
import { MD2Colors, TextInput, Appbar} from 'react-native-paper';
import { supabase } from '../supabase';
import { toLocaleDateString } from "@fowusu/calendar-kit";
import { SafeAreaView } from 'react-native-safe-area-context';
import Care from '../care';
import DPayment from '../dpayment';
import Politics from '../politics';
import Estate from '../estate';
import Personality from '../personality';
import Business from '../business';
import Fashion from '../fashion';
import Food from '../food';
import Travel from '../travel';
import Sports from '../sports';
import Partners from '../partners';
import Membership from '../membership';









export default function Tab() {
  
  const [exclusiveDinnerInvitation, setExclusiveDinnerInvitation] = useState(false);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [ customerService, setCustomerService ] = useState(false);
  const [ paymentMethod, setPaymentMethod ] = useState(false);
  const [ politicsNews, setPoliticsNews ] = useState(false);
  const [ EstateNews, setEstateNews ] = useState(false);
  const [ PersonalityNews, setPersonalityNews ] = useState(false);
  const [ BusinessNews, setBusinessNews ] = useState(false);
  const [ FashionNews, setFashionNews ] = useState(false);
  const [ FoodNews, setFoodNews ] = useState(false);
  const [ TravelNews, setTravelNews ] = useState(false);
  const [ SportsNews, setSportslNews ] = useState(false);
  const [ partners, setPartners ] = useState(false);
  const [ clubs, setClubs ] = useState(false);
  const [ membership, setMembership] = useState(false);


  // customer Service
    
  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);



  //  Club openning
  const [ clubName, setClubName] = useState('');
  const [ clubCity, setClubCity] = useState('');
  const [ clubCountry, setClubCountry] = useState('');
  const [ clubPhone, setClubPhone] = useState('');
  const [ confirmedNumber, setConfirmedNumber] = useState(false);
  const [ confirmedBitcoin, setConfirmedBitcoin] = useState(false);
  const [ confirmedDelgation, setConfirmedDelgation] = useState(false);









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


  

  //  payment method

  const bottomBDrawerRef = useRef<BottomDrawerMethods>(null);

   
   
   // handle business news
   const bottomBusinessDrawerRef = useRef<BottomDrawerMethods>(null);



    const apiurl : string = 'a9b3560f6c9b4a648f622f03be8cc735';


    const API_POLITICAL_URL = `https://newsapi.org/v2/top-headlines?q=politics&apiKey=${apiurl}`;
    const API_ESTATE_URL = `https://newsapi.org/v2/top-headlines?q=realestate&apiKey=${apiurl}`;
    const API_AURA_URL = `https://newsapi.org/v2/top-headlines?q=charismatic+leadership+billion&apiKey=${apiurl}`;
    const API_BUSINESS_URL = `https://newsapi.org/v2/top-headlines?q=business&apiKey=${apiurl}`;
    const API_FASHION_URL = `https://newsapi.org/v2/top-headlines?q=luxury+brand+fashion+million&apiKey=${apiurl}`;
    const API_FOOD_URL = `https://newsapi.org/v2/top-headlines?q=best+international+foods+recipe&apiKey=${apiurl}`;
    const API_TRAVEL_URL = `https://newsapi.org/v2/top-headlines?q=best+international+places+experience&apiKey=${apiurl}`;
    const API_SPORTS_URL = `https://newsapi.org/v2/top-headlines?q=sports+match+fitness&apiKey=${apiurl}`;


  // handle partners 
   const bottomPartnersDrawerRef = useRef<BottomDrawerMethods>(null);
  
     // handle partners
    const [tab, setTab ] = useState('tab1');

    const tabs = [
      {key: 'Create Club', value: 'tab1'},
      {key: 'Join Club', value: 'tab2'},
      {key: 'About Club', value: 'tab3'},
    ];


    const [ isJoined, setIsJoined ] = useState(false);
    const [ errorStatus, setErrorStatus ] = useState(false);
    const [ count, setCount ] = useState(0);


    const onHandle_create_club = async() => {

      const {data, error} = await supabase.from("Club").select('id, Club_name, Role');
      error?.message !== 'undefined' ? setErrorStatus(true) : setErrorStatus(false);
      data?.entries && data?.entries.length === 0 ? setCount(count+1): setCount((data?.entries?.length || 0) + 1);
      
      if (clubPhone.length >= 1 && clubPhone.length < 16 && clubName.length >=1 && clubName.length <= 32 && clubCity.length >=1 && clubCity.length <= 32 && clubCountry.length >=1 && clubCountry.length <= 32) {
        
        const {error} = await supabase.from("Club").insert({id: count, 
                      Club_name: clubName, City: clubCity, 
                      Country: clubCountry, Contact: clubPhone, 
                      Declaration: confirmedDelgation, Isbitcoin: confirmedBitcoin, Role: 'ADMIN' }).select(); 
         console.log("Error:", error); }
    }
  

  

    const back = () => {router.replace('/')};
  
  return (
    <SafeAreaView>
      <View style={{flex: 1}}>
                <DrawerNavigation backgroundColor='white' items={[
                  {icon:'restaurant', text: 'Exclusive Dinners', onPress:() =>{} },
                  {icon: 'logo-bitcoin', text: 'Capital Clubs', onPress:() =>{ 
                    // bottomClubsDrawerRef.current?.open; 
                    setClubs(!clubs)}},
                  {
                    text: 'News',
                    icon: 'compass',
                    items: [
                      {
                        icon: 'earth',
                        text: 'Politics',
                        onPress:() =>{
                          // bottomPoliticsDrawerRef.current?.open; 
                          setPoliticsNews(!politicsNews);},
                      },
                      {
                        icon: 'construct',
                        text: 'Real Estate',
                        onPress:() =>{
                          // bottomEstateDrawerRef.current?.open; 
                          setEstateNews(!EstateNews);},
                      },
                      {
                        icon: 'man',
                        text: 'Aura',
                        onPress:() =>{
                          // bottomAuraDrawerRef.current?.open; 
                          setPersonalityNews(!PersonalityNews)}
                      },
                      {
                        icon: 'business',
                        text: 'Business & Legal',
                        onPress:() =>{bottomBusinessDrawerRef.current?.open; setBusinessNews(!BusinessNews)}
                      },
                      {
                        icon: 'bag-handle',
                        text: 'Fashion',
                        onPress:() =>{
                          // bottomFashionDrawerRef.current?.open; 
                          setFashionNews(!FashionNews)}
                      },
                      {
                        icon: 'fast-food',
                        text: 'Food',
                        onPress:() =>{
                          // bottomFoodDrawerRef.current?.open; 
                          setFoodNews(!FoodNews)}
                      },
                      {
                        icon: 'airplane',
                        text: 'Travel',
                        onPress:() =>{
                          // bottomTravelDrawerRef.current?.open; 
                          setTravelNews(!TravelNews)}
                      },
                      {
                        icon: 'golf',
                        text: 'Sports & Fitness',
                        onPress:() =>{
                          // bottomSportsDrawerRef.current?.open; 
                          setSportslNews(!SportsNews)}
                      },
                    ]
                  },
                  {icon: 'diamond', text: 'Partners', onPress:() =>{bottomPartnersDrawerRef.current?.open; setPartners(!partners);}},
                  {icon: 'wallet', text: 'Payment Method Description', onPress:() =>{
                      bottomBDrawerRef.current?.open;
                      setPaymentMethod(!paymentMethod);
                  }},
                  {icon: 'call', text: 'Customer Service', onPress:() =>{
                    bottomDrawerRef.current?.open;
                    setCustomerService(!customerService);
                  }},
                  {icon: 'person-circle', text: 'Register your Membership', onPress:() => {
                    setMembership(!membership);
                  },}
                ]}></DrawerNavigation>
                {customerService ? <BottomDrawer ref={bottomDrawerRef} openOnMount><Care></Care></BottomDrawer> : ''}
                {paymentMethod? <BottomDrawer ref={bottomBDrawerRef} openOnMount>
                     <DPayment></DPayment>
                    </BottomDrawer>: '' }
                {politicsNews? <Modal isVisible={politicsNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                                      <Politics apiurl={API_POLITICAL_URL}></Politics>
                              </Modal>: ''}
                {EstateNews? <Modal isVisible={EstateNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                                     <Estate apiurl={API_ESTATE_URL}></Estate>
                              </Modal>: ''}
                {PersonalityNews? <Modal isVisible={PersonalityNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                                      <Personality apiurl={API_AURA_URL}></Personality>
                              </Modal>: ''}
                {BusinessNews? <Modal isVisible={BusinessNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                                      <Business apiurl={API_BUSINESS_URL}></Business>
                              </Modal>: ''}
                {FashionNews? <Modal isVisible={FashionNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                                      <Fashion apiurl={API_FASHION_URL}></Fashion>
                              </Modal>: ''}
                {FoodNews? <Modal isVisible={FoodNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                                      <Food apiurl={API_FOOD_URL}></Food>
                              </Modal>: ''}
                {TravelNews? <Modal isVisible={TravelNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                                      <Travel apiurl={API_TRAVEL_URL}></Travel>
                              </Modal>: ''}
                {SportsNews? <Modal isVisible={SportsNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                                      <Sports apiurl={API_SPORTS_URL}></Sports>
                              </Modal>: ''}
                {partners? <BottomDrawer ref={bottomPartnersDrawerRef} openOnMount>
                      <Partners></Partners>
                    </BottomDrawer>: '' }
                {membership ? <Modal isVisible={membership} style={{backgroundColor: 'darkslategrey'}}>
                                  <Membership></Membership>
                              </Modal>: ''}
                {clubs? <Modal isVisible={clubs} style={{backgroundColor: 'darkslategrey'}}>
                          <View style={styles.backnav}>
                          <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: -20, left: 280}}></Appbar.BackAction>
                                <BottomTabNavigation selectedIndex={0} highlightedIconColor='#FFF' values={[
                                  {icon: 'ribbon', text: 'Join', onPress:() => { setIsJoined(true);
                                  },}, 
                                  {icon: 'search-circle', text: 'Search'},
                                  {icon: 'rose', text: 'Events'},
                                  {icon: 'layers', text: 'Extras'}
                                  ]}></BottomTabNavigation>
                          </View>
                          {isJoined ? <View style={styles.clubtabcontrol}>
                                            <SegmentedControl label='' values={tabs} onChange={(value) => setTab(value)}/>
                                            {tab === 'tab1'? <View style={styles.clubtabview}>
                                              <Text style={styles.clubformtextname}> Club name * </Text>
                                              <TextInput placeholder='club name' inputMode={'text'} value={clubName} onChangeText={setClubName} style={{top: 2}}></TextInput>
                                              <Text style={styles.clubformtextcity}> Club city * </Text>
                                              <TextInput placeholder='club city' inputMode={'text'} value={clubCity} onChangeText={setClubCity} style={{top: 5}}></TextInput>
                                              <Text style={styles.clubformtextcity}> Club country * </Text>
                                              <TextInput placeholder='club country' inputMode={'text'} value={clubCountry} onChangeText={setClubCountry} style={{top: 6}}></TextInput>
                                              <View style={{top: 10}}>
                                                <Switch text='Club contact number' isOn={confirmedNumber} onChange={setConfirmedNumber} backgrounColor='red' fullWidth justifyContent='space-between' borderColor='white' border textStyle={styles.clubswitchtextfield}></Switch>
                                              </View>
                                              {confirmedNumber ? <View>
                                                <Text style={styles.clubformtextnumber}> Phone number * </Text>
                                                <TextInput placeholder='club number' style={{top: 18}} inputMode={'tel'} value={clubPhone} onChangeText={setClubPhone}></TextInput>
                                              </View>: ''}
                                              <View style={{top: 25}}>
                                                <Switch text='Club bitcoin address' isOn={confirmedBitcoin} onChange={setConfirmedBitcoin} backgrounColor='red' fullWidth justifyContent='space-between' borderColor='white' border textStyle={styles.clubswitchtextfield}></Switch>
                                              </View>
                                              <View style={{top: 50}}>
                                                <Switch text='Club Declaration signed' backgrounColor='red' isOn={confirmedDelgation} onChange={setConfirmedDelgation} fullWidth justifyContent='space-between' borderColor='white' border textStyle={styles.clubswitchtextfield}></Switch>
                                              {confirmedDelgation && confirmedBitcoin? <View style={{top: -300}}>
                                                <Card
                                                        buttons={[
                                                          {text: 'Submit', onPress: () => {
                                                            onHandle_create_club();
                                                          },},
                                                          {text: 'Cancel'}
                                                        ]}
                                                        description={
                                                          'Following Delegation should be applied :- \n1. Club members should attend prenium clubs events & dinners.\n 2. Each members should have membership.\n 3. Each members should use club conversation.\n 4. Club members should pay for service according to their role.\n 5. In case member will not pay his/her member fees account will be disable for 6-90 days. '
                                                        }
                                                        icon={'mail-unread'}
                                                        title={'Delegation Letter'}
                                                        theme={{
                                                          themeColor: '#DB504A',
                                                        }}
                                                      />
                                              </View> : ''}
                                              </View>
                                            </View>: ''}
                                            {tab === 'tab2'? <View style={styles.clubtabview}> </View>: ''}
                                            {tab === 'tab3'? <View style={styles.clubtabcontrol}> </View>: ''}
                                      </View> : ''}
                        </Modal>: ''}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black'
  },
style: {
  padding: 10,
},

backnav:{
  flex: 1, 
  position: 'relative', 
  top: 10,
},
clubtabcontrol:{
  position: 'relative', 
  top: -600
},
clubtabview:{
  position: 'absolute', 
  width: 320, 
  top: 50
},
clubformtextname: {
  color: 'white', 
  top: -5
},
clubformtextcity: {
  color: 'white', 
  top: 3
},
clubformtextnumber: {
  color: 'white', 
  top: 13
},
clubswitchtextfield:{
  top: 3,
  color: 'white'
},
});
