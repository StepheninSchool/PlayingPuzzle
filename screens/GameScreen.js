import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, ImageBackground, TouchableOpacity, SafeAreaView } from "react-native";
import { GameEngine } from "react-native-game-engine";
import createWorld from "../components/createWorld";
import Physics from "../systems/Physics";
import MoveSystem from "../systems/MoveSystem";
import HoleSystem from "../systems/HoleSystem";
import LevelData from "../levels/LevelData";

const GameScreen = () => {
    const [gameEngine, setGameEngine] = useState(null);
    const [running, setRunning] = useState(true);
    const [isVictory, setIsVictory] = useState(false);
    const [isDeath, setIsDeath] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [showNextButton, setShowNextButton] = useState(false);
    
    // Reset the game state when the level changes
    useEffect(() => {
        setRunning(true);
        setIsVictory(false);
        setIsDeath(false);
        setShowNextButton(false);
        
        if (gameEngine) {
            gameEngine.swap(createWorld(currentLevel));
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
        } else if (event.type === "death") {
            setIsDeath(true);
            setRunning(false);
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
            gameEngine.swap(createWorld(currentLevel));
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
                    entities={createWorld(currentLevel)}
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
                    </View>
                )}

                {isDeath && (
                    <View style={styles.messageContainer}>
                        <Text style={styles.deathText}>Game Over!</Text>
                        <TouchableOpacity 
                            style={styles.restartButton}
                            onPress={restartLevel}
                        >
                            <Text style={styles.restartText}>Try Again ?</Text>
                        </TouchableOpacity>
                    </View>
                )}
            </SafeAreaView>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: {
        flex: 1,
        backgroundColor: 'transparent',
    },
    leftSideHeaderContainer: {
        position: 'absolute',
        left: 0,
        top: 20,
        zIndex: 10,
    },
    levelBadge: {
        backgroundColor: 'rgba(0,0,0,0.6)',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderTopRightRadius: 15,
        borderBottomRightRadius: 15,
        shadowColor: '#000',
        shadowOffset: { width: 2, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        elevation: 5,
    },
    levelText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2
    },
    gameContainer: {
        flex: 1,
    },
    messageContainer: {
        position: 'absolute',
        top: '40%',
        left: 0,
        right: 0,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.7)',
        padding: 20,
    },
    victoryText: {
        color: 'gold',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    deathText: {
        color: '#ff4444',
        fontSize: 38,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
    },
    nextLevelButton: {
        backgroundColor: '#4CAF50',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 10,
    },
    restartButton: {
        backgroundColor: '#ff4444',
        paddingVertical: 12,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginTop: 10,
    },
    nextLevelText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    },
    restartText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default GameScreen;
