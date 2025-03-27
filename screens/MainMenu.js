import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MainMenu({ navigation }) {
  useEffect(() => {
    console.log('MainMenu component mounted');
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Puzzle Game</Text>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('GameScreen')}>
        <Text style={styles.buttonText}>Start Game</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'black' },
  title: { fontSize: 24, color: 'white', marginBottom: 20 },
  button: { backgroundColor: 'blue', padding: 10, borderRadius: 5 },
  buttonText: { color: 'white', fontSize: 18 },
});
