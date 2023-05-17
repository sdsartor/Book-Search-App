const { User, Book } = require('../models');
const { signToken } = require('../utils/auth');
const { AuthenticationError } = require('apollo-server-express');
// import referenced from activity 24
const resolvers = {
Query: {
    me: async (parent, args, context)
}
}