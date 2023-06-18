import React from 'react'
import { useGlobalContext } from './context'

const Modal = () => {

  const { isModalOpen, closeModal, correct, questions } = useGlobalContext();
  return (

    //If modal is Open so set classes modal-container and isOpen.
    //If modal is not open so only open modal-container class
    <div className={`${isModalOpen ? 'modal-container isOpen' : 'modal-container'}`}>
      <div className='modal-content'>
        <h2>Congrats!</h2>
        <p>You answered {((correct / questions.length) * 100).toFixed(0)}% questions Correct!</p>
        <button className='close-btn' onClick={closeModal}>Play Again</button>
      </div>
    </div>
  )
}

//toFixed() rounds the number to specified decimals because we don't need too many numbers in our score

export default Modal
