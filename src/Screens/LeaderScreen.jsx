import React, {useState, useEffect} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import leaderData from '../Data/leaders.json';

const LeaderScreen = () => {
  const [userRank, setUserRank] = useState(null);
  const [leaderboardData, setLeaderboardData] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const points = await AsyncStorage.getItem('points');
        const userPoints = points ? parseInt(points) : 0;

        const rank =
          Object.values(leaderData).filter(user => user.points >= userPoints)
            .length + 1;
        setUserRank(rank);

        const leaderboard = Object.values(leaderData)
          .sort((a, b) => b.points - a.points)
          .map((user, index) => ({...user, rank: index + 1}));

        const newUser = {name: 'me', points: userPoints, rank};
        leaderboard.splice(rank - 1, 0, newUser);

        setLeaderboardData(leaderboard);
      } catch (error) {
        console.error('Error getting points from AsyncStorage: ', error);
      }
    };

    getUserData();
  }, []);

  const renderItem = ({item}) => {
    const isCurrentUser = item.name.toLowerCase() === 'me';
    return (
      <View
        style={[styles.itemContainer, isCurrentUser && styles.currentUserItem]}>
        <View style={styles.item}>
          <Text style={styles.rank}>{item.rank}.</Text>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.points}>{item.points} points</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Leaderboard</Text>
      {userRank !== null && (
        <Text style={styles.userRank}>Your Rank: {userRank}</Text>
      )}
      <FlatList
        data={leaderboardData}
        renderItem={renderItem}
        keyExtractor={item => `${item.rank}-${item.name}`}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f8ff',
    padding: 20,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#03a9f4',
    textAlign: 'center',
  },
  itemContainer: {
    backgroundColor: '#87ceeb',
    borderRadius: 10,
    marginVertical: 10,
  },
  currentUserItem: {
    backgroundColor: '#ffa500',
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    justifyContent: 'space-between',
  },
  rank: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#008000',
  },
  name: {
    fontSize: 18,
    color: '#ff0000',
  },
  points: {
    fontSize: 18,
    color: '#000',
  },
  userRank: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#e91e63',
    textAlign: 'center',
  },
  flatList: {
    marginTop: 10,
  },
});

export default LeaderScreen;
