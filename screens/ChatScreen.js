import axios from 'axios';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, TextInput, View } from 'react-native';

// Replace this with actual transcript passed via props or global state
const dummyTranscript = `
Today we discussed product launch plans. 
We confirmed the timeline, assigned tasks, and agreed to meet again next Friday.
`;

export default function ChatScreen() {
  const [question, setQuestion] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;

    setLoading(true);
    setResponse('');

    try {
      const res = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are a helpful meeting assistant. Answer questions based on the transcript below.',
            },
            {
              role: 'user',
              content: `Transcript:\n${dummyTranscript}\n\nQuestion: ${question}`,
            },
          ],
        },
        {
          headers: {
            'Authorization': `Bearer REMOVED_SECRETuK0zpPWt5ns9dBKFFZWlOze4hX-Vk3kJ2XCoYxlAraxhWZJIs7tRk6y-L3pXMd2jGSmrL0iclNT3BlbkFJHzoZTvzx2N7U4XfMqBqzXV2_LRoVvOU0ctcotdJHtdfGh1Nkm2-LEWfwiGgSRUV-1cet2kszsA`,
            'Content-Type': 'application/json',
          },
        }
      );

      const answer = res.data.choices[0].message.content;
      setResponse(answer);
    } catch (err) {
      console.error('Chat error:', err);
      setResponse('Error: Unable to fetch response.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.chatBox}>
        <Text style={styles.label}>Transcript:</Text>
        <Text style={styles.transcript}>{dummyTranscript}</Text>

        <Text style={styles.label}>AI Response:</Text>
        <Text>{loading ? 'Thinking...' : response}</Text>
      </ScrollView>

      <TextInput
        style={styles.input}
        placeholder="Ask about the meeting..."
        value={question}
        onChangeText={setQuestion}
      />
      <Button title="Ask" onPress={handleAsk} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  chatBox: {
    flex: 1,
    marginBottom: 16,
  },
  label: {
    fontWeight: 'bold',
    marginTop: 12,
  },
  transcript: {
    fontStyle: 'italic',
    backgroundColor: '#f4f4f4',
    padding: 8,
    marginBottom: 12,
    borderRadius: 6,
  },
  input: {
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 6,
    padding: 8,
    marginBottom: 10,
  },
});
