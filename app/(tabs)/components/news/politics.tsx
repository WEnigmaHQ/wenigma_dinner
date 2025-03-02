import { router } from "expo-router";
import { PageScrollView } from "pagescrollview";
import { useEffect, useState } from "react";
import { FlatList, Linking, Share, View } from "react-native";
import { Appbar, Card, MD2Colors } from "react-native-paper";
import axios from 'react-native-axios';

export default function Politics({apiurl}){

    const [politicalArticles, setPoliticalArticles] = useState([]);

    useEffect(() => {
        
        const fetchPolticalNews = async () => {
    
            try {
                
                const response = await axios.get(apiurl);
                setPoliticalArticles(response.data.articles);

            } catch (error: any) {
              console.error("Error report", error.response.data);
            }
        };
    
    
        fetchPolticalNews();
    
      }, [apiurl]);

    const back = () => {router.replace('/')};
    const shareArticle = async(title: string, url: any) => {
        
        try {
            await Share.share({
                message: `${title}\n${url}`,
            });
        } catch (error) {
            console.error('Error reported: ', error);
        }
    }

    return(
        <View style={{flex: 1, width: 300}}>
                <Appbar.BackAction iconColor={MD2Colors.white} onPress={back} style={{top: 0, left: 260}}></Appbar.BackAction>
                <PageScrollView backgroundColor='#ebf3f3' style={{
  padding: 10,
}}>
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
    );
}