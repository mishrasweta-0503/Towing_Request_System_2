import { Image } from 'expo-image';
import { useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/hello-wave';
import ParallaxScrollView from '@/components/parallax-scroll-view';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function HomeScreen() {
  const API_URL = "http://192.168.1.80:8000/api/requests"
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const fetchRequests = async() => {
    setLoading(true)
    setError(null)
    try {
      const response = await fetch(API_URL)
      if(!response.ok){
        throw new Error("Failed to fetch requests")
      }
      const data = await response.json();
      console.log(data)
      setRequests(data)
    } catch (error) {
      console.log(error)
    }finally{
      setLoading(false)
    }
  }
  useEffect(() => { fetchRequests(); }, [])
  return (
      <FlatList
        data={requests}
        keyExtractor={(item) => item.id.toString()}
        refreshing={loading}
        onRefresh={fetchRequests}
        ListHeaderComponent={
          <>
            <ThemedView style={styles.titleContainer}>
              <ThemedText type="title">Requests</ThemedText>
              <HelloWave />
            </ThemedView>

            {loading && <ThemedText>Loading requests...</ThemedText>}
            {error && <ThemedText>Error: {error}</ThemedText>}
          </>
        }
        renderItem={({ item }) => (
          <ThemedView style={[styles.card, { marginTop: 12 }]}>
            <ThemedText>Customer: {item.customer_name}</ThemedText>
            <ThemedText>Location: {item.location}</ThemedText>
            <ThemedText>Note: {item.note || "—"}</ThemedText>
            <ThemedText>Status: {item.status}</ThemedText>
          </ThemedView>
        )}
      />
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});
