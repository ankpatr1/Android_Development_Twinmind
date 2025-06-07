// components/Transcription.tsx
import React, { useState } from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

const audioRecorderPlayer = new AudioRecorderPlayer();

export default function Transcription() {
  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState<string | null>(null);

  const startRecording = async () => {
    const result = await audioRecorderPlayer.startRecorder();
    setAudioPath(result);
    setIsRecording(true);
  };

  const stopRecording = async () => {
    const result = await audioRecorderPlayer.stopRecorder();
    setAudioPath(result);
    setIsRecording(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Transcription</Text>
      <Button title={isRecording ? 'Stop Recording' : 'Start Recording'} onPress={isRecording ? stopRecording : startRecording} />
      {audioPath && <Text style={styles.path}>Recorded: {audioPath}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 20, marginBottom: 12 },
  path: { marginTop: 12, fontSize: 14, color: 'gray' },
});
