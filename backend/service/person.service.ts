import Person, { PersonDocument } from './../model/person.model';
import { DocumentDefinition, FilterQuery, QueryOptions, UpdateQuery } from "mongoose";

export function findAll(query: FilterQuery<PersonDocument>) {
  return Person.find(query)
}

export function createPerson(input: DocumentDefinition<PersonDocument>) {
  return Person.create(input)
}

export function findPerson(query: FilterQuery<PersonDocument>, options: QueryOptions = { lean: true }) {
  return Person.findOne(query, {}, options)
}

export function findAndUpdate(
  query: FilterQuery<PersonDocument>,
  update: UpdateQuery<PersonDocument>,
  options: QueryOptions) {
  return Person.findOneAndUpdate(query, update, options)
}

export function deletePerson(query: FilterQuery<PersonDocument>) {
  return Person.deleteOne(query)
}