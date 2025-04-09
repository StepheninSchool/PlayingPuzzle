import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, ImageBackground, TouchableOpacity, SafeAreaView } from "react-native";
import { GameEngine } from "react-native-game-engine";
import createWorld from "../components/createWorld";
import Physics from "../systems/Physics";
import MoveSystem from "../systems/MoveSystem";
import HoleSystem from "../systems/HoleSystem";
import LevelData from "../levels/LevelData";
import styles from "../styles/GameScreenStyles"; // Adjust the path as needed
import { Audio } from 'expo-av'; // Import Audio from expo-av

const GameScreen = ({ route, navigation }) => { // Add navigation prop
    const { level } = route.params || { level: 1 }; // Get the level from route params, default to 1
    const [gameEngine, setGameEngine] = useState(null);
    const [running, setRunning] = useState(true);
    const [isVictory, setIsVictory] = useState(false);
    const [isDeath, setIsDeath] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(level); // Initialize with the selected level
    const [showNextButton, setShowNextButton] = useState(false);
    const [sounds, setSounds] = useState({}); // State to manage sounds
    

    // Load sounds when the component mounts
    const loadSounds = async () => {
        const jumpSound = new Audio.Sound();
        const collisionSound = new Audio.Sound();
        const victorySound = new Audio.Sound();
        const deathSound = new Audio.Sound();

        await jumpSound.loadAsync(require('../assets/sounds/jump.mp3'));
        await collisionSound.loadAsync(require('../assets/sounds/collision.mp3'));
        await victorySound.loadAsync(require('../assets/sounds/victory.mp3'));
        await deathSound.loadAsync(require('../assets/sounds/death.mp3'));

        setSounds({ jumpSound, collisionSound, victorySound, deathSound });
    };

    useEffect(() => {
        loadSounds(); // Load sounds when the component mounts
        return () => {
            // Unload sounds when the component unmounts
            Object.values(sounds).forEach(sound => {
                sound.unloadAsync();
            });
        };
    }, []);

    // Reset the game state when the level changes
    useEffect(() => {
        setRunning(true);
        setIsVictory(false);
        setIsDeath(false);
        setShowNextButton(false);
        
        if (gameEngine) {
            gameEngine.swap(createWorld(currentLevel, sounds)); // Pass sounds to the world
        }
        
        console.log(`Level ${currentLevel} loaded`);
    }, [currentLevel]);

    useEffect(() => {
        setRunning(true);

        // Only add browser event listeners if we're in a browser environment
        if (typeof document !== 'undefined') {
            // Add mouse event listeners
            const handleMouseEvent = (event) => {
                if (gameEngine && gameEngine.dispatch) {
                    gameEngine.dispatch(event);
                }
            };

            document.addEventListener('mousedown', handleMouseEvent);
            document.addEventListener('mousemove', handleMouseEvent);
            document.addEventListener('mouseup', handleMouseEvent);

            return () => {
                document.removeEventListener('mousedown', handleMouseEvent);
                document.removeEventListener('mousemove', handleMouseEvent);
                document.removeEventListener('mouseup', handleMouseEvent);
            };
        }
    }, [gameEngine]);
    
    // When user wins, show victory message and the next level button after a delay
    useEffect(() => {
        if (isVictory) {
            const timer = setTimeout(() => {
                setShowNextButton(true);
            }, 1500);
            
            return () => clearTimeout(timer);
        }
    }, [isVictory]);

    const onEvent = (event) => {
        if (event.type === "victory") {
            setIsVictory(true);
            setRunning(false);
            sounds.victorySound.playAsync(); // Play victory sound
        } else if (event.type === "death") {
            setIsDeath(true);
            setRunning(false);
            sounds.deathSound.playAsync(); // Play death sound
        }
    };
    
    const goToNextLevel = () => {
        // Check if there is a next level
        if (currentLevel < LevelData.length) {
            setCurrentLevel(currentLevel + 1);
        }
    };

    const restartLevel = () => {
        // First reset the game state
        setRunning(true);
        setIsVictory(false);
        setIsDeath(false);
        setShowNextButton(false);
        
        // Then swap the world to reset the level
        if (gameEngine) {
            gameEngine.swap(createWorld(currentLevel, sounds));
        }
    };

    return (
        <ImageBackground
            source={require('../assets/background.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                {/* Left Side Level Header */}
                <View style={styles.leftSideHeaderContainer}>
                    <View style={styles.levelBadge}>
                        <Text style={styles.levelText}>
                            {LevelData[currentLevel - 1]?.name || `Level ${currentLevel}`}
                        </Text>
                    </View>
                </View>
                
                <GameEngine
                    ref={(ref) => setGameEngine(ref)}
                    style={styles.gameContainer}
                    systems={[Physics, MoveSystem, HoleSystem]}
                    entities={createWorld(currentLevel, sounds)} // Pass sounds to the world
                    running={running}
                    onEvent={onEvent}
                />
                
                {isVictory && (
                    <View style={styles.messageContainer}>
                        <Text style={styles.victoryText}>Level Complete!</Text>
                        
                        {showNextButton && currentLevel < LevelData.length && (
                            <TouchableOpacity 
                                style={styles.nextLevelButton}
                                onPress={goToNextLevel}
                            >
                                <Text style={styles.nextLevelText}>Next Level</Text>
                            </TouchableOpacity>
                        )}

                        {/* Main Menu Button */}
                        <TouchableOpacity 
                            style={styles.mainMenuButton}
                            onPress={() => navigation.navigate('MainMenu')}
                        >
                            <Text style={styles.mainMenuText}>Main Menu</Text>
                        </TouchableOpacity>
                    </View>
                )}

                {isDeath && (
                    <View style={styles.messageContainer}>
                        <Text style={styles.deathText}>Game Over!</Text>
                        <TouchableOpacity 
                            style={styles.restartButton}
                            onPress={restartLevel}
                        >
                            <Text style={styles.restartText}>Try Again?</Text>
                        </TouchableOpacity>

                        {/* Main Menu Button */}
                        <TouchableOpacity 
                            style={styles.mainMenuButton}
                            onPress={() => navigation.navigate('MainMenu')}
                        >
                            <Text style={styles.mainMenuText}>Main Menu</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
};

export default GameScreen;