import { useQuery, useLazyQuery, useApolloClient } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { GENRES, ALL_BOOKS } from '../queries'

const Books = (props) => {
  let data = props.books
  const genres = props.books

  if (!props.show) {
    return null
  }

  if (props.loading) {
    return null
  }

  const genresSet = new Set()

  for (let i = 0; i < genres.allBooks.length; i++) {
    for (let j = 0; j < genres.allBooks[i].genres.length; j++) {
      genresSet.add(genres.allBooks[i].genres[j])
    }
  }

  const renderedButtons = (
    [...genresSet].map(g => {
      return (
        <button onClick={() => props.setGenreFilter(g)} key={g}>{g}</button>
      )
    })
  )


  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th>
              title
            </th>
            <th>
              author
            </th>
            <th>
              published
            </th>
          </tr>
          {
          data.allBooks.map(a =>
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
          )}
        </tbody>
      </table>
      {renderedButtons}
      <button onClick={() => props.setGenreFilter(null)}>all books</button>
    </div>
  )
}

export default Books