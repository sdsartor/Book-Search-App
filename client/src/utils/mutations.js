import gql from "graphql-tag";

export const GET_ME = gql;

export const log_in = gql`
  mutation login($email: string!, $password: string!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const add_User = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      auth {
        token
        user {
          _id
          username
          email
        }
      }
    }
  }
`;

export const save_Book = gql`
  mutation saveBook($input: SavedBookInput) {
    saveBook(input: $input) {
      _id
      username
      email
      bookCount
      savedBooks {
        authors
        description
        title
        bookId
        image
        link
      }
    }
  }
`;

export const remove_Book = gql`
  mutation removeBook($bookId: String!) {
    removeBook(bookId: $bookId) {
      _id
      username
      email
      bookCount
      savedBooks {
        bookId
        authors
        description
        title
        image
        link
      }
    }
  }
`;
