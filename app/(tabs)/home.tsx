import { useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Linking, Share } from 'react-native';
import { useEffect, useCallback, useRef } from 'react';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import { PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import { DrawerNavigation, Card, SegmentedControl, BottomTabNavigation, Switch, Toast} from 'rn-inkpad';
import BottomDrawer, { BottomDrawerMethods } from 'react-native-animated-bottom-drawer';
import {  Accordion, AccordionItem } from '@mustapha-ghlissi/react-native-accordion';
import { PageScrollView } from 'pagescrollview'
import { Link } from 'expo-router';
import Modal  from 'react-native-modal';
import axios from 'react-native-axios';
import { IconButton, MD2Colors, TextInput } from 'react-native-paper';
import { supabase } from './supabase';








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
  const [ value, setValue ] = useState('active');
  const [ clubs, setClubs ] = useState(false);
  const [ membership, setMembership] = useState(false);


  // Register account

  const [ email, setEmail ] = useState('');
  const [ appError, setAppError ] = useState('Connection refused');
  const [ incogEmail, setIncogEmail ] = useState('');
  const [ isBitcoin, setIsBitcoin ] = useState(false);
  const [ isDelegation, setIsDelegation ] = useState(false);
  const [ isMagicLink, setIsMagicLink ] = useState(false);
  const [ isSocialLink, setIsSocialLink ] = useState(false);
  const [ toastVisible, setToastVisible ] = useState(false);
  const [ toastAuthVisible, setToastAuthVisible ] = useState(false);
  const [ phone, setPhone ] = useState('');
  const [ token, setToken ] = useState('');
  const [ isOTP, setIsOTP ] = useState(false);
  const [ isSession, setIsSession] = useState(false);




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


  // customer Service

  const bottomDrawerRef = useRef<BottomDrawerMethods>(null);

  //  payment method

  const bottomBDrawerRef = useRef<BottomDrawerMethods>(null);

  const [politicalArticles, setPoliticalArticles] = useState([]);

    // handle estate news

  const [EstateArticles, setEsatteArticles] = useState([]);

   // handle aura news

   const [AuraArticles, setAuraArticles] = useState([]);
   
   
   // handle business news
   const bottomBusinessDrawerRef = useRef<BottomDrawerMethods>(null);

   const [businessArticles, setBusinessArticles] = useState([]);

   // handle fashion news

   const [fashionArticles, setFashionArticles] = useState([]);

   // handle food news

   const [foodArticles, setFoodArticles] = useState([]);

   // handle travel news

   const [travelArticles, setTravelArticles] = useState([]);

   // handle travel news

   const [SportsArticles, setSportsArticles] = useState([]);



  const API_KEY = 'a9b3560f6c9b4a648f622f03be8cc735'; // Replace with your News API key
  const API_POLITICAL_URL = `https://newsapi.org/v2/everything?q=politics&apiKey=${API_KEY}`;
  const API_ESTATE_URL = `https://newsapi.org/v2/everything?q=realestate&apiKey=${API_KEY}`;
  const API_AURA_URL = `https://newsapi.org/v2/everything?q=charismatic+leadership+billion&apiKey=${API_KEY}`;
  const API_BUSINESS_URL = `https://newsapi.org/v2/everything?q=business&apiKey=${API_KEY}`;
  const API_FASHION_URL = `https://newsapi.org/v2/everything?q=luxury+brand+fashion+million&apiKey=${API_KEY}`;
  const API_FOOD_URL = `https://newsapi.org/v2/everything?q=best+international+foods+recipe&apiKey=${API_KEY}`;
  const API_TRAVEL_URL = `https://newsapi.org/v2/everything?q=best+international+places+experience&apiKey=${API_KEY}`;
  const API_SPORTS_URL = `https://newsapi.org/v2/everything?q=sports+match+fitness&apiKey=${API_KEY}`;


  useEffect(() => {
    
    const fetchPolticalNews = async () => {

        try {
          const response = await axios.get(API_POLITICAL_URL);
          setPoliticalArticles(response.data.articles);
        } catch (error) {
          console.error(error);
        }
    };

    const fetchEstateNews = async () => {

      try {
        const response = await axios.get(API_ESTATE_URL);
        setEsatteArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchAuraNews = async () => {

      try {
        const response = await axios.get(API_AURA_URL);
        setAuraArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchBusinessNews = async () => {

      try {
        const response = await axios.get(API_BUSINESS_URL);
        setBusinessArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFashionNews = async () => {

      try {
        const response = await axios.get(API_FASHION_URL);
        setFashionArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchFoodNews = async () => {

      try {
        const response = await axios.get(API_FOOD_URL);
        setFoodArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchTravelNews = async () => {

      try {
        const response = await axios.get(API_TRAVEL_URL);
        setTravelArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchSportsNews = async () => {

      try {
        const response = await axios.get(API_SPORTS_URL);
        setSportsArticles(response.data.articles);
      } catch (error) {
        console.error(error);
      }
    };


    fetchPolticalNews();
    fetchEstateNews();
    fetchAuraNews();
    fetchBusinessNews();
    fetchFashionNews();
    fetchFoodNews();
    fetchTravelNews();
    fetchSportsNews();

  }, []);

  const shareArticle = async (title: string, url:any) => {
    try {
      await Share.share({
        message: `${title}\n${url}`,
      });
    } catch (error) {
      console.error(error.message);
    }
  };

  // handle partners 
   const bottomPartnersDrawerRef = useRef<BottomDrawerMethods>(null);


  // bottom drawer for incogito mode.

  const bottomIncogsDrawerRef = useRef<BottomDrawerMethods>(null);
  
  //  [active or open]
  const values = [
    {key: 'Active', value: 'tab1'},
    {key: 'Open', value: 'tab2'},
  ];


    // handle clubs
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

    const [register, setRegister] = useState('tab1');
    const account = [
      {key: 'Register Membership', value: 'tab1'},
      {key: 'Authentication', value: 'tab2'},
      {key: 'My Antiquity', value: 'tab3'}
    ];


    const create_session = async () =>{

      const sessionData = await supabase.auth.getSession();
      return sessionData.data.session;
    };

    const verification = async () =>{
          
      if (!email ||email.length <= 0){
            console.error('Error email should be null or empty ');
            return;
      }

      console.log("Your Email :", email);

      console.log('Token:', token);

      const {data, error} = await supabase.auth.verifyOtp({email, token, type: 'email'})
          
          if (error){
            
                console.error('Error verification in with OTP:',error.message);
            return;
          }
              
          const {data: {user}} = await supabase.auth.getUser();

          if (error){
                  console.error('Error user is not authenicate ', error);
                  return;
          }

          setToastAuthVisible(true);

          console.log('User successfully', user?.id)
          const session = await create_session();

              if (session) {
                      console.log('Session created successfully:', session.user.email); 
                      setIsSession(true);
              } else {
                      console.error('No session found after OTP verification.');
                      return;
              }
    };

    const onHandle_EmailOTP = async() =>{

      const {data, error} = await supabase.auth.signInWithOtp(
        { email: email, options: { shouldCreateUser: true, },});
        
      console.log('sign in with OTP:', data);
        
      if (error !== null){
        console.error('Error signing in with OTP:', error.message);
        setIsOTP(false);
        return;
      }

      setIsOTP(true);

      setToastVisible(true);

    };

    const onHandle_sceret = async () => {

      const {data, error} = await supabase.auth.signInAnonymously();
      console.log("user ID : ", data.session?.user.id);


      if (error){
        console.error('Error in sign as anonymous user', error.message);
        return;
      }


      if (data.session?.user.id !== ''){ 

        if (!incogEmail){
            console.error('Error email is null ', incogEmail);
            return;
        }


        try{
        
                const {data:{user: userCheck}, error} = (await supabase.auth.getUser());

                if (!userCheck && error){
                    console.error('Error user cannot exist', error.message);
                    setAppError(error.message);
                    return;
                }

                const {data: {user}} = await supabase.auth.updateUser ({email: incogEmail});

                if (error){
                  console.error('Error email cannot linked', error.message);
                  setAppError(error.message);
                  return;
                }

                console.log('Wonderful user email linked', user);
                const session = create_session();
                setAppError('Email Linked'); 

            if (session) {
              console.log('Session created successfully:', session); 
            } else {
                  console.error('No session found for anonymous user.. ');
                  setAppError('No session ');
                  return;
            }

          }catch(error){
             console.log('error', error);
          }
    }
      else{ setAppError('Email already register'); }

    };

    const onHandle_phone_authentication = async() => {

      const {data: {user}, error} = await supabase.auth.getUser();

      if (error){
        console.error('Error while retrieve ', error.message);
        return;
      }

      console.log('User successfully :', user?.id);

      if (phone.length <= 0){
        console.error("Phone number should not be empty", phone)
        return;
      }

      console.log('Your phone number : ', phone);

      {
          const {data: {user: userUpdate}, error} = await supabase.auth.updateUser({
              phone:  phone
          });

          if (error){
            console.error('Error while update user credentials', error.message);
            return;
          }

          console.log(" Your phone = ", userUpdate); 
    }


    };
  
  return (
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
              onPress:() =>{bottomPoliticsDrawerRef.current?.open; setPoliticsNews(!politicsNews);},
            },
            {
              icon: 'construct',
              text: 'Real Estate',
              onPress:() =>{bottomEstateDrawerRef.current?.open; setEstateNews(!EstateNews);},
            },
            {
              icon: 'man',
              text: 'Aura',
              onPress:() =>{bottomAuraDrawerRef.current?.open; setPersonalityNews(!PersonalityNews)}
            },
            {
              icon: 'business',
              text: 'Business & Legal',
              onPress:() =>{bottomBusinessDrawerRef.current?.open; setBusinessNews(!BusinessNews)}
            },
            {
              icon: 'bag-handle',
              text: 'Fashion',
              onPress:() =>{bottomFashionDrawerRef.current?.open; setFashionNews(!FashionNews)}
            },
            {
              icon: 'fast-food',
              text: 'Food',
              onPress:() =>{bottomFoodDrawerRef.current?.open; setFoodNews(!FoodNews)}
            },
            {
              icon: 'airplane',
              text: 'Travel',
              onPress:() =>{bottomTravelDrawerRef.current?.open; setTravelNews(!TravelNews)}
            },
            {
              icon: 'golf',
              text: 'Sports & Fitness',
              onPress:() =>{bottomSportsDrawerRef.current?.open; setSportslNews(!SportsNews)}
            },
          ]
        },
        {icon: 'diamond', text: 'Partners', onPress:() =>{bottomPartnersDrawerRef.current?.open; setPartners(!partners);}},
        {icon: 'wallet', text: 'Payment Method', onPress:() =>{
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
      {paymentMethod? <BottomDrawer ref={bottomBDrawerRef} openOnMount>
            <View style={{position: 'absolute', width: 300, top: 30}}>
               <Text style={styles.paymentheader}> Active Payment Method </Text>
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
          </BottomDrawer>: '' }
      {politicsNews? <Modal isVisible={politicsNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                            <View style={{flex: 1, width: 300}}>
                            <Link href={'/'} style={styles.backlink}> &#10226; </Link>
                             <PageScrollView backgroundColor='#ebf3f3' style={styles.style}>
                                    <FlatList data={politicalArticles} renderItem={({item}) =>
                                        <Card
                                                      buttons={[
                                                        {text: 'Read', onPress: () => {Linking.openURL(item.url)}},
                                                        {text: 'Share', onPress: () => {shareArticle(item.title, item.url)}},
                                                        // {text: 'Thoughts', onPress: () => {}},
                                                      ]}
                                                      description={
                                                        item.description
                                                      }
                                                      icon={'newspaper'}
                                                      title={item.title}
                                                      theme={{
                                                        themeColor: '#DB504A',
                                                      }}
                              />                  
                                  } keyExtractor={(item) => item.url}>
                                       
                                    </FlatList>
                             </PageScrollView>
                            </View> 
                     </Modal>: ''}
      {EstateNews? <Modal isVisible={EstateNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                            <View style={{flex: 1, width: 300}}>
                              <Link href={'/'} style={styles.backlink}> &#10226; Return </Link>
                             <PageScrollView backgroundColor='#ebf3f3' style={styles.style}>
                              <FlatList data={EstateArticles} renderItem={({item}) =>
                                        <Card
                                                      buttons={[
                                                        {text: 'Read', onPress: () => {Linking.openURL(item.url)}},
                                                        {text: 'Share', onPress: () => {shareArticle(item.title, item.url)}},
                                                      ]}
                                                      description={
                                                        item.description
                                                      }
                                                      icon={'newspaper'}
                                                      title={item.title}
                                                      theme={{
                                                        themeColor: '#50C878',
                                                      }}
                              />                  
                                  } keyExtractor={(item) => item.url}>
                                    
                                  </FlatList>
                             </PageScrollView>
                            </View> 
                     </Modal>: ''}
      {PersonalityNews? <Modal isVisible={PersonalityNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                            <View style={{flex: 1, width: 300}}>
                              <Link href={'/'} style={styles.backlink}> &#10226; Return </Link>
                             <PageScrollView backgroundColor='#ebf3f3' style={styles.style}>
                              <FlatList data={AuraArticles} renderItem={({item}) =>
                                        <Card
                                                      buttons={[
                                                        {text: 'Read', onPress: () => {Linking.openURL(item.url)}},
                                                        {text: 'Share', onPress: () => {shareArticle(item.title, item.url)}},
                                                      ]}
                                                      description={
                                                        item.description
                                                      }
                                                      icon={'newspaper'}
                                                      title={item.title}
                                                      theme={{
                                                        themeColor: '#7DF9FF',
                                                      }}
                              />                  
                                  } keyExtractor={(item) => item.url}>
                                    
                                  </FlatList>
                             </PageScrollView>
                            </View> 
                     </Modal>: ''}
      {BusinessNews? <Modal isVisible={BusinessNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                            <View style={{flex: 1, width: 300}}>
                              <Link href={'/'} style={styles.backlink}> &#10226; Return </Link>
                             <PageScrollView backgroundColor='#ebf3f3' style={styles.style}>
                              <FlatList data={businessArticles} renderItem={({item}) =>
                                        <Card
                                                      buttons={[
                                                        {text: 'Read', onPress: () => {Linking.openURL(item.url)}},
                                                        {text: 'Share', onPress: () => {shareArticle(item.title, item.url)}},
                                                      ]}
                                                      description={
                                                        item.description
                                                      }
                                                      icon={'newspaper'}
                                                      title={item.title}
                                                      theme={{
                                                        themeColor: '#40826D',
                                                      }}
                              />                  
                                  } keyExtractor={(item) => item.url}>
                                    
                                  </FlatList>
                             </PageScrollView>
                            </View> 
                     </Modal>: ''}
      {FashionNews? <Modal isVisible={FashionNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                            <View style={{flex: 1, width: 300}}>
                              <Link href={'/'} style={styles.backlink}> &#10226; Return </Link>
                             <PageScrollView backgroundColor='#ebf3f3' style={styles.style}>
                              <FlatList data={fashionArticles} renderItem={({item}) =>
                                        <Card
                                                      buttons={[
                                                        {text: 'Read', onPress: () => {Linking.openURL(item.url)}},
                                                        {text: 'Share', onPress: () => {shareArticle(item.title, item.url)}},
                                                      ]}
                                                      description={
                                                        item.description
                                                      }
                                                      icon={'newspaper'}
                                                      title={item.title}
                                                      theme={{
                                                        themeColor: '#C4B454',
                                                      }}
                              />                  
                                  } keyExtractor={(item) => item.url}>
                                    
                                  </FlatList>
                             </PageScrollView>
                            </View> 
                     </Modal>: ''}
      {FoodNews? <Modal isVisible={FoodNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                            <View style={{flex: 1, width: 300}}>
                              <Link href={'/'} style={styles.backlink}> &#10226; Return </Link>
                             <PageScrollView backgroundColor='#ebf3f3' style={styles.style}>
                              <FlatList data={foodArticles} renderItem={({item}) =>
                                        <Card
                                                      buttons={[
                                                        {text: 'Read', onPress: () => {Linking.openURL(item.url)}},
                                                        {text: 'Share', onPress: () => {shareArticle(item.title, item.url)}},
                                                      ]}
                                                      description={
                                                        item.description
                                                      }
                                                      icon={'newspaper'}
                                                      title={item.title}
                                                      theme={{
                                                        themeColor: '#009E60',
                                                      }}
                              />                  
                                  } keyExtractor={(item) => item.url}>
                                    
                                  </FlatList>
                             </PageScrollView>
                            </View> 
                     </Modal>: ''}
      {TravelNews? <Modal isVisible={TravelNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                            <View style={{flex: 1, width: 300}}>
                              <Link href={'/'} style={styles.backlink}> &#10226; Return </Link>
                             <PageScrollView backgroundColor='#ebf3f3' style={styles.style}>
                              <FlatList data={travelArticles} renderItem={({item}) =>
                                        <Card
                                                      buttons={[
                                                        {text: 'Read', onPress: () => {Linking.openURL(item.url)}},
                                                        {text: 'Share', onPress: () => {shareArticle(item.title, item.url)}},
                                                      ]}
                                                      description={
                                                        item.description
                                                      }
                                                      icon={'newspaper'}
                                                      title={item.title}
                                                      theme={{
                                                        themeColor: '#880808',
                                                      }}
                              />                  
                                  } keyExtractor={(item) => item.url}>
                                    
                                  </FlatList>
                             </PageScrollView>
                            </View> 
                     </Modal>: ''}
      {SportsNews? <Modal isVisible={SportsNews} animationOutTiming={1000} animationIn={'lightSpeedIn'}>
                            <View style={{flex: 1, width: 300}}>
                              <Link href={'/'} style={styles.backlink}> &#10226; Return </Link>
                             <PageScrollView backgroundColor='#ebf3f3' style={styles.style}>
                              <FlatList data={SportsArticles} renderItem={({item}) =>
                                        <Card
                                                      buttons={[
                                                        {text: 'Read', onPress: () => {Linking.openURL(item.url)}},
                                                        {text: 'Share', onPress: () => {shareArticle(item.title, item.url)}},
                                                      ]}
                                                      description={
                                                        item.description
                                                      }
                                                      icon={'newspaper'}
                                                      title={item.title}
                                                      theme={{
                                                        themeColor: '#630330',
                                                      }}
                              />                  
                                  } keyExtractor={(item) => item.url}>
                                    
                                  </FlatList>
                             </PageScrollView>
                            </View> 
                     </Modal>: ''}
      {partners? <BottomDrawer ref={bottomPartnersDrawerRef} openOnMount>
            <View style={{position: 'absolute', width: 300, top: 30}}>
               <SegmentedControl label="" values={values} onChange={value => setValue(value)} style={{position: 'relative', left: 30}}
                />
                 {value !== 'tab2' && (<View style={{flex: 1}}>
                  <Text style={styles.damacbrand}> DAMAC </Text>
                  <Text style={styles.oceanhousebrand}> Ocean House </Text>
                  <Text style={styles.imibrand}> IMI-LUXURY-EXCELSIOR </Text>
                  <Text style={styles.rbrand}> RAS-AL-KHAMAH </Text>
                  </View>)}
                  {value !== 'tab1' && (<View style={{flex: 1}}>
                  <Text style={styles.damacbrand}> Nine Elm Versace </Text>
                  <Text style={styles.oceanhousebrand}> JACBO & CO Inc </Text>
                  <Text style={styles.imibrand}> Trump International  </Text>
                  <Text style={styles.rbrand}> BINGATTI </Text>
                  <Text style={styles.gbrand}> GRANT CARDONE </Text>
                  </View>)}
            </View>
          </BottomDrawer>: '' }
      {membership ? <Modal isVisible={membership} style={{backgroundColor: 'darkslategrey'}}>
                        <View style={styles.backnav}>
                          <SegmentedControl label='' values={account} onChange={(value) => setRegister(value)}/>
                          {register === 'tab1'? <View style={styles.clubtabview}>
                            <View style={{top: -25}}>
                                      <Switch text='Magic Link' isOn={isMagicLink} onChange={setIsMagicLink} backgrounColor='green' fullWidth justifyContent='space-between' borderColor='white' border textStyle={styles.clubswitchtextfield}></Switch>
                            </View>
                            { isMagicLink ? (<View>
                              <Text style={styles.clubformtextname} > Email Address * </Text>
                              <TextInput placeholder='Email' mode='flat' value={email} onChangeText={setEmail} inputMode={'email'} style={{top: 2}}></TextInput>
                            </View>
                            ) :''}
                            <View style={{top: 10}}>
                                      <Switch text='Incognito mode' isOn={isSocialLink} onChange={setIsSocialLink} backgrounColor='green' fullWidth justifyContent='space-between' borderColor='white' border textStyle={styles.clubswitchtextfield}></Switch>
                                      { isSocialLink ? <View>
                                        <Text style={styles.annymoustextlabel} > Email Address * </Text>
                                        <TextInput placeholder='Email' mode='flat' value={incogEmail} onChangeText={setIncogEmail} inputMode={'email'} style={{top: 60}}></TextInput>
                                      <IconButton icon={'cellphone-link'} iconColor={MD2Colors.grey500} style={styles.annymoustextbutton} onPress={onHandle_sceret}></IconButton>  
                                      { isBitcoin ? <BottomDrawer ref={bottomIncogsDrawerRef} openOnMount>
                                        <View>
                                            {appError.includes('Email Linked') ? <View>
                                              <IconButton icon={'incognito-circle'} iconColor={MD2Colors.green500} size={80} style={styles.incogmodestatusicon}></IconButton>
                                              <Text style={styles.incogmodestatustext}> `{appError} complete` </Text>
                                              <Text style={styles.incogmodestatustext2}> Incognito Shopping Mode  </Text>
                                              <Text style={styles.incogmodestatustext2}> Secure & Borderless transacton  </Text>
                                              <Text style={styles.incogmodestatustext2}> Private Identity  </Text>
                                              <Text style={styles.incogmodestatustext2}> Bitcoins accepted  </Text>
                                            </View> : <View>
                                                      <IconButton icon={'incognito-circle-off'} iconColor={MD2Colors.red500} size={80} style={styles.incogmodestatusicon}></IconButton>
                                                      <Text style={styles.incogmodestatustext}> `{appError} 100` </Text>
                                              </View>}
                                        </View>
                                      </BottomDrawer> : ''}
                                      </View> : ''}
                            </View>
                            <View style={{top: 50}}>
                                      <Switch text='Bitcoin wallet' isOn={isBitcoin} onChange={setIsBitcoin} backgrounColor='green' fullWidth justifyContent='space-between' borderColor='white' border textStyle={styles.clubswitchtextfield}></Switch>
                            </View>
                            <View style={{top: 70}}>
                                <Switch text='Account Declaration signed' isOn={isDelegation} onChange={setIsDelegation} backgrounColor='green' fullWidth justifyContent='space-between' borderColor='white' border textStyle={styles.clubswitchtextfield}></Switch>
                                {isDelegation && isBitcoin && isMagicLink? <View style={{top: -300}}>
                                      <Card
                                              buttons={[
                                                {text: 'Access', onPress: () => {
                                                    onHandle_EmailOTP();
                                                },},
                                              ]}
                                              description={
                                                'Following Delegation should be applied :- \n1. All Members should have email address or phone number for access\n 2. Every member should have bitcoin wallet. \n 3. Each member should secure bitcoin wallet keys or use hardware base device.\n 4. Each member will authenicate through your devices, social account \n 5. In case member will not have bitcoin wallet address either use Lighting network or mobile bitcoin wallet. '
                                              }
                                              icon={'mail-open'}
                                              title={'Delegation Letter'}
                                              theme={{
                                                themeColor: '#DB504A',
                                              }}
                                            />
                                            {isOTP ? <View>
                                                        <Toast visible={toastVisible} backgroundColor='#FF7F50' icon='information-circle-outline' position='top' fontSize={8} text='Check your Email. Add your token for your authentication' setVisible={setToastVisible}></Toast>
                                                     </View> : '' }
                                    </View> : ''}
                            </View>
                          </View> : ''}
                          {register === 'tab2'? <View style={styles.clubtabview}>
                          <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                        <AccordionItem
                                            leftIcon="account"
                                            title="Membership Authentication"
                                            subTitle="Authenticate your credentials" rightIcon="account-circle">
                                              <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                  <AccordionItem
                                                      leftIcon="phone"
                                                      title="Authentication via phone"
                                                      subTitle="connect with number" rightIcon="cellphone">
                                                        <Text> Phone Number * </Text>
                                                        <TextInput placeholder='+111 111 1110' mode='flat' inputMode='tel' value={phone} onChangeText={setPhone}></TextInput>
                                                        <Text> Token * </Text>
                                                        <TextInput placeholder='token' mode='flat' inputMode='text' value={token} onChangeText={setToken}></TextInput>
                                                        <IconButton icon={'cellphone-sound'} iconColor={MD2Colors.green500} style={styles.accountauth} onPress={onHandle_phone_authentication}></IconButton>
                                                        {isSession? <View>
                                                                        <Toast visible={toastAuthVisible} backgroundColor='#FF7F50' icon='information-circle-outline' position='top' fontSize={8} text='Excellent! Your account have login.' setVisible={setToastVisible}></Toast>
                                                                    </View> : ''}
                                                  </AccordionItem></Accordion>
                                                  {/* <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                  <AccordionItem
                                                      leftIcon="whatsapp"
                                                      title="Authentication via Whatsapp"
                                                      subTitle="connect with whatsapp" rightIcon="cellphone">
                                                        <Text> Whatsapp Number * </Text>
                                                        <TextInput placeholder='+111 111 1110' mode='flat' inputMode='tel'></TextInput>
                                                        <IconButton icon={'whatsapp'} iconColor={MD2Colors.green500} style={{top: 30, left: 60}}></IconButton>
                                                  </AccordionItem></Accordion> */}
                                        </AccordionItem>
                                                  <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                  <AccordionItem
                                                      leftIcon="email"
                                                      title="Member Verification"
                                                      subTitle="connect through email" rightIcon="cellphone">
                                                        <Text> Email Address * </Text>
                                                        <TextInput placeholder='abc@company.com' mode='flat' inputMode='email' value={email} onChangeText={setEmail}></TextInput>
                                                        <Text> Token * </Text>
                                                        <TextInput placeholder='token' mode='flat' inputMode='text' value={token} onChangeText={setToken}></TextInput>
                                                        <IconButton icon={'account-circle'} iconColor={MD2Colors.green500} style={{top: 30, left: 90}} onPress={verification}></IconButton>
                                                  </AccordionItem></Accordion>
                              </Accordion>
                          </View>: ''}
                          {register === 'tab3'? <View style={styles.clubtabview}>
                              <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                      <AccordionItem
                                            leftIcon="account-circle"
                                            title="Decentralize Wallet"
                                            subTitle="Decentralize mobile wallet" rightIcon="bitcoin">
                                              <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                                  <AccordionItem
                                                      leftIcon="pen"
                                                      title="Bitcoin wallet"
                                                      subTitle="Create decentralize mobile wallet" rightIcon="bitcoin">
                                                         <Text> Bitcoin Address * </Text>
                                                         <TextInput placeholder='bitcoin address' mode='flat' inputMode='text' style={{ top: 5}}></TextInput>
                                                         <IconButton icon={'bitcoin'} iconColor={MD2Colors.green500} style={{top : 30, left: 50}}></IconButton>
                                                      </AccordionItem>
                                                   <AccordionItem
                                                          leftIcon="fingerprint"
                                                          title="Transactions"
                                                          subTitle="Decentralize mobile wallet" rightIcon="bitcoin">
                                                            <PageScrollView backgroundColor='#ebf3f3' style={styles.style}></PageScrollView>
                                                          </AccordionItem>
                                                    <AccordionItem
                                                          leftIcon="atm"
                                                          title="Bitcoin Digital Card"
                                                          subTitle="Decentralize mobile wallet" rightIcon="bitcoin">
                                                            <Card buttons={[
                                                              {text: 'Request for Card '},
                                                            ]} 
                                                               description={'Register your Bitcoin Card'}
                                                               title=''
                                                               theme={{themeColor: '#DB504A'}}
                                                               icon={'logo-bitcoin'}
                                                            />
                                                          </AccordionItem>
                                            </Accordion>
                                            </AccordionItem>
                              </Accordion>
                              <Accordion compact titleStyle={styles.titleStyle} contentContainerStyle={styles.contentContainerStyle} itemContainerStyle={styles.itemcontainer}>
                                      <AccordionItem
                                            leftIcon="send"
                                            title="My Networth"
                                            subTitle="Decentralize mobile wallet hold assets [cash-in] & liabilities [cash-out] " rightIcon="handshake"></AccordionItem>
                              </Accordion>
                          </View> : ''}
                        </View> 
                    </Modal>: ''}
      {clubs? <Modal isVisible={clubs} style={{backgroundColor: 'darkslategrey'}}>
                <View style={styles.backnav}>
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

paymentheader: {
  position: 'relative',
  left: 20,
  fontSize: 25
}, 
style: {
  padding: 10,
},
itemView: {
  width: '100%',
  margin: 5,
  padding: 40,
},
itemText: {
  textAlign: 'center',
  fontSize: 20,
  fontWeight: 'bold'
},
backlink: {
  color: 'white', 
  position: 'relative', 
  left: 300, 
  fontSize: 25
},
damacbrand:{
  position: 'relative', 
  left: 20,
  fontSize: 50,
  color: 'darkslategrey',
  top: 20
}, 
oceanhousebrand:{
  position: 'relative', 
  left: 160,
  fontSize: 20,
  color: 'orange',
  top: 20
},
imibrand:{
  position: 'relative', 
  left: 60,
  fontSize: 20,
  color: 'green',
  top: 40
},
gbrand:{
  position: 'relative', 
  left: 100,
  fontSize: 20,
  color: 'red',
  top: 70
},
rbrand:{
  position: 'relative', 
  left: 30,
  fontSize: 20,
  color: 'purple',
  top: 60
}, 

backnav:{
  flex: 1, 
  position: 'relative', 
  top: 30
},
clubtabcontrol:{
  position: 'relative', 
  top: -600
},
clubtabview:{
  position: 'absolute', 
  width: 320, 
  top: 100
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
annymoustextlabel:{
  position: 'relative', 
  top: 50, 
  color: 'yellow', 
  left: 60
},
annymoustextbutton:{
  position: 'relative', 
  top: 5, 
  left: 270
}, 
incogmodestatusicon:{
  top: 20,
  left: 120
},
incogmodestatustext:{
  top: 20,
  left: 100,
  color: 'green'
},
incogmodestatustext2:{
  top: 40,
  left: 80,
  color: 'black'
},
accountauth:{
  top: 30, 
  left: 60
}
});
