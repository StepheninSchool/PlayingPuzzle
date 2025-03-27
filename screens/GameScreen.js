import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Platform, ImageBackground, TouchableOpacity, SafeAreaView } from "react-native";
import { GameEngine } from "react-native-game-engine";
import createWorld from "../entities/createWorld";
import Physics from "../systems/Physics";
import MoveSystem from "../systems/MoveSystem";
import HoleSystem from "../systems/HoleSystem";
import LevelData from "../levels/LevelData";

const GameScreen = () => {
    const [gameEngine, setGameEngine] = useState(null);
    const [running, setRunning] = useState(true);
    const [isVictory, setIsVictory] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(1);
    const [showNextButton, setShowNextButton] = useState(false);
    
    // Reset the game state when the level changes
    useEffect(() => {
        setRunning(true);
        setIsVictory(false);
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
            }, 1500); // Show the next level button after 1.5 seconds
            
            return () => clearTimeout(timer);
        }
    }, [isVictory]);

    const onEvent = (event) => {
        if (event.type === "victory") {
            setIsVictory(true);
            setRunning(false);
        }
    };
    
    const goToNextLevel = () => {
        // Check if there is a next level
        if (currentLevel < LevelData.length) {
            setCurrentLevel(currentLevel + 1);
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

                {/* Level Header */}
                <View style={styles.headerContainer}>

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
                        <Text style={styles.victoryText}>You Win! 🎉</Text>
                        
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
            </SafeAreaView>
        </ImageBackground>


        <View style={styles.container}>
            <GameEngine
                ref={(ref) => setGameEngine(ref)}
                style={styles.gameContainer}
                systems={[Physics, MoveSystem, HoleSystem]}
                entities={createWorld()}
                running={running}
                onEvent={onEvent}
            />
            {isVictory && (
                <View style={styles.messageContainer}>
                    <Text style={styles.victoryText}>You Win! 🎉</Text>
                </View>
            )}
        </View>

    );
};

const styles = StyleSheet.create({
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


        backgroundColor: 'transparent',
    },
    headerContainer: {
        paddingTop: 10,
        paddingBottom: 5,
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    levelText: {
        fontSize: 24,

        fontWeight: 'bold',
        color: 'white',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 2,

        backgroundColor: '#87CEEB',

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
        fontSize: 32,
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
    nextLevelText: {
        color: 'white',
        fontSize: 18,
        fontWeight: 'bold',
    }
});

export default GameScreen;
