import React, { useState, useEffect } from 'react';
import { View, Text, Button, Picker } from 'react-native';
import Tts from 'react-native-tts';

const App = () => {
  const [selectedVoice, setSelectedVoice] = useState('');
  const [speed, setSpeed] = useState(1);
  const [pitch, setPitch] = useState(1);
  const [voices, setVoices] = useState([]);

  useEffect(() => {
    Tts.getInitStatus().then(() => {
      Tts.getVoices().then(voices => {
        setVoices(voices);
        if (voices.length > 0) {
          setSelectedVoice(voices[0].id);
        }
      });
    });
  }, []);

  const speak = () => {
    Tts.setDefaultVoice(selectedVoice);
    Tts.setDefaultRate(speed);
    Tts.setDefaultPitch(pitch);
    Tts.speak('Hello, this is a text to speech application built in React Native. You can select voices, adjust speed and pitch.');
  };

  const stop = () => {
    Tts.stop();
  };

  return (
    <View style={{ padding: 20 }}>
      <Text>Text to Speech App</Text>
      <Picker selectedValue={selectedVoice} style={{ height: 50, width: 200 }} onValueChange={(itemValue) => setSelectedVoice(itemValue)}>
        {voices.map(voice => <Picker.Item label={voice.name} value={voice.id} key={voice.id} />)}
      </Picker>
      <Text>Speed: {speed}</Text>
      <Slider minimumValue={0.1} maximumValue={2} value={speed} onValueChange={setSpeed} step={0.1} />
      <Text>Pitch: {pitch}</Text>
      <Slider minimumValue={0.1} maximumValue={2} value={pitch} onValueChange={setPitch} step={0.1} />
      <Button title='Speak' onPress={speak} />
      <Button title='Stop' onPress={stop} />
    </View>
  );
};

export default App;