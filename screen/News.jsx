import { View, Text, FlatList, SafeAreaView, Linking } from "react-native";
import react, { useEffect, useState } from "react";
import NewsItem from '../components/Cards';
import { Header } from "../components/Header";

const API_KEY = '7UNPF9PZEUYHH2I8'; // Our API key from Alpha Vantage

export default function NewsList() {
  const [news, setNews] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true); // this gives us the loading state

  const handleOpenLink = (url) => {
    Linking.openURL(url).catch((err) => console.error('An error occurred', err));
  };

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true); // indicate that we are loading
      try {
        const response = await fetch(`https://www.alphavantage.co/query?function=NEWS_SENTIMENT&apikey=${API_KEY}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Datos de Alpha Vantage:", data);

        // Check if the data is in the expected format (that mean if the API is working)
        if (data.feed && Array.isArray(data.feed)) {
          setNews(data.feed.map((article, index) => ({
            id: article.url,
            title: article.title,
            description: article.summary,
            imageUrl: article.banner_image,
            url: article.url,
          })).filter(item => item.imageUrl)); // Filter out items without an imageUrl
        } else if (data.Note) {
          setError(`Alpha Vantage API Note: ${data.Note}`); // data.note could be a message from the API
        } else {
          setError('The data from Alpha Vantage is not in the expected format.');
        }
      } catch (e) {
        setError(e.message);
      } finally {
        setLoading(false);
      }
    };

    console.log("La función fetchNews se va a ejecutar");
    fetchNews();
  }, []);

  if (loading) { // Show loading state and his style
    return <Text style={{ color: 'white', flex: 1, backgroundColor: '#1E1E1E', padding: 20 }}>Cargando noticias...</Text>;
  }

  if (error) { // Show error state and his style
    return <Text style={{ color: 'red', flex: 1, backgroundColor: "#1E1E1E", padding: 20 }}>Error: {error}</Text>;
  }

  return (
    <> {/* the "<>" is a container different to the View */}
      <Header nameIcon="newspaper-outline" title="News" />
      <SafeAreaView style={{ flex: 1, backgroundColor: "#1E1E1E", padding: 10 }}>
        <FlatList
          data={news}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <NewsItem
              title={item.title}
              description={item.description}
              imageUrl={item.imageUrl}
              onPress={() => handleOpenLink(item.url)}
            />
          )}
        />
      </SafeAreaView>
    </>
  );
}