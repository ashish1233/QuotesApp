// apollo-server is host graphql on Node js
// gql for schema
// apollo-server-core for playgrouynd

import {ApolloServer, gql} from 'apollo-server-express'
import  {ApolloServerPluginLandingPageGraphQLPlayground, 
    ApolloServerPluginDrainHttpServer,
    ApolloServerPluginLandingPageDisabled
} from 'apollo-server-core'
import jwt from 'jsonwebtoken'
import typeDefs from './schemaGql.js'
import mongoose from 'mongoose'
import dotenv from 'dotenv'
import express from 'express';
import http from 'http';
import  path from 'path'
const __dirname = path.resolve()


const port = process.env.PORT || 4000

const app = express();
  const httpServer = http.createServer(app);



if(process.env.NODE_ENV !=="production"){
    dotenv.config()

}

//mongodb+srv://<username>:<password>@graphql.shtr38v.mongodb.net/?retryWrites=true&w=majority


mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser : true,    // To avoid warning on console
    useUnifiedTopology: true  // To avoid warning on console
})

mongoose.connection.on("connected", ()=>{
    console.log("connected to mongooose")
})

mongoose.connection.on("error", (err)=>{
    console.log("error connecting", err)
})


import './models/Quotes.js'
import './models/User.js'
import resolvers from './resolvers.js'
import { quotes, users } from './fakedb.js'

// this is middleware

// const typeDefs = gql`
// type Query {
//     users : [User]
//     user(id:ID!): User
//     quotes: [Quote]
//     iquote(by:ID!): [Quote]
// }
// type User {
//     id: ID!
//     firstName: String
//     lastName: String
//     email: String
//     quotes: [Quote]
// }
// type Quote {
//     name: String
//     by: ID
// }
// `

// const resolvers = {
//     Query: {
//         users: ()=> users,
//         user:(_, {id})=> users.find(ur=> ur.id == id),
//         quotes: ()=> quotes,
//         iquote:(_, {by})=> quotes.filter(quote=> quote.by == by),
//     },
//     User : {
//         quotes: (ur)=> quotes.filter(quote=> quote.by === ur.id)
//     }
// } 

// middleware
const context = ({req})=>{
    const {authorization} =req.headers
    if(authorization){
    const {userId} = jwt.verify(authorization, process.env.JWT_SECRET)
     return {userId}
    }
} 

const server = new ApolloServer({
    typeDefs : typeDefs,
    resolvers: resolvers,
    context,
    plugins: [
        ApolloServerPluginDrainHttpServer({ httpServer }),
        process.env.NODE_ENV !=="production" ? 
        ApolloServerPluginLandingPageGraphQLPlayground() :
        ApolloServerPluginLandingPageDisabled()
    ]
})

if(process.env.NODE_ENV=="production"){
    console.log("yess")
    app.use(express.static('client/build'))
    app.get("*", (req, res)=>{
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}



await server.start();
server.applyMiddleware({ 
    app,
    path: '/graphql'
 });
 httpServer.listen({ port }, ()=>{
    console.log(`Server ready at ${port} ${server.graphqlPath}`)
 })
