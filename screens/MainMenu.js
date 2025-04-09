import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Audio } from 'expo-av'; // Import Audio from expo-av
import styles from '../styles/MainMenuStyles'; // Adjust the path as needed

export default function MainMenu({ navigation }) {
  const [backgroundMusic, setBackgroundMusic] = useState(null);

  useEffect(() => {
    // Load and play background music
    const loadMusic = async () => {
      const sound = new Audio.Sound();
      try {
        await sound.loadAsync(require('../assets/sounds/background-music.mp3')); // Add your music file here
        await sound.setIsLoopingAsync(true); // Loop the music
        await sound.playAsync(); // Play the music
        setBackgroundMusic(sound); // Save the sound instance
      } catch (error) {
        console.error('Error loading or playing background music:', error);
      }
    };

    loadMusic();

    // Cleanup: Stop and unload the music when the component unmounts
    return () => {
      if (backgroundMusic) {
        backgroundMusic.stopAsync().catch(() => {}); // Safely stop the music
        backgroundMusic.unloadAsync().catch(() => {}); // Safely unload the music
      }
    };
  }, []); // Removed backgroundMusic from the dependency array

  return (
    <ImageBackground
      source={require('../assets/background2.png')} // Corrected to only include the image path
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.container}>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameScreen')}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LevelSelectScreen')}>
          <Text style={styles.buttonText}>Level Select</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}