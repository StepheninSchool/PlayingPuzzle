# PlayingPuzzle

## Project Overview

-PlayingPuzzle is a React Native video game prototype built using `react-native-game-engine` and `matter-js`. The game features multiple levels where players must navigate through obstacles, avoid enemies, and reach the goal to complete each level. The game supports touch gestures for interaction and is designed to run on mobile devices.

-This document provides step-by-step instructions for setting up, running, and contributing to the project.

- project created by:
-  [@StepheninSchool](https://github.com/StepheninSchool)
-  [@alex999alex](https://github.com/alex999alex)
-  [@uncreative01](https://github.com/uncreative01)
-  [@Mai](https://github.com/W0496269)
---

## Game Features

- **Game Engine and Physics:**
  - Uses `react-native-game-engine` for the game loop.
  - Uses `matter-js` for physics simulation, including gravity and collisions.

- **Levels:**
  - Multiple levels with increasing difficulty.
  - Levels include platforms, enemies, draggable cubes, and goal areas.
  - Players must complete one level to unlock the next.

- **Player Interaction:**
  - Touch gestures for movement and interaction.
  - Collisions with enemies or falling off the screen result in "Game Over."
  - Reaching the goal triggers a "Victory" state.

- **UI and Navigation:**
  - Main menu with options to start the game or select a level.
  - Level selection screen to choose unlocked levels.
  - Game screen displays the current level and handles game events.

- **Cross-Platform Support:**
  - Compatible with both mobile devices and web platforms.
  - updated 3/28/25 - removed mobile support to focus on web support.

---

## Setup & Installation

Follow these steps to set up and run the project:

### 1. Clone the Repository
```bash
git clone https://github.com/**your-github-username**/PlayingPuzzle.git
```
#### 2. Navigate to the project directory ####
```bash
cd PlayingPuzzle
```
##### 3. Install Dependancies #####
- Ensure you have Expo installed globally:
```bash
npm install -g expo-cli
```
- Install the required dependencies:
```bash
npm install
npm install react-native react-native-gesture-handler react-native-screens react-native-reanimated react-native-vector-icons react-native-safe-area-context react-native-dev-menu
npm install @react-navigation/native @react-navigation/stack
npm install react-native-game-engine matter-js
```
###### 4. Run The Project ###### 
- Start the development server
```bash
expo start
```
- Use the Expo Go app on your mobile device to scan the QR code and run the game or launch on web with by typing "w"

---------------------------------------------------------------------------------------------------------------------------

# Project Structure #
```bash
PlayingPuzzle/
├── components/         # Game logic and world creation
├── entities/           # Game entities like player, enemies, and platforms
├── levels/             # Level data and configurations
├── screens/            # UI screens (MainMenu, GameScreen, LevelSelectScreen)
├── styles/             # Styling for screens and components
├── assets/             # Images and other assets
├── App.js              # Main entry point
└── [README.md](http://_vscodecontentref_/1)           # Project documentation
```

# How To Play #
- Launch the game using the instructions above.
- From the main menu, choose "Start Game" to begin at Level 1 or "Level Select" to pick a level.
- Use the mouse  to move the cube and interact with the player objects.
- Avoid enemies and obstacles, and reach the goal to complete the level.
- If you fall or collide with an enemy, you’ll see a "Game Over" screen with options to restart or return to the main menu.

---------------------------------------------------------------------------------------------------------------------------

# TODO: #
- Add sound effects and background music.
- Improve level selection UI with locked/unlocked indicators.
- Add animations for player movement and interactions.
