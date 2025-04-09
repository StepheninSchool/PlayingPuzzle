import React, { useEffect, useState } from "react";
import { View, Text, ImageBackground, TouchableOpacity, SafeAreaView } from "react-native";
import { GameEngine } from "react-native-game-engine";
import createWorld from "../components/createWorld";
import Physics from "../systems/Physics";
import MoveSystem from "../systems/MoveSystem";
import HoleSystem from "../systems/HoleSystem";
import LevelData from "../levels/LevelData";
import styles from "../styles/GameScreenStyles";
import { Audio } from "expo-av";

const GameScreen = ({ route, navigation }) => {
    const { level } = route.params || { level: 1 };
    const [gameEngine, setGameEngine] = useState(null);
    const [running, setRunning] = useState(true);
    const [isVictory, setIsVictory] = useState(false);
    const [isDeath, setIsDeath] = useState(false);
    const [currentLevel, setCurrentLevel] = useState(level);
    const [showNextButton, setShowNextButton] = useState(false);
    const [sounds, setSounds] = useState(null); // Initialize as null to indicate loading

    // Load sounds when the component mounts
    useEffect(() => {
        const loadSounds = async () => {
            try {
                const jumpSound = new Audio.Sound();
                const collisionSound = new Audio.Sound();
                const victorySound = new Audio.Sound();
                const deathSound = new Audio.Sound();

                await Promise.all([
                    jumpSound.loadAsync(require("../assets/sounds/jump.mp3")),
                    collisionSound.loadAsync(require("../assets/sounds/collision.mp3")),
                    victorySound.loadAsync(require("../assets/sounds/victory.mp3")),
                    deathSound.loadAsync(require("../assets/sounds/death.mp3")),
                ]);

                setSounds({ jumpSound, collisionSound, victorySound, deathSound });
            } catch (error) {
                console.error("Error loading sounds:", error);
            }
        };

        loadSounds();

        return () => {
            // Unload sounds when the component unmounts
            if (sounds) {
                Object.values(sounds).forEach((sound) => {
                    sound.unloadAsync().catch(() => {});
                });
            }
        };
    }, []);

    // Reset the game state when the level changes
    useEffect(() => {
        if (sounds) {
            setRunning(true);
            setIsVictory(false);
            setIsDeath(false);
            setShowNextButton(false);

            if (gameEngine) {
                gameEngine.swap(createWorld(currentLevel, sounds)); // Pass sounds to the world
            }

            console.log(`Level ${currentLevel} loaded`);
        }
    }, [currentLevel, sounds]);

    useEffect(() => {
        setRunning(true);

        if (typeof document !== "undefined") {
            const handleMouseEvent = (event) => {
                if (gameEngine && gameEngine.dispatch) {
                    gameEngine.dispatch(event);
                }
            };

            document.addEventListener("mousedown", handleMouseEvent);
            document.addEventListener("mousemove", handleMouseEvent);
            document.addEventListener("mouseup", handleMouseEvent);

            return () => {
                document.removeEventListener("mousedown", handleMouseEvent);
                document.removeEventListener("mousemove", handleMouseEvent);
                document.removeEventListener("mouseup", handleMouseEvent);
            };
        }
    }, [gameEngine]);

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
            sounds?.victorySound.playAsync(); // Play victory sound
        } else if (event.type === "death") {
            setIsDeath(true);
            setRunning(false);
            sounds?.deathSound.playAsync(); // Play death sound
        }
    };

    const goToNextLevel = () => {
        if (currentLevel < LevelData.length) {
            setCurrentLevel(currentLevel + 1);
        }
    };

    const restartLevel = () => {
        setRunning(true);
        setIsVictory(false);
        setIsDeath(false);
        setShowNextButton(false);

        if (gameEngine) {
            gameEngine.swap(createWorld(currentLevel, sounds));
        }
    };

    if (!sounds) {
        // Show a loading screen while sounds are being loaded
        return (
            <View style={styles.container}>
                <Text style={styles.levelText}>Loading...</Text>
            </View>
        );
    }

    return (
        <ImageBackground
            source={require("../assets/background.png")}
            style={styles.backgroundImage}
            resizeMode="cover"
        >
            <SafeAreaView style={styles.container}>
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
                    entities={createWorld(currentLevel, sounds)}
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

                        <TouchableOpacity
                            style={styles.mainMenuButton}
                            onPress={() => navigation.navigate("MainMenu")}
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

                        <TouchableOpacity
                            style={styles.mainMenuButton}
                            onPress={() => navigation.navigate("MainMenu")}
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