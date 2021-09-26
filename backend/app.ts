import express from 'express'
import config from 'config'
import log from './log'
import connect from './db/connect'
import routes from './routes'
import cors from 'cors'

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

var corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
}

app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors(corsOptions))

app.listen(port, host, async () => {
  log.info(`App is listening to http://${host}:${port}`)
  await connect();
  routes(app)
})