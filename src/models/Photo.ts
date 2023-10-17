import { Schema, model, Document } from 'mongoose'

const schema = new Schema({
    title: String,
    description: String,
    imagePath: String,
    author: String, 
    createdimg: { type: Date, default: Date.now },
    updatedimg: { type: Date, default: Date.now }
 
});

export interface IPhoto extends Document {
    title: string;
    description: string;
    imagePath: string;
    author: string;
    createdimg: Date;
    updatedimg: Date;
}

export default model<IPhoto>('Photo', schema);