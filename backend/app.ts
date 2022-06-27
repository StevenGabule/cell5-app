import config from 'config'
import log from './log'
import connect from './db/connect'
import createServer from './utils/createServer'
const port = config.get<number>('port');
const host = config.get<string>('host');
const app = createServer()

app.listen(port, host, async () => {
  log.info(`App is listening to http://${host}:${port}`)
  await connect();
})

