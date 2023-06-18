import React from 'react'
import { useGlobalContext } from './context'

const SetupForm = () => {

  const { quiz, handleChange, handleSubmit, error } = useGlobalContext();
  return <main>
    <section className='quiz quiz-small'>
      <form className='setup-form'>
        <h2>SetUp Your Quiz</h2>
        {/* amount i.e. the number of questions */}
        <div className='form-control'>
          <label htmlFor='amount'>Number of questions</label>
          <input type='number' name='amount' id='amount' value={quiz.amount} onChange={handleChange} className='form-input'
            min={1}
            max={50} />

          {/* Min questions can be 1 and max can be 50  */}

        </div>


        {/* category  */}
        <div className='form-control'>
          <label htmlFor='category'>Category</label>
          <select name='category' id='category' className='form-input' value={quiz.category} onChange={handleChange}>
            <option value="sports">Sports</option>
            <option value="history">History</option>
            <option value="politics">Politics</option>


          </select>
        </div>

        {/* difficulty  */}

        <div className='form-control'>
          <label htmlFor='difficulty'>Select difficulty</label>
          <select name='difficulty' id='difficulty' className='form-input' value={quiz.difficulty} onChange={handleChange}>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>


          </select>
        </div>

        {/* we will get error if API cannot return questions  */}

        {error && <p className='error'>Can't generate Questions</p>}
        <button type='submit' onClick={handleSubmit} className='submit-btn'>Start</button>
      </form>

    </section>
  </main>
}


export default SetupForm
