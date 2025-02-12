import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { GameEngine } from "react-native-game-engine";
import createWorld from "../entities/createWorld";
import Physics from "../systems/Physics";
import MoveSystem from "../systems/MoveSystem";

const GameScreen = () => {
    const [score, setScore] = useState(0);
    const [isVictory, setIsVictory] = useState(false);
    const world = createWorld();

    const onEvent = (event) => {
        if (event.type === "victory") {
            setIsVictory(true);
        }
    };

    return (
        <View style={{ flex: 1 }}>
            <GameEngine
                style={{ flex: 1, backgroundColor: "black" }}
                systems={[Physics, MoveSystem]}
                entities={world}
                running={true}
                onEvent={onEvent}
            />
            {isVictory && (
                <View style={styles.victoryContainer}>
                    <Text style={styles.victoryText}>Congratulations!</Text>
                    <Text style={styles.victorySubText}>You Win! 🎉</Text>
                </View>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    victoryContainer: {
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
});

export default GameScreen;
