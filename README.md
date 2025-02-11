Project Overview

This is a React Native video game prototype using react-native-game-engine and matter-js. Currently allows interacting with an object using touch gestures.

This document provides step-by-step instructions for setting up, running, and contributing to the project.


Game Features:

Uses react-native-game-engine for game loop
Uses matter-js for physics
Touch gestures for interaction
supports collision with platforms

Prototype Scaffolding:

/PlayingPuzzle
│── assets/              # Game assets (images, sounds, etc.)
│── components/          # React components (UI elements, menu, etc.)
│── entities/            # Game objects (Player, Floor, Platforms)
│── hooks/               # Custom React Hooks
│── screens/             # Main screens (Game, Main Menu)
│── systems/             # Game logic (Physics, Movement, Updates)
│── App.js               # Main entry file
│── package.json         # Dependencies and scripts
│── index.js             # App entry point
│── README.md            # You are here!

*****************SETUP & INSTALLATION***********************

1. CLONE THE REPOSITORY: "git clone https://github.com/<**your-github-username>**/PlayingPuzzle.git
2. CHANGE TO THE NEW DIRECTORY: "cd PlayingPuzzle"
3. INSTALL DEPENDANCIES:
   Ensure you have expo installed:
   npm install -g expo-cli
   **(IF repo not cloned, create new project - "expo init PlayingPuzzle" "cd PlayingPuzzle")**
   npm install react-native react-native-gesture-handler react-native-screens react-native-reanimated react-native-vector-icons react-native-safe-area-context react-native-dev-menu
   npm install @react-navigation/native @react-navigation/stack
   npm install react-native-screens react-native-safe-area-context
   npm install react-native-game-engine matter-js


//TODO: FINISH README.


  
