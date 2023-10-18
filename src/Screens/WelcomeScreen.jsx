import React, {useState} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const WelcomeScreen = () => {
  const [selectedOption, setSelectedOption] = useState(null);
  const navigation = useNavigation();

  const handleOptionSelect = option => {
    setSelectedOption(option);
  };

  const navigateToGameScreen = () => {
    if (selectedOption) {
      navigation.navigate('Game', {selectedOption});
    }
  };

  const navigateToLeaderboard = () => {
    navigation.navigate('Leader');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.heading}>Word Puzzle</Text>
      </View>
      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionBox,
            selectedOption === 'Animals' ? styles.selectedOption : null,
          ]}
          onPress={() => handleOptionSelect('Animals')}>
          <Text style={[styles.optionText, {fontStyle: 'italic'}]}>
            Animals
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionBox,
            selectedOption === 'Countries' ? styles.selectedOption : null,
          ]}
          onPress={() => handleOptionSelect('Countries')}>
          <Text style={[styles.optionText, {fontStyle: 'italic'}]}>
            Countries
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.optionBox,
            selectedOption === 'Fruits' ? styles.selectedOption : null,
          ]}
          onPress={() => handleOptionSelect('Fruits')}>
          <Text style={[styles.optionText, {fontStyle: 'italic'}]}>Fruits</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.startButton,
            selectedOption
              ? {backgroundColor: 'lightcoral'}
              : {backgroundColor: 'lightgrey'},
          ]}
          onPress={navigateToGameScreen}
          disabled={!selectedOption}>
          <Text style={[styles.buttonText, {color: 'white'}]}>Start</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.leaderboardButton}
          onPress={navigateToLeaderboard}>
          <Text style={[styles.buttonText, {color: 'white'}]}>Leaderboard</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 30,
  },
  header: {
    backgroundColor: 'lightblue',
    padding: 10,
    borderRadius: 15,
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    fontWeight: 'bold',
    color: 'darkblue',
  },
  optionsContainer: {
    marginTop: 80,
  },
  optionBox: {
    backgroundColor: 'lightgrey',
    padding: 10,
    marginBottom: 10,
    borderRadius: 15,
  },
  selectedOption: {
    backgroundColor: 'lightblue',
  },
  optionText: {
    fontSize: 18,
    textAlign: 'center',
  },
  buttonContainer: {
    marginTop: 50,
  },
  startButton: {
    backgroundColor: 'lightcoral',
    padding: 10,
    borderRadius: 15,
  },
  buttonText: {
    fontSize: 20,
    textAlign: 'center',
  },
  leaderboardButton: {
    backgroundColor: 'lightseagreen',
    padding: 10,
    borderRadius: 15,
    marginTop: 20,
  },
});

export default WelcomeScreen;
