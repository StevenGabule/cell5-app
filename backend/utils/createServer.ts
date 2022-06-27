import express from 'express'
import routes from '../routes'
import cors from 'cors'

function createServer() {
  const app = express();

  var corsOptions = {
    origin: 'http://localhost:3000',
    optionsSuccessStatus: 200
  }

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }))
  app.use(cors(corsOptions))

  routes(app)
  return app;
}

export default createServer;