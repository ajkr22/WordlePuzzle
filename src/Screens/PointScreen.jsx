import React, {useEffect} from 'react';
import {View, Text, TouchableOpacity, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';

const PointScreen = ({route}) => {
  const {score} = route.params;
  const navigation = useNavigation();

  useEffect(() => {
    const savePointsToStorage = async () => {
      try {
        const existingPoints = await AsyncStorage.getItem('points');
        const totalPoints = existingPoints
          ? parseInt(existingPoints) + score
          : score;
        await AsyncStorage.setItem('points', totalPoints.toString());
      } catch (error) {
        console.error('Error saving points to AsyncStorage: ', error);
      }
    };

    savePointsToStorage();
  }, [score]);

  return (
    <View style={styles.container}>
      <Text style={styles.congratulationsText}>🎉 Congratulations! 🎉</Text>
      <Text style={styles.pointsText}>You've earned {score} points! 🌟</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Welcome')}>
        <Text style={styles.buttonText}>Back to Welcome Screen</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffefd5',
  },
  congratulationsText: {
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#20b2aa',
  },
  pointsText: {
    fontSize: 24,
    marginBottom: 30,
    color: '#ff4500',
  },
  button: {
    backgroundColor: '#20b2aa',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 10,
  },
  buttonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});

export default PointScreen;
