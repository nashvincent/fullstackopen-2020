import React from 'react'

const Persons = ({ persons, handleDelete }) => {
    const personsList = persons.map(person => {
        return (
            <div key={person.number}>
                {person.name} {person.number} 
                <button onClick={() => handleDelete(person)}>delete</button>
            </div>
        )
    })
    
    return (
        <div>
            {personsList}
        </div>
    )
}

export default Persons;