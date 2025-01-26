import { useState } from 'react';
import { View, Text, StyleSheet, Platform, FlatList, Linking, Share } from 'react-native';
import { useEffect, useCallback, useRef } from 'react';
import * as AddCalendarEvent from 'react-native-add-calendar-event';
import {PERMISSIONS, request, RESULTS} from 'react-native-permissions';
import {DrawerNavigation, Card, SegmentedControl, CardImage} from 'rn-inkpad';
import BottomDrawer, {BottomDrawerMethods} from 'react-native-animated-bottom-drawer';
import {Accordion, AccordionItem} from '@mustapha-ghlissi/react-native-accordion';
import { PageScrollView } from 'pagescrollview'
import { Link } from 'expo-router';
import Modal  from 'react-native-modal';
import axios from 'react-native-axios';







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

  // handle political news

  const bottomPoliticsDrawerRef = useRef<BottomDrawerMethods>(null);

  const [politicalArticles, setPoliticalArticles] = useState([]);

    // handle estate news
  const bottomEstateDrawerRef = useRef<BottomDrawerMethods>(null);

  const [EstateArticles, setEsatteArticles] = useState([]);

   // handle aura news
   const bottomAuraDrawerRef = useRef<BottomDrawerMethods>(null);

   const [AuraArticles, setAuraArticles] = useState([]);
   
   
   // handle business news
   const bottomBusinessDrawerRef = useRef<BottomDrawerMethods>(null);

   const [businessArticles, setBusinessArticles] = useState([]);

   // handle fashion news
   const bottomFashionDrawerRef = useRef<BottomDrawerMethods>(null);

   const [fashionArticles, setFashionArticles] = useState([]);

   // handle fashion news
   const bottomFoodDrawerRef = useRef<BottomDrawerMethods>(null);

   const [foodArticles, setFoodArticles] = useState([]);

   // handle travel news
   const bottomTravelDrawerRef = useRef<BottomDrawerMethods>(null);

   const [travelArticles, setTravelArticles] = useState([]);

   // handle travel news
   const bottomSportsDrawerRef = useRef<BottomDrawerMethods>(null);

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
  
  //  [active or open]
  const values = [
    {key: 'Active', value: 'tab1'},
    {key: 'Open', value: 'tab2'},
  ];

  
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
      {paymentMethod? <BottomDrawer ref={bottomDrawerRef} openOnMount>
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
      {partners? <BottomDrawer ref={bottomDrawerRef} openOnMount>
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
}
});
