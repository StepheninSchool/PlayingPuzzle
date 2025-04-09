import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    backgroundImage: {
        flex: 1,
        width: '100%',
        height: '100%',
    },
    container: { 
        flex: 1, 
        justifyContent: 'flex-end', // Push content to the bottom
        alignItems: 'center', 
        backgroundColor: 'transparent',
        paddingHorizontal: 20, // Add padding for better alignment
        paddingBottom: 50, // Add padding at the bottom for spacing
    },
    title: { 
        fontSize: 48, // Increase font size for better visibility
        color: 'white', 
        marginBottom: 50, // Add more space below the title
        fontWeight: 'bold',
        textShadowColor: 'rgba(0, 0, 0, 0.75)',
        textShadowOffset: { width: 2, height: 2 },
        textShadowRadius: 5,
        textAlign: 'center', // Center the title text
    },
    button: { 
        backgroundColor: '#4CAF50', // Change to a green color for a modern look
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 25, // Make buttons more rounded
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.3,
        shadowRadius: 3,
        marginVertical: 10, // Add spacing between buttons
        width: '80%', // Make buttons take up 80% of the screen width
    },
    buttonText: { 
        color: 'white', 
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default styles;