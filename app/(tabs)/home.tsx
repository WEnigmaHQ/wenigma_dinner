import { useState } from 'react';
import { View, StyleSheet} from 'react-native';
import { useEffect, useRef } from 'react';
import { DrawerNavigation} from 'rn-inkpad';
import BottomDrawer, { BottomDrawerMethods } from 'react-native-animated-bottom-drawer';
import { router } from 'expo-router';
import Modal  from 'react-native-modal';
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
import Clubs from '../clubs';









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

  // popover add event 
  const [plusExclusiveDinner, setPlusExclusiveDinner] = useState(false);


  useEffect(() => {
      setTimeout(() => setPlusExclusiveDinner(false), 2000);
    }, []);
  

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
                        <Clubs></Clubs>
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
