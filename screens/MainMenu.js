import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';
import styles from '../styles/MainMenuStyles'; // Adjust the path as needed

export default function MainMenu({ navigation }) {
  useEffect(() => {
    console.log('MainMenu component mounted');
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


