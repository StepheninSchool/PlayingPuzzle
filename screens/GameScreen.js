import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { View, Text, StyleSheet, Platform, ImageBackground, SafeAreaView } from "react-native";
=======
import { View, Text, StyleSheet, Platform } from "react-native";
>>>>>>> parent of 07962da (Refactor DraggableCube and GameScreen components for improved styling and functionality)
import { GameEngine } from "react-native-game-engine";
import createWorld from "../entities/createWorld";
import Physics from "../systems/Physics";
import MoveSystem from "../systems/MoveSystem";
import HoleSystem from "../systems/HoleSystem";

const GameScreen = () => {
    const [gameEngine, setGameEngine] = useState(null);
    const [running, setRunning] = useState(true);
    const [isVictory, setIsVictory] = useState(false);

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

    const onEvent = (event) => {
        if (event.type === "victory") {
            setIsVictory(true);
            setRunning(false);
        }
    };

    return (
<<<<<<< HEAD
        <ImageBackground
            source={require('../assets/background.png')}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
                {/* Level Header */}
                <View style={styles.headerContainer}>
                    <Text style={styles.levelText}>Level 1</Text>
                </View>
                
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
            </SafeAreaView>
        </ImageBackground>
=======
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
>>>>>>> parent of 07962da (Refactor DraggableCube and GameScreen components for improved styling and functionality)
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
<<<<<<< HEAD
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
        textShadowRadius: 2
=======
        backgroundColor: '#87CEEB',
>>>>>>> parent of 07962da (Refactor DraggableCube and GameScreen components for improved styling and functionality)
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
    },
});

export default GameScreen;
