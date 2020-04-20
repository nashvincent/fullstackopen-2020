import React from 'react'

const PersonForm = ({ newName, newNumber, handleNameChange, handleNumberChange, handleFormSubmit }) => {
    return (
        <form onSubmit={(e) => handleFormSubmit(e)}>
        <div>
          name: <input value={newName} onChange={(e) => {handleNameChange(e)}} />
          <br />
          number: <input value={newNumber} onChange={(e) => {handleNumberChange(e)}} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
}

export default PersonForm