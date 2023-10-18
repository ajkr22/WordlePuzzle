import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Button,
  StyleSheet,
  Modal,
} from 'react-native';
import questionsData from '../Data/data.json';
import {useNavigation} from '@react-navigation/native';

const shuffleString = str => {
  const array = str.split('');
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array.join('');
};

const GameScreen = ({route}) => {
  const {selectedOption} = route.params;
  const questions = questionsData[selectedOption.toLowerCase()];
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const currentQuestion = questions[currentQuestionIndex];
  const [jumbledAnswer, setJumbledAnswer] = useState('');
  const [filledAnswer, setFilledAnswer] = useState(
    Array(currentQuestion.answer.length).fill(''),
  );
  const [showNextButton, setShowNextButton] = useState(false);
  const [score, setScore] = useState(0);

  const [isModalVisible, setModalVisible] = useState(false);
  const [modalContent, setModalContent] = useState('');
  const navigation = useNavigation();

  const toggleModal = content => {
    setModalContent(content);
    setModalVisible(!isModalVisible);
  };

  useEffect(() => {
    const shuffledAnswer = shuffleString(currentQuestion.answer.toUpperCase());
    setJumbledAnswer(shuffledAnswer);
  }, [currentQuestion]);

  const handleSkip = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFilledAnswer(
        Array(questions[currentQuestionIndex + 1].answer.length).fill(''),
      );
      setShowNextButton(false);
    } else {
      navigation.navigate('Point', {score});
    }
  };

  const handleLetterPress = letter => {
    const indexOfNextEmptyBox = filledAnswer.indexOf('');
    if (indexOfNextEmptyBox !== -1) {
      const updatedFilledAnswer = [...filledAnswer];
      updatedFilledAnswer[indexOfNextEmptyBox] = letter;
      setFilledAnswer(updatedFilledAnswer);

      setShowNextButton(updatedFilledAnswer.every(letter => letter !== ''));
    }
  };

  const handleNext = () => {
    const userAnswer = filledAnswer.join('').toUpperCase();
    const correctAnswer = currentQuestion.answer.toUpperCase();
    const points = userAnswer === correctAnswer ? currentQuestion.points : 0;

    setScore(score + points);

    const modalMessage = `${
      userAnswer === correctAnswer
        ? '🎉 Hooray! You got it right! 🎉\n🚀 Well done, space explorer!'
        : '❌ Oops! Wrong answer! ❌\n🪐 Don’t worry, you’ll get it next time!'
    }\n\nYou earned ${points} point(s) for this question.\n\nTotal Score: ${
      score + points
    }.`;

    toggleModal(modalMessage);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setFilledAnswer(
        Array(questions[currentQuestionIndex + 1].answer.length).fill(''),
      );
      setShowNextButton(false);
    } else {
      navigation.navigate('Point', {score: score + points});
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>{selectedOption}</Text>
      </View>
      <View style={styles.emptyBoxesContainer}>
        {filledAnswer.map((letter, index) => (
          <View key={index} style={styles.emptyBox}>
            <Text style={styles.emptyBoxText}>{letter}</Text>
          </View>
        ))}
      </View>
      <View style={styles.questionContainer}>
        <Text style={{fontSize: 24}}>{currentQuestion.question}</Text>
        <View style={styles.answerContainer}>
          {jumbledAnswer.split('').map((letter, index) => (
            <TouchableOpacity
              key={index}
              style={styles.letterBox}
              onPress={() => handleLetterPress(letter)}>
              <Text style={styles.letterText}>{letter}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.buttonContainer}>
        {showNextButton ? (
          <TouchableOpacity style={styles.button} onPress={handleNext}>
            <Text style={styles.buttonText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleSkip}>
            <Text style={styles.buttonText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={isModalVisible}
        onRequestClose={() => {
          toggleModal('');
        }}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>{modalContent}</Text>
            <TouchableOpacity
              style={styles.modalButton}
              onPress={() => toggleModal('')}>
              <Text style={styles.buttonTextStyles}>OK</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 60,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textTransform: 'uppercase',
  },
  emptyBoxesContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 20,
  },
  emptyBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyBoxText: {
    fontSize: 18,
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  answerContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    marginTop: 20,
  },
  letterBox: {
    width: 40,
    height: 40,
    borderWidth: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 5,
  },
  letterText: {
    fontSize: 18,
  },
  buttonContainer: {
    marginTop: 20,
    borderRadius: 10,
    padding: 15,
    backgroundColor: 'rgba(255, 99, 71, 0.2)',
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'red',
    textAlign: 'center',
  },
  scoreContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 182, 193, 0.9)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'darkslategray',
    textAlign: 'center',
    marginBottom: 10,
  },
  modalButton: {
    marginTop: 10,
    backgroundColor: 'darkslategray',
    padding: 10,
    borderRadius: 5,
  },
  buttonTextStyles: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default GameScreen;
