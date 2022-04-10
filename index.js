const {ApolloServer} = require("apollo-server-express");
const mongoose = require('mongoose');
const express = require('express');
const {graphqlUploadExpress} = require("graphql-upload");
const typeDefs = require("./gql/schema");
const resolvers = require("./gql/resolver");
const jwt = require('jsonwebtoken');

require("dotenv").config({path: ".env"});

mongoose.connect(
    process.env.BBDD,
    {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}, 
(err, _) =>{
 if(err){
     console.log("Error de conexión con la base de datos", err);
    }else{
        server();
    }
 }
);

async function server(){
    const serverApollo = new ApolloServer({
        typeDefs,
        resolvers,
        context: ({req}) =>{
            const token = req.headers.authorization;
            if (token){
             try {
                 const user = jwt.verify(token.replace("Bearer ",""),
                 process.env.SECRET_KEY);
                 return {
                     user,
                 }
             } catch (error) {
                 console.log("### Error en el token ###", error);
                 throw new Error("Error en el token");
             }
               
             }
        },
    });
    await serverApollo.start();
    const app = express();
    app.use(graphqlUploadExpress());
    serverApollo.applyMiddleware({app});
    await new Promise((r)=>app.listen({port:process.env.PORT || 4000},r))
        console.log("#################")
        console.log(`Servidor iniciado en ${serverApollo.graphqlPath}`);
        console.log("#################")
  
}
