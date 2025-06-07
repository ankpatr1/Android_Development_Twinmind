import * as SecureStore from 'expo-secure-store';
import React, { useState } from 'react';
import { Button, FlatList, StyleSheet, Text, View } from 'react-native';
import { authorize } from 'react-native-app-auth';
import { config } from '../googleAuthConfig';

export default function CalendarScreen({ navigation }) {
  const [events, setEvents] = useState([]);

  const getToken = async () => {
    const token = await SecureStore.getItemAsync('calendar_token');
    return token;
  };

  const storeToken = async (token) => {
    await SecureStore.setItemAsync('calendar_token', token);
  };

  const fetchEvents = async () => {
    const token = await getToken();
    const res = await fetch(
      'https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=10&orderBy=startTime&singleEvents=true',
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await res.json();
    setEvents(data.items || []);
  };

  const handleConnectCalendar = async () => {
    try {
      const authState = await authorize(config);
      await storeToken(authState.accessToken);
      await fetchEvents();
    } catch (e) {
      console.error('OAuth error', e);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Connect Google Calendar" onPress={handleConnectCalendar} />
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.event}>
            <Text style={styles.title}>{item.summary || 'No Title'}</Text>
            <Text>{item.start?.dateTime || item.start?.date}</Text>
          </View>
        )}
      />
      <Button title="Go to Transcription" onPress={() => navigation.navigate('Transcription')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    marginTop: 20,
  },
  event: {
    marginVertical: 10,
    borderBottomWidth: 1,
    borderColor: '#ccc',
    paddingBottom: 5,
  },
  title: {
    fontWeight: 'bold',
  },
});
