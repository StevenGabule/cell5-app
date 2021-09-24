import { Express, Request, Response } from 'express'
import { indexPersonHandler, createPersonHandler, getPersonHandler, updatePersonHandler, deletePersonHandler } from './controller/person.controller';

export default function (app: Express) {
  app.get('/health-check', (_req: Request, res: Response) => {
    res.sendStatus(200)
  })

  // all lists person
  app.get('/api/person', indexPersonHandler);

  // create a person
  app.post('/api/person', createPersonHandler);

  // edit a person
  app.get('/api/person/:personId', getPersonHandler);

  // update a person
  app.put('/api/person/:personId', updatePersonHandler);

  // delete a person
  app.delete('/api/person/:personId', deletePersonHandler);

}