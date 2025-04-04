import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
  container: {
    flex: 1,
    backgroundColor: "transparent",
  },
  leftSideHeaderContainer: {
    position: "absolute",
    left: 0,
    top: 20,
    zIndex: 10,
  },
  levelBadge: {
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderTopRightRadius: 15,
    borderBottomRightRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 2, height: 2 }, // Make sure this is 'width'
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 5,
  },
  levelText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "white",
    textShadowColor: "rgba(0, 0, 0, 0.75)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  gameContainer: {
    flex: 1,
  },
  messageContainer: {
    position: "absolute",
    top: "40%",
    left: 0,
    right: 0,
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.7)",
    padding: 20,
  },
  victoryText: {
    color: "gold",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  deathText: {
    color: "#ff4444",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
  nextLevelButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  restartButton: {
    backgroundColor: "#ff4444",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    marginTop: 10,
  },
  nextLevelText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },
  restartText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
  },


// Add styles for victory and death messages
victoryMessage: {
    color: "gold",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
},
deathMessage: {
    color: "#ff4444",
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
  },
});
export default styles;
