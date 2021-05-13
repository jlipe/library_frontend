import React, { useEffect, useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import Recommendations from './components/Recommendations'
import { useApolloClient, useLazyQuery, useQuery, useSubscription } from '@apollo/client'

import { BOOK_ADDED, ALL_BOOKS } from './queries'

const App = () => {
  const [token, setToken] = useState(null)
  const [page, setPage] = useState('authors')
  const [books, setBooks] = useState([])
  const [genreFilter, setGenreFilter] = useState(null)

  const [getBooks, { loading, data }] = useLazyQuery(ALL_BOOKS)

  const client = useApolloClient()

  useEffect(() => {
    getBooks()
    setBooks(data)
  }, [getBooks, data])

  if (genreFilter) {
    client.query({
      query: ALL_BOOKS,
      variables: {genre: genreFilter}
    }).then(r => setBooks(r.data))
  } else {
    client.query({
      query: ALL_BOOKS
    }).then(r => setBooks(r.data))
  }


  useEffect(() => {
    if (localStorage.getItem("library-user-token")) {
      setToken(localStorage.getItem("library-user-token"))
    }
  }, [])

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
    setPage('authors')
  }

  const updateCacheWith = (addedBook) => {
    const includedIn = (set, object) => {
      return set.map(b => b.id).includes(object.id)
    }

    const dataInStore = client.readQuery({ query: ALL_BOOKS })
    if (!includedIn(dataInStore.allBooks, addedBook)) {
      client.writeQuery({
        query: ALL_BOOKS,
        data: { allBooks: dataInStore.allBooks.concat(addedBook)}
      })
    }
  }


  useSubscription(BOOK_ADDED, {
    onSubscriptionData: ({ subscriptionData }) => {
      const addedBook = subscriptionData.data.bookAdded
      updateCacheWith(addedBook)
    }
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {token ?
          <>
            <button onClick={() => setPage('add')}>add book</button>
            <button onClick={() => setPage('recommend')}>recommendations</button>
            <button onClick={() => logout()}>logout</button>
          </>
          : <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors
        show={page === 'authors'}
      />

      <Books
        show={page === 'books'}
        books={books}
        setGenreFilter={setGenreFilter}
        loading={loading}
      />

      <NewBook
        show={page === 'add'}
        updateCacheWith={updateCacheWith}
      />

      <LoginForm
        setToken={setToken}
        setPage={setPage}
        show={page === 'login'}
      />

      <Recommendations
        show={page === 'recommend'}
        books={books}
      />

    </div>
  )
}

export default App