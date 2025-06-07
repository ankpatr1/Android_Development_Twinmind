import { OPENAI_API_KEY } from '@env';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import React, { useState } from 'react';
import { ActivityIndicator, Button, ScrollView, StyleSheet, Text, View } from 'react-native';

const TRANSCRIPTION_API = 'https://api.openai.com/v1/audio/transcriptions';

export default function TranscriptionScreen() {
  const [recording, setRecording] = useState<Audio.Recording | null>(null);
  const [isRecording, setIsRecording] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [loading, setLoading] = useState(false);

  const startRecording = async () => {
    try {
      setIsRecording(true);
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({ allowsRecordingIOS: true, playsInSilentModeIOS: true });

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await rec.startAsync();
      setRecording(rec);
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    setIsRecording(false);
    if (!recording) return;

    await recording.stopAndUnloadAsync();
    const uri = recording.getURI();
    setRecording(null);

    if (uri) {
      await transcribeAudio(uri);
    }
  };

  const transcribeAudio = async (uri: string) => {
    setLoading(true);
    setTranscript('');
    try {
      const file = await FileSystem.readAsStringAsync(uri, {
        encoding: FileSystem.EncodingType.Base64,
      });

      const formData = new FormData();
      formData.append('file', {
        uri,
        name: 'recording.m4a',
        type: 'audio/m4a',
      } as any);
      formData.append('model', 'whisper-1');

      const response = await fetch(TRANSCRIPTION_API, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${OPENAI_API_KEY}`,
        },
        body: formData,
      });

      const result = await response.json();
      setTranscript(result.text || 'No transcript available.');
    } catch (err) {
      console.error('Transcription error', err);
      setTranscript('Failed to transcribe.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Transcription</Text>
      <Button
        title={isRecording ? 'Stop Recording' : 'Start Recording'}
        onPress={isRecording ? stopRecording : startRecording}
      />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

      {transcript ? (
        <View style={styles.transcriptBox}>
          <Text style={styles.subtitle}>Transcript:</Text>
          <Text>{transcript}</Text>
        </View>
      ) : null}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flexGrow: 1, padding: 20, alignItems: 'center', justifyContent: 'center' },
  title: { fontSize: 24, marginBottom: 16, fontWeight: 'bold' },
  subtitle: { fontSize: 18, marginTop: 16, fontWeight: '600' },
  transcriptBox: { marginTop: 20, padding: 16, backgroundColor: '#f1f1f1', borderRadius: 10 },
});
