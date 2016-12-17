import React from 'react';
import QuizSelectionSelement from './quizSelection';
import QuizIntroElement from './quizIntro';
import QuizFinalElement from './quizFinal';

var timer = null;
export default class QuizRootElement extends React.Component {

  // - ===============================================================================
  // - Life cycle

  constructor(props) {
    super(props);

    this.state = {
      questionList: [],
      activeQuestion: null,
      activeQuestionSelectedIndex: null,
      totalScore: null,
      showValidation: false,
      time: null,
    };
  }

  render() {
    let content = null;
    let actions = null;
    
    // - User need to answer a question
    if (this.state.activeQuestion) {
      content = (
        <QuizSelectionSelement quizItem={this.state.activeQuestion}
                               selectedIndex={this.state.activeQuestionSelectedIndex}
                               onSelect={(index) => {
                                 this.setState({
                                   activeQuestionSelectedIndex: index
                                 });
                               }}
                               showValidation={this.state.showValidation}
                               questionNumber={10 - this.state.questionList.length}
        />
      );
      actions = (
        <div>
          <button 
            onClick={(this.state.activeQuestionSelectedIndex === null || this.state.showValidation === true) ? null : this.validateQuestion.bind(this)} 
            style={(this.state.activeQuestionSelectedIndex === null || this.state.showValidation === true) ? styles.inactiveButton : styles.button}>
            Validate
          </button>
          <button 
            onClick={this.skipQuestion.bind(this)}
            style={styles.button}>
            Skip
          </button>
          <label style={styles.statusLabel}>
            {'Time: ' + this.state.time + ', Score: ' + (this.state.totalScore || 0)}
          </label>
        </div>
      );
    }
    // - User needs to see final results
    else if (this.state.totalScore) {
      content = (
        <QuizFinalElement totalScore={this.state.totalScore}/>
      );
      actions = (
        <div>
          <button onClick={this.loadQuizQuestions.bind(this)} style={styles.button}>RESET</button>
        </div>
      );
    }
    // - User needs to start the quiz
    else {
      content = (
        <QuizIntroElement/>
      );
      actions = (
        <div>
          <button onClick={this.showNextQuestion.bind(this)} style={styles.button}>START</button>
        </div>
      );
    }
    
    return(
      <div>
        <h2 style={styles.title}>Welcome to my application, access denied to underage persons!</h2>
        {content}
        {actions}
      </div>
    );
  }

  componentDidMount() {
    this.loadQuizQuestions();
  }

  // - ===============================================================================
  // - Utils

  resetTimer() {
    
    this.setState({
      time: 10,
    });
    
    timer = setInterval(() => {
      let time = this.state.time;
      
      if (time === 0) {
        let totalScore = this.state.totalScore || 0;
        totalScore -= 20;
        this.setState({
          totalScore: totalScore,
        });
        this.showNextQuestion();
      }
      else {
        time -= 1;
        this.setState({time: time});
      }
    }, 1000);
  }
  
  invalidateTimer() {
    clearInterval(timer);
  }

  showNextQuestion() {
    this.invalidateTimer();
    let newActiveQuestion = null;
    let questions = this.state.questionList;

    if (questions.length > 0) {
      let randomIndex = this.getRandomInt(0, questions.length-1);
      newActiveQuestion = questions[randomIndex];
      questions.splice(randomIndex, 1);
      this.resetTimer();
    }

    this.setState({
      questionList: questions,
      activeQuestion: newActiveQuestion,
    });

  }

  /**
   * Validate the response and update score
   */
  validateQuestion() {
    
    this.invalidateTimer();
    
    let totalScore = this.state.totalScore || 0;
    if (this.state.activeQuestionSelectedIndex == this.state.activeQuestion.answerId) {
      totalScore += 10;
    }
    else {
      totalScore -= 5;
    }
    
    console.log('setting state');
    this.setState({
      showValidation: true,
      totalScore: totalScore,
    });
    window.setTimeout(() => {
      console.log('timeout reached');
      this.setState({
        showValidation: false,
        activeQuestionSelectedIndex: null,
      });
      this.showNextQuestion();
    }, 1500);
  }

  /**
   * Skip current question and jump to the next one
   */
  skipQuestion() {
    let totalScore = this.state.totalScore || 0;
    totalScore -= 2;
    this.setState({
      totalScore: totalScore,
    });
    this.showNextQuestion();
  }

  /**
   * returns a random int between min and max value
   * @param min
   * @param max
   * @returns {*}
   */
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  /**
   * Gets 10 random elements from a list
   * @param list
   * @returns {Array}
   */
  getRandom10Questions(list) {
    let listToReturn = [];
    
    while (listToReturn.length < 10 && list.length > 0) {
      let randomIndex = this.getRandomInt(0, list.length - 1);
      listToReturn.push(list[randomIndex]);
      list.splice(randomIndex, 1);
    }
    
    return listToReturn;
  }

  /**
   * Start the request
   */
  loadQuizQuestions() {
    // - Get all questions as json using XML request
    this.loadJSON('react-app/resources/quiz.json', (response) => {
      this.setState({
        questionList: this.getRandom10Questions(response.questions),
        activeQuestion: null,
        activeQuestionSelectedIndex: null,
        totalScore: null,
      });
    }, (error) => {
      alert(error);
    });
  }

  /**
   * Load json object from the file at given path
   * @param path
   * @param success
   * @param error
   */
  loadJSON(path, success, error)  {
    let xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function()
    {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          if (success)
            success(JSON.parse(xhr.responseText));
        } else {
          if (error)
            error(xhr);
        }
      }
    };
    xhr.open("GET", path, true);
    xhr.send();
  }
}

const styles = {
  
  title: {
    fontFamily: 'MeltixBold',
    fontSize: 30,
    align: 'center',
    color: '#4CAF50',
    textAlign: 'center',
  },
  
  statusLabel: {
    padding: 10,
    fontFamily: 'MeltixBold',
    fontSize: 14,
    align: 'center',
    color: 'white',
    textAlign: 'center',
    backgroundColor: '#90A4AE',
    borderRadius: 4,
  },
  
  button: {
    outline: 'none',
    fontFamily: 'MeltixLight',
    fontSize: 15,
    height: 40,
    width: 100,
    borderRadius: 4,
    marginRight: 15,
    marginTop: 15,
    color: '#424242',
    backgroundColor: '#A5D6A7',
  },

  inactiveButton: {
    outline: 'none',
    fontFamily: 'MeltixLight',
    fontSize: 15,
    height: 40,
    width: 100,
    borderRadius: 4,
    marginRight: 15,
    marginTop: 15,
    color: '#E0E0E0',
    backgroundColor: '#BDBDBD',
  },
};