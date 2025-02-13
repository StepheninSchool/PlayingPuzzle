import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import createWorld from "../entities/createWorld";
import Physics from "../systems/Physics";
import MoveSystem from "../systems/MoveSystem";
import EnemySystem from "../systems/EnemySystem";

const GameScreen = () => {
    const [score, setScore] = useState(0);
    const [isVictory, setIsVictory] = useState(false);
    const [isDead, setIsDead] = useState(false);
    const [gameEngine, setGameEngine] = useState(null);
    const [running, setRunning] = useState(true);
    const world = createWorld();

    useEffect(() => {
        const handleKeyDown = (e) => {
            if (gameEngine && !e.repeat) {
                if (isDead && e.key === " ") {
                    // Restart game on spacebar when dead
                    setIsDead(false);
                    setRunning(true);
                    gameEngine.swap(createWorld());
                } else {
                    gameEngine.dispatch({ type: "keydown", key: e.key });
                }
            }
        };

        const handleKeyUp = (e) => {
            if (gameEngine) {
                gameEngine.dispatch({ type: "keyup", key: e.key });
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        window.addEventListener("keyup", handleKeyUp);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [gameEngine, isDead]);

    const onEvent = (event) => {
        if (event.type === "victory") {
            setIsVictory(true);
            setRunning(false);
        } else if (event.type === "game-over") {
            setIsDead(true);
            setRunning(false);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <GameEngine
                ref={(ref) => setGameEngine(ref)}
                style={{ flex: 1, backgroundColor: "black" }}
                systems={[Physics, MoveSystem, EnemySystem]}
                entities={world}
                running={running}
                onEvent={onEvent}
            />
            {isVictory && (
                <View style={styles.messageContainer}>
                    <Text style={styles.victoryText}>Congratulations!</Text>
                    <Text style={styles.victorySubText}>You Win! 🎉</Text>
                </View>
            )}
            {isDead && (
                <View style={styles.messageContainer}>
                    <Text style={styles.gameOverText}>You're Dead!</Text>
                    <Text style={styles.gameOverSubText}>Press SPACE to restart</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
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
    victorySubText: {
        color: 'white',
        fontSize: 24,
        marginTop: 10,
        textAlign: 'center',
    },
    gameOverText: {
        color: 'red',
        fontSize: 32,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    gameOverSubText: {
        color: 'white',
        fontSize: 24,
        marginTop: 10,
        textAlign: 'center',
    },
});

export default GameScreen;
