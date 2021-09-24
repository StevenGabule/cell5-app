import { Request, Response } from "express";
import { findAll, createPerson, findPerson, findAndUpdate, deletePerson } from "../service/person.service";
import { get } from 'lodash'

export async function indexPersonHandler(req: Request, res: Response) {
  try {
    const persons = await findAll({})
    return res.status(200).json(persons)
  } catch (error: any) {
    return res.status(400).json({
      error: error.message
    })
  }
}

export async function createPersonHandler(req: Request, res: Response) {
  try {
    const body = req.body;
    const person = await createPerson(body)
    return res.status(201).json(person)
  } catch (error: any) {
    return res.status(400).json({
      error: error.message
    })
  }
}

export async function getPersonHandler(req: Request, res: Response) {
  try {
    const _id = get(req, "params.personId");
    const person = await findPerson({ _id })
    return res.status(200).json(person)
  } catch (error: any) {
    return res.status(400).json({
      error: error.message
    })
  }
}

export async function updatePersonHandler(req: Request, res: Response) {
  try {
    const _id = get(req, "params.personId");
    const update = req.body;
    const person = await findPerson({ _id })
    if (!person) {
      return res.sendStatus(404)
    }
    const updatedPerson = await findAndUpdate({ _id }, update, { new: true })
    return res.status(201).json(updatedPerson)
  } catch (error: any) {
    return res.status(400).json({
      error: error.message
    })
  }
}

export async function deletePersonHandler(req: Request, res: Response) {
  try {
    const _id = get(req, "params.personId");
    const person = await findPerson({ _id })
    if (!person) {
      return res.sendStatus(404)
    }
    await deletePerson({ _id })
    return res.sendStatus(200)
  } catch (error: any) {
    return res.status(400).json({
      error: error.message
    })
  }
}