import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
query {
  allAuthors{
    name,
    born,
    bookCount
  }
}
`

export const ALL_BOOKS = gql`
query {
  allBooks {
    title,
    author {
      name
    },
    published
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