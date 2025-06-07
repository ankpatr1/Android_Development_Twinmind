import * as AuthSession from 'expo-auth-session';
import { TokenResponse, useAuthRequest } from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import React, { useEffect, useState } from 'react';
import { Alert, Button, Image, ScrollView, StyleSheet, Text, View } from 'react-native';

WebBrowser.maybeCompleteAuthSession();

export default function AuthScreen() {
  const [userInfo, setUserInfo] = useState<any>(null);
  const [calendarEvents, setCalendarEvents] = useState<any[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);

  const clientId = '894988236588-s9j2hce19o7do5uf12rus1u71km6bdg8.apps.googleusercontent.com';

  const redirectUri = AuthSession.makeRedirectUri({
    useProxy: true,
  } as any);

  const [request, response, promptAsync] = useAuthRequest({
    clientId,
    redirectUri,
    scopes: [
      'openid',
      'profile',
      'email',
      'https://www.googleapis.com/auth/calendar',
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      if (response?.type === 'success' && (response as TokenResponse).authentication?.accessToken) {
        const token = (response as TokenResponse).authentication.accessToken;
        setAccessToken(token);

        try {
          // Get user info
          const userRes = await fetch('https://www.googleapis.com/userinfo/v2/me', {
            headers: { Authorization: `Bearer ${token}` },
          });
          const user = await userRes.json();
          setUserInfo(user);

          // Get calendar events
          const calendarRes = await fetch(
            'https://www.googleapis.com/calendar/v3/calendars/primary/events?maxResults=5&orderBy=startTime&singleEvents=true',
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          const data = await calendarRes.json();
          setCalendarEvents(data.items || []);
        } catch (error) {
          Alert.alert('Error', 'Failed to fetch data');
        }
      }
    };

    fetchData();
  }, [response]);

  const createCalendarEvent = async () => {
    if (!accessToken) return;

    try {
      const res = await fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          summary: 'New Event from Expo App',
          start: {
            dateTime: new Date(Date.now() + 3600 * 1000).toISOString(),
            timeZone: 'America/New_York',
          },
          end: {
            dateTime: new Date(Date.now() + 2 * 3600 * 1000).toISOString(),
            timeZone: 'America/New_York',
          },
        }),
      });

      const event = await res.json();
      if (res.ok) {
        Alert.alert('Success', `Event created: ${event.summary}`);
      } else {
        console.log('❌ Error:', event);
        Alert.alert('Failed', event.error?.message || 'Unknown error');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to create event');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {userInfo ? (
        <>
          <Text style={styles.title}>Welcome, {userInfo.name}!</Text>
          <Image source={{ uri: userInfo.picture }} style={styles.avatar} />
          <Text>Email: {userInfo.email}</Text>

          {calendarEvents.length > 0 && (
            <View style={{ marginTop: 24 }}>
              <Text style={styles.title}>Upcoming Events</Text>
              {calendarEvents.map((event) => (
                <Text key={event.id} style={styles.event}>
                  • {event.summary || 'No Title'} — {event.start?.dateTime || event.start?.date}
                </Text>
              ))}
            </View>
          )}

          <View style={{ marginTop: 16 }}>
            <Button title="Create Calendar Event" onPress={createCalendarEvent} />
          </View>
        </>
      ) : (
        <>
          <Text style={styles.title}>Login with Google</Text>
          <Button title="Sign in with Google" disabled={!request} onPress={() => promptAsync()} />
        </>
      )}
    </ScrollView>
  );
}


const styles = StyleSheet.create({
  container: { flexGrow: 1, justifyContent: 'center', alignItems: 'center', padding: 24 },
  title: { fontSize: 24, marginBottom: 16, fontWeight: 'bold' },
  avatar: { width: 100, height: 100, borderRadius: 50, marginVertical: 16 },
  event: { fontSize: 16, marginTop: 8 },
});
