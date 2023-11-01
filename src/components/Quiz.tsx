import React, { useState, useEffect } from 'react';
import './Quiz.css'
import QuizQuestion from '../core/QuizQuestion';
import QuizCore from '../core/QuizCore';


//QuizCore class encapsulates the core logic of the quiz 



interface QuizState {
  questions: QuizQuestion | null
  //currentQuestionIndex: number
  selectedAnswer: string | null
  score: number
}


const Quiz: React.FC = () => {
  const [quizCore] = useState(new QuizCore()); //initialize the QuizCore

  // Then I can access the methods and properties within the component logic
  //const currentQuestion = quizCore.getCurrentQuestion();
  // const [currentQuizQuestion, setCurrentQuestion] = useState<QuizQuestion | null>(quizCore.getCurrentQuestion());
  // const [selectedQuizAnswer, setSelectedAnswer] = useState<string | null>(null);
  // const [quizScore, setScore] = useState<number>(quizCore.getScore());
 

  //check whether there is next
  const isLastQuestion = !quizCore.hasNextQuestion();

  
  const initialQuestions: QuizQuestion[] = [
    {
      question: 'What is the capital of France?',
      options: ['London', 'Berlin', 'Paris', 'Madrid'],
      correctAnswer: 'Paris',
    },
  ];
  const [state, setState] = useState<QuizState>({
    questions: quizCore.getCurrentQuestion(),
    //currentQuestionIndex: 0,  // Initialize the current question index.
    selectedAnswer: null,  // Initialize the selected answer.
    score: 0,  // Initialize the score.
  });



  // encapsulate in useEffect() hook

  // useEffect(() => {
  //   setScore(quizCore.getScore());
  // }, [quizCore]);

  
  const handleOptionSelect = (option: string): void => {
    setState((prevState) => ({ ...prevState, selectedAnswer: option }));
    //TODO: CANNOT SELECT
    //setSelectedAnswer(option);
  }


  const handleButtonClick = (): void => {
    // Task3: Implement the logic for button click, such as moving to the next question.
    
    if(selectedAnswer !== null){
      quizCore.answerQuestion(selectedAnswer);
    }

    //
    const newScore = quizCore.getScore();
    quizCore.nextQuestion();


    setState({
      questions: quizCore.getCurrentQuestion(),
      selectedAnswer: null,
      score: newScore
    });
  } 

  const { questions, selectedAnswer, score } = state;
  const currentQuestion = quizCore.getCurrentQuestion();

  /*
  if (!currentQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {score} out of {questions.length}</p>
      </div>
    );
  }
  */

  // diaplay the user's score
  if (isLastQuestion) {
    return (
      <div>
        <h2>Quiz Completed</h2>
        <p>Final Score: {quizCore.getScore()} out of {quizCore.questions.length}</p>
      </div>
    );
  }
  

  return (
    <div>
      <h2>Quiz Question:</h2>
      <p>{currentQuestion.question}</p>
    
      <h3>Answer Options:</h3>
      <ul>
        {currentQuestion.options.map((option) => (
          <li
            key={option}
            onClick={() => handleOptionSelect(option)}
            className={selectedAnswer === option ? 'selected' : ''}
          >
            {option}
          </li>
        ))}
      </ul>

      <h3>Selected Answer:</h3>
      <p>{selectedAnswer ?? 'No answer selected'}</p>

      <button onClick={handleButtonClick}>

      {isLastQuestion ? 'Submit' : 'Next Question'}
      </button>
    </div>
  );
};

export default Quiz;