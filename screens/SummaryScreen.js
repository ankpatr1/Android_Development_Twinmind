import axios from 'axios';
import React, { useState } from 'react';
import { Button, ScrollView, StyleSheet, Text, View } from 'react-native';

// Replace this with real transcript (could come from context, props, or file)
const dummyTranscript = `
Meeting Transcript:
- Discussed Q2 product roadmap.
- John suggested a launch date of July 15.
- Agreed to loop in marketing team by next Monday.
- Jane will draft the announcement blog post.
`;

export default function SummaryScreen() {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const generateSummary = async () => {
    setLoading(true);
    setSummary('');

    try {
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: 'gpt-4',
          messages: [
            {
              role: 'system',
              content: 'You are an expert meeting note summarizer. Create a structured summary including Agenda, Key Decisions, and Action Items.',
            },
            {
              role: 'user',
              content: `Please summarize this meeting:\n\n${dummyTranscript}`,
            },
          ],
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const summaryText = response.data.choices[0].message.content;
      setSummary(summaryText);
    } catch (error) {
      console.error('Summary generation failed:', error);
      setSummary('❌ Failed to generate summary.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Generate Summary" onPress={generateSummary} />
      <ScrollView style={styles.summaryBox}>
        <Text>{loading ? 'Generating summary...' : summary}</Text>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  summaryBox: {
    marginTop: 20,
    backgroundColor: '#f9f9f9',
    padding: 12,
    borderRadius: 8,
    flex: 1,
  },
});
