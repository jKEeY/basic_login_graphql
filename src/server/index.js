// Import Dependencies
import express from 'express';
import cors from 'cors'
import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import {makeExecutableSchema} from 'graphql-tools'
import jwt from 'jsonwebtoken'

// Import graphql schema and resolvers
import typeDefs from '../graphql/schema'
import resolvers from '../graphql/resolvers'

// Import mongodb modules
import UserModel from '../models/user'

// Import SECRET KEY
import config from '../../config'

const dev = process.env.NODE_ENV !== 'production'

const addUser = async (req) => {
  const token = req.headers.authorization;
  try {
    const { user } = await jwt.verify(token, config.SECRET);
    req.user = user;
  } catch (err) {
    
  }
  req.next();
};

class ServerInit {
  start() {
    return new Promise((resolve, reject) => {

      const schema = makeExecutableSchema({
        typeDefs,
        resolvers
      })
      // Init express server
      const app = new express();

      // Use Middleweare express
      app.use(express.json()) // body parser
      app.use(express.urlencoded({ // url encoded body parser
        extended: true
      }))
      app.use(addUser)
      app.use(cors('*')) // Permission to make requests from different hosts

      if (dev) {
        app.use('/api', graphiqlExpress({ // used graphiql tools GET /api
          endpointURL: '/graphql'
        }))
      }
      
      app.use('/graphql', 
        graphqlExpress(req => ({ // Initial http express graphQL
          schema, 
          context: { UserModel, SECRET: config.SECRET, user: req.user} 
        }))
      )
      app.listen(3000, () => {
        resolve('Server is started...')
      })
    });
  }
}

export default new ServerInit;