import { Express } from 'express'
import {
  indexPersonHandler,
  createPersonHandler,
  getPersonHandler,
  updatePersonHandler,
  deletePersonHandler
} from './controller/person.controller';

export default function (app: Express) {
  app.get('/api/person', indexPersonHandler); // all lists person
  app.post('/api/person', createPersonHandler); // create a person
  app.get('/api/person/:personId', getPersonHandler); // edit a person
  app.put('/api/person/:personId', updatePersonHandler); // update a person
  app.delete('/api/person/:personId', deletePersonHandler); // delete a person
}