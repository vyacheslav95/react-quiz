import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from "../../axios/axios-quiz";
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends Component {
  state = {
    results: {},
    activeQuestion: 0,
    answerState: null,
    isQuizFinished: false,
    quiz: [],
    loading: true
  }

  onAnswerClickHandler = answerId => {
    if (this.state.answerState) {
      const key = Object.keys(this.state.answerState)[0]
      if (this.state.answerState[key] === 'success') {
        return
      }
    }

    const question = this.state.quiz[this.state.activeQuestion]
    const results = this.state.results

    if (question.rightAnswerId === answerId) {
      if (!results[question.id]) {
        results[question.id] = 'success'
      }

      this.setState({
        answerState: {[answerId]: 'success'},
        results
      })

      const timeout = window.setTimeout(() => {
        if (this.isQuizFinished()) {
          this.setState({
            isQuizFinished: true
          })
        } else {
          this.setState(prevState => {
            return {
              activeQuestion: prevState.activeQuestion + 1,
              answerState: null
            }
          })
        }
        window.clearTimeout(timeout)
      }, 1000)
    } else {
      results[question.id] = 'error'

      this.setState({
        answerState: {[answerId]: 'error'},
        results,
      })
    }
  }

  isQuizFinished = () => this.state.quiz.length === this.state.activeQuestion + 1

  onRepeatCLickHandler = () => this.setState({
    activeQuestion: 0,
    answerState: 0,
    isQuizFinished: false,
    results: {},
  })

  async componentDidMount() {
    try {
      const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
      const quiz = response.data

      this.setState({
        quiz,
        loading: false
      })
    } catch (e) {
      console.log(e)
    }
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Ответьте на все вопросы</h1>
          {this.state.loading
            ? <Loader/>
            : this.state.isQuizFinished
              ? <FinishedQuiz
                results={this.state.results}
                quiz={this.state.quiz}
                onRepeatCLick={this.onRepeatCLickHandler}
              />
              : <ActiveQuiz
                quizLength={this.state.quiz.length}
                answerNumber={this.state.activeQuestion + 1}
                question={this.state.quiz[this.state.activeQuestion].question}
                answers={this.state.quiz[this.state.activeQuestion].answers}
                onAnswerClick={this.onAnswerClickHandler}
                answerState={this.state.answerState}
              />}
        </div>
      </div>
    )
  }
}

export default Quiz