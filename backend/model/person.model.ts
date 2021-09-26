import mongoose from 'mongoose'

export interface PersonDocument extends mongoose.Document {
  firstName: string;
  lastName: string;
  bornDate: Date;
  height: string;
  spouse: string;
  motherName: string;
  fatherName: string;
  avatar_url: string;
  createdAt: Date;
  updatedAt: Date;
}

const PersonSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bornDate: { type: Date, required: true },
  height: { type: String, required: true },
  spouse: { type: String },
  motherName: { type: String },
  fatherName: { type: String },
  avatar_url: { type: String },
}, {
  timestamps: true,
  toJSON: {
    transform(_, ret) {
      delete ret.__v;
    }
  }
})

const Person = mongoose.model<PersonDocument>("Person", PersonSchema);

export default Person;