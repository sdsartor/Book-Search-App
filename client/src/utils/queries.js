import gql from "graphql-tag";

export const GET_ME = gql`
{
    _id:
    username:
    email:
    bookCount:
    savedBooks: {
        title:
        bookId:
        description:
        image:
        link:
        autho:rs
    }
}
}
`;
