import {gql} from 'apollo-server'

const typeDefs = gql `
    type User{
        _id:ID!
        email:String!
        username:String!
        password:String!
        salt:String
        role:String
    }


    input signup{
        email:String!
        username:String!
        password:String!
    }

    type Message{
        message:String!
        Error:String
    }

    type signupSuccess  {
        user: User!
        message: String!
        statusCode: Int!
    }

    type signupFailure  {
        Error: String!
        statusCode: Int!
    }

    union signupReturn = signupFailure | signupSuccess
    
    type Mutation{
        Signup(input:signup!): signupReturn!
    }
    type Query{
        singleUser(id:String): User!
    }

`
export default typeDefs;