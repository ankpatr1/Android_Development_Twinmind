import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SummaryScreen from './screens/SummaryScreen';

import React from 'react';

import CalendarScreen from './screens/CalendarScreen';
import ChatScreen from './screens/ChatScreen'; // ✅ Include ChatScreen
import LoginScreen from './screens/LoginScreen';
import TranscriptionScreen from './screens/TranscriptionScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Calendar" component={CalendarScreen} />
        <Stack.Screen name="Transcription" component={TranscriptionScreen} />
        <Stack.Screen name="Chat" component={ChatScreen} /> {/* ✅ Chat */}
        <Stack.Screen name="Summary" component={SummaryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
