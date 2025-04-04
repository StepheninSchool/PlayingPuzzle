import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LevelSelectScreen({ navigation }) {
  const levels = [1, 2, 3, 4]; // List of levels

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Select a Level</Text>
      {levels.map((level) => (
        <TouchableOpacity
          key={level}
          style={styles.button}
          onPress={() => navigation.navigate('GameScreen', { level })}
        >
          <Text style={styles.buttonText}>Level {level}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#007BFF',
    padding: 10,
    marginVertical: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});