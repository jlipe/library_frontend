import React, { useState } from 'react'
import { ALL_AUTHORS, UPDATE_BIRTH_YEAR } from '../queries'
import { useMutation, useQuery } from '@apollo/client'
import Select from 'react-select'

const Authors = (props) => {
  const authors = useQuery(ALL_AUTHORS)
  const options = authors.data ? authors.data.allAuthors.map(a => {
    return (
      {
        value: a.name,
        label: a.name
      }
    )
  })
  : null

  const [ selectedAuthor, setSelectedAuthor ] = useState(null)

  const [ updateAuthor ] = useMutation(UPDATE_BIRTH_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const [ birthYear, setBirthYear ] = useState('')

  if (!props.show) {
    return null
  }

  if (authors.loading){
    return <div>Loading...</div>
  }

  const submit = (event) => {
    event.preventDefault()
    updateAuthor({ variables: { author: selectedAuthor.value, birthYear: +birthYear } })
    setSelectedAuthor()
    setBirthYear('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.data.allAuthors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <form onSubmit={submit}>
        <div>
          {options ?
            <Select
              defaultValue={options[0]}
              onChange={setSelectedAuthor}
              options={options}
            />
          : null
          }

        </div>
        <div>
          born
          <input
            value={birthYear}
            onChange={({ target }) => setBirthYear(target.value)}
          />
        </div>
        <button type='submit'>Update</button>
      </form>
    </div>
  )
}

export default Authors
