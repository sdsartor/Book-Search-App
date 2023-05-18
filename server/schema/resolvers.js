const { validate } = require('graphql');
const { addUser } = require('../../client/src/utils/mutations');
const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
// import referenced from activity 24
const resolvers = {
Query: {
    me: async (parent, args, context) => {
if (context.user) {
return User.findone({ _id: context.user._id });
}
throw AuthenticationError('Please make sure to log in before continuing')
    }
},
// Using typeDefs Mutation list to order this correctly and exercise 18.
Mutation: {
    login: async (parent, { email, password }) => {
        const user = await User.findone({ email });

        if (!user) {
            throw AuthenticationError('No user found with this email, please try another email');
        }
        const pw = await user.isCorrectPassword(password);
    if (!pw) {
        throw AuthenticationError('The following password is incorrect, please try another');
    }
    const token = signToken(user);
    return { user, token };
    },
    saveBook: async (parent, { SavedBookInput }, context) =>{
    if (context.user) {
    const user = await User.findOneAndUpdate(
        { _id: context.user._id},
        { $pull: { savedBooks: { SavedBookInput } }},
        { new: true, runValidators: true }
    );
    return user;
}
throw new AuthenticationError('You must be logged in to update and save books')
    }
},
   addUser: async (parent, { username, email, password }) => {
    const user = await User.create({ username, email, password });
    const token = signToken(user);
    return { token, user };
   },
   removeBook: async (parent, { bookId }, context) => {
    if (context.user) {
        // Because the remove mutation in typeDefs ends with user, we have to call from user instead of book.
        const updatedUser = await User.findOneAndDelete({
            _id: bookId,
            $pull: context.user.username,
            new: true,
        });
        await User.findOneAndUpdate(
            { _id: context.user._id},
            { $pull: { savedBooks: { bookId: bookId } }},
            { new: true }
        );
        return updatedUser;
    }
    throw new AuthenticationError('You need to be logged in for the browser to search for a book to remove')
   }

}



