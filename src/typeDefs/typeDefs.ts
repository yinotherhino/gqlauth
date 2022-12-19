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

    input login{
        email:String!
        password:String!
    }

    type userSuccess  {
        user: User!
        message: String!
        statusCode: Int!
        token: String
    }

    

    type failure  {
        Error: String!
        statusCode: Int!
    }

    union userReturn = failure | userSuccess

    type Mutation{
        Signup(input:signup!): userReturn!
        Login(input:login!): userReturn!
    }
    type Query{
        singleUser(id:String): User!
    }

`
export default typeDefs;