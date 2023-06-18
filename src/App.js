import axios from 'axios'
import React from 'react'
import { useGlobalContext } from './context'

import SetupForm from './SetupForm'
import Loading from './Loading'
import Modal from './Modal'
function App() {
  //useGlobaContext provides access to the context 
  const { waiting, loading, questions, index, correct, nextQuestion, checkAnswer } = useGlobalContext();

  //Initally we will show the SetUp form in our App since it is set to true
  if (waiting) {
    return <SetupForm></SetupForm>
  }
  if (loading) {
    return <Loading></Loading>
  }

  //from te question object we want correct answers, incorrect answers and the question
  //destructuring of Array
  const { question, incorrect_answers, correct_answer } = questions[index];



  let answers = [...incorrect_answers];
  const tempIndex = Math.floor(Math.random() * 4);

  //The correct answer should be at a random index
  if(tempIndex == 3){
    answers.push(correct_answer);
  } else{
    answers.push(answers[tempIndex]);
    answers[tempIndex] = correct_answer;
  }
  //The question and some answers from the object is not string it is actually HTML element hence we need to set dangerouslySetInnerHTML
  return <main>
    <Modal></Modal>
    <section className='quiz'>
      <p className='correct-answers'>
        correct answers : {correct}/{index};
      </p>
      <article className='container'>
        <h2 dangerouslySetInnerHTML={{ __html: question }} />

        <div className='btn-container'>
          {answers.map((answer, index) => {
            return (<button key={index} className='answer-btn' onClick={() => checkAnswer(correct_answer === answer)} dangerouslySetInnerHTML={{
              __html: answer
            }}></button>
            )
          })}

        </div>
      </article>

      <button className='next-question' onClick={nextQuestion}>Next Questions</button>



    </section>
  </main>

  //or we can also do:- onClick={setIndex("index+1")}
}

export default App
