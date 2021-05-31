import React, {Component} from 'react'
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends Component {
  state = {
    results: {},
    activeQuestion: 0,
    answerState: null,
    isQuizFinished: false,
    quiz: [
      {
        id: 1,
        question: 'Какого цвета солнце?',// active question 0
        rightAnswerId: 4,
        answers: [
          {text: 'Желтого', id: 1},
          {text: 'Оранжевого', id: 2},
          {text: 'Красного', id: 3},
          {text: 'Солнечного', id: 4},
          {text: 'Цвета света', id: 5},
        ]
      },
      // {
      //   id: 2,
      //   question: 'Сколько лет планете Земля?',
      //   rightAnswerId: 1,
      //   answers: [
      //     {text: '3.5 миллиарда', id: 1},
      //     {text: '3.5 трилиарда', id: 2},
      //     {text: '3.5 мильёрда', id: 3},
      //     {text: '3.5 минуты', id: 4},
      //   ]
      // },
      // {
      //   id: 3,
      //   question: 'Какое море на вкус?',
      //   rightAnswerId: 4,
      //   answers: [
      //     {text: 'Кислое', id: 1},
      //     {text: 'Сладкое', id: 2},
      //     {text: 'Вишнёвое', id: 3},
      //     {text: 'Солёное', id: 4},
      //   ]
      // },
    ],
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

  componentDidMount() {
    console.log(`Quiz ID = ${this.props.match.params.id}`)
  }

  render() {
    return (
      <div className={classes.Quiz}>
        <div className={classes.QuizWrapper}>
          <h1>Answer all questions</h1>
          {
            this.state.isQuizFinished
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
              />
          }
        </div>
      </div>
    )
  }
}

export default Quiz