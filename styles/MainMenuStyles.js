import { StyleSheet } from 'react-native';


const styles = StyleSheet.create({
    backgroundImage: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    container: { 
      flex: 1, 
      justifyContent: 'center', 
      alignItems: 'center', 
      backgroundColor: 'transparent'  // Changed from 'black' to transparent
    },
    title: { 
      fontSize: 36, 
      color: 'white', 
      marginBottom: 30,
      fontWeight: 'bold',
      textShadowColor: 'rgba(0, 0, 0, 0.75)',
      textShadowOffset: { width: 2, height: 2 },
      textShadowRadius: 5
    },
    button: { 
      backgroundColor: 'blue', 
      paddingVertical: 15,
      paddingHorizontal: 30,
      borderRadius: 10,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 3
    },
    buttonText: { 
      color: 'gold', 
      fontSize: 20,
      fontWeight: 'bold'
    },
  });

  export default styles;