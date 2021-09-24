import express from 'express'
import config from 'config'
import log from './log'
import connect from './db/connect'
import routes from './routes'

const port = config.get('port') as number;
const host = config.get('host') as string;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.listen(port, host, async () => {
  log.info(`App is listening to http://${host}:${port}`)
  await connect();
  routes(app)
})