import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, ImageBackground } from 'react-native';
import { Audio } from 'expo-av';
import styles from '../styles/MainMenuStyles';

// Singleton for background music
const backgroundMusicSingleton = {
  instance: null,
};

export default function MainMenu({ navigation }) {
  const backgroundMusicRef = useRef(null);

  useEffect(() => {
    const loadMusic = async () => {
      try {
        // Set audio mode for compatibility
        await Audio.setAudioModeAsync({
          allowsRecordingIOS: false,
          staysActiveInBackground: true,
          playsInSilentModeIOS: true,
        });

        // Check if the music is already playing
        if (!backgroundMusicSingleton.instance) {
          const sound = new Audio.Sound();
          await sound.loadAsync(require('../assets/sounds/background-music.mp3'));
          await sound.setIsLoopingAsync(true);
          await sound.playAsync();
          backgroundMusicSingleton.instance = sound; // Save the instance
        }

        backgroundMusicRef.current = backgroundMusicSingleton.instance;
      } catch (error) {
        console.error('Error loading or playing background music:', error);
      }
    };

    loadMusic();

    // Cleanup: Stop and unload the music only if the app is closed
    return () => {
      if (backgroundMusicRef.current) {
        backgroundMusicRef.current.stopAsync().catch(() => {});
        backgroundMusicRef.current.unloadAsync().catch(() => {});
        backgroundMusicSingleton.instance = null; // Reset the singleton
      }
    };
  }, []);

  return (
    <ImageBackground
      source={require('../assets/background2.png')}
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