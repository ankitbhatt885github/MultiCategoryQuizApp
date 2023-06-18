import axios from 'axios'
import React, { useState, useContext, useEffect } from 'react'

const table = {
  sports: 21,
  history: 23,
  politics: 24,
}

const API_ENDPOINT = 'https://opentdb.com/api.php?'

const url = ''
const tempUrl = 'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

//we created a context
const AppContext = React.createContext()

//Context has access to all children of the App component in our app.
const AppProvider = ({ children }) => {


  //if we are waiting we need to display setup form of Quiz where user selects the set of questions
  const [waiting, setWaiting] = useState(true);

  //while fetching data we show leading
  const [loading, setLoading] = useState(false);

  //question will be in array and will be 0th indexed
  const [questions, setQuestions] = useState([]);

  //Initally 1st question will be dsiplayed from 0th index
  const [index, setIndex] = useState(0);

  //the number of correct answers
  const [correct, setCorrect] = useState(0);

  //if API cannot get quesions so we generated an error
  const [error, setError] = useState(false);

  //note that the names should match with what we get in the respoonse
  //using useState with object
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easay'
  })

  //modal that shows the final result percentage
  const [isModalOpen, setIsModalOpen] = useState(false);


  //function to fetch questions from the API
  const fetchQuestions = async (url) => {
    setLoading(true);
    setWaiting(false);

    //response will get the array of questions
    const response = await axios(url).catch((err) => console.log(err))

    //if we get some response then only we load questions
    if (response) {

      const data = response.data.results;
      //if API could not get any questions so the length of data will be zero.
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setWaiting(false);
        setError(false);
      } else {
        //If API gets no questions
        setWaiting(true)
        setError(true);
      }
    } else {
      setWaiting(true)
    }
  }

  const nextQuestion = () => {
    setIndex((oldIndex) => {
      const index = oldIndex + 1;
      if (index > questions.length - 1) {
        //openModal because we don't have any more questions left 
        //We will go to the form again

        //if we reach end of array we open the modal
        openModal();
        return 0;
      } else {
        return index;

      }
    })
  }

  //function to check whether clicked answer is correct or not
  //through the API we get the correct_answer, we match it with the clicked option
  const checkAnswer = (value) => {

    if (value) {
      setCorrect((oldState) => {
        return oldState + 1;
      })
      //answer is correct or not we still go to next question

    }
    nextQuestion();
  }


  //to open the model
  const openModal = () => {
    setIsModalOpen(true);
  }

  //function to close modal
  const closeModal = () => {

    setWaiting(true);
    setCorrect(0);
    setIsModalOpen(false);
  }




  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setQuiz({...quiz,[name]:value});

  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const {amount,category,difficulty} = quiz;

    

    const url = `${API_ENDPOINT}amount=${amount}&difficulty=${difficulty}&category=${table[category]}&type=multiple`;
    fetchQuestions(url);
  }

 
  return <AppContext.Provider value={{
    waiting,
    loading,
    questions,
    index,
    correct,
    error,
    isModalOpen,
    nextQuestion,
    checkAnswer,
    closeModal,
    quiz,
    handleChange,
    handleSubmit

  }}
  >{children}</AppContext.Provider>
}
// make sure to use
export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider };
