import mongoose from 'mongoose'
export interface PersonDocument extends mongoose.Document {
  username: string;
  firstName: string;
  lastName: string;
  bornDate: String;
  height: string;
  spouse: string;
  motherName: string;
  fatherName: string;
  avatar_url: string;
  createdAt: Date;
  updatedAt: Date;
}

const PersonSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  bornDate: { type: String, required: true },
  height: { type: String, required: true },
  spouse: { type: String, default: 'N/A' },
  motherName: { type: String, default: 'N/A' },
  fatherName: { type: String, default: 'N/A' },
  avatar_url: { type: String, default: '' },
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