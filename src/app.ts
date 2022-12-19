
import mongoose from 'mongoose'
import {config} from 'dotenv'
import {ApolloServer} from 'apollo-server'
import {uri, port} from "./config"
import resolvers from './Resolvers/usersResolver';
import typeDefs from './typeDefs/typeDefs';

config();

mongoose.set('strictQuery', false);
mongoose.connect(uri, ()=>{
    console.log("Database connected")
});

const server = new ApolloServer({
    typeDefs, resolvers
});


server.listen( port, ()=> {
    console.log(`Server started on port ${port}`);
} )