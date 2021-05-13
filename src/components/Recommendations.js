import React from 'react'
import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommendations = ({ show, books }) => {
  const user = useQuery(ME)

  if (user.loading) {
    return (
      null
    )
  }

  if (!user.data.me) {
    return null
  }

  if (!books || !books.allBooks) {
    return null
  }

  const username = user.data.me.username
  const favoriteGenre = user.data.me.favoriteGenre

  const filteredBooks = books.allBooks.filter(b => b.genres.includes(favoriteGenre))

  const renderedFilteredBooks = filteredBooks.map(a => {
    return (
      <tr key={a.title}>
        <td>{a.title}</td>
        <td>{a.author.name}</td>
        <td>{a.published}</td>
      </tr>
    )
  })

  if (!show) {
    return null
  }

  return (
    <>
      <div>
        <h2>Recommendations for {username}</h2>
        <div>Books in your favorite genre {favoriteGenre}</div>
      </div>
      <table>
        <tbody>
          {renderedFilteredBooks}
        </tbody>
      </table>
    </>
  )
}

export default Recommendations