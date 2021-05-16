import React from 'react'
import classes from './FinishedQuiz.module.css'
import Button from "../UI/Button/Button";

const FinishedQuiz = props => {
  const successCount = Object.keys(props.results).reduce((total, key) => {

    if (props.results[key] === 'success') {
      total++
    }

    return total
  }, 0)

  console.log(successCount)

  return (
    <div className={classes.FinishedQuiz}>
      <ul>
        {
          props.quiz.map((quizItem, index) => {
            const cls = [
              'fa',
              props.results[quizItem.id] === 'success'
                ? 'fa-check'
                : 'fa-times',
              classes[props.results[quizItem.id]]
            ]

            return (
              <li
                key={index}
              >
                <strong>{index + 1}</strong>.&nbsp;
                {quizItem.question}
                <i className={cls.join(' ')}/>
              </li>
            )
          })
        }
      </ul>
      <p>Правильно {successCount} из {props.quiz.length}</p>
      <div>
        <Button onClick={props.onRepeatCLick} type={'primary'}>Повторить</Button>
        <Button type={'success'}>Перейти к выбору теста</Button>
      </div>
    </div>
  )
}

export default FinishedQuiz