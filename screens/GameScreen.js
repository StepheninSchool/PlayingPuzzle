import React from "react";
import { GameEngine } from "react-native-game-engine";
import createWorld from "../entities/createWorld";
import Physics from "../systems/Physics";
import MoveSystem from "../systems/MoveSystem";

const GameScreen = () => {
    const world = createWorld();

    return (
        <GameEngine
            style={{ flex: 1, backgroundColor: "black" }}
            systems={[Physics, MoveSystem]} // ✅ Ensure both systems are running
            entities={world}
        />
    );
};

export default GameScreen;
