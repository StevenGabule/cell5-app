import supertest from "supertest"
import createServer from '../utils/createServer'
import { MongoMemoryServer } from 'mongodb-memory-server'
import mongoose from "mongoose"
import { createPersonHandler } from "../controller/person.controller"
import { createPerson } from "../service/person.service"

const app = createServer()
const userId = new mongoose.Types.ObjectId().toString();
export const developerPayload = {
  username: "jp_gabs",
  firstName: "Mike Paul",
  lastName: "Gabule",
  bornDate: "04/10/1993",
  height: "5'3",
  spouse: "Flordelyn Maduay",
  motherName: "Vicenta Ang",
  fatherName: "Rene Gabule",
  avatar_url: "https://images.unsplash.com/profile-fb-1460825798-70fae2b76594.jpg?dpr=1&auto=format&fit=crop&w=150&h=150&q=60&crop=faces&bg=fff"
}

describe('person', () => {

  beforeAll(async () => {
    const mongoServer = await MongoMemoryServer.create()
    await mongoose.connect(mongoServer.getUri())
  })

  afterAll(async () => {
    await mongoose.disconnect()
    await mongoose.connection.close()
  })

  describe('PERSONS', () => {
    describe('given the person does not exists', () => {
      it('should return a 404', async () => {
        const personId = "6168673d96d1afadb73cf571"
        await supertest(app).get(`/api/person/${personId}`).expect(404)
      })
    })

    describe('given the person does exists', () => {
      it('should return a 200', async () => {
        const person = await createPerson(developerPayload)
        const { statusCode } = await supertest(app).get(`/api/person/${person._id}`)
        expect(statusCode).toBe(200)
      })
    })

    describe('given the person going to be created', () => {
      it('should return a 201 and the created person', async () => {
        const { body, statusCode } = await supertest(app)
          .post('/api/person')
          .send({ ...developerPayload, username: 'blues_dragon' });
        expect(statusCode).toBe(201);
        expect(body).toEqual({
          ...developerPayload,
          username: 'blues_dragon',
          _id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      })
    })

    describe('given the person going to be updated', () => {
      it('should return a 404 if the person does not exists', async () => {
        const personId = "6168673d96d1afadb73cf571"
        await supertest(app).put(`/api/person/${personId}`).expect(404)
      })

      it('should return a 201 and the updated person', async () => {
        const newRecord = { ...developerPayload, username: 'jonnn' }
        const createdPerson = await createPerson(newRecord)

        const { body, statusCode } = await supertest(app)
          .put(`/api/person/${createdPerson._id}`)
          .send({ ...developerPayload, username: 'programming_two' });

        expect(statusCode).toBe(201);
        expect(body).toEqual({
          ...developerPayload,
          username: 'programming_two',
          _id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        })
      })
    })

    describe('given the person going to be deleted', () => {
      it('should return a 404 if the person does not exists', async () => {
        const personId = "6168673d96d1afadb73cf571"
        await supertest(app).delete(`/api/person/${personId}`).expect(404)
      })

      it('should return a 200 res and the person record will be deleted', async () => {
        const createdPerson = await createPerson({ ...developerPayload, username: 'programming_three' })
        const { statusCode } = await supertest(app)
          .delete(`/api/person/${createdPerson._id}`);
        expect(statusCode).toBe(200);
      })
    })
  })
})