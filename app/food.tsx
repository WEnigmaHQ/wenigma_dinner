import { PageScrollView } from "pagescrollview";
import { useEffect, useState } from "react";
import { FlatList, Linking, Share, View } from "react-native";
import { Appbar, Card, MD2Colors, Avatar, Text, Button } from "react-native-paper";
import axios from 'react-native-axios';
import { router } from "expo-router";

export default function Food(apiurl: any) {

    // handle food news

   const [foodArticles, setFoodArticles] = useState([]);
  
   const LeftContent = (props: any) => <Avatar.Icon {...props} icon='compass' />

     useEffect(() => {
            
            const fetchFoodNews = async () => {
 
              try {
                    const response = await axios.get(apiurl);
                    const articles = response.data.articles || [];
                    setFoodArticles(articles);
    
                } catch (error: any) {
                  console.error("Error report", error.response.data);
                }
            };
        
        
            fetchFoodNews();
        
          }, [apiurl]);
    
    const back = () => {router.replace('/')};
    const shareArticle = async (title: string, url:any) => {
        try {
          await Share.share({
            message: `${title}\n${url}`,
          });
        } catch (error: any) {
          console.error("Error reported", error.response.data);
        }
    };

    return(
        <View style={{flex: 1, width: 300}}>
                <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: 0, left: 260}}></Appbar.BackAction>
                <PageScrollView backgroundColor='#ebf3f3' style={{
  padding: 10,
}}>
                    {foodArticles.length<= 0 ? <Text variant={'headlineLarge'} style={{color: 'black', top: 300, left: 50}}> {foodArticles.length} results in 1 sec .... </Text> : <FlatList data={foodArticles} renderItem={({item}) =>
                        <Card>
                            <Card.Title title={item.title} subtitle={`${foodArticles.length}` + 'results loaded in 1 sec ...'} left={LeftContent}>
                            </Card.Title>
                            <Card.Content>
                                    <Text variant={'headlineMedium'}> {item.author} </Text>
                                    <Text variant={'bodySmall'}> {item.content}</Text>
                                    <Text variant={'bodySmall'}> {item.publishedAt}</Text>
                                </Card.Content>
                                <Card.Cover source={item.urlToImage}></Card.Cover>
                                <Card.Actions>
                                    <Button icon="url" mode="contained" onPress={()=>{shareArticle(item.title, item.url)}}> </Button>
                                    <Button icon="newspapper" mode="contained" onPress={()=>{Linking.openURL(item.url)}}></Button>
                                </Card.Actions>
                        </Card>
                        } keyExtractor={(item) => item.url}>
                    </FlatList>}
                </PageScrollView>
        </View> 
    );
}