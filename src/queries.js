import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query allAuthors{
  allAuthors{
    name,
    born,
    bookCount
  }
}
`

const BOOK_DETAILS = gql`
fragment BookDetails on Book {
  id,
  title,
  author {
    name
  },
  genres,
  published
}
`

export const BOOK_ADDED = gql`
subscription {
  bookAdded {
    ...BookDetails
  }
}

${BOOK_DETAILS}
`

export const ALL_BOOKS = gql`
query allBooks($genre: String){
  allBooks(genre: $genre) {
    id,
    title,
    author {
      name
    },
    genres,
    published
  }
}
`

export const ME = gql`
query me{
  me {
    username,
    favoriteGenre
  }
}
`

export const GENRES = gql`
query genres{
  allBooks {
    id,
    genres
  }
}
`

export const CREATE_BOOK = gql`
mutation createBook($title: String!, $author: String!, $published: Int!, $genres: [String!]!) {
  addBook(
    title: $title,
    author: $author,
    published: $published,
    genres: $genres
  ) {
    id,
    title,
    author {
      name
    },
    published,
    genres
  }
}
`

export const UPDATE_BIRTH_YEAR = gql`
mutation updateBirthYear($author: String!, $birthYear: Int!) {
  editAuthor(
    name: $author,
    setBornTo: $birthYear
  ) {
    name,
    born
  }
}
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}
`